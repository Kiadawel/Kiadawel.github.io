function loadNav(){
    var navLinks = ['Temples','Reservation','Services','Contact'];
    var navLoader = document.querySelector('#navloader');
    var navList = document.createElement('ul');

    for(i=0; i<navLinks.length; i++){
        //simplify the page name for later use
        var simplename = navLinks[i].toLowerCase();

        //check URL for which page we're currently on
        var currentPage = window.location.href.search(simplename);

        //continue to build the navigation
        var navItem = document.createElement('li'); 
        var navAnchor = document.createElement('a');
        var navIcon = document.createElement('img');
        var navLabel = document.createElement('span');

        var linkPath = simplename + '.html'; 
        var iconPath = 'images/navicon_' + simplename + '.png';

            if(currentPage != -1){
                navAnchor.setAttribute('class','currentpage');
            }
            else{
                navAnchor.setAttribute('href',linkPath);
            }

            navIcon.setAttribute('src',iconPath);
            navIcon.setAttribute('alt',navLinks[i]);

            navLabel.setAttribute('class','navtext');
            navLabel.textContent = navLinks[i];

        //add the icon and the link name to the link
        navAnchor.appendChild(navIcon);
        navAnchor.appendChild(navLabel);

        //add the link to the list item
        navItem.appendChild(navAnchor);

        //add the list item to the list
        navList.appendChild(navItem);
    }
    //once all list items are loaded, add the list to the container
    navLoader.appendChild(navList);
}

function loadFoot(){
    var pageFooter = '<div class="footerlinks">' +
        '<p>&copy; 2019 Kimi Weldon</p>' +
        '<a href="about.html">About</a>' +
        '<a href="attribution.html">Attribution</a>' +
        '</div>' +
        '<div class="social">' +
            '<a href="https://www.facebook.com" rel="noreferrer" target="_blank"><img src="images/facebook.png" alt="Facebook"></a>' +
            '<a href="https://www.twitter.com" rel="noreferrer" target="_blank"><img src="images/twitter.png" alt="Twitter"></a>' +
            '<a href="https://www.instagram.com" rel="noreferrer" target="_blank"><img src="images/instagram.png" alt="Instagram"></a>' +
        '</div>';
    document.getElementById('footloader').innerHTML = pageFooter;
}