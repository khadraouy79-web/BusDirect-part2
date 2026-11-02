let jsonData
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


function displayTrajets(trajets) {
    const container = document.getElementById("trajetContainer");
    trajets.forEach((trajet) => {
        container.innerHTML += `
        
          <div class="cardTrajet">

            <h2>${trajet.departure} → ${trajet.destination}</h2>

            <p>Départ : ${trajet.departureTime}</p>

            <p>Arrivée : ${trajet.arrivalTime}</p>

            <p>Prix : ${trajet.price} DH</p>

            <p>Passagers : ${trajet.reservations.length}/${trajet.capacity}</p>

        </div>
        `;
    });
}



let link = document.getElementsByClassName("link");

let prev = document.querySelector(".btn1");
let next = document.querySelector(".btn2");

prev.addEventListener("click", backBtn);
next.addEventListener("click", backBtn);


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

console.log("test")


