import {
    isEmptyName, findExistingPassenger, findExistingPassengerExceptSeat,
    isValidPhone, findExistingPhone, findExistingPhoneExceptSeat
} from "./validators.js";

export function findReservation(reservations, seatNumber) {
    return reservations.find(function(item) {
        return Number(item.seat) === Number(seatNumber);
    });
}

export function initReservations(state, elements, updateDisplay) {
    const seats = elements.seats;
    const reserveForm = elements.reserveForm;
    const reserveName = elements.reserveName;
    const reservePhone = elements.reservePhone;
    const reserveSeat = elements.reserveSeat;
    const modifyForm = elements.modifyForm;
    const modifyPassenger = elements.modifyPassenger;
    const modifyName = elements.modifyName;
    const modifyPhone = elements.modifyPhone;
    const modifySeat = elements.modifySeat;
    const deleteForm = elements.deleteForm;
    const deletePassenger = elements.deletePassenger;

    function showMessage(element, message, error) {
        element.textContent = message;
        element.style.color = error ? "#dc2626" : "#15803d";

        const currentMessage = message;
        setTimeout(function() {
            if (element.textContent === currentMessage) element.textContent = "";
        }, 3000);
    }

    reserveForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const passengerName = reserveName.value.trim();
        const phone = reservePhone.value.trim();
        let selectedSeat = reserveSeat.value;

        if (isEmptyName(passengerName)) {
            showMessage(elements.reserveMessage, "Veuillez saisir le nom du passager.", true);
            return;
        }

        if (!isValidPhone(phone)) {
            showMessage(elements.reserveMessage, "Téléphone invalide : 06 ou 07 + 8 chiffres.", true);
            return;
        }
        if (findExistingPassenger(state.reservations, passengerName) ||
            findExistingPassenger(state.waitingList, passengerName)) {
            showMessage(elements.reserveMessage, "Ce nom existe déjà sur ce trajet !", true);
            return;
        }
        if (findExistingPhone(state.reservations, phone) ||
            findExistingPhone(state.waitingList, phone)) {
            showMessage(elements.reserveMessage, "Ce téléphone existe déjà sur ce trajet !", true);
            return;
        }

        if (selectedSeat === "") {
            
            for (let i = 0; i < seats.length; i++) {
                const seatNumber = Number(seats[i].dataset.seat);
                if (seatNumber > 4 && !findReservation(state.reservations, seatNumber)) {
                    selectedSeat = seatNumber;
                    break;
                }
            }
          
            if (selectedSeat === "") {
                for (let i = 0; i < seats.length; i++) {
                    const seatNumber = Number(seats[i].dataset.seat);
                    if (!findReservation(state.reservations, seatNumber)) {
                        selectedSeat = seatNumber;
                        break;
                    }
                }
         }
}

        if (selectedSeat === "") {
            state.waitingList.push({ name: passengerName, phone: phone });
            const position = state.waitingList.length;
            reserveForm.reset();
            updateDisplay();
            showMessage(elements.reserveMessage, "Bus complet ! Ajouté à la liste d’attente, position " + position + ".", false);
            return;
}

        const seatNumber = Number(selectedSeat);
        if (findReservation(state.reservations, seatNumber)) {
            showMessage(elements.reserveMessage, "Ce siège est déjà réservé !", true);
            return;
}
        state.reservations.push({ name: passengerName, phone: phone, seat: seatNumber });
        console.log(state.reservations);
        reserveForm.reset();
        updateDisplay();
        showMessage(elements.reserveMessage, "Réservation effectuée avec succès !", false);
});

    modifyPassenger.addEventListener("change", function() {
        const reservation = findReservation(state.reservations, modifyPassenger.value);
        if (reservation) {
            modifyName.value = reservation.name;
            modifyPhone.value = reservation.phone || "";
        } else {
            modifyName.value = "";
            modifyPhone.value = "";
        }
        const oldSeat = Number(modifyPassenger.value);
        modifySeat.innerHTML = '<option value="">Garder le siège actuel</option>';
        for (let i = 0; i < seats.length; i++) {
            const seatNumber = Number(seats[i].dataset.seat);
            const seatReservation = findReservation(state.reservations, seatNumber);
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
        const newPhone = modifyPhone.value.trim();
        const newSeat = modifySeat.value;
        const reservation = findReservation(state.reservations, oldSeat);

        if (!reservation) {
            showMessage(elements.modifyMessage, "Veuillez choisir un passager.", true);
            return;
        }
        if (isEmptyName(newName)) {
            showMessage(elements.modifyMessage, "Veuillez saisir le nouveau nom.", true);
            return;
        }
        if (!isValidPhone(newPhone)) {
            showMessage(elements.modifyMessage, "Téléphone invalide : 06 ou 07 + 8 chiffres.", true);
            return;
        }
        if (findExistingPassengerExceptSeat(state.reservations, newName, oldSeat) ||
            findExistingPassenger(state.waitingList, newName)) {
            showMessage(elements.modifyMessage, "Ce nom est déjà utilisé.", true);
            return;
        }
        if (findExistingPhoneExceptSeat(state.reservations, newPhone, oldSeat) ||
            findExistingPhone(state.waitingList, newPhone)) {
            showMessage(elements.modifyMessage, "Ce téléphone est déjà utilisé.", true);
            return;
        }
        if (newSeat !== "" && Number(newSeat) !== oldSeat) {
            if (findReservation(state.reservations, newSeat)) {
                showMessage(elements.modifyMessage, "Ce siège est déjà réservé !", true);
                return;
            }
            reservation.seat = Number(newSeat);
        }
        reservation.name = newName;
        reservation.phone = newPhone;
        console.log(state.reservations);
        modifyForm.reset();
        updateDisplay();
        showMessage(elements.modifyMessage, "Modification effectuée avec succès !", false);
});

    deleteForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const selectedSeat = Number(deletePassenger.value);
        if (!selectedSeat) {
            showMessage(elements.deleteMessage, "Veuillez choisir un passager.", true);
            return;
        }
        const reservation = findReservation(state.reservations, selectedSeat);
        if (!reservation) {
            showMessage(elements.deleteMessage, "Réservation introuvable.", true);
            return;
        }
        const passengerName = reservation.name;
        state.reservations = state.reservations.filter(function(item) {
            return Number(item.seat) !== selectedSeat;
        });

        let message = "Réservation de " + passengerName + " supprimée.";
        if (state.waitingList.length > 0) {
            const nextPassenger = state.waitingList[0];
            state.reservations.push({
                name: nextPassenger.name,
                phone: nextPassenger.phone,
                seat: selectedSeat
            });
            state.waitingList = state.waitingList.filter(function(item, i) {
                return i !== 0;
            });
            message += " " + nextPassenger.name + " a obtenu le siège " + selectedSeat + ".";
        }
        console.log(state.reservations);
        deleteForm.reset();
        updateDisplay();
        showMessage(elements.deleteMessage, message, false);
});
}
