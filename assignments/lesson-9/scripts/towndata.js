function townData(){
    var section = document.querySelector('#tritown');
    var requestURL = 'https://byui-cit230.github.io/weather/data/towndata.json';
    var request = new XMLHttpRequest();

    request.open('GET',requestURL);
    request.responseType = 'json';
    request.send();
    request.onload = function(){
        var triTown = request.response;
        townSection(triTown);
    }

    function townSection(jsonData) {
        var towns = jsonData['towns'];

        for(var i=0; i < towns.length; i++){
            var simplename = towns[i].name.toLowerCase().replace(' ','');;

            if(simplename == 'preston' || simplename == 'fishhaven' || simplename == 'sodasprings'){
                var articleBox = document.createElement('article');
                var townHeader = document.createElement('h2');
                var townMotto = document.createElement('p');
                var townYear = document.createElement('p');
                var townPop = document.createElement('p');
                var townRain = document.createElement('p');
                var townImage = document.createElement('img');
                
                var townAltText = 'Town of ' + towns[i].name + ', Idaho';
                var townImgSrc = 'images/' + simplename + '.jpg';
                
                articleBox.setAttribute('class','townbox');
                townHeader.textContent = towns[i].name;
                townMotto.textContent = towns[i].motto;
                townMotto.setAttribute('class','townmotto');
                townYear.textContent = 'Founded in ' + towns[i].yearFounded;
                townPop.textContent = 'Population: ' + towns[i].currentPopulation;
                townRain.textContent = 'Annual Rainfall: ' + towns[i].averageRainfall + '"';
                townRain.setAttribute('class','rain');
                
                townImage.setAttribute('src', townImgSrc);
                townImage.setAttribute('alt', townAltText);

                articleBox.appendChild(townHeader);
                articleBox.appendChild(townMotto);
                articleBox.appendChild(townYear);
                articleBox.appendChild(townPop);
                articleBox.appendChild(townRain);
                articleBox.appendChild(townImage);

                section.appendChild(articleBox);
            }
        }
    }
}