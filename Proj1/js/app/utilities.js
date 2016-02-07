// Utilities

function ControlWaterTemp(temp) {
    Globals['tempGradient'].setGradient('fill', {
        x1: Globals['hotWater']+=temp,
        x2: Globals['coldWater']+=temp,
        colorStops: {
            0: 'red',
            1: 'blue'
        }
    });
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
