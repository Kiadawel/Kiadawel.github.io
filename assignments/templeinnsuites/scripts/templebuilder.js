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

        console.log(temples[3]);

        for (var i=0; i < temples.length; i++){
            var templeNavItem = document.createElement('li');
            var templeShowLink = document.createElement('a');
            var anchorFunction = 'showTempleInfo('+ temples[i] + ')';
            
            templeShowLink.setAttribute('onclick',anchorFunction);
            templeShowLink.textContent = temples[i].name;

            templeNavItem.appendChild(templeShowLink);
            templeList.appendChild(templeNavItem);
        }
        templeListDiv.appendChild(templeList);
        console.log(templeListDiv.innerHTML);
    }
}