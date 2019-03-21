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
            var currentWindSpeed = document.createElement('li');
            var currentWindChill = document.createElement('li');

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
            currentWindSpeed.textContent = 'Wind Speed: ' + speed + ' mph';

            currentList.appendChild(currentCond);
            currentList.appendChild(currentTemp);
            currentList.appendChild(currentWindChill);
            currentList.appendChild(currentHum);
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
            
            //create array to populate with high-noon data values
            var dayArray = [];

            //figure out where high noon timestamps are and populate the array
            for(var i=0; i<foreCast.list.length; i++){
                var dateString = foreCast.list[i].dt_txt;
                if(dateString.search('18:00:00') != -1){
                    dayArray.push(foreCast.list[i]);
                }
            }

            for(i=0; i<dayArray.length; i++){
                var dayBox = document.createElement('div');
                var dayHeading = document.createElement('h3');
                var weatherIcon = document.createElement('img');
                var paraTemps = document.createElement('p');

                var hiTemp = dayArray[i].main.temp_max.toFixed(1);
                var loTemp = dayArray[i].main.temp_min.toFixed(1);
                var iconURL = 'https://openweathermap.org/img/w/'+ dayArray[i].weather[0].icon + '.png';
                var iconDesc = dayArray[i].weather[0].description;
                var thisDate = new Date(dayArray[i].dt * 1000);
                var dayOfWeek = thisDate.getDay();
                var allDays = ['Sun','Mon','Tues','Wed','Thurs','Fri','Sat']
                
                dayBox.setAttribute('class','forecast');
                dayHeading.textContent = allDays[dayOfWeek];
                weatherIcon.setAttribute('src',iconURL);
                weatherIcon.setAttribute('alt',iconDesc);
                paraTemps.innerHTML = '<span class="hitemp">' + hiTemp + '&#176; F</span><br> '
                                    + '<span class="lotemp">' + loTemp + '&#176; F</span>';

                dayBox.appendChild(dayHeading);
                dayBox.appendChild(weatherIcon);
                dayBox.appendChild(paraTemps);

                container.appendChild(dayBox);
            }
        }
}

// function to receive temp and wind speed data and send back final temperature
function findWindChill(tempF,speed) {

    // Check for accurate values and only run calculations if
    // temperature and wind speed meet requirements
    var check = checkInput(tempF, speed);

        // function to make sure values are valid for the equation
        // according to the National Weather Service
        function checkInput(tempF, speed){
            if (tempF > 50 || isNaN(tempF) || tempF == ''){
                return false;
            }
            else if (speed < 3 || isNaN(speed) || speed == ''){
                return false;
            }
            else {
                return true;
            }
        }
    if (check == false){
        return false;			
    }
    else {
        //if valid, send temperature and wind speed to be calculated
        //and return final value
        var wChill = windChill(tempF, speed);
        return wChill
    }
}

// function to receive temperature and wind speed,
// plug into wind chill equation, 
// and return a new temperature value
function windChill(tmp, spd){
    spd = Math.pow(spd, 0.16);
    var newTemp = 35.74 + (0.6215 * tmp) - (35.75 * spd) + (0.4275 * tmp * spd);
    newTemp = Math.round(windChill * 10)/10;
    return newTemp;
}