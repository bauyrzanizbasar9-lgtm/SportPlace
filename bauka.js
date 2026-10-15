const loginModal = document.getElementById("loginModal");
const bookingModal = document.getElementById("bookingModal");

const loginBtn = document.getElementById("loginBtn");
const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");
const logoutBtn = document.getElementById("logoutBtn");

const searchInput = document.getElementById("searchInput");
const sportFilter = document.getElementById("sportFilter");
const placesGrid = document.getElementById("placesGrid");
const noResults = document.getElementById("noResults");

const bookingForm = document.getElementById("bookingForm");
const bookingMessage = document.getElementById("bookingMessage");

let currentUser = null;
let selectedPlaceName = "";

// Кіру терезесін ашу
loginBtn.addEventListener("click", () => {
    loginMessage.textContent = "";
    loginModal.classList.add("show");
});

// Терезелерді жабу
document.querySelectorAll("[data-close]").forEach(button => {
    button.addEventListener("click", () => {
        document.getElementById(button.dataset.close).classList.remove("show");
    });
});

// Терезенің сыртқы бөлігін басқанда жабылады
document.querySelectorAll(".modal").forEach(modal => {
    modal.addEventListener("click", event => {
        if (event.target === modal) {
            modal.classList.remove("show");
        }
    });
});

// Esc батырмасымен жабу
document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        document.querySelectorAll(".modal").forEach(modal => {
            modal.classList.remove("show");
        });
    }
});

// Кіру демонстрациясы
loginForm.addEventListener("submit", event => {
    event.preventDefault();

    const name = document.getElementById("userName").value.trim();
    const email = document.getElementById("userEmail").value.trim();
    const password = document.getElementById("userPassword").value;

    if (!name || !email || password.length < 4) {
        loginMessage.textContent = "Мәліметтерді дұрыс толтыр!";
        return;
    }

    currentUser = { name, email };

    loginMessage.textContent = `Қош келдің, ${name}!`;
    loginBtn.textContent = name;
    logoutBtn.hidden = false;

    loginForm.hidden = true;
});

// Жүйеден шығу
logoutBtn.addEventListener("click", () => {
    currentUser = null;

    loginBtn.textContent = "Кіру";
    loginForm.hidden = false;
    logoutBtn.hidden = true;

    loginForm.reset();
    loginMessage.textContent = "Жүйеден шықтың.";

    setTimeout(() => {
        loginMessage.textContent = "";
        loginModal.classList.remove("show");
    }, 700);
});

// Спорт карточкасын басқанда сүзгі таңдалады
document.querySelectorAll(".sport-card").forEach(card => {
    card.addEventListener("click", () => {
        sportFilter.value = card.dataset.sport;
        searchInput.value = "";
        filterPlaces();

        document.getElementById("places").scrollIntoView({
            behavior: "smooth"
        });
    });
});

// Алаңдарды іздеу және сүзу
function filterPlaces() {
    const query = searchInput.value.trim().toLowerCase();
    const selectedSport = sportFilter.value;

    const cards = placesGrid.querySelectorAll(".place-card");
    let visibleCount = 0;

    cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        const sport = card.dataset.sport;

        const matchesText = text.includes(query);
        const matchesSport =
            selectedSport === "Барлығы" || sport === selectedSport;

        const show = matchesText && matchesSport;

        card.hidden = !show;

        if (show) visibleCount++;
    });

    noResults.hidden = visibleCount !== 0;
}

document.getElementById("searchBtn").addEventListener("click", filterPlaces);

searchInput.addEventListener("input", filterPlaces);
sportFilter.addEventListener("change", filterPlaces);

searchInput.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        filterPlaces();
    }
});

// Брондау терезесін ашу
document.querySelectorAll(".book-btn").forEach(button => {
    button.addEventListener("click", () => {
        selectedPlaceName = button.dataset.place;

        document.getElementById("selectedPlace").textContent =
            `Таңдалған алаң: ${selectedPlaceName}`;

        bookingForm.reset();
        bookingMessage.textContent = "";

        const dateInput = document.getElementById("bookingDate");

        // Өткен күнді таңдауға болмайды
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");

        dateInput.min = `${year}-${month}-${day}`;

        bookingModal.classList.add("show");
    });
});

// Брондауды растау демонстрациясы
bookingForm.addEventListener("submit", event => {
    event.preventDefault();

    const date = document.getElementById("bookingDate").value;
    const time = document.getElementById("bookingTime").value;

    if (!date || !time) {
        bookingMessage.textContent = "Күн мен уақытты таңда!";
        return;
    }

    if (date < document.getElementById("bookingDate").min) {
        bookingMessage.textContent = "Өткен күнді таңдауға болмайды.";
        return;
    }

    bookingMessage.textContent =
        `✅ ${selectedPlaceName}: ${date}, ${time}. ` +
        "Демонстрациялық брондау қабылданды.";

    bookingForm.querySelector("button[type='submit']").textContent =
        "Қабылданды ✓";
});

// Басты беттегі батырма
document.getElementById("ctaBtn").addEventListener("click", () => {
    if (currentUser) {
        document.getElementById("places").scrollIntoView({
            behavior: "smooth"
        });
    } else {
        loginModal.classList.add("show");
        loginMessage.textContent = "Жалғастыру үшін жүйеге кір.";
    }
});