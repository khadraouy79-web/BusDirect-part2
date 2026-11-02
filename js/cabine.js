async function getData(trips) {
    let objectData = await fetch(trips);
    let textData = await objectData.text();
    displayData();
    
}


export function handleSearch(){
    const filtersearch = document.querySelector(".searshBus");
    const city = filtersearch.value.tolowercase().trim();
    const filtredTrips = trip.filter((trip) => {
        return(
           trip.departure.toLowerCase().includes(city) ||
           trip.destination.toLowerCase().includes(city)
       )   }
)
   renderTrips(filtredTrips, 1, 6);
}




