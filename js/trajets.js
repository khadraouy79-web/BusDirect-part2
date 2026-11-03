export let jsonData = [];

window.addEventListener("load",() => {

    fetch("./data/trips.json")
    .then((response) => response.json())
    .then((data) => {

        jsonData = data;
        displayTrajets(jsonData);

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

            <p class="text-gray-500">Passagers : ${trajet.reservations.length}/${trajet.capacity}</p>
            </div>

            <button onclick="document.location='cabine.html'" class="cabineButton mr-2 ml-2 mb-2"> Gérer la cabine ➜ </button>

        </div>
        `;
    });
}




let link = document.getElementsByClassName("link");

let prev = document.querySelector(".btn1");
let next = document.querySelector(".btn2");

prev.addEventListener("click", backBtn);
next.addEventListener("click", nextBtn);

let itemsPerPage = 1;
let currentValue = 1;

for(let l of link) {
    l.addEventListener("click", activeLink);
}

function activeLink(event){
    for(let l of link){
        l.classList.remove("active");
        
    }
    event.target.classList.add("active");
    currentValue = Number(event.target.value);
}

function backBtn(){
    if(currentValue > 1){
        link[currentValue - 1].classList.remove("active");
            currentValue--;
        link[currentValue -1].classList.add("active");
    }

}

function nextBtn(){
    if(currentValue < 6){
        link[currentValue -1].classList.remove("active");

        currentValue++;
    link[currentValue -1 ].classList.add("active");

    }
    
}


const filterItem = (trajet) => {
   
    function item(value){
        if(value.id == trajet){
                return true;
                
        }
    }
    const filterCategories = jsonData.filter(item);

    displayTrajets(filterCategories);
}







