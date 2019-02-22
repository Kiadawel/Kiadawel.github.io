//script to retrieve user's current date and display in HTML
function currentDate(){
    var today = new Date();

    var dayOfWeek = ["Sunday, ","Monday, ","Tuesday, ","Wednesday, ",
                    "Thursday, ","Friday, ","Saturday, "]

    var currentMonth = ['January ','February ','March ','April ',
                    'May ','June ','July ','August ','September ',
                    'October ','November ','December ']

    var weekday = dayOfWeek[today.getDay()];
    var month = currentMonth[today.getMonth()];
    var date = today.getDate();
    var year = today.getFullYear();
    
    var showDate = weekday + date + ' ' + month + ' ' + year;

    document.getElementById("currentdate").innerHTML = showDate;
}