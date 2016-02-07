// Globals
var localHeight = 990;
var localWidth = 1860;

var canvas;

// Shower Walls
var Globals = {};
    Globals['waterTemp'] = 0,
    Globals['coldWater'] = 50, //10,
    Globals['hotWater'] = 90, //50,
    Globals['showerSwitch'] = 0,
    Globals['ChildSafe'] = false,
    Globals['Mode'] = 'Shower';



function init() {
    canvas = new fabric.Canvas('c', {
       backgroundColor: "#5555F5" // background blue to help find it
    });

    SetUpBasics();
    SetUpPowerButton()
    SetUpTempControls();
    SetUpSprayControls();
    SetUpAnalogClock();
    SetUpBathControls();
    SetUpChildSafe();
    // as a quick test I could have a 'button' that changes colour when I press it

    // zoomAll(canvas.height / localHeight);
}


function CheckLocalStorage() {
    if (localStorage.hasOwnProperty('testing')) {
        console.log('holyshit it persisted!');
        console.log(localStorage['savedSetting'])
    };
}

function ControlShowerOption() {
    Globals['showerSwitch']++;

    switch(Globals['showerSwitch']){
        case 0:
            console.log('set to showerimage 1');
            break;
        case 1:
            console.log('set to showerimage 2');
            break;
        case 2:
            console.log('set to showerimage 3');
            break;
        default:
            if (Globals['showerActive']) {
                Globals['showerSwitch'] = 1;
            } else {
                Globals['showerSwitch'] = 0;
            };
            console.log('set to showerimage',Globals['showerSwitch']);
            break;
    }

    canvas.renderAll();

}
