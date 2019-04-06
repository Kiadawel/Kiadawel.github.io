function locOptions(){
    var locList = document.querySelector('#loc');
    var templeURL = 'https://kiadawel.github.io/assignments/templeinnsuites/scripts/temples.json';
    var allTemples = new XMLHttpRequest();

    allTemples.open('GET',templeURL);
    allTemples.responseType = 'json';
    allTemples.send();
    allTemples.onload = function(){
        var templeData = allTemples.response;
        listLoc(templeData);
    }

    function listLoc(templeData){
        var places = templeData['temples'];

        for(var i=0; i< places.length; i++){
            var locItem = document.createElement('option');
                var locString = places[i].name.replace(' Temple','');
                var locValue = places[i].tag;
            locItem.textContent = locString;
            locItem.setAttribute('value',locValue);    
        locList.appendChild(locItem);
        }
    }
}

function showPersonalInfo(){
    var location = document.getElementById('loc').value;
    var checkIn = document.getElementById('checkin').value;
    var checkOut = document.getElementById('checkout').value;
    var roomNum = document.getElementById('roomnum').value;

    var errorString = '';

    if(location == 'Select Location'){
        errorString += 'Please choose a location for your stay.';
        document.getElementById('error').innerHTML = errorString;
    }
    else if(checkIn == ''){
        errorString += 'Please select a check-in date.';
        document.getElementById('error').innerHTML = errorString;
    }
    else if(checkOut == ''){
        errorString += 'Please select a check-out date.';
        document.getElementById('error').innerHTML = errorString;
    }
    else if(roomNum == '0'){
        errorString += 'Please specify how many rooms are needed.';
        document.getElementById('error').innerHTML = errorString;
    }
    else{
        document.getElementById('error').innerHTML = '';
        var formDisplay = document.getElementById('personalinfo');
        
        formDisplay.className = 'personalshow';
    }
}