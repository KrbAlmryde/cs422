// Utilities

function ControlShowerSpray(counter) {
    console.log("Shower!!", counter);
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
        Globals['showerHead'].item(1).visible = true; // show the no-spray icon

        // Turn off all other spray icons
        for (var i = 2; i < Globals['showerHead']._objects.length; i++) {
            Globals['showerHead'].item(i).visible = false;
        };

        Globals['hotButton'].visible = false;
        Globals['coldButton'].visible = false;

        Globals['bathFaucet'].item(1).visible = false;

    } else { // if water is not Flowing

        Globals['waterFlowing'] = true;  // turn the water on!
        Globals['powerButton'].item(2).visible = true  // Show the temperature gradient

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

        Globals['powerButton'].item(2).visible = false  // Hide the temperature gradient
        Globals['showerHead'].item(1).visible = true; // show the no-spray icon

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

        // display the shower-spray button
        Globals['sprayButton'].visible = true;

        Globals['sprayButton'].item(1).visible = true; //
        Globals['sprayButton'].item(2).visible = false;


        Globals['showerHead'].item(1).visible = false; // Hide the no-spray icon
        Globals['showerHead'].item(2).visible = true; // show the default spray icon

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
