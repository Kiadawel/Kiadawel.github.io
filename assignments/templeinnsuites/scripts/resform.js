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
    var roomType = document.getElementById('roomtype').value;

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
    else if(roomType == null){
        errorString += 'Please specify what type of room is needed.';
        document.getElementById('error').innerHTML = errorString;
    }
    else{
        document.getElementById('error').innerHTML = '';
        var formDisplay = document.getElementById('personalinfo');
        
        formDisplay.className = 'personalshow';
    }
}

function resConfirm(){
    var resLoc = grabData('loc');
    var checkIn = grabData('checkin');
    var checkOut = grabData('checkout');
    var roomNum = grabData('roomnum');
    var roomType = grabData('roomtype');

    var firstName = grabData('firstname').replace('+',' ');
    var lastName = grabData('lastname').replace('+',' ');
    var eMail = grabData('email').replace('%40','@');
    var userPhone = grabData('telephone');
    var userCountry = grabData('country').replace('+',' ');

    var resInfo = '<h3>Reservation Info</h3><p>' +
                'Location: ' + resLoc + '<br>' +
                'Check-in Date: ' + checkIn + '<br>' +
                'Check-out Date: ' + checkOut + '<br>' +
                'Rooms: ' + roomNum + '<br>' + 
                'Room Type: ' + roomType + '</p>';

    var personalInfo = '<h3>Personal Info</h3><p>' +
                'Your Name: ' + firstName + ' ' + lastName + '<br>' +
                'Email: ' + eMail + '<br>' +
                'Phone: ' + userPhone + '<br>';
        if(userCountry != null){
            personalInfo += 'Your Location: ' + userCountry + '<br>';
        }  
        
    var returnString = resInfo + personalInfo;

    document.getElementById('ressummary').innerHTML = returnString;
}

function grabData(field){
    var stringBit = window.location.search.substring(1);
    var splitter = stringBit.split('&');
    for (var i=0;i<splitter.length;i++) {
        var formset = splitter[i].split('=');
        if(formset[0] == field) {
            return formset[1];
        }
    }
    return false;
}
