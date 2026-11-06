import { jsonData, loadTrips, saveSelectedTrip } from "./store.js";
import { displayTrajets } from "./render.js";

let link = document.getElementsByClassName("link");
let prev = document.querySelector(".btn1");
let next = document.querySelector(".btn2");
let itemsPerPage = 6;
let currentValue = 1;
let filteredTrips = [];

function showPages(page) {
    let totalPages = Math.ceil(filteredTrips.length / itemsPerPage);
    if (totalPages === 0) totalPages = 1;
    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;
    currentValue = page;

    let start = (currentValue - 1) * itemsPerPage;
    let ending = start + itemsPerPage;
    const result = filteredTrips.slice(start, ending);
    displayTrajets(result);

    const pages = document.querySelector(".pagination ul");
    pages.innerHTML = "";
    for (let i = 1; i <= totalPages; i++) {
        const li = document.createElement("li");
        li.classList.add("link");
        if (i === currentValue) li.classList.add("active");
        li.textContent = i;
        li.addEventListener("click", function() { showPages(i); });
        pages.appendChild(li);
    }
    prev.disabled = currentValue === 1;
    next.disabled = currentValue === totalPages;
}

prev.addEventListener("click", () => {
    if (currentValue > 1) showPages(currentValue - 1);
});
next.addEventListener("click", () => {
    let totalPages = Math.ceil(filteredTrips.length / itemsPerPage);
    if (currentValue < totalPages) showPages(currentValue + 1);
});

window.goToCabine = function(tripId) {
    const selectedTrip = jsonData.find(function(trajet) {
        return trajet.id === tripId;
    });
    saveSelectedTrip(selectedTrip);
    window.location.href = "cabine.html";
};

const searshBus = document.getElementById("searshBus");
const selectTrajet = document.getElementById("selectTrajet");
searshBus.addEventListener("input", searchTrajets);
selectTrajet.addEventListener("change", searchTrajets);

function searchTrajets() {
    const searchValue = searshBus.value.toLowerCase();
    const status = selectTrajet.value;
    filteredTrips = jsonData.filter((trajet) => {
        const matchSearch =
            trajet.departure.toLowerCase().includes(searchValue) ||
            trajet.destination.toLowerCase().includes(searchValue);
        const isFull = trajet.reservations.length >= trajet.capacity;
        let matchStatus = true;
        if (status === "available") matchStatus = !isFull;
        if (status === "full") matchStatus = isFull;
        return matchSearch && matchStatus;
    });
    showPages(1);
}

const totalePassengers = document.getElementById("totalePassengers");
const totaleRecettes = document.getElementById("totaleRecettes");
const totaleTrajets = document.getElementById("totaleTrajets");

function updateStatistics() {
    let passengers = 0;
    let revenue = 0;
    let completedTrips = 0;
    for (let i = 0; i < jsonData.length; i++) {
        passengers += jsonData[i].reservations.length;
        for (let j = 0; j < jsonData[i].reservations.length; j++) {
            if (Number(jsonData[i].reservations[j].seat) <= 4) {
                revenue += Math.round(jsonData[i].price * 1.1);
            } else {
                revenue += Number(jsonData[i].price);
            }
        }
        if (jsonData[i].reservations.length >= jsonData[i].capacity) completedTrips++;
    }
    totalePassengers.textContent = passengers;
    totaleRecettes.textContent = revenue + " DH";
    totaleTrajets.textContent = completedTrips;
}

window.addEventListener("load", () => {
    loadTrips()
        .then(() => {
            filteredTrips = jsonData;
            showPages(1);
            updateStatistics();
        })
        .catch((err) => console.log(err));
});
