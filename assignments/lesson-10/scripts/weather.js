function currentConditions(townid) {
    var container = document.querySelector('#currentweather');
    var weatherRequest = new XMLHttpRequest();
    var apiURLString = 'https://api.openweathermap.org/data/2.5/weather?id=' + townid 
                        + '&APPID=d7bbba8e044ce8818ee15bb8d54d90c1&units=Imperial';

        weatherRequest.open('GET',apiURLString, true);
        weatherRequest.responseType = 'json';
        weatherRequest.send();
        weatherRequest.onload = function(){
            
            var weatherData = weatherRequest.response;

            var summaryHeading = document.createElement('h3');
            var headingLine = document.createElement('hr');
            var currentList = document.createElement('ul');
            var currentCond = document.createElement('li');
            var currentTemp = document.createElement('li');
            var currentHum = document.createElement('li');
            var currentPrecip = document.createElement('li');
            var currentWindSpeed = document.createElement('li');
            var currentWindChill = document.createElement('li');

            var totalPrecip = parseFloat(weatherData.rain['1h']);
                if (isNaN(totalPrecip)){
                    totalPrecip = 0;
                }
            var tempF = parseFloat(weatherData.main.temp);
            var speed = parseFloat(weatherData.wind.speed);
            var feelsLike = findWindChill(tempF, speed); 
                if (!feelsLike){
                    feelsLike = tempF;
                }

            summaryHeading.textContent = 'Weather Summary';
            currentCond.textContent = 'Currently: ' + weatherData.weather[0].main;
            currentTemp.innerHTML = 'Temperature: ' + tempF + '&#176; F';
            currentWindChill.innerHTML = 'Feels Like: ' + feelsLike + '&#176; F'; 
                currentWindChill.setAttribute('class','wchill');
            currentHum.innerHTML = 'Humidity: ' + weatherData.main.humidity + '&#37;';
            currentPrecip.textContent = 'Precipitation: ' + totalPrecip + 'mm';
            currentWindSpeed.textContent = 'Wind Speed: ' + speed + 'mph';

            currentList.appendChild(currentCond);
            currentList.appendChild(currentTemp);
            currentList.appendChild(currentWindChill);
            currentList.appendChild(currentHum);
            currentList.appendChild(currentPrecip);
            currentList.appendChild(currentWindSpeed);

            container.appendChild(summaryHeading);
            container.appendChild(headingLine);
            container.appendChild(currentList);  
        }
}