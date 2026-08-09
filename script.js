const hostelData = {
    "MetroNest Residency": { location:"New Delhi, Delhi", gender:"Boys", price:"₹8,500/month", rating:"4.6/5", amenities:"Wi-Fi, Meals, Laundry, 24×7 Security, Metro access", phone:"+91 98765 43210" },
    "Harbour View Stay": { location:"Andheri, Mumbai", gender:"Co-ed", price:"₹11,000/month", rating:"4.5/5", amenities:"Wi-Fi, Furnished rooms, Metro access, Housekeeping", phone:"+91 98765 43211" },
    "Tech Park Homes": { location:"Koramangala, Bengaluru", gender:"Boys", price:"₹7,500/month", rating:"4.7/5", amenities:"Wi-Fi, Meals, Study area, Laundry", phone:"+91 98765 43212" },
    "Lavender Girls House": { location:"Viman Nagar, Pune", gender:"Girls", price:"₹6,500/month", rating:"4.8/5", amenities:"Mess, CCTV, Furnished rooms, Study area", phone:"+91 98765 43213" },
    "Hitech City Living": { location:"Madhapur, Hyderabad", gender:"Co-ed", price:"₹7,000/month", rating:"4.4/5", amenities:"Wi-Fi, Housekeeping, Furnished rooms, Security", phone:"+91 98765 43214" },
    "City Centre Boys Hostel": { location:"Vijay Nagar, Indore", gender:"Boys", price:"₹6,000/month", rating:"4.5/5", amenities:"Food, Parking, Laundry, Power backup", phone:"+91 98765 43215" },
    "Green Valley Girls Hostel": { location:"MP Nagar, Bhopal", gender:"Girls", price:"₹5,500/month", rating:"4.6/5", amenities:"Furnished rooms, Mess, Wi-Fi, Security", phone:"+91 98765 43216" },
    "Pink City Co-Living": { location:"Malviya Nagar, Jaipur", gender:"Co-ed", price:"₹5,500/month", rating:"4.5/5", amenities:"Wi-Fi, Food, Housekeeping, Study area", phone:"+91 98765 43217" },
    "City Beautiful Hostel": { location:"Sector 34, Chandigarh", gender:"Boys", price:"₹6,500/month", rating:"4.3/5", amenities:"Meals, Gym access, Transport, Wi-Fi", phone:"+91 98765 43218" },
    "Lakeview Girls Residence": { location:"Salt Lake, Kolkata", gender:"Girls", price:"₹5,000/month", rating:"4.4/5", amenities:"Meals, CCTV, Housekeeping, Wi-Fi", phone:"+91 98765 43219" },
    "Riverfront Co-Living": { location:"Navrangpura, Ahmedabad", gender:"Co-ed", price:"₹6,000/month", rating:"4.5/5", amenities:"Wi-Fi, Housekeeping, Furnished rooms, Security", phone:"+91 98765 43220" },
    "Bloom Women Living": { location:"Sector 62, Noida", gender:"Girls", price:"₹8,000/month", rating:"4.7/5", amenities:"Meals, Metro access, Furnished rooms, Security", phone:"+91 98765 43221" }
};

function applyFilters() {
    const location = document.getElementById("locationInput").value.toLowerCase().trim();
    const gender = document.getElementById("genderFilter").value;
    const maxPrice = document.getElementById("priceFilter").value;
    const cards = document.querySelectorAll(".hostel-card");
    let found = 0;

    cards.forEach(card => {
        const cardLocation = card.dataset.location.toLowerCase();
        const cardGender = card.dataset.gender;
        const price = Number(card.dataset.price);
        const visible = (!location || cardLocation.includes(location)) &&
            (gender === "all" || cardGender === gender) &&
            (maxPrice === "all" || price <= Number(maxPrice));
        card.style.display = visible ? "block" : "none";
        if (visible) found++;
    });

    document.getElementById("noResults").style.display = found === 0 ? "block" : "none";
    const count = document.getElementById("resultCount");
    if (count) count.textContent = `${found} hostel${found === 1 ? "" : "s"} found`;
}

function searchHostels() {
    applyFilters();
    document.getElementById("hostels").scrollIntoView({ behavior:"smooth" });
}

function setCity(city) {
    document.getElementById("locationInput").value = city === "all" ? "" : city;
    searchHostels();
}

function filterByPrice() { applyFilters(); }

function viewDetails(hostelName) {
    const hostel = hostelData[hostelName];
    if (!hostel) return;
    document.getElementById("modalTitle").textContent = hostelName;
    document.getElementById("modalBody").innerHTML = `
        <div class="detail-row"><strong>📍 Location</strong><span>${hostel.location}</span></div>
        <div class="detail-row"><strong>👤 Type</strong><span>${hostel.gender}</span></div>
        <div class="detail-row"><strong>💰 Rent</strong><span>${hostel.price}</span></div>
        <div class="detail-row"><strong>⭐ Rating</strong><span>${hostel.rating}</span></div>
        <div class="detail-row"><strong>✨ Amenities</strong><span>${hostel.amenities}</span></div>
        <div class="detail-row"><strong>📞 Contact</strong><span>${hostel.phone}</span></div>`;
    document.getElementById("detailsModal").classList.add("show");
}

function closeDetails() { document.getElementById("detailsModal").classList.remove("show"); }
function openLogin() { document.getElementById("loginModal").classList.add("show"); }
function closeLogin() { document.getElementById("loginModal").classList.remove("show"); }

function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();
    if (!email || !password) return;
    alert(`Welcome to Hostel Finder!\nLogged in as ${email}`);
    closeLogin();
    event.target.reset();
}

window.addEventListener("click", event => {
    if (event.target === document.getElementById("detailsModal")) closeDetails();
    if (event.target === document.getElementById("loginModal")) closeLogin();
});

window.addEventListener("keydown", event => {
    if (event.key === "Escape") { closeDetails(); closeLogin(); }
});
