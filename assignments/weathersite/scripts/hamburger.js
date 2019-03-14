//function to display or hide the mobile-site notification
function toggleNav(){
    var navDisplay = document.getElementById('navigation');

    if (navDisplay.className === 'navlinks'){
        navDisplay.className += '_show';
    }
    else {
        navDisplay.className = 'navlinks';
    }
}

//function to create navigation header links
function loadNavigation(){
    var navLinks = ['Home', 'Preston', 'Soda Springs','Fish Haven','Storm Center','Gallery'];
    var navBar = document.querySelector('#navigation');

    for(i=0; i<navLinks.length; i++){
        //simplify the name of the page for use in links
        var simplename = navLinks[i].toLowerCase().replace(' ','');
        //check for the weird ones
        if(simplename == 'home'){
            simplename = 'index';
        }

        //create a list item with a link to this page
        var newListItem = document.createElement('li');
        var newLink = document.createElement('a');

        //use the lowercase version for the html link
        //and the original version for the link text
        var linkString = simplename + '.html';

        newLink.setAttribute('href',linkString)
        newLink.textContent = navLinks[i];

        //check to see if the simple name actually matches the page we're on
        //(search URL for the simple name)
        var thisPage = window.location.href.search(simplename);
        if(thisPage != -1){
            //set class to thispage if they match
            newLink.setAttribute('class','thispage');   
        }

        //attach link to list item and list item to the original list
        newListItem.appendChild(newLink)
        navBar.appendChild(newListItem);
    }
}