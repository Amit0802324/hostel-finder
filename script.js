const SUPABASE_URL = 'https://bqioqdpoyusdnxgdvqup.supabase.co';
const SUPABASE_KEY = 'sb_publishable_MmFgDGBXNyitTBYLKIFe5g_-xj4vX8n';
const db = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

let hostels = [];

function normalizeHostel(row) {
    return {
        id: row.id,
        name: row.name,
        city: row.destination,
        type: row.hostel_type,
        price: Number(row.price_per_night),
        rating: Number(row.rating || 4.5),
        image: row.image_url,
        description: row.description,
        amenities: row.amenities || []
    };
}

async function loadHostels() {
    const list = document.getElementById('hostelList');
    list.innerHTML = '<div class="loading-state">🔄 Finding hostels across India...</div>';

    const { data, error } = await db
        .from('hostels')
        .select('*')
        .order('rating', { ascending: false });

    if (error) {
        console.error('Supabase error:', error);
        list.innerHTML = '<div class="loading-state">⚠️ Could not load hostels. Please refresh.</div>';
        return;
    }

    hostels = (data || []).map(normalizeHostel);
    renderHostels(hostels);
}

function renderHostels(list = hostels) {
    const hostelList = document.getElementById('hostelList');
    const noResults = document.getElementById('noResults');
    hostelList.innerHTML = '';

    if (!list.length) {
        noResults.style.display = 'block';
        return;
    }

    noResults.style.display = 'none';

    list.forEach(hostel => {
        const card = document.createElement('div');
        card.className = 'hostel-card';
        card.innerHTML = `
            <div class="hostel-image" style="background-image:url('${hostel.image}')">
                <div class="rating">⭐ ${hostel.rating.toFixed(1)}</div>
            </div>
            <div class="card-content">
                <span class="tag">${getTypeName(hostel.type)}</span>
                <h3>${escapeHtml(hostel.name)}</h3>
                <p class="location">📍 ${escapeHtml(hostel.city)}, India</p>
                <p class="description">${escapeHtml(hostel.description || 'Backpacker-friendly stay with social spaces.')}</p>
                <div class="amenities">
                    ${hostel.amenities.map(a => `<span class="amenity">${escapeHtml(a)}</span>`).join('')}
                </div>
                <div class="card-bottom">
                    <div class="price">₹${hostel.price}<small> / night</small></div>
                    <button class="view-btn" onclick="viewDetailsById(${hostel.id})">View</button>
                </div>
            </div>`;
        hostelList.appendChild(card);
    });
}

function getTypeName(type) {
    if (type === 'male') return 'Male Dorm';
    if (type === 'female') return 'Female Dorm';
    return 'Mixed Dorm';
}

function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
}

function getFilteredHostels() {
    const q = document.getElementById('locationInput').value.trim().toLowerCase();
    const type = document.getElementById('genderFilter').value;
    const price = document.getElementById('priceFilter').value;
    const max = price === 'all' ? Infinity : Number(price);

    return hostels.filter(h =>
        (!q || h.city.toLowerCase().includes(q) || h.name.toLowerCase().includes(q)) &&
        (type === 'all' || h.type === type) &&
        h.price <= max
    );
}

function searchHostels() {
    renderHostels(getFilteredHostels());
    document.getElementById('hostels').scrollIntoView({ behavior: 'smooth' });
}

function filterByPrice() {
    renderHostels(getFilteredHostels());
}

function quickSearch(city) {
    document.getElementById('locationInput').value = city;
    searchHostels();
}

function viewDetailsById(id) {
    const hostel = hostels.find(h => Number(h.id) === Number(id));
    if (hostel) viewDetails(hostel.name);
}

function viewDetails(name) {
    const h = hostels.find(x => x.name === name);
    if (!h) return;

    document.getElementById('detailModal')?.remove();
    const modal = document.createElement('div');
    modal.id = 'detailModal';
    modal.className = 'modal-backdrop';
    modal.innerHTML = `
        <div class="detail-modal">
            <button class="modal-close">×</button>
            <img src="${h.image}" alt="${escapeHtml(h.name)}">
            <div class="modal-body">
                <span class="tag">${getTypeName(h.type)}</span>
                <h2>${escapeHtml(h.name)}</h2>
                <p class="location">📍 ${escapeHtml(h.city)}, India</p>
                <div class="modal-rating">⭐ ${h.rating.toFixed(1)} · Highly rated</div>
                <p>${escapeHtml(h.description)}</p>
                <div class="modal-amenities">${h.amenities.map(a => `<span>${escapeHtml(a)}</span>`).join('')}</div>
                <div class="modal-bottom">
                    <strong>₹${h.price}<small> / night</small></strong>
                    <button class="book-btn" onclick="showBooking('${String(h.name).replace(/'/g, "\\'")}')">Check Availability</button>
                </div>
            </div>
        </div>`;
    document.body.appendChild(modal);
    modal.querySelector('.modal-close').onclick = () => modal.remove();
    modal.onclick = e => { if (e.target === modal) modal.remove(); };
}

function showBooking(name) {
    alert(`🏨 ${name}\n\nAvailability and booking flow is connected to the Hostel Finder database.\n\nBooking form/payment gateway can be added next.`);
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('locationInput').addEventListener('keydown', e => {
        if (e.key === 'Enter') searchHostels();
    });
    document.getElementById('genderFilter').addEventListener('change', searchHostels);
    loadHostels();
});