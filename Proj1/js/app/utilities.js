// Utilities


function LoadSession() {
    var KRBA = Lockr.get('krba');
    var MODE = KRBA[ Globals['Mode'] ];

    if ( MODE.hasOwnProperty(Globals['User']) ) {
        var USER = MODE[Globals['User']]
        Globals['Language'] = USER[ 'Language']
        Globals['Units'] = USER[ 'Units' ]
        Globals['Spray'] = USER[ 'Spray']
        Globals['ChildSafe'] = USER[ 'ChildSafe' ]
        Globals['hotWater'] = USER[ 'Hot' ]
        Globals['coldWater'] = USER[ 'Cold' ]
        Globals['Debug'] = USER[ 'Debug' ]
    };

    if (Globals['Mode'] === 'Bath') {

        SetUpSettings({left: 460, top: 708})
        SetUpAnalogClock(); // This can stay where it is
        SetUpBathControls();
        SetUpChildSafe( {left: 468, top: 834} );  // give it an object containing position information
        SetUpPowerButton( {left: 534, top: 880} );  // give it an object containing position information
        SetUpAnalogClock(); // This can stay where it is
        SetUpTempControls( {hotL: 516, hotT: 960, coldL: 701, coldT: 960} );  // give it an object containing position information

    } else {
        SetUpSettings({left: 10, top: 126})
        SetUpAnalogClock(); // This can stay where it is
        SetUpChildSafe( {top: 404, left: 1525} );  // give it an object containing position information
        SetUpPowerButton( {left: 1583, top: 452} );  // give it an object containing position information
        SetUpTempControls( {hotL: 1580, hotT: 525, coldL: 1740, coldT: 525} );  // give it an object containing position information
        SetUpSprayControls();

    }
    canvas.renderAll();
    canvas.deactivateAll(); // deselect everything


}

function SaveSession() {
    Globals['Spray'] = Globals['curSpray'];

    Globals['saveButton'].item(1).set('fill', '#ffffff')
    var KRBA = Lockr.get('krba');
    var MODE = KRBA[ Globals['Mode'] ];
    var USER = MODE[ Globals['User'] ];

    if (USER === undefined)
        USER = {};
    USER[ 'Language'] = Globals['Language']
    USER[ 'Units' ] = Globals['Units']
    USER[ 'Spray'] = Globals['Spray']
    USER[ 'ChildSafe' ] = Globals['ChildSafe']
    USER[ 'Hot' ] = Globals['hotWater']
    USER[ 'Cold' ] = Globals['coldWater']
    USER[ 'Debug' ] = Globals['Debug']

    MODE[ Globals['User'] ] = USER;
    KRBA[ Globals['Mode'] ] = MODE;

    Lockr.set('krba', KRBA);
    console.log(localStorage);

    canvas.renderAll();
    canvas.deactivateAll(); // deselect everything
}

function UnitConversion() {
    if (Globals['Units'] === 'F') {
        return (Globals['hotWater']).toFixed(1) + " " + Globals['Units']
    } else {
        return ( (Globals['hotWater'] - 32) / 1.8 ).toFixed(1) + " " + Globals['Units']
    };
}

function ControlShowerSpray(counter) {
    console.log("Shower!!", counter);
    Globals['curSpray'] = counter; // to keep track of it

    if (Globals['waterFlowing']) { // if water is flowing
        Globals['sprayButton'].visible = true;  // show the control!
        for (var i = 1; i < Globals['sprayButton']._objects.length; i++) {
            Globals['sprayButton'].item(i).visible = counter === i; // cycle through the different spray types
            Globals['showerHead'].item(i+1).visible = counter === i;// the same, but skip the empty shower head
        };
    } else { // if water is off
        Globals['sprayButton'].visible = false;  // hide the button completely
        for (var i = 1; i < Globals['sprayButton']._objects.length; i++) {
            Globals['showerHead'].item(i).visible = false;
        };
        Globals['showerHead'].item(1).visible = true;
        counter = 1;
    };

    canvas.renderAll();
    canvas.deactivateAll(); // deselect everything

}

function ControlBathFlow() {
    if ( Globals['waterFlowing'] ) { // We want to turn it off..
        Globals['waterFlowing'] = false  // Indicate that no water is flowing

        Globals['powerButton'].item(2).visible = false  // Hide the temperature gradient
        Globals['powerButton'].item(3).visible = false  // Hide the temperature value

        Globals['hotButton'].visible = false;
        Globals['coldButton'].visible = false;

        Globals['bathFaucet'].item(1).visible = false;

    } else { // if water is not Flowing

        Globals['waterFlowing'] = true;  // turn the water on!
        Globals['powerButton'].item(2).visible = true  // Show the temperature gradient
        Globals['powerButton'].item(3).visible = Globals['Debug'] // If debug is true, show the temperature value
        // display the shower-spray button
        Globals['hotButton'].visible = true;
        Globals['coldButton'].visible = true;

        Globals['bathFaucet'].item(1).visible = true;
    };
    canvas.renderAll();
    canvas.deactivateAll(); // deselect everything

}


function ControlShowerFlow() {
    console.log('waterFlowing', Globals['waterFlowing']);
    // if water is Flowing
    if ( Globals['waterFlowing'] ) { // We want to turn it off..
        Globals['sprayButton'].visible = false;  // Hide the shower button completely
        Globals['waterFlowing'] = false  // Indicate that no water is flowing

        Globals['showerHead'].item(1).visible = true; // show the no-spray icon

        Globals['powerButton'].item(2).visible = false  // Hide the temperature gradient
        Globals['powerButton'].item(3).visible = false  // Hide the temperature value

        // Turn off all other spray icons
        for (var i = 2; i < Globals['showerHead']._objects.length; i++) {
            Globals['showerHead'].item(i).visible = false;
        };

        Globals['hotButton'].visible = false;
        Globals['coldButton'].visible = false;

        // Globals['bathFaucet'].item(1).visible = false;

    } else { // if water is not Flowing

        Globals['waterFlowing'] = true;  // turn the water on!
        Globals['powerButton'].item(2).visible = true  // Show the temperature gradient
        Globals['powerButton'].item(3).visible = Globals['Debug'] // If debug is true, show the temperature value

        // display the shower-spray button
        Globals['sprayButton'].visible = true;


        for (var i = 1; i < Globals['sprayButton']._objects.length; i++) {
            Globals['sprayButton'].item(i).visible = Globals['Spray'] === i; // cycle through the different spray types
            Globals['showerHead'].item(i+1).visible = Globals['Spray'] === i;// the same, but skip the empty shower head
        };

        // Globals['sprayButton'].item(1).visible = true; //
        // Globals['sprayButton'].item(2).visible = false;


        // Globals['showerHead'].item(1).visible = false; // Hide the no-spray icon
        // Globals['showerHead'].item(2).visible = true; // show the default spray icon

        Globals['hotButton'].visible = true;
        Globals['coldButton'].visible = true;

        // Globals['bathFaucet'].item(1).visible = true;
    };
    canvas.renderAll();
    canvas.deactivateAll(); // deselect everything
}


function ControlWaterTemp(temp) {
    // Apply temperature change
    Globals['coldWater']+=temp;
    Globals['hotWater']+=temp;

    if ( Globals['ChildSafe'] )
        if (Globals['hotWater'] > 100) {
            Globals['hotWater'] = 100;
            Globals['coldWater'] = 100-40;
        };

    if (Globals['hotWater'] > 140) {
            Globals['hotWater'] = 140;
            Globals['coldWater'] = 100;
    }
    Globals['temperature'].text = UnitConversion();

    Globals['tempGradient'].setGradient('fill', {
        x1: Globals['coldWater'],
        x2: Globals['hotWater'],
        colorStops: {
            0: 'red',
            1: 'blue'
        }
    });
    console.log( 'hot', Globals['hotWater'], 'cold', Globals['coldWater']);
    canvas.renderAll();
    canvas.deactivateAll(); // deselect everything

}


function UpdateWaterTemp() {
    if (Globals['waterTemp'] > 0.5) {
        Globals['waterControl'].fill = 'red';
        Globals['tempText'].text = "hot";
    }
    else {
        Globals['waterControl'].fill = 'aqua';
        Globals['tempText'].text = "cold";
    }
}



function CreateRect(_left, _top,  _originX, _originY, _fill, _stroke, _width, _height, _angle) {
    var rect = new fabric.Rect({
        left: _left,
        top: _top,
        fill: _fill,
        originX: _originX,
        originY: _originY,
        stroke: _stroke,
        width: _width,
        height: _height,
        angle: _angle
    });
    rect.hasControls = rect.hasBorders = false;
    rect.lockMovementX = rect.lockMovementY = true;

    return rect;
}


function assignColor(obj, colorSet) {
    if (obj.isSameColor && obj.isSameColor() || !obj.paths) {
        obj.setFill(colorSet);
    }
    else if (obj.paths) {
        for (var i = 0; i < obj.paths.length; i++) {
            obj.paths[i].setFill(colorSet);
        }
    }
}



// code adapted from http://jsfiddle.net/tornado1979/39up3jcm/
function zoomAll(SCALE_FACTOR) {

    var objects = canvas.getObjects();
    for (var i in objects) {
        var scaleX = objects[i].scaleX;
        var scaleY = objects[i].scaleY;
        var left = objects[i].left;
        var top = objects[i].top;

        var tempScaleX = scaleX * SCALE_FACTOR;
        var tempScaleY = scaleY * SCALE_FACTOR;
        var tempLeft = left * SCALE_FACTOR;
        var tempTop = top * SCALE_FACTOR;

        objects[i].scaleX = tempScaleX;
        objects[i].scaleY = tempScaleY;
        objects[i].left = tempLeft;
        objects[i].top = tempTop;

        objects[i].setCoords();
    }

    canvas.renderAll();
}
