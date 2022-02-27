function solve() {
    let url = `http://localhost:3030/jsonstore/bus/schedule/depot`;
    function depart() {
        let infoSpanElem = document.querySelector('.info');

        let departButtonElem = document.querySelector('#depart');

        let arriveButtonElem = document.querySelector('#arrive');
        console.log(url);
        fetch(url)
            .then(res => res.json())
            .then((data) => {

                if (departButtonElem.disabled == false) {
                    infoSpanElem.textContent = `Next stop ${data.name}`
                    arriveButtonElem.disabled = false;
                    departButtonElem.disabled = true;
                }

            }).catch(() => {
                infoSpanElem.textContent = 'Error';
                departButtonElem.disabled = true;
                arriveButtonElem.disabled = true;
            })
    }

    function arrive() {
        let infoSpanElem = document.querySelector('.info');

        let departButtonElem = document.querySelector('#depart');

        let arriveButtonElem = document.querySelector('#arrive');
        console.log(departButtonElem.disabled);
        fetch(url)
            .then(res => res.json())
            .then((data) => {

                if (departButtonElem.disabled == true) {
                    infoSpanElem.textContent = `Arriving at ${data.name}`;
                    url = `http://localhost:3030/jsonstore/bus/schedule/${data.next}`;
                    arriveButtonElem.disabled = true;
                    departButtonElem.disabled = false;
                }

            }).catch(() => {
                infoSpanElem.textContent = 'Error';
                departButtonElem.disabled = true;
                arriveButtonElem.disabled = true;
            })
    }

    return {
        depart,
        arrive
    };
}

let result = solve();