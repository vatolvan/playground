"use strict"
var date = new Date();
var day;
switch (date.getDay()) {
	case 1:
		day = "Monday"
		break;
	case 2:
		day = "Tuesday"
		break;
	case 3:
		day = "Wednesday"
		break;
	case 4:
		day = "Thursday"
		break;
	case 5:
		day = "Friday"
		break;
	case 6:
		day = "Saturday"
		break;
	case 7:
		day = "Sunday"
		break;
	default:

}

console.log("Today is: " + day)
var hour = d.getHours();
console.log("Current time is: " + (hour < 12 ? hour + " AM" : hour - 12 + " PM") +
 " : " + d.getMinutes() + " : " + d.getSeconds()); 