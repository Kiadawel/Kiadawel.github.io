//script to retrieve user's current date and display in HTML
var today = new Date();

var dayOfWeek = new Array(7);
    dayOfWeek[0] = "Sunday, ";
    dayOfWeek[1] = "Monday, ";
    dayOfWeek[2] = "Tuesday, ";
    dayOfWeek[3] = "Wednesday, ";
    dayOfWeek[4] = "Thursday, ";
    dayOfWeek[5] = "Friday, ";
    dayOfWeek[6] = "Saturday, ";

var currentMonth = new Array(12);
    currentMonth[0] = 'January ';
    currentMonth[1] = 'February ';
    currentMonth[2] = 'March ';
    currentMonth[3] = 'April ';
    currentMonth[4] = 'May ';
    currentMonth[5] = 'June ';
    currentMonth[6] = 'July ';
    currentMonth[7] = 'August ';
    currentMonth[8] = 'September ';
    currentMonth[9] = 'October ';
    currentMonth[10] = 'November ';
    currentMonth[11] = 'December ';

var weekday = dayOfWeek[today.getDay()];
var month = currentMonth[today.getMonth()];
var date = today.getDate();
var year = today.getFullYear();
  
var showDate = weekday + date + ' ' + month + ' ' + year;

document.getElementById("currentdate").innerHTML = showDate;