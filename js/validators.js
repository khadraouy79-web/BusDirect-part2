export function isEmptyName(passengerName) {
    return passengerName === "";
}

export function findExistingPassenger(reservations, passengerName) {
    return reservations.find(function(item) {
    return item.name.toLowerCase() === passengerName.toLowerCase();
});
}

export function findExistingPassengerExceptSeat(reservations, newName, oldSeat) {
    return reservations.find(function(item) {
    return item.name.toLowerCase() === newName.toLowerCase()
          && item.seat !== oldSeat;
});
}

export function isValidPhone(phone) {
    return /^0[67][0-9]{8}$/.test(phone);
}

export function findExistingPhone(reservations, phone) {
    return reservations.find(function(item) {
    return item.phone === phone;
});
}

export function findExistingPhoneExceptSeat(reservations, phone, oldSeat) {
    return reservations.find(function(item) {
    return item.phone === phone && item.seat !== oldSeat;
});
}
