


// async function getData(trips) {
//     let objectData = await fetch(trips);
//     let textData = await objectData.text();
//     displayData();
    
// }


import { displayTrajets, jsonData } from "./trajets.js";

const searshBus = document.getElementById("searshBus");
const selectTrajet = document.getElementById("selectTrajet");
searshBus.addEventListener("input", searchTrajets)
selectTrajet.addEventListener("change", searchTrajets);

function searchTrajets () {
    const searchValue = searshBus.value.toLowerCase();
    const status = selectTrajet.value;
     
    const result = jsonData.filter((trajet) => {
        const matchSearch =
        
        trajet.departure.toLowerCase().includes(searchValue) ||
        trajet.destination.toLowerCase().includes(searchValue)

        const isFull = trajet.reservations.length >= trajet.capacity;
        let matchStatus = true;
        if (status === "available") matchStatus = !isFull;
        if (status === "full") matchStatus = isFull;   
        
        return matchSearch && matchStatus;

    });
    displayTrajets(result);
}



















// export function handleSearch(){
//     const filtersearch = document.querySelector(".searshBus");
//     const city = filtersearch.value.tolowercase().trim();
//     const filtredTrips = trip.filter((trip) => {
//         return(
//            trip.departure.toLowerCase().includes(city) ||
//            trip.destination.toLowerCase().includes(city)
//        )   }
// )
//    renderTrips(filtredTrips, 1, 6);
// }




