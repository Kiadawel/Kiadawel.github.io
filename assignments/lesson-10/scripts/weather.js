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
                if (isNaN(totalPrecip) || totalPrecip == undefined || totalPrecip == null){
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

function fiveDayForecast(townid){
    var container = document.querySelector('#fivedayforecast');
    var forecastRequest = new XMLHttpRequest();
    var apiURLString = 'https://api.openweathermap.org/data/2.5/forecast?id=' + townid 
                        + '&APPID=d7bbba8e044ce8818ee15bb8d54d90c1&units=Imperial';

        forecastRequest.open('GET',apiURLString, true);
        forecastRequest.responseType = 'json';
        forecastRequest.send();
        forecastRequest.onload = function(){
           
            var foreCast = forecastRequest.response;
            console.log(foreCast);
            
            //create array to loop through high-noon data only
            var dayArray= [foreCast.list[6], foreCast.list[14],
                            foreCast.list[22],foreCast.list[30],
                            foreCast.list[38]];

            for(i=0; i<dayArray.length; i++){
                var dayBox = document.createElement('div');
                var dayHeading = document.createElement('h3');
                var weatherIcon = document.createElement('img');
                var paraTemps = document.createElement('p');

                var hiTemp = dayArray[i].main.temp_max.toFixed(1);
                var loTemp = dayArray[i].main.temp_min.toFixed(1);
                var iconURL = 'http://openweathermap.org/img/w/'+ dayArray[i].weather[0].icon + '.png';
                var iconDesc = dayArray[i].weather[0].description;
                var thisDate = new Date(dayArray[i].dt * 1000);
                var dayOfWeek = thisDate.getDay();
                var allDays = ['Sun','Mon','Tues','Wed','Thurs','Fri','Sat']
                
                dayBox.setAttribute('class','forecast');
                dayHeading.textContent = allDays[dayOfWeek];
                weatherIcon.setAttribute('src',iconURL);
                weatherIcon.setAttribute('alt',iconDesc);
                paraTemps.innerHTML = '<span class="hitemp">' + hiTemp + '&#176;</span> | '
                                    + '<span class="lotemp">' + loTemp + '&#176;</span>';

                dayBox.appendChild(dayHeading);
                dayBox.appendChild(weatherIcon);
                dayBox.appendChild(paraTemps);

                container.appendChild(dayBox);
            }
        }
}