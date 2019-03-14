function eventData(townName){
    var eventDiv = document.querySelector('#eventdata');
    var requestURL = 'https://byui-cit230.github.io/weather/data/towndata.json';
    var request = new XMLHttpRequest();

    request.open('GET',requestURL); 
    request.responseType = 'json';
    request.send();
    request.onload = function(){
        var townData = request.response;
        showEvents(townData);
    }

    function showEvents(townData) {
        var towns = townData['towns'];

        //first, loop through to find the right town
        for(var i=0; i < towns.length; i++){
            //pull only data from THIS town
            if(towns[i].name == townName){
                var events = towns[i].events;
                var eventsHeading = document.createElement('h2');
                var eventsList = document.createElement('ul');

                eventsHeading.textContent = 'Upcoming Events';
                
                //now, loop through each event
                for(var n=0; n < events.length; n++){
                    var eventItem = document.createElement('li');
                    
                    eventItem.textContent = events[n];
                    eventsList.appendChild(eventItem);
                }
                
                //after all events are added, send full list to container
                eventDiv.appendChild(eventsHeading);
                eventDiv.appendChild(eventsList);
            }
        }
    }
}