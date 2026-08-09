document.addEventListener('DOMContentLoaded', () => {
  const intro = document.createElement('div');
  intro.className = 'movie-intro';
  intro.innerHTML = `<div class="intro-glow"></div><div class="intro-logo"><span>HOSTEL</span><b>FINDER</b></div><div class="intro-line"></div><p>FIND YOUR STAY. FIND YOUR PEOPLE. FIND YOUR STORY.</p><button class="skip-intro">SKIP INTRO</button>`;
  document.body.prepend(intro); document.body.classList.add('intro-active');
  const closeIntro=()=>{intro.classList.add('intro-out');document.body.classList.remove('intro-active');setTimeout(()=>intro.remove(),800)};
  intro.querySelector('.skip-intro').onclick=closeIntro; setTimeout(closeIntro,4200);

  const account=document.querySelector('.navbar');
  if(account){
    const actions=document.createElement('div'); actions.className='account-actions';
    actions.innerHTML=`<button class="bookings-btn" id="myBookingsBtn">My Bookings</button><button class="login-btn" id="authBtn">Login</button>`;
    const old=account.querySelector('.login-btn'); if(old) old.remove(); account.appendChild(actions);
    document.getElementById('authBtn').onclick=()=>openAuth(); document.getElementById('myBookingsBtn').onclick=()=>openBookings();
  }
  updateAuthUI();
});

async function updateAuthUI(){
  const {data}=await db.auth.getSession();
  const btn=document.getElementById('authBtn'); if(!btn)return;
  if(data.session){btn.textContent='Logout';btn.onclick=async()=>{await db.auth.signOut();location.reload();};}
}

function openAuth(){
  document.getElementById('authModal')?.remove();
  const m=document.createElement('div');m.id='authModal';m.className='modal-backdrop';
  m.innerHTML=`<div class="login-modal"><button class="modal-close">×</button><div class="login-logo">🏠</div><h2>Welcome to Hostel Finder</h2><p id="authMsg">Login or create your account.</p><input id="authEmail" placeholder="Email address" type="email"><input id="authPassword" placeholder="Password (6+ characters)" type="password"><button id="loginAction" class="book-btn">Login</button><button id="signupAction" class="auth-secondary">Create account</button></div>`;
  document.body.appendChild(m);m.querySelector('.modal-close').onclick=()=>m.remove();m.onclick=e=>{if(e.target===m)m.remove()};
  const msg=t=>document.getElementById('authMsg').textContent=t;
  document.getElementById('loginAction').onclick=async()=>{const email=authEmail.value.trim(),password=authPassword.value;if(!email||!password)return msg('Enter email and password.');const {error}=await db.auth.signInWithPassword({email,password});if(error)return msg(error.message);location.reload()};
  document.getElementById('signupAction').onclick=async()=>{const email=authEmail.value.trim(),password=authPassword.value;if(!email||password.length<6)return msg('Use a valid email and 6+ character password.');const {error}=await db.auth.signUp({email,password});if(error)return msg(error.message);msg('Account created! Check your email if verification is enabled.')};
}

async function openBookings(){
  const {data:{session}}=await db.auth.getSession();
  if(!session){openAuth();return;}
  const {data,error}=await db.from('bookings').select('id,hostel_id,guest_name,guest_email,check_in,check_out,guests,status,created_at,hostels(name,destination,price_per_night,image_url)').eq('user_id',session.user.id).order('created_at',{ascending:false});
  document.getElementById('bookingsModal')?.remove();
  const m=document.createElement('div');m.id='bookingsModal';m.className='modal-backdrop';
  let content='';
  if(error) content=`<p class="booking-message">Could not load bookings. Please try again.</p>`;
  else if(!data?.length) content=`<div class="empty-bookings">🧳<h3>No bookings yet</h3><p>Find a hostel and your trips will appear here.</p><button class="book-btn" id="exploreBtn">Explore Hostels</button></div>`;
  else content=data.map(b=>`<div class="booking-card"><img src="${b.hostels?.image_url||''}" alt=""><div><span class="booking-status ${b.status}">${b.status}</span><h3>${escapeHtml(b.hostels?.name||'Hostel')}</h3><p>📍 ${escapeHtml(b.hostels?.destination||'India')}</p><p>📅 ${b.check_in} → ${b.check_out} · 👥 ${b.guests}</p><p>Guest: ${escapeHtml(b.guest_name)}</p></div></div>`).join('');
  m.innerHTML=`<div class="bookings-modal"><button class="modal-close">×</button><div class="login-logo">🎒</div><h2>My Bookings</h2><p>Your Hostel Finder trip history</p><div class="booking-list">${content}</div></div>`;
  document.body.appendChild(m);m.querySelector('.modal-close').onclick=()=>m.remove();m.onclick=e=>{if(e.target===m)m.remove()};
  m.querySelector('#exploreBtn')?.addEventListener('click',()=>m.remove());
}

window.viewDetails=window.viewDetails||function(name){const h=hostels.find(x=>x.name===name);if(!h)return;document.getElementById('detailModal')?.remove();const m=document.createElement('div');m.id='detailModal';m.className='modal-backdrop';m.innerHTML=`<div class="detail-modal"><button class="modal-close">×</button><img src="${h.image}" alt="${escapeHtml(h.name)}"><div class="modal-body"><span class="tag">${getTypeName(h.type)}</span><h2>${escapeHtml(h.name)}</h2><p class="location">📍 ${escapeHtml(h.city)}, India</p><div class="modal-rating">⭐ ${h.rating} · Highly rated</div><p>${escapeHtml(h.description||'')}</p><div class="modal-amenities">${h.amenities.map(a=>`<span>${escapeHtml(a)}</span>`).join('')}</div><div class="modal-bottom"><strong>₹${h.price}<small> / night</small></strong><button class="book-btn" onclick="openBooking(hostels.find(x=>x.id===${h.id}))">Book Now</button></div></div></div>`;document.body.appendChild(m);m.querySelector('.modal-close').onclick=()=>m.remove();m.onclick=e=>{if(e.target===m)m.remove()};};