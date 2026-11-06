export let jsonData = [];

export function loadTrips() {
    const savedTrips = localStorage.getItem("allTrips");

    if (savedTrips) {
        jsonData = JSON.parse(savedTrips);
        return Promise.resolve(jsonData);
    } else {
        return fetch("./data/trips.json")
        .then((response) => response.json())
        .then((data) => {

            jsonData = data;
            localStorage.setItem("allTrips", JSON.stringify(jsonData));

            console.log(jsonData);
            return jsonData;
        });
    }
}

export function getSelectedTrip() {
    return JSON.parse(localStorage.getItem("selectedTrip"));
}

export function saveSelectedTrip(trip) {
    localStorage.setItem(
        "selectedTrip",
        JSON.stringify(trip)
    );
}

export function saveTrip(selectedTrip, reservations, waitingList) {
    if (!selectedTrip) {
        return;
    }

    selectedTrip.reservations = reservations;
    selectedTrip.waitingList = waitingList;
    localStorage.setItem("selectedTrip", JSON.stringify(selectedTrip));

    const allTrips = JSON.parse(localStorage.getItem("allTrips"));

    if (allTrips) {
        const trip = allTrips.find(function (findAll) {
            return findAll.id === selectedTrip.id;
        });

        if (trip) {
            trip.reservations = reservations;
            trip.waitingList = waitingList;
        }

        localStorage.setItem("allTrips", JSON.stringify(allTrips));
    }
}


