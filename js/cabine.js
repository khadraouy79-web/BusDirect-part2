import { getSelectedTrip, saveTrip } from "./store.js";
import { findReservation, initReservations } from "./reservations.js";
import {
    updateSeats,
    updateModifyList,
    updateDeleteList,
    updateAvailabelSeat,
    updateOccupiedSeats,
    updateTotalPrice,
    updateWaitingList
} from "./render.js";

const selectedTrip = getSelectedTrip();

let reservations = [];
let waitingList = [];
let ticketPrice = 80;
let totalSeats = 20;

if (selectedTrip) {
    if (Array.isArray(selectedTrip.reservations)) {
        reservations = selectedTrip.reservations;
    }
    if (Array.isArray(selectedTrip.waitingList)) {
        waitingList = selectedTrip.waitingList;
    }
    ticketPrice = Number(selectedTrip.price);
    totalSeats = Number(selectedTrip.capacity);
}

const seats = document.querySelectorAll(".seat");

const reserveForm = document.querySelector("#reserveForm");
const reserveName = document.querySelector("#reserveName");
const reserveSeat = document.querySelector("#reserveSeat");
const reservePhone = document.querySelector("#reservePhone");

const modifyForm = document.querySelector("#modifyForm");
const modifyPassenger = document.querySelector("#modifyPassenger");
const modifyName = document.querySelector("#modifyName");
const modifySeat = document.querySelector("#modifySeat");
const modifyPhone = document.querySelector("#modifyPhone");

const deleteForm = document.querySelector("#deleteForm");
const deletePassenger = document.querySelector("#deletePassenger");

for (let i = 0; i < seats.length; i++) {
    seats[i].dataset.seat = seats[i].textContent.trim();
}

const availableCount = document.querySelector("#availableCount");
const occupiedCount = document.querySelector("#occupiedCount");
const revenue = document.querySelector("#revenue");

const state = {
    reservations: reservations,
    waitingList: waitingList,
    seats: seats
};

function updateDisplay() {

    updateSeats(state.seats, state.reservations, reserveSeat, findReservation);
    updateModifyList(state.reservations, modifyPassenger);
    updateDeleteList(state.reservations, deletePassenger);

    updateAvailabelSeat(state.reservations, totalSeats, availableCount);
    updateOccupiedSeats(state.reservations, occupiedCount);
    updateTotalPrice(state.reservations, ticketPrice, revenue);

    updateWaitingList(state.waitingList, document.querySelector("#waitingListDisplay"));
    saveTrip(selectedTrip, state.reservations, state.waitingList);
}

initReservations(state, {
    seats,
    reserveForm,
    reserveName,
    reservePhone,
    reserveSeat,
    modifyForm,
    modifyPassenger,
    modifyName,
    modifyPhone,
    modifySeat,
    deleteForm,
    deletePassenger,
    reserveMessage: document.querySelector("#reserveMessage"),
    modifyMessage: document.querySelector("#modifyMessage"),
    deleteMessage: document.querySelector("#deleteMessage")
}, updateDisplay);

updateDisplay();

if (selectedTrip) {
    document.querySelector("#tripTitle").textContent = selectedTrip.departure + " → " + selectedTrip.destination;
    document.querySelector("#tripTimes").textContent = "Départ : " + selectedTrip.departureTime + " | Arrivée : " + selectedTrip.arrivalTime + " | Prix : " + selectedTrip.price + " DH";
}
