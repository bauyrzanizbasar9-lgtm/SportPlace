function showSection(sectionId) {
    let sections = document.querySelectorAll(".section");

    sections.forEach(function(section) {
        section.classList.remove("active");
    });

    document.getElementById(sectionId).classList.add("active");
}

function selectSport(sport) {
    document.getElementById("selectedSport").innerText =
        "Таңдалған спорт: " + sport;

    showSection("booking");
}

function bookPlace(place) {
    alert(place + " алаңы таңдалды!");

    showSection("booking");
}

function confirmBooking() {
    let name = document.getElementById("name").value;
    let date = document.getElementById("date").value;
    let sport = document.getElementById("selectedSport").innerText;

    if (name === "" || date === "") {
        alert("Барлық мәліметті толтырыңыз!");
        return;
    }

    document.getElementById("result").innerText =
        "✅ Брондау сәтті орындалды! " +
        name + ", " + sport + ". Күні: " + date;
}

function login() {
    let name = prompt("Атыңызды енгізіңіз:");

    if (name !== null && name !== "") {
        alert("Қош келдіңіз, " + name + "!");
    }
}