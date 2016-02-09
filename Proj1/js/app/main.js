// Globals
var localHeight = 990;
var localWidth = 1860;

var canvas;

// Shower Walls
var Globals = {};
    Globals['waterTemp'] = 0,
    Globals['coldWater'] = 50, //10,
    Globals['hotWater'] = 90, //50,
    Globals['ChildSafe'] = true,
    Globals['Mode'] = 'Shower';
    Globals['User'] = 'me',  // This could 'me' or new
    Globals['Language'] = 'English',
    Globals['Units'] = 'F', // C
    Globals['Debug'] = false,
    Globals['Spray'] = 1, // 2, 3
    Globals['curSpray'] = 1 // 2, 3




function init() {
    canvas = new fabric.Canvas('c', {
       backgroundColor: "#5555F5" // background blue to help find it
    });
    CheckLocalStorage();
    SetUpBasics();
    SetUpModes();

    // SetUpChildSafe();  // give it an object containing position information
    // SetUpPowerButton();  // give it an object containing position information
    // SetUpTempControls();  // give it an object containing position information

    // Should be called by the Modes' callback

    // zoomAll(canvas.height / localHeight);
}


function CheckLocalStorage() {
    if (Lockr.get('krba') === undefined) {  // This browser doesnt know us
        Lockr.set('krba',
                {
                    'Bath': {'me': {'Language': 'English', 'Units': 'F', 'Spray': 2, 'ChildSafe': false } },
                    'Shower': {'me':{}}
                }
            )
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
