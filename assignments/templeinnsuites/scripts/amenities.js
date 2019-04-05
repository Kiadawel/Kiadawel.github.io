function getAmenities(){
    var amenSection = document.querySelector('#amenbox');
    var amenitiesList = [
        'Breakfast', 
        'Exercise&nbsp;Facilities',
        'Indoor&nbsp;Pool',
        'Free&nbsp;Wi-Fi',
        'Family&nbsp;History'
        ];
    var toShow;
    var imgSuffix;
    if (document.documentElement.clientWidth < 550) {
        toShow = 3;
        imgSuffix = '_sm.jpg';
    }
    else if (document.documentElement.clientWidth > 550 && document.documentElement.clientWidth < 1024) {
        toShow = 2;
        imgSuffix = '_lrg.jpg';
    }
    else if (document.documentElement.clientWidth > 1025){
        toShow = 4;
        imgSuffix = '_lrg.jpg';
    }

    var amenArray = [];
    for(var i=0; i<toShow; i++){
        var pickOne = amenitiesList[Math.floor(Math.random()*amenitiesList.length)];
        amenArray.push(pickOne);
    }
    console.log(amenArray);
    for(var n=0; n<amenArray.length; n++){
        var altName = amenArray[n].replace('&nbsp;',' ');
        var lowerName = amenArray[n].toLowerCase().replace('&nbsp;','');

        var amenDiv = document.createElement('div');
        var amenHead = document.createElement('h2');
        var amenLink = document.createElement('a');
        var amenImg = document.createElement('img');

        amenDiv.setAttribute('class','amenities_item');
        amenHead.setAttribute('class','amenities_head');

        amenLink.setAttribute('href','amenities.html#'+lowerName);
        
        amenImg.setAttribute('src','images/amenities/'+lowerName+imgSuffix);
        amenImg.setAttribute('alt',altName);

        amenLink.appendChild(amenImg);
        amenHead.appendChild(amenLink);
        amenDiv.appendChild(amenHead);

        amenSection.appendChild(amenDiv);
    }
    console.log(amenSection);
}