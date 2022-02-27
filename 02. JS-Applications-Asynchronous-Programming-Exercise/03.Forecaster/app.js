function attachEvents() {
    let submitButtonElement = document.querySelector('#submit');
    let locationInputElement = document.querySelector('#location');
    let forecastDivElement = document.getElementById('forecast');

    let currentForecastDivElement = document.getElementById('current');
    let upcomingForecastDivElement = document.getElementById('upcoming');
    let url = `http://localhost:3030/jsonstore/forecaster/locations`;

    submitButtonElement.addEventListener('click', () => {

        if (currentForecastDivElement.childNodes.length > 1) {
            currentForecastDivElement.removeChild(currentForecastDivElement.lastChild);
        }

        if (upcomingForecastDivElement.childNodes.length > 2) {
            upcomingForecastDivElement.removeChild(upcomingForecastDivElement.lastChild);
        }

        forecastDivElement.style.display = 'block';






        fetch(url)
            .then(res => res.json())
            .then((data) => {




                let location = data.filter(obj => { return obj.name == locationInputElement.value })[0];
                let currentConditionUrl = `http://localhost:3030/jsonstore/forecaster/today/${location.code}`;
                fetch(currentConditionUrl)
                    .then(res => res.json())
                    .then((data) => {

                        let forecastsDivElement = document.createElement('div');
                        forecastsDivElement.classList.add('forecasts');
                        currentForecastDivElement.appendChild(forecastsDivElement);




                        let condition = data['forecast'].condition;
                        let symbol = '';
                        if (condition == 'Sunny') {
                            symbol = '&#x2600';
                        } else if (condition == 'Partly sunny') {
                            symbol = '&#x26C5';
                        } else if (condition == 'Overcast') {
                            symbol = '&#x2601';
                        } else if (condition == 'Rain') {
                            symbol = '&#x2614';
                        }

                        let currentConditionSymbolSpan = document.createElement('span');
                        currentConditionSymbolSpan.classList.add('symbol');
                        currentConditionSymbolSpan.innerHTML = '&#x2600';
                        forecastsDivElement.appendChild(currentConditionSymbolSpan);

                        let currentConditionSpan = document.createElement('span');
                        currentConditionSpan.classList.add('condition');
                        forecastsDivElement.appendChild(currentConditionSpan);

                        let locationNameSpan = document.createElement('span');
                        locationNameSpan.classList.add('forecast-data');
                        locationNameSpan.innerHTML = data.name
                        currentConditionSpan.appendChild(locationNameSpan);

                        let highLowSpan = document.createElement('span');
                        highLowSpan.classList.add('forecast-data');
                        highLowSpan.innerHTML = `${data['forecast'].low}/${data['forecast'].high}`;
                        currentConditionSpan.appendChild(highLowSpan);


                        let conditionSpan = document.createElement('span');
                        conditionSpan.classList.add('forecast-data');
                        conditionSpan.innerHTML = data['forecast'].condition;
                        currentConditionSpan.appendChild(conditionSpan);

                    })




                let upcomingConditionUrl = `http://localhost:3030/jsonstore/forecaster/upcoming/${location.code}`;
                fetch(upcomingConditionUrl)
                    .then(res => res.json())
                    .then((data) => {

                        let forecastInfoDiv = document.createElement('div');
                        forecastInfoDiv.classList.add('forecast-info');



                        upcomingForecastDivElement.appendChild(forecastInfoDiv);

                        for (obj of data['forecast']) {

                            let upcomingSpanElement = document.createElement('span');
                            upcomingSpanElement.classList.add('upcoming');



                            let upcomingConditionSpan = document.createElement('span');
                            upcomingConditionSpan.classList.add('forecast-data');
                            upcomingConditionSpan.textContent = obj.condition;

                            let upcomingHighLowSpan = document.createElement('span');
                            upcomingHighLowSpan.classList.add('forecast-data');
                            upcomingHighLowSpan.textContent = `${obj.low}/${obj.high}`;

                            let upcomingSymbolSpan = document.createElement('span');
                            upcomingSymbolSpan.classList.add('symbol');


                            if (obj.condition == 'Sunny') {
                                upcomingSymbolSpan.innerHTML = '&#x2600';
                            } else if (obj.condition == 'Partly sunny') {
                                upcomingSymbolSpan.innerHTML = '&#x26C5';
                            } else if (obj.condition == 'Overcast') {
                                upcomingSymbolSpan.innerHTML = '&#x2601';
                            } else if (obj.condition == 'Rain') {
                                upcomingSymbolSpan.innerHTML = '&#x2614';
                            }

                            upcomingSpanElement.appendChild(upcomingSymbolSpan);
                            upcomingSpanElement.appendChild(upcomingHighLowSpan);
                            upcomingSpanElement.appendChild(upcomingConditionSpan);

                            forecastInfoDiv.appendChild(upcomingSpanElement);

                        }
                    })
            })
            .catch(() => {
                let errorElem = document.createElement('h1');
                errorElem.innerHTML = 'Error';
                currentForecastDivElement.appendChild(errorElem);
            })
    })
}

attachEvents();