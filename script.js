const hostelData = {
    "Sunrise Boys Hostel": { location: "Bhopal, MP", gender: "Boys", price: "₹4,500/month", rating: "4.5/5", amenities: "Wi-Fi, Food, Laundry, 24×7 Security", phone: "+91 98765 43210" },
    "Green Valley Girls Hostel": { location: "Bhopal, MP", gender: "Girls", price: "₹5,500/month", rating: "4.6/5", amenities: "Furnished Rooms, Mess, Wi-Fi, Security", phone: "+91 98765 43211" },
    "City View Hostel": { location: "Indore, MP", gender: "Co-ed", price: "₹7,000/month", rating: "4.4/5", amenities: "Wi-Fi, Parking, Study Area, Transport", phone: "+91 98765 43212" },
    "Metro Stay Hostel": { location: "New Delhi", gender: "Boys", price: "₹8,500/month", rating: "4.3/5", amenities: "Metro Access, Wi-Fi, Food, Security", phone: "+91 98765 43213" }
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
    document.getElementById("hostels").scrollIntoView({ behavior: "smooth" });
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
