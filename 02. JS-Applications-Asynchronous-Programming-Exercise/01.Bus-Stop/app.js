function getInfo() {
    let bussesListElement = document.getElementById('buses');
    bussesListElement.innerHTML = '';
    let stopNameDiv = document.getElementById('stopName');
    let stopId = document.getElementById('stopId').value;
    let url = `http://localhost:3030/jsonstore/bus/businfo/${stopId}`;
    console.log(url);
    fetch(url)
        .then(res => res.json())
        .then((data) => {
            stopNameDiv.textContent = data.name;
            for (bus in data.buses) {
                let ulElement = document.createElement('li');
                ulElement.textContent = `Bus ${bus} arrives in ${data.buses[bus]} minutes`;
                bussesListElement.appendChild(ulElement);
            }
        })
        .catch(() => {
            stopNameDiv.textContent = 'Error';
        })
}