function templeNav(){
    var templeListDiv = document.querySelector('#templelist');
    var templeURL = 'https://kiadawel.github.io/assignments/templeinnsuites/scripts/temples.json';
    var allTemples = new XMLHttpRequest();

    allTemples.open('GET',templeURL);
    allTemples.responseType = 'json';
    allTemples.send();
    allTemples.onload = function(){
        var templeData = allTemples.response;
        listAll(templeData);
    }

    function listAll(templeData){
        var temples = templeData['temples'];
        var templeList = document.createElement('ul');

        for (var i=0; i < temples.length; i++){
            var templeNavItem = document.createElement('li');
            var templeShowLink = document.createElement('a');
            var anchorFunction = 'showTempleInfo("'+ temples[i].tag + '")';
            
            templeShowLink.setAttribute('onclick',anchorFunction);
            templeShowLink.textContent = temples[i].name;

            templeNavItem.appendChild(templeShowLink);
            templeList.appendChild(templeNavItem);
        }
        templeListDiv.appendChild(templeList);
    }
}

function showTempleInfo(templetag){
    var templeInfoDiv = document.querySelector('#templeclicked');
        templeInfoDiv.innerHTML = '';
    var templeURL = 'https://kiadawel.github.io/assignments/templeinnsuites/scripts/temples.json';
    var allTemples = new XMLHttpRequest();
    var thisTemple;

    allTemples.open('GET',templeURL);
    allTemples.responseType = 'json';
    allTemples.send();
    allTemples.onload = function(){
        var templeData = allTemples.response['temples'];

        for(var i=0; i<templeData.length; i++){
            if(templeData[i].tag == templetag){
               thisTemple = templeData[i];
               break;
            }
        } 
        var templeTitle = document.createElement('h2');
        var templeDed = document.createElement('h3');
        var templeImg = document.createElement('img');
        var templeBasicsDiv = document.createElement('div');
            var templeAddress = document.createElement('p');
            var templePhone = document.createElement('p');
        var templeWeather = document.createElement('section');
            templeWeather.setAttribute('id','weatherbox');
            var weatherLink = document.createElement('a');
            weatherLink.textContent = 'See Current Weather';
            weatherLink.setAttribute('onclick','getTempleWeather("' + thisTemple.weatherid + '")');
        templeWeather.appendChild(weatherLink);
        var closuresSection = document.createElement('section');
            var closuresTitle = document.createElement('h3');
            var closuresList = document.createElement('ul');
                for (var i=0; i < thisTemple.closures.length; i++){
                    var closuresItem = document.createElement('li');
                    closuresItem.textContent = thisTemple.closures[i];
                    closuresList.appendChild(closuresItem);
                }
        var servSection = document.createElement('section');
            var servTitle = document.createElement('h3');
            var servList = document.createElement('ul');
                var servRent = document.createElement('li');
                    servRent.textContent = 'Clothing Rental: ' + thisTemple.services.rent;
                var servCafe = document.createElement('li');
                    servCafe.textContent = 'Cafeteria: ' + thisTemple.services.cafeteria;
                var servDist = document.createElement('li');
                    servDist.textContent = 'Distribution Center Nearby: ' + thisTemple.services.dist;
            servList.appendChild(servRent);
            servList.appendChild(servCafe);
            servList.appendChild(servDist);
        servSection.appendChild(servTitle);
        servSection.appendChild(servList);
    
        templeTitle.textContent = thisTemple.name;
        templeDed.textContent = 'Dedicated ' + thisTemple.ded;

            var imgPath = 'images/temples/' + templetag + '.jpg';
            var imgAlt = thisTemple.name;
        templeImg.setAttribute('src',imgPath);
        templeImg.setAttribute('alt',imgAlt);
        
            templeAddress.innerHTML = thisTemple.address.street + '<br>' +
                                    thisTemple.address.city + thisTemple.address.zip + '<br>' +
                                    thisTemple.address.country;
            templePhone.textContent = thisTemple.address.tel;
        templeBasicsDiv.appendChild(templeAddress);
        templeBasicsDiv.appendChild(templePhone);

            closuresTitle.textContent = 'Temple Closures';
        closuresSection.appendChild(closuresTitle);
        closuresSection.appendChild(closuresList);
        
        templeInfoDiv.appendChild(templeTitle);
        templeInfoDiv.appendChild(templeDed);
        templeInfoDiv.appendChild(templeWeather);
        templeInfoDiv.appendChild(templeImg);
        templeInfoDiv.appendChild(templeBasicsDiv);
        templeInfoDiv.appendChild(servSection);
        templeInfoDiv.appendChild(closuresSection);
    }
}

function getTempleWeather(templeid) {
    var weatherRequest = new XMLHttpRequest();
    var apiURLString = 'https://api.openweathermap.org/data/2.5/weather?id=' + templeid 
                        + '&APPID=d7bbba8e044ce8818ee15bb8d54d90c1&units=Imperial';

        weatherRequest.open('GET',apiURLString, true);
        weatherRequest.responseType = 'json';
        weatherRequest.send();
        weatherRequest.onload = function(){
            
            var weatherData = weatherRequest.response;
            var weatherBox = document.getElementById('weatherbox');
                weatherBox.innerHTML = '';

            var weatherIcon = document.createElement('img');
            var summaryHeading = document.createElement('h3');
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
                
                var iconString = 'images/weather/' + weatherData.weather[0].icon+'.png';
                var altString = weatherData.weather[0].description;
            weatherIcon.setAttribute('src',iconString);
            summaryHeading.textContent = 'Temple Weather:';
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

            weatherBox.appendChild(summaryHeading);
            weatherBox.appendChild(weatherIcon);
            weatherBox.appendChild(currentList);
        }
}

function findWindChill(tempF,speed) {
    var check;
        if (tempF > 50 || isNaN(tempF) || tempF == ''){
            check = false;
        }
        else if (speed < 3 || isNaN(speed) || speed == ''){
            check = false;
        }
        else {
            check = true;
        }
    if (check == false){
        return false;			
    }
    else {
        speed = Math.pow(speed, 0.16);
        var newTemp = 35.74 + (0.6215 * tempF) - (35.75 * speed) + (0.4275 * tempF * speed);
        newTemp = Math.round(newTemp * 10)/10;
        return newTemp;
    }
}