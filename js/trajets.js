export let jsonData = [];

window.addEventListener("load",() => {

    fetch("./data/trips.json")
    .then((response) => response.json())
    .then((data) => {

        jsonData = data;
        showPages(1);

        console.log(jsonData);
    })
    .catch((err) => console.log(err));
});


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

            <p class="text-gray-500">agerPasss : ${trajet.reservations.length}/${trajet.capacity}</p>
            </div>

            <button onclick="goToCabine(${trajet.id})" class="cabineButton mr-2 ml-2 mb-2"> Gérer la cabine ➜ </button>

        </div>
        `;
    });
}



let link = document.getElementsByClassName("link");

let prev = document.querySelector(".btn1");
let next = document.querySelector(".btn2");



let itemsPerPage = 6;
let currentValue = 1;


function showPages(page) {
    currentValue = page
   
    let start = (currentValue - 1)*itemsPerPage
    let ending = start + itemsPerPage

    const result = jsonData.slice(start, ending);

    displayTrajets(result);

    for (let l of link) {
        l.classList.remove("active");
    }
    link[currentValue - 1].classList.add("active");

}




for (let l of link) {
    l.addEventListener("click", (event) => {
        showPages(Number(event.currentTarget.textContent));
    });
}

prev.addEventListener("click", () => {
    if (currentValue > 1) {
        showPages(currentValue - 1);
    }
});

next.addEventListener("click", () => {
    let totalPages = Math.ceil(jsonData.length / itemsPerPage);

    if (currentValue < totalPages) {
        showPages(currentValue + 1);
    }
});

window.goToCabine = function(tripId) {

    const selectedTrip = jsonData.find(function(trajet) {
        return trajet.id === tripId ;

    });

    localStorage.setItem(
        "selectedTrip" ,
        JSON.stringify(selectedTrip)

    );

    window.location.href = "cabine.html" ;
};


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

