let link = document.getElementsByClassName("link")

let currentValue = 1;
function activeLink(){
    for(l of link){
        l.classList.remove("active");
        
    }
}