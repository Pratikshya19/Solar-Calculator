'use strict';
function addMonths(elem) {
var annualUseKw=0, dailyUseKw=0, i=0, x=0;
var months = document.getElementById(elem).getElementsByTagName('input');

for(i=0; i<months.length; i++) {
    x = Number(months[i].value);
    annualUseKw += x;
}
dailyUseKw = annualUseKw/365
console.log(`DailyUseKW = ${dailyUseKw}`)
return dailyUseKw;

}

function sunHours(){
var hrs;

var theZone = document.forms.solarForm.zone.selectedIndex 
theZone += 1;
switch(theZone){
    case 1:
        hrs = 6;
        break;
    case 2:
        hrs = 5.5;
        break;
    case 3:
        hrs = 4.2;
        break;
    case 4:
        hrs = 4.5;
        break;
    case 5:
        hrs = 3.5;
        break;
    case 6:
        hrs = 0;
        break;
}
console.log(hrs)
return hrs;
}//end

//finding panel choice
function calculatePanel(){
var userChoice = document.forms.solarForm.panel.selectedIndex
 var panelopt = document.forms.solarForm.panel.options
var power = panelopt[userChoice].value
var name = panelopt[userChoice].text
var x = [power, name]
console.log(x)
return x;
}

function calculateSolar(){
var dailyUseKw = addMonths('mpc'); 
console.log(dailyUseKw); //we know how much energy is needed
var sunHoursPerday = sunHours();
console.log(sunHoursPerday); //hrs of sunshine/day

var minKwNeeded = dailyUseKw / sunHoursPerday
console.log(minKwNeeded)
var realKwNeeded = minKwNeeded * 1.25;
console.log(realKwNeeded)

var realWattNeeds = realKwNeeded * 1000;
console.log(realWattNeeds)

var panelInfo = calculatePanel();
var panelOutput = panelInfo[0]
var panelName = panelInfo[1];
console.log(panelOutput)
console.log(panelName)

var panelsNeeded = Math.ceil(realWattNeeds / panelOutput);
console.log(panelsNeeded)

var feedback = "";
feedback += "<p>Based on your avergae daily use of "+Math.round(dailyUseKw)+" kWh, you will need to purchase "+ panelsNeeded+ " "+ panelName+ " brand solar panels to save 100% of electricity bill.  </p>"
feedback += "<h2>Additional Details</h2>"
feedback += "<p>Your average daily electricity consumption: "+Math.round(dailyUseKw)+"kWh/day</p>"
feedback += "<p>Average sunshine hours per day: "+ sunHoursPerday+" hours</p>"
feedback += "<p>Based on the consumption energy needed per hour is: "+ Math.round(realWattNeeds)+ " watts/hour</p>"


document.getElementById("feedback").innerHTML = feedback
}
