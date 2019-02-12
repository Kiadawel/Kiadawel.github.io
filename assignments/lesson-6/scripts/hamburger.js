function toggleNav(){
    var navDisplay = document.getElementById('navigation');

    if (navDisplay.className === 'navlinks'){
        navDisplay.className += '_show';
    }
    else {
        navDisplay.className = 'navlinks';
    }
}