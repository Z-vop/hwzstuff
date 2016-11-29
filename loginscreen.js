function changeWifi(){

//here is the var that represents the img for the wifi symbol
var wifilogo = document.getElementById("wifi");


//code that makes it so the wifi is blue it will turn red
if (wifilogo.getAttribute('src') === 'animationwifiBlue.gif') {
wifilogo.src = "animationwifiRed.gif";
    }else{wifilogo.src="animationwifiBlue.gif";}
}