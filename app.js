document.addEventListener('DOMContentLoaded', () => {
  // Movie-style opening
  const intro = document.createElement('div');
  intro.className = 'movie-intro';
  intro.innerHTML = `<div class="intro-glow"></div><div class="intro-logo"><span>HOSTEL</span><b>FINDER</b></div><div class="intro-line"></div><p>FIND YOUR STAY. FIND YOUR PEOPLE. FIND YOUR STORY.</p><button class="skip-intro">SKIP INTRO</button>`;
  document.body.prepend(intro);
  document.body.classList.add('intro-active');

  const closeIntro = () => { intro.classList.add('intro-out'); document.body.classList.remove('intro-active'); setTimeout(() => intro.remove(), 800); };
  intro.querySelector('.skip-intro').onclick = closeIntro;
  setTimeout(closeIntro, 4200);

  // Real search: city + dorm type + price together
  const originalSearch = window.searchHostels;
  window.searchHostels = function () {
    const q = document.getElementById('locationInput').value.trim().toLowerCase();
    const type = document.getElementById('genderFilter').value;
    const price = document.getElementById('priceFilter').value;
    const max = price === 'all' ? Infinity : Number(price);
    const results = hostels.filter(h =>
      (!q || h.city.toLowerCase().includes(q) || h.name.toLowerCase().includes(q)) &&
      (type === 'all' || h.type === type) && h.price <= max
    );
    renderHostels(results);
    document.getElementById('hostels').scrollIntoView({behavior:'smooth'});
  };

  window.filterByPrice = function () { window.searchHostels(); };
  window.quickSearch = function(city) { document.getElementById('locationInput').value = city; window.searchHostels(); };

  document.getElementById('locationInput').addEventListener('keydown', e => { if (e.key === 'Enter') window.searchHostels(); });
  document.getElementById('genderFilter').addEventListener('change', window.searchHostels);

  // Functional hostel details modal
  window.viewDetails = function(name) {
    const h = hostels.find(x => x.name === name);
    if (!h) return;
    document.getElementById('detailModal')?.remove();
    const modal = document.createElement('div');
    modal.id = 'detailModal';
    modal.className = 'modal-backdrop';
    modal.innerHTML = `<div class="detail-modal"><button class="modal-close">×</button><img src="${h.image}" alt="${h.name}"><div class="modal-body"><span class="tag">${getTypeName(h.type)}</span><h2>${h.name}</h2><p class="location">📍 ${h.city}, India</p><div class="modal-rating">⭐ ${h.rating} · Highly rated</div><p>${h.description}</p><div class="modal-amenities">${h.amenities.map(a=>`<span>${a}</span>`).join('')}</div><div class="modal-bottom"><strong>₹${h.price}<small> / night</small></strong><button class="book-btn" onclick="showBooking('${h.name.replace(/'/g,"\\'")}')">Check Availability</button></div></div></div>`;
    document.body.appendChild(modal);
    modal.querySelector('.modal-close').onclick = () => modal.remove();
    modal.onclick = e => { if (e.target === modal) modal.remove(); };
  };

  window.showBooking = function(name) {
    alert(`✅ Great choice!\n\n${name}\n\nBooking integration is ready for the next step with Supabase/payment gateway.`);
  };

  // Login button works as a friendly demo modal
  document.querySelector('.login-btn').onclick = () => {
    const m = document.createElement('div'); m.className='modal-backdrop'; m.innerHTML=`<div class="login-modal"><button class="modal-close">×</button><div class="login-logo">🏠</div><h2>Welcome to Hostel Finder</h2><p>Login will be connected to Supabase Auth.</p><input placeholder="Email address" type="email"><button class="book-btn">Continue</button></div>`; document.body.appendChild(m); m.querySelector('.modal-close').onclick=()=>m.remove(); m.onclick=e=>{if(e.target===m)m.remove();};
  };
});
