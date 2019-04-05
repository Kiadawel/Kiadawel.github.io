function contactForm(){

    var userName = grabData('name').replace('+',' ');
    var eMail = grabData('email').replace('%40','@');
    var phone = grabData('telephone');

    var returnString = 'Thank you, ' + userName + ', for sending your comments to us.</p><p>We will respond via <strong>' + eMail;                    
        if(phone == '' || !phone){
            returnString += '</strong>'
        }
        else {
            returnString += '</strong> or call you at <strong>' + phone; 
        }
    returnString += '</strong> within 2 business days.'
    document.getElementById('contactsummary').innerHTML = returnString;
}

function grabData(field){
    var stringBit = window.location.search.substring(1);
    var splitter = stringBit.split('&');
    for (var i=0;i<splitter.length;i++) {
        var formset = splitter[i].split('=');
        if(formset[0] == field) {
            return formset[1];
        }
    }
    return false;
}
