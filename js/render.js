export function displayTrajets(trajets) {
    const container = document.getElementById("trajetContainer");
    container.innerHTML = "";
    trajets.forEach((trajet) => {

        const isFull = trajet.reservations.length >= trajet.capacity;

        let busStatus = "";
        let busColor = "" ;

        if (isFull){
            busStatus = "Complète";
            busColor = "red" ;

        }else{
            busStatus = "Disponible";
            busColor = "green" ;
 }

        container.innerHTML += `
        
          <div class="cardTrajet">
            <div class ="cardBusTitele m-3 flex items-center justify-between text-xl font-semibold"> 
            <h2>${trajet.departure} → ${trajet.destination}</h2> 
            <div class="cardBusTitele">
             <h3 class="px-3 py-3" style="background-color: ${busColor}">${busStatus}</h3>
             </div>
            </div>
            <div class="ml-2">
            <p class="text-gray-500">Départ : ${trajet.departureTime}</p>

            <p class="text-gray-500">Arrivée : ${trajet.arrivalTime}</p>

            <p class="text-gray-500">Prix : ${trajet.price} DH</p>

            <p class="text-gray-500">Passagers : ${trajet.reservations.length}/${trajet.capacity}</p>
            <p class="text-gray-500">Places libres : ${trajet.capacity - trajet.reservations.length}</p>
            <p class="text-gray-500">Liste d’attente : ${trajet.waitingList ? trajet.waitingList.length : 0}</p>
            </div>

            <button onclick="goToCabine(${trajet.id})" class="cabineButton mr-2 ml-2 mb-2"> Gérer la cabine ➜ </button>

        </div>
        `;
});
}

export function updateSeats(seats, reservations, reserveSeat, findReservation) {
    for (let i = 0; i < seats.length; i++) {
        const seatNumber = Number(seats[i].dataset.seat);
        const reservation = findReservation(reservations, seatNumber);

        if (reservation) {
            seats[i].textContent = reservation.name;
            seats[i].style.backgroundColor = "red";
            seats[i].style.color = "white";
            seats[i].disabled = true;
        } else {
            seats[i].textContent = seatNumber;
            seats[i].style.backgroundColor = seatNumber <= 4 ? "#eab308" : "#11ab4ada";
            seats[i].style.color = "white";
            seats[i].disabled = false;
 }
}

    for (let i = 0; i < reserveSeat.options.length; i++) {
        const option = reserveSeat.options[i];

        if (option.value === "") {
            continue;
     }

        const reservation = findReservation(reservations, option.value);
        option.disabled = Boolean(reservation);
}
}

export function updateModifyList(reservations, modifyPassenger) {
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

export function updateDeleteList(reservations, deletePassenger) {
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

export function updateAvailabelSeat(reservations, totalSeats, availableCount) {
    let free = totalSeats;
    for (let i = 0; i < reservations.length; i++) {
        free--;
    }
    availableCount.textContent = free;
}

export function updateOccupiedSeats(reservations, occupiedCount) {
    let taken = 0;
    for (let i = 0; i < reservations.length; i++) {
        taken++;
    }
    occupiedCount.textContent = taken;
}

export function updateTotalPrice(reservations, ticketPrice, revenue) {
    let total = 0;
    for (let i = 0; i < reservations.length; i++) {
        if (Number(reservations[i].seat) <= 4) {
            total += Math.round(ticketPrice * 1.1);
        } else {
            total += ticketPrice;
 }
 }
    revenue.textContent = total;
}

export function updateWaitingList(waitingList, container) {
    container.innerHTML = "";
    if (waitingList.length === 0) {
        container.textContent = "Aucun passager en attente.";
        return;
    }
    for (let i = 0; i < waitingList.length; i++) {
        const line = document.createElement("p");
        line.textContent = (i + 1) + ". " + waitingList[i].name + " - " + waitingList[i].phone;
        container.appendChild(line);
}
}
