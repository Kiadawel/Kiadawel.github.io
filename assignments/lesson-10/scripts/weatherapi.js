var weatherRequest = new XMLHttpRequest();
var apiURLString = 'https://api.openweathermap.org/data/2.5/weather?id=5604473&APPID=d7bbba8e044ce8818ee15bb8d54d90c1&units=Imperial';

    weatherRequest.open('GET',apiURLString, true);
    weatherRequest.send();
    weatherRequest.onload = function(){
        
        var weatherData = JSON.parse(weatherRequest.responseText);
        console.log(weatherData);
        document.getElementById('currenttemp').innerHTML = weatherData.main.temp;
    }