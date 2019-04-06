function templeNavToggle(){
    var navDisplay = document.getElementById('templelist');
    
    if (navDisplay.className === 'templenav'){
            navDisplay.className += '_show';
    }
    else {
        navDisplay.className = 'templenav';
    }
}

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
    document.getElementById('templeintro').style.display = 'none';
    document.getElementById('templenavicon').setAttribute('src','images/navicon_temple3.png');
    document.getElementById('templelist').className = 'templenav';
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
        var templeHead = document.createElement('section');
            var templeTitle = document.createElement('h2');
            var templeDed = document.createElement('h3');
            var templeImg = document.createElement('img');

        var templeBasics = document.createElement('section');
            var locationDiv = document.createElement('div')
            var locationHead = document.createElement('h3');
                locationHead.textContent = 'Address';
            templeBasics.setAttribute('class','location');
            var templeAddress = document.createElement('p');
            var templePhone = document.createElement('p');
            var templeMap = document.createElement('iframe');
                templeMap.setAttribute('src',thisTemple.map);
                templeMap.setAttribute('class','templemap');

        var templeWeather = document.createElement('section');
            templeWeather.setAttribute('id','weatherbox');
            templeWeather.setAttribute('class','weather');

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
                servTitle.textContent = "Services";
            var servList = document.createElement('ul');
                for (s in thisTemple.services){
                    var servItem = document.createElement('li');
                    var servIcon = document.createElement('img');
                    var servIconPath = 'images/';
                        if(thisTemple.services[s] == 'yes'){
                            servIconPath += 'yes.png';
                        }
                        else{
                            servIconPath += 'no.png';
                        }
                    servIcon.setAttribute('src',servIconPath);
                    servIcon.setAttribute('alt',thisTemple.services[s]);
                    servItem.appendChild(servIcon);
                    var service = '';
                        switch(s){
                            case 'rent':
                                service = 'Clothing Rental';
                                break;
                            case 'cafeteria':
                                service = 'Cafeteria Available';
                                break;
                            case 'dist':
                                service = 'Distribution Center Nearby';
                                break;  
                        }
                    var servText = document.createTextNode(service);
                    servItem.appendChild(servText);
                    servList.appendChild(servItem);
                }
        servSection.appendChild(servTitle);
        servSection.appendChild(servList);
    
            templeTitle.textContent = thisTemple.name;
            templeDed.textContent = 'Dedicated ' + thisTemple.ded;
                var imgPath = 'images/temples/' + templetag + '.jpg';
                var imgAlt = thisTemple.name;
            templeImg.setAttribute('src',imgPath);
            templeImg.setAttribute('alt',imgAlt);
        templeHead.appendChild(templeTitle);
        templeHead.appendChild(templeDed);
        templeHead.appendChild(templeImg);
        
            templeAddress.innerHTML = thisTemple.address.street + '<br>' +
                                    thisTemple.address.city + ' ' + thisTemple.address.zip + '<br>' +
                                    thisTemple.address.country;
            var phoneImg = '<img src="images/telephone.png" alt="Telephone">';
            templePhone.innerHTML = phoneImg + thisTemple.address.tel;
        locationDiv.appendChild(locationHead);
        locationDiv.appendChild(templeAddress);
        locationDiv.appendChild(templePhone);
        templeBasics.appendChild(locationDiv);
        templeBasics.appendChild(templeMap);

            closuresTitle.textContent = 'Closures';
        closuresSection.appendChild(closuresTitle);
        closuresSection.appendChild(closuresList);
        
        templeInfoDiv.appendChild(templeHead);
        templeInfoDiv.appendChild(templeBasics);
        templeInfoDiv.appendChild(templeWeather);
        templeInfoDiv.appendChild(servSection);
        templeInfoDiv.appendChild(closuresSection);
        getTempleWeather(thisTemple.weatherid);
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
                //weatherBox.innerHTML = '';

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
            weatherIcon.setAttribute('alt',altString);
            summaryHeading.textContent = 'Weather';
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