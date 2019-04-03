function templeNav(){
    var templeListDiv = document.querySelector('#templelist');
    var templeURL = 'temples.json';
    var allTemples = new XMLHttpRequest();

    allTemples.open('GET',templeURL);
    allTemples.responseType = 'json';
    allTemples.send();
    allTemples.onload = function(){
        var templeData = allTemples.response;
        listAll(templeData);
    }

    function listAll(templeData){
        var temples = allTemples['temples'];
        var templeList = createElement('ul');

        for (var i=0; i < temples.length; i++){
            var templeNavItem = createElement('li');
            var templeShowLink = createElement('a');
            var anchorFunction = 'showTempleInfo('+ temples[i] + ')';
            
            templeShowLink.setAttribute('onclick',anchorFunction);
            templeShowLink.textContent = temples[i].name;

            templeNavItem.appendChild(templeShowLink);
            templeList.appendChild(templeNavItem);
        }
        templeListDiv.appendChild(templeList);
    }
}