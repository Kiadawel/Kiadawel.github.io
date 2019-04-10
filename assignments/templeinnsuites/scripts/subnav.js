function loadSubNav(){
    var subNavLinks = ['Amenities', 'Missionaries', 'Receptions'];
    var subNavList = document.querySelector('#subnavigation');

    for(i=0; i<subNavLinks.length; i++){
        var simplename = subNavLinks[i].toLowerCase();
        var newListItem = document.createElement('li');
        var newLink = document.createElement('a');

        var linkString = simplename + '.html';

        newLink.setAttribute('href',linkString)
        newLink.textContent = subNavLinks[i];

        var currentSubPage = window.location.href.search(simplename);
        if(currentSubPage != -1){
            newLink.setAttribute('class','currentsubpage');   
        }

        //attach link to list item and list item to the original list
        newListItem.appendChild(newLink)
        subNavList.appendChild(newListItem);
    }
}
function toggleSubNav(){
    var subNav = document.getElementById('subnavigation');

    if (subNav.className === 'subnav_hide'){
        subNav.className = 'subnav_show';
    }
    else {
        subNav.className = 'subnav_hide';
    }
}