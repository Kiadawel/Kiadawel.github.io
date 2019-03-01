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
                var infoDiv = document.createElement('div');
                var townHeader = document.createElement('h2');
                var townMotto = document.createElement('p');
                var townYear = document.createElement('p');
                var townPop = document.createElement('p');
                var townRain = document.createElement('p');
                var townLink = document.createElement('a');
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
                
                townLink.setAttribute('href', simplename + '-9.html');
                townImage.setAttribute('src', townImgSrc);
                townImage.setAttribute('alt', townAltText);

                townLink.appendChild(townImage);

                infoDiv.appendChild(townHeader);
                infoDiv.appendChild(townMotto);
                infoDiv.appendChild(townYear);
                infoDiv.appendChild(townPop);
                infoDiv.appendChild(townRain);
                
                articleBox.appendChild(infoDiv);
                articleBox.appendChild(townLink);

                section.appendChild(articleBox);
            }
        }
    }
}