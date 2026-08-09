const hostelData={
'Goa Beach Backpackers':{location:'Anjuna, North Goa',type:'Mixed Dorm',price:599,rating:'4.7/5',amenities:'Pool, café, workspace, social nights, beach access'},
'Old Manali Backpackers':{location:'Old Manali, Himachal Pradesh',type:'Mixed Dorm',price:699,rating:'4.8/5',amenities:'Mountain views, café, bonfire, common room, trip meetups'},
'Kasol Riverside Hostel':{location:'Kasol, Himachal Pradesh',type:'Mixed Dorm',price:499,rating:'4.6/5',amenities:'Riverside common area, café, mountain views, trek access'},
'Ganga Valley Hostel':{location:'Tapovan, Rishikesh',type:'Mixed Dorm',price:549,rating:'4.8/5',amenities:'Rooftop café, yoga, river access, rafting connections'},
'Pink City Social Hostel':{location:'Jaipur, Rajasthan',type:'Mixed Dorm',price:599,rating:'4.6/5',amenities:'Rooftop, café, walking tours, social common room'},
'Lake City Girls Hostel':{location:'Udaipur, Rajasthan',type:'Female Dorm',price:699,rating:'4.7/5',amenities:'Female dorms, rooftop views, café, old-city access'},
'Golden Fort Backpackers':{location:'Jaisalmer, Rajasthan',type:'Mixed Dorm',price:799,rating:'4.5/5',amenities:'Fort views, rooftop dinners, desert safari connections'},
'Ghat Side Backpackers':{location:'Varanasi, Uttar Pradesh',type:'Mixed Dorm',price:449,rating:'4.4/5',amenities:'Common room, café, walking tours, ghat access'},
'Dharamkot Mountain Hostel':{location:'Dharamkot, Himachal Pradesh',type:'Mixed Dorm',price:499,rating:'4.7/5',amenities:'Mountain café, yoga, workspace, trek meetups'},
'Dhauladhar Girls Hostel':{location:'McLeod Ganj, Himachal Pradesh',type:'Female Dorm',price:549,rating:'4.6/5',amenities:'Female dorms, mountain views, café, trek access'},
'Bir Billing Nomads':{location:'Bir, Himachal Pradesh',type:'Mixed Dorm',price:599,rating:'4.8/5',amenities:'Café, chill zone, paragliding connections, community events'},
'Hampi Backpackers Hub':{location:'Hampi, Karnataka',type:'Mixed Dorm',price:449,rating:'4.5/5',amenities:'Courtyard, cycle rentals, local walks, traveller hangout'},
'Gokarna Beach Hostel':{location:'Gokarna, Karnataka',type:'Mixed Dorm',price:499,rating:'4.6/5',amenities:'Beach vibe, hammocks, café, coastal trails'},
'White Town Travellers Stay':{location:'White Town, Pondicherry',type:'Private Room',price:1199,rating:'4.5/5',amenities:'Private rooms, bicycles, café, promenade access'},
'Delhi Travellers Den':{location:'Paharganj, New Delhi',type:'Mixed Dorm',price:399,rating:'4.3/5',amenities:'Budget dorms, café, station access, city tours'},
'Colaba Girls Backpackers':{location:'Colaba, Mumbai',type:'Female Dorm',price:999,rating:'4.5/5',amenities:'Female dorms, social lounge, cafés, heritage sights'},
'Leh Mountain Nomads':{location:'Leh, Ladakh',type:'Male Dorm',price:899,rating:'4.7/5',amenities:'Bike-trip support, common room, rooftop, travel desk'}
};

let activeHostel='';
function applyFilters(){
 const q=document.getElementById('locationInput').value.toLowerCase().trim();
 const type=document.getElementById('genderFilter').value;
 const max=document.getElementById('priceFilter').value;
 let found=0;
 document.querySelectorAll('.hostel-card').forEach(card=>{
  const loc=card.dataset.location.toLowerCase();
  const name=card.dataset.name.toLowerCase();
  const ok=(!q||loc.includes(q)||name.includes(q))&&(type==='all'||card.dataset.gender===type)&&(max==='all'||Number(card.dataset.price)<=Number(max));
  card.style.display=ok?'block':'none';if(ok)found++;
 });
 document.getElementById('resultCount').textContent=`${found} hostel${found===1?'':'s'} found`;
 document.getElementById('noResults').style.display=found?'none':'block';
}
function searchHostels(){applyFilters();document.getElementById('hostels').scrollIntoView({behavior:'smooth'})}
function setCity(city){document.getElementById('locationInput').value=city==='all'?'':city;searchHostels()}
function filterByPrice(){applyFilters()}
function viewDetails(name){
 const h=hostelData[name];if(!h)return;activeHostel=name;
 document.getElementById('modalTitle').textContent=name;
 document.getElementById('modalBody').innerHTML=`<div class="detail-row"><strong>📍 Location</strong><span>${h.location}</span></div><div class="detail-row"><strong>🛏️ Stay type</strong><span>${h.type}</span></div><div class="detail-row"><strong>💰 Price</strong><span>₹${h.price}/night</span></div><div class="detail-row"><strong>⭐ Rating</strong><span>${h.rating}</span></div><div class="detail-row"><strong>✨ Amenities</strong><span>${h.amenities}</span></div>`;
 document.getElementById('modalBookBtn').onclick=()=>{closeDetails();openBooking(name)};
 document.getElementById('detailsModal').classList.add('show');
}
function closeDetails(){document.getElementById('detailsModal').classList.remove('show')}
function openBooking(name){activeHostel=name;document.getElementById('bookingTitle').textContent=`Book ${name}`;document.getElementById('bookingPrice').textContent=`₹${hostelData[name].price}`;document.getElementById('checkIn').value='';document.getElementById('checkOut').value='';document.getElementById('guests').value='1';document.getElementById('bookingTotal').textContent='₹0';document.getElementById('bookingModal').classList.add('show')}
function closeBooking(){document.getElementById('bookingModal').classList.remove('show')}
function calculateTotal(){
 if(!activeHostel)return;
 const a=document.getElementById('checkIn').value,b=document.getElementById('checkOut').value,g=Number(document.getElementById('guests').value);
 if(!a||!b){document.getElementById('bookingTotal').textContent='₹0';return}
 const nights=Math.ceil((new Date(b)-new Date(a))/86400000);
 if(nights<=0){document.getElementById('bookingTotal').textContent='Choose valid dates';return}
 const total=nights*hostelData[activeHostel].price*g;document.getElementById('bookingTotal').textContent=`₹${total.toLocaleString('en-IN')} (${nights} night${nights>1?'s':''})`;
}
document.getElementById('checkIn').addEventListener('change',calculateTotal);document.getElementById('checkOut').addEventListener('change',calculateTotal);document.getElementById('guests').addEventListener('change',calculateTotal);
function confirmBooking(){
 const a=document.getElementById('checkIn').value,b=document.getElementById('checkOut').value;
 if(!a||!b||new Date(b)<=new Date(a)){alert('Please select valid check-in and check-out dates.');return}
 const g=document.getElementById('guests').value;
 alert(`Booking request received!\n\n${activeHostel}\n${a} → ${b}\nGuests: ${g}\n\nThis is a demo booking — no payment has been taken.`);closeBooking();
}
function openLogin(){document.getElementById('loginModal').classList.add('show')}
function closeLogin(){document.getElementById('loginModal').classList.remove('show')}
function handleLogin(e){e.preventDefault();alert('Demo login successful!');closeLogin();e.target.reset()}
window.addEventListener('click',e=>{if(e.target.id==='detailsModal')closeDetails();if(e.target.id==='bookingModal')closeBooking();if(e.target.id==='loginModal')closeLogin()});
window.addEventListener('keydown',e=>{if(e.key==='Escape'){closeDetails();closeBooking();closeLogin()}});
applyFilters();
