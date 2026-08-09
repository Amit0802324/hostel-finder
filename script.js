function searchHostels() {

    const location =
        document.getElementById("locationInput")
        .value
        .toLowerCase()
        .trim();

    const gender =
        document.getElementById("genderFilter").value;

    const cards =
        document.querySelectorAll(".hostel-card");

    let found = 0;

    cards.forEach(card => {

        const cardLocation =
            card.dataset.location;

        const cardGender =
            card.dataset.gender;

        const locationMatch =
            location === "" ||
            cardLocation.includes(location);

        const genderMatch =
            gender === "all" ||
            cardGender === gender;

        if (locationMatch && genderMatch) {
            card.style.display = "block";
            found++;
        } else {
            card.style.display = "none";
        }
    });

    document.getElementById("noResults").style.display =
        found === 0 ? "block" : "none";
}


function filterByPrice() {

    const maxPrice =
        document.getElementById("priceFilter").value;

    const cards =
        document.querySelectorAll(".hostel-card");

    let found = 0;

    cards.forEach(card => {

        const price =
            Number(card.dataset.price);

        if (
            maxPrice === "all" ||
            price <= Number(maxPrice)
        ) {
            card.style.display = "block";
            found++;
        } else {
            card.style.display = "none";
        }
    });

    document.getElementById("noResults").style.display =
        found === 0 ? "block" : "none";
}


function viewDetails(hostelName) {

    alert(
        "Hostel: " +
        hostelName +
        "\n\nHostel details page will be added soon!"
    );
}
