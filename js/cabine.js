async function getData(trips) {
    let objectData = await fetch(trips);
    let textData = await objectData.text();
    displayData();
    
}