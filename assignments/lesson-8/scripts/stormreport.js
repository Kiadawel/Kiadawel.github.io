function severityLevel(rangevalue) {
    document.getElementById("rangevalue").innerHTML = rangevalue;
}
function clearForm(){
    document.getElementById("fullname").value = null;
    document.getElementById("email").value = null;
    document.getElementById("telephone").value = null;
    document.getElementById("zipcode").value = null;

    document.getElementById("stormdate").value = null;
    document.getElementById("stormtype").value = "";
    document.getElementById("severity").value = 1;
    document.getElementById("rangevalue").innerHTML = 1;
    document.getElementById("stormregion").value = null;

    document.getElementById("dangeryes").checked = false;
    document.getElementById("dangermaybe").checked = false;
    document.getElementById("dangerno").checked = false;

    document.getElementById("addlinfo").value = null;
}
function stormForm(){
    var fullName = document.getElementById("fullname").value;
        if(fullName == ""){
            fullName = "citizen";
        }
    var eMail = document.getElementById("email").value;
        if(eMail == ""){
            eMail = "(not given)";
        }
    var phoneNumber = document.getElementById("telephone").value;
        if(phoneNumber == ""){
            phoneNumber = "(not given)";
        }
    var zipCode = document.getElementById("zipcode").value;
        if(zipCode == ""){
        zipCode = "(not given)";
    }

    var stormDate = document.getElementById("stormdate").value;
        if(stormDate == ""){
            stormDate = 'an unspecified date';
        }
    var stormType = document.getElementById("stormtype").value;
        if(stormType == ""){
            stormType = 'storm';
        }
    var stormSev = document.getElementById("severity").value;
    var stormReg = document.getElementById("stormregion").value;
        if (stormReg == 'soda'){
            stormReg = 'Soda Springs';
        }
        else if (stormReg == 'preston'){
            stormReg = 'Preston';
        }
        else if (stormReg == 'fish'){
            stormReg = 'Fish Haven';
        }
        else if (stormReg == 'Select Region...'){
            stormReg = 'Tri-Town';
        }

    var dangerZone; 
        if (document.getElementById("dangeryes").checked == true){
            dangerZone = 'are in danger. Please contact authorities for instructions on relocation to a safer area.';
        }
        if (document.getElementById("dangermaybe").checked == true){
            dangerZone = 'may be in danger. Please be careful!';
        }
        else if (document.getElementById("dangerno").checked == true){
            dangerZone = 'are not in danger. We are glad to hear it!';
        }
        else {
            dangerZone = "are uncertain of your danger level. Please be watchful.";
        }

    var extraComments = document.getElementById("addlinfo").value;

    var returnString = '<p> Thank you, ' + fullName + ', for submitting a '
        + 'Storm Report. The following information has been sent to our '
        + 'weather experts.</p><p>Your email: ' + eMail + '<br>Your phone number: '
        + phoneNumber + '<br> Your zip code: ' + zipCode + '</p><p>'
        + 'You have reported a level ' + stormSev + ' ' + stormType + ' on ' + stormDate
        + ' in the ' + stormReg + ' region.</p><p>You have reported that you ' + dangerZone
        + ' Your additional comments:</p><p>"' + extraComments + '"</p>';

    document.getElementById('formsummary').innerHTML = returnString;
}