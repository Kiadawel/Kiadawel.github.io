function severityLevel(rangevalue) {
    document.getElementById("rangevalue").innerHTML = rangevalue;
}
function clearForm(){
    document.getElementById("stormform").reset();
}

//function to parse URL found on css-tricks.com
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

function stormForm(){
    var fullName = grabData("name");
        if(fullName == "" || !fullName){
            fullName = "citizen";
        }
        else {
        fullName = fullName.replace('+',' ');
        }
    var zipCode = grabData("zipcode");
        if(zipCode == "" || !zipCode){
        zipCode = "(not given)";
    }
    var stormDate = grabData("stormdate");
        if(stormDate == "" || !stormDate){
            stormDate = 'an unspecified date';
        }
    var stormType = grabData("stormtype");
        if(stormType == "" || !stormType){
            stormType = 'storm';
        }
    var stormSev = grabData("severity");
    var stormReg = grabData("region");
        if (stormReg == 'soda'){
            stormReg = 'Soda Springs';
        }
        else if (stormReg == 'preston'){
            stormReg = 'Preston';
        }
        else if (stormReg == 'fish'){
            stormReg = 'Fish Haven';
        }
        else {
            stormReg = 'Tri-Town';
        }

    var dangerZone; 
        if (grabData("dangerlvl") == 'y'){
            dangerZone = 'are in <strong>danger.</strong> '
            + 'Please contact authorities for instructions on relocation to a safer area.';
        }
        else if (grabData("dangerlvl") == 'm'){
            dangerZone = 'may be in danger. Please be careful!';
        }
        else if (grabData("dangerlvl") == 'n'){
            dangerZone = 'are not in danger. We are glad to hear it!';
        }
        else {
            dangerZone = "are uncertain of your danger level. Please be watchful.";
        }

    var returnString = '<p>' + fullName + ', we appreciate you filling out this '
        + 'Storm Report.</p><p>You have reported a <strong>Level ' + stormSev + ' ' 
        + stormType + '</strong> on ' + stormDate + ' in the ' + stormReg + ' region.</p>'
        + '<p>You have reported that you ' + dangerZone + '</p><p>If more information is '
        + 'needed, our weather experts will contact you shortly via ';

    var eMail = grabData("email");
        if(eMail == "" || !eMail){
            returnString += 'phone at ';
        }
        else {
            eMail = eMail.replace('%40','@');
            returnString += 'email at <strong>' + eMail + '</strong>, or by phone at ';
        }
    var phoneNumber = grabData("telephone");
        returnString += '<strong>' + phoneNumber + '</strong>.';

    document.getElementById('formsummary').innerHTML = returnString;
}
