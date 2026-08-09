const hostelData={
"Goa Beach Backpackers":{location:"Anjuna, North Goa",type:"Mixed Dorm",price:"₹599/night",rating:"4.7/5",amenities:"Pool, café, work space, social nights, beach access"},
"Old Manali Backpackers":{location:"Old Manali, Himachal Pradesh",type:"Mixed Dorm",price:"₹699/night",rating:"4.8/5",amenities:"Mountain views, café, bonfire, common room, trip meetups"},
"Kasol Riverside Hostel":{location:"Kasol, Himachal Pradesh",type:"Mixed Dorm",price:"₹499/night",rating:"4.6/5",amenities:"Riverside common area, café, mountain views, trek access"},
"Ganga Valley Hostel":{location:"Tapovan, Rishikesh",type:"Mixed Dorm",price:"₹549/night",rating:"4.8/5",amenities:"Rooftop café, yoga, river access, rafting connections"},
"Pink City Social Hostel":{location:"Jaipur, Rajasthan",type:"Mixed Dorm",price:"₹599/night",rating:"4.6/5",amenities:"Rooftop, café, walking tours, social common room"},
"Lake City Girls Hostel":{location:"Udaipur, Rajasthan",type:"Female Dorm",price:"₹699/night",rating:"4.7/5",amenities:"Female dorms, rooftop views, café, old-city access"},
"Golden Fort Backpackers":{location:"Jaisalmer, Rajasthan",type:"Mixed Dorm",price:"₹799/night",rating:"4.5/5",amenities:"Fort views, rooftop dinners, desert safari connections"},
"Ghat Side Backpackers":{location:"Varanasi, Uttar Pradesh",type:"Mixed Dorm",price:"₹449/night",rating:"4.4/5",amenities:"Common room, café, walking tours, ghat access"},
"Dharamkot Mountain Hostel":{location:"Dharamkot, Himachal Pradesh",type:"Mixed Dorm",price:"₹499/night",rating:"4.7/5",amenities:"Mountain café, yoga, work space, trek meetups"},
"Dhauladhar Girls Hostel":{location:"McLeod Ganj, Himachal Pradesh",type:"Female Dorm",price:"₹549/night",rating:"4.6/5",amenities:"Female dorms, mountain views, café, trek access"},
"Bir Billing Nomads":{location:"Bir, Himachal Pradesh",type:"Mixed Dorm",price:"₹599/night",rating:"4.8/5",amenities:"Café, chill zone, paragliding connections, community events"},
"Hampi Backpackers Hub":{location:"Hampi, Karnataka",type:"Mixed Dorm",price:"₹449/night",rating:"4.5/5",amenities:"Courtyard, cycle rentals, local walks, traveller hangout"},
"Gokarna Beach Hostel":{location:"Gokarna, Karnataka",type:"Mixed Dorm",price:"₹499/night",rating:"4.6/5",amenities:"Beach vibe, hammocks, café, coastal trails"},
"White Town Travellers Stay":{location:"White Town, Pondicherry",type:"Private Room",price:"₹1,199/night",rating:"4.5/5",amenities:"Private rooms, bicycles, café, promenade access"},
"Delhi Traveller's Den":{location:"Paharganj, New Delhi",type:"Mixed Dorm",price:"₹399/night",rating:"4.3/5",amenities:"Budget dorms, café, station access, city tours"},
"Colaba Girls Backpackers":{location:"Colaba, Mumbai",type:"Female Dorm",price:"₹999/night",rating:"4.5/5",amenities:"Female dorms, social lounge, cafés, heritage sights"},
"Leh Mountain Nomads":{location:"Leh, Ladakh",type:"Male Dorm",price:"₹899/night",rating:"4.7/5",amenities:"Bike-trip support, common room, rooftop, travel desk"}
};

function applyFilters(){const q=document.getElementById('locationInput').value.toLowerCase().trim();const type=document.getElementById('genderFilter').value;const max=document.getElementById('priceFilter').value;let found=0;document.querySelectorAll('.hostel-card').forEach(card=>{const loc=card.dataset.location.toLowerCase();const cardType=card.dataset.gender;const price=Number(card.dataset.price);const ok=(!q||loc.includes(q))&&(type==='all'||cardType===type)&&(max==='all'||price<=Number(max));card.style.display=ok?'block':'none';if(ok)found++});document.getElementById('noResults').style.display=found?'none':'block';document.getElementById('resultCount').textContent=`${found} hostel${found===1?'':'s'} found`}
function searchHostels(){applyFilters();document.getElementById('hostels').scrollIntoView({behavior:'smooth'})}
function setCity(city){document.getElementById('locationInput').value=city==='all'?'':city;searchHostels()}
function filterByPrice(){applyFilters()}
function viewDetails(name){const h=hostelData[name];if(!h)return;document.getElementById('modalTitle').textContent=name;document.getElementById('modalBody').innerHTML=`<div class="detail-row"><strong>📍 Location</strong><span>${h.location}</span></div><div class="detail-row"><strong>🛏️ Stay type</strong><span>${h.type}</span></div><div class="detail-row"><strong>💰 Price</strong><span>${h.price}</span></div><div class="detail-row"><strong>⭐ Rating</strong><span>${h.rating}</span></div><div class="detail-row"><strong>✨ Amenities</strong><span>${h.amenities}</span></div>`;document.getElementById('detailsModal').classList.add('show')}
function closeDetails(){document.getElementById('detailsModal').classList.remove('show')}
function openLogin(){document.getElementById('loginModal').classList.add('show')}
function closeLogin(){document.getElementById('loginModal').classList.remove('show')}
function handleLogin(e){e.preventDefault();alert('Demo login successful!');closeLogin();e.target.reset()}
window.addEventListener('click',e=>{if(e.target===document.getElementById('detailsModal'))closeDetails();if(e.target===document.getElementById('loginModal'))closeLogin()});window.addEventListener('keydown',e=>{if(e.key==='Escape'){closeDetails();closeLogin()}});
