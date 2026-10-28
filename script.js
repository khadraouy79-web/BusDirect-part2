
let reservations = [];

const seats = document.querySelectorAll(".seat");

// Reservation
const reserveForm = document.querySelector("#reserveForm");
const reserveName = document.querySelector("#reserveName");
const reserveSeat = document.querySelector("#reserveSeat");

// Modification
const modifyForm = document.querySelector("#modifyForm");
const modifyPassenger = document.querySelector("#modifyPassenger");
const modifyName = document.querySelector("#modifyName");
const modifySeat = document.querySelector("#modifySeat");

// Suppression
const deleteForm = document.querySelector("#deleteForm");
const deletePassenger = document.querySelector("#deletePassenger");



for (let i = 0; i < seats.length; i++) {
  seats[i].dataset.seat = seats[i].textContent.trim();
}


function findReservation(seatNumber) {
  return reservations.find(function(item) {
    return item.seat === Number(seatNumber);
  });
}


function updateSeats() {
  for (let i = 0; i < seats.length; i++) {
    const seatNumber = Number(seats[i].dataset.seat);
    const reservation = findReservation(seatNumber);

    if (reservation) {
      seats[i].textContent = reservation.name;
      seats[i].style.backgroundColor = "red";
      seats[i].style.color = "white";
      seats[i].disabled = true;
    } else {
      seats[i].textContent = seatNumber;
      seats[i].style.backgroundColor = "#11ab4ada";
      seats[i].style.color = "white";
      seats[i].disabled = false;
    }
  }


  for (let i = 0; i < reserveSeat.options.length; i++) {
    const option = reserveSeat.options[i];

    if (option.value === "") {
      continue;
    }

    const reservation = findReservation(option.value);
    option.disabled = Boolean(reservation);
  }
}


function updateModifyList() {
  const oldSelection = modifyPassenger.value;

  modifyPassenger.innerHTML =
    '<option value="">Choisir un passager</option>';

  for (let i = 0; i < reservations.length; i++) {
    const option = document.createElement("option");

    option.value = reservations[i].seat;
    option.textContent =
      reservations[i].name + " - Siège " + reservations[i].seat;

    modifyPassenger.appendChild(option);
  }


  modifyPassenger.value = oldSelection;
}


function updateDeleteList() {
  const oldSelection = deletePassenger.value;

  deletePassenger.innerHTML =
    '<option value="">Choisir un passager</option>';

  for (let i = 0; i < reservations.length; i++) {
    const option = document.createElement("option");

    option.value = reservations[i].seat;
    option.textContent =
      reservations[i].name + " - Siège " + reservations[i].seat;

    deletePassenger.appendChild(option);
  }

  deletePassenger.value = oldSelection;
}


function updateDisplay() {
  updateSeats();
  updateModifyList();
  updateDeleteList();
}


reserveForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const passengerName = reserveName.value.trim();
  let selectedSeat = reserveSeat.value;

  if (passengerName === "") {
    alert("Veuillez saisir le nom du passager.");
    return;
  }

  const existingPassenger = reservations.find(function(item) {
    return item.name.toLowerCase() === passengerName.toLowerCase();
  });

  if (existingPassenger) {
    alert("Ce passager possède déjà une réservation !");
    return;
  }


  if (selectedSeat === "") {
    for (let i = 0; i < seats.length; i++) {
      const seatNumber = Number(seats[i].dataset.seat);

      if (!findReservation(seatNumber)) {
        selectedSeat = seatNumber;
        break;
      }
    }
  }

  if (selectedSeat === "") {
    alert("Tous les sièges sont occupés !");
    return;
  }

  const seatNumber = Number(selectedSeat);

  if (findReservation(seatNumber)) {
    alert("Ce siège est déjà réservé !");
    return;
  }

  reservations.push({
    name: passengerName,
    seat: seatNumber
  });

  console.log(reservations);

  reserveForm.reset();
  updateDisplay();

  alert("Réservation effectuée avec succès !");
});



modifyPassenger.addEventListener("change", function() {
  const reservation = findReservation(modifyPassenger.value);

  if (reservation) {
    modifyName.value = reservation.name;
  } else {
    modifyName.value = "";
  }


  const oldSeat = Number(modifyPassenger.value);

  modifySeat.innerHTML =
    '<option value="">Garder le siège actuel</option>';

  for (let i = 0; i < seats.length; i++) {
    const seatNumber = Number(seats[i].dataset.seat);
    const seatReservation = findReservation(seatNumber);

    if (!seatReservation || seatNumber === oldSeat) {
      const option = document.createElement("option");

      option.value = seatNumber;
      option.textContent = "Siège " + seatNumber;

      modifySeat.appendChild(option);
    }
  }
});



modifyForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const oldSeat = Number(modifyPassenger.value);
  const newName = modifyName.value.trim();
  const newSeat = modifySeat.value;

  const reservation = findReservation(oldSeat);

  if (!reservation) {
    alert("Veuillez choisir un passager.");
    return;
  }

  if (newName === "") {
    alert("Veuillez saisir le nouveau nom.");
    return;
  }

  const existingPassenger = reservations.find(function(item) {
    return item.name.toLowerCase() === newName.toLowerCase()
      && item.seat !== oldSeat;
  });

  if (existingPassenger) {
    alert("Ce nom est déjà utilisé.");
    return;
  }

  if (newSeat !== "" && Number(newSeat) !== oldSeat) {
    if (findReservation(newSeat)) {
      alert("Ce siège est déjà réservé !");
      return;
    }

    reservation.seat = Number(newSeat);
  }

  reservation.name = newName;

  console.log(reservations);

  modifyForm.reset();
  updateDisplay();

  alert("Modification effectuée avec succès !");
});



deleteForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const selectedSeat = Number(deletePassenger.value);

  if (!selectedSeat) {
    alert("Veuillez choisir un passager.");
    return;
  }

  const reservation = findReservation(selectedSeat);

  if (!reservation) {
    alert("Réservation introuvable.");
    return;
  }

  const passengerName = reservation.name;

  reservations = reservations.filter(function(item) {
    return item.seat !== selectedSeat;
  });

  console.log(reservations);

  deleteForm.reset();
  updateDisplay();

  alert("Réservation de " + passengerName + " supprimée.");
});



function updateDeleteList() {
  deletePassenger.innerHTML = '<option value="">Choisir un passager</option>';

  for (let i = 0; i < reservations.length; i++) {
    const option = document.createElement("option");

    option.value = reservations[i].seat;
    option.textContent = reservations[i].name + " - Siège " + reservations[i].seat;

    deletePassenger.appendChild(option);
  }
}




const freePlases = 20
const availableCount = document.querySelector("#availableCount");
function updateAvailabelSeat(){
let free = freePlases;
for(let i=0 ; i < reservations.length ; i++){
  free--;
}
availableCount.textContent = free ;
}



const occupiedCount = document.querySelector("#occupiedCount");
function updateOccupiedSeats(){
let taken = 0;
for(let i=0 ; i < reservations.length ; i++){
  taken++;
}
occupiedCount.textContent = taken ;
}


const ticketPrice = 80
const revenue = document.querySelector("#revenue");
function updateTotalPrice(){
let total = 0;
for(let i=0 ; i < reservations.length ; i++){
  total += ticketPrice;
}
revenue.textContent = total ;
}


function updateDisplay() {

updateSeats();
updateModifyList();
updateDeleteList();

updateAvailabelSeat();
updateOccupiedSeats();
updateTotalPrice();

}
updateDisplay();
