// Setup Functions

function SetUpKeyboard() {}

function SetUpUserModel() {}

function SetUpModes() {

    var bath = new fabric.Circle({
        radius: 100,
        fill: 'grey',
        left: 701,
        top: 500,
        originX: 'center',
        originY: 'center',
        hasControls: false,
        hasBorders: true,
        lockMovementX: true,
        lockMovementY: true

    })

    fabric.loadSVGFromURL('js/assets/bathing/bathtub.svg', function(obj, opt){
        var img = fabric.util.groupSVGElements(obj, opt);
            img.set( { left: 701, top: 500,
                        originX: 'center',
                        originY:'center',
                        scaleX: 3.0,
                        scaleY: 3.0,
                        visible: true
                    } )

        Globals['BathMode'] = new fabric.Group([ bath, img])
            .on('selected', function() {
                Globals['Mode'] = 'Bath'
                SetUpAnalogClock(); // This can stay where it is
                SetUpBathControls();
                SetUpChildSafe( {left: 468, top: 834} );  // give it an object containing position information
                SetUpPowerButton( {left: 534, top: 880} );  // give it an object containing position information
                SetUpAnalogClock(); // This can stay where it is
                SetUpTempControls( {hotL: 516, hotT: 960, coldL: 701, coldT: 960} );  // give it an object containing position information


                canvas.renderAll();
                canvas.deactivateAll(); // deselect everything

            })
        canvas.add(Globals['BathMode']);
    })


    var shower = new fabric.Circle({
        radius: 100,
        fill: 'grey',
        left: 1017,
        top: 500,
        originX: 'center',
        originY: 'center',
        hasControls: false,
        hasBorders: true,
        lockMovementX: true,
        lockMovementY: true
    })

    fabric.loadSVGFromURL('js/assets/bathing/shower.svg', function(obj, opt){
        var img = fabric.util.groupSVGElements(obj, opt);
            img.set( { left: 1017, top: 500,
                        originX: 'center',
                        originY:'center',
                        scaleX: 0.35,
                        scaleY: 0.35,
                        visible: true
                    } )

        Globals['ShowerMode'] = new fabric.Group([ shower, img])
            .on('selected', function() {
                Globals['Mode'] = 'Shower';

                SetUpAnalogClock(); // This can stay where it is
                SetUpChildSafe( {top: 404, left: 1525} );  // give it an object containing position information
                SetUpPowerButton( {left: 1583, top: 452} );  // give it an object containing position information
                SetUpTempControls( {hotL: 1580, hotT: 525, coldL: 1740, coldT: 525} );  // give it an object containing position information
                SetUpSprayControls();
                // SetUpBathControls()

                canvas.renderAll();
                canvas.deactivateAll(); // deselect everything

            })
        canvas.add(Globals['ShowerMode']);
    })
}


/**
 *  Creates a Child Safety switch and button which controls the temperature of the
 *  water such that when active water will not be hotter than 100F/40C
 *
 *  On click, the button with change the face of the child to be one of a smiling
 *  baby, in the case where child safety is active, and a sad faced baby, when
 *  it is inactive.
 */
function SetUpChildSafe(pos) {

    var button = new fabric.Circle({
        radius: 200,
        fill: 'grey',
        left: 500,
        top: 500,
        originX: 'center',
        originY: 'center'
    })

    fabric.loadSVGFromURL('js/assets/icons/sad9.svg', function(obj, opt){
        var img = fabric.util.groupSVGElements(obj, opt)
            img.set( { left: 500, top: 500,
                        originX: 'center',
                        originY:'center',
                        visible: true
                    } )

        fabric.loadSVGFromURL('js/assets/icons/baby67.svg', function(obj, opt){
            var img1 = fabric.util.groupSVGElements(obj, opt);
                img1.set( { left: 500, top: 500,
                            originX: 'center',
                            originY:'center',
                            visible: false
                        } )

            Globals['ChildSafeButton'] = new fabric.Group([button, img, img1], {top: pos.top, left: pos.left})
            Globals['ChildSafeButton']
                .scale(0.12)
                .on('selected', function() {
                    if (Globals['ChildSafe']) {
                        Globals['ChildSafe'] = false;
                        Globals['ChildSafeButton'].item(1).visible = true;
                        Globals['ChildSafeButton'].item(2).visible = false;
                    } else {
                        Globals['ChildSafe'] = true;
                        Globals['ChildSafeButton'].item(1).visible = false;
                        Globals['ChildSafeButton'].item(2).visible = true;
                    }
                    canvas.renderAll();
                    canvas.deactivateAll(); // deselect everything
                })
            canvas.add(Globals['ChildSafeButton'])
        })
    })
}


/**
 * A simple Analog Clock to be displayed during a shower and a bath to inform the
 * user how long they have been in the shower
 */
function SetUpAnalogClock() {
  var pos = [ {t:442, l:548}, {t:472, l:571}, {t:503, l:577},
              {t:534, l:571}, {t:564, l:549}, {t:580, l:501},
              {t:564, l:456}, {t:534, l:428}, {t:503, l:418},
              {t:472, l:435}, {t:442, l:461}, {t:430, l:500} ];

    var face = new fabric.Circle({
        radius: 90,
        fill: 'grey',
        left: 500,
        top: 500,
        originX: 'center',
        originY: 'center',
        hasControls: false,
        hasBorders: true,
        lockMovementX: true,
        lockMovementY: true

    })

    var analogClock = [ face ];

    for (var i = 1; i < 13; i++) {
        var opts = { left: pos[i-1].l, top: pos[i-1].t, fontFamily: 'Arial',
                     fontSize: 30, originX: 'center', originY: 'center',
                     text: i.toString()
                   }
        analogClock.push( new fabric.Text('default', opts) )
        analogClock.push(new fabric.Rect({left:500, top:500, fill: 'black', width:40, height:4 }))
        analogClock.push(new fabric.Rect({left:500, top:500, fill: 'black', width:4, height:60 }))
    };

    Globals['analogClock'] = new fabric.Group( analogClock, {top: 205, left: 1588}).scale(0.55)
    canvas.add(Globals['analogClock'])
}


/***
 * Creates the button that changes the Spray type of the shower
 * In addition to attaching the icons of the shower itself
 *
 * Button should only be displayed when the shower is actively ON
 * Otherwise it should dissapear entirely and not be an option for use
 */
function SetUpSprayControls() {
    // pop this one off in order to modify it later
    canvas.remove(Globals['showerHead']);

    var button = new fabric.Circle({
      left: 1660, //1580,
      top: 425, //425,
      originX: 'center',
      originY: 'center',
      fill: 'grey',
      radius: 50,
      visible: true,
      lockMovementX: true,
      lockMovementY: true
    })

    var counter = 1;

    var options = { left: 1660, top: 425, originX: 'center', originY: 'center',
                    scaleX: 1.0, scaleY: 1.0, visible: false }

    var showerOptions = { left: 1635, top: 100,  originX: 'center', originY: 'center',
                          scaleX: 0.5, scaleY: 0.5, visible: false }

    fabric.loadSVGFromURL('js/assets/bathing/shower0.svg', function(obj, opt){   // No Spray image
        var img = fabric.util.groupSVGElements(obj, opt)
            img.set( showerOptions ); img.visible = true;
            assignColor(img, '#ffffff');

        fabric.loadSVGFromURL('js/assets/bathing/shower1.svg', function(obj, opt){  // Rain spray
            var img1 = fabric.util.groupSVGElements(obj, opt);
                assignColor( img1.set( options ) , '#ffffff');

            fabric.loadSVGFromURL('js/assets/bathing/shower2.svg', function(obj, opt){  // Machine Gun Spray
                var img2 = fabric.util.groupSVGElements(obj, opt);
                    assignColor( img2.set( options ) , '#ffffff');

                fabric.loadSVGFromURL('js/assets/bathing/shower3.svg', function(obj, opt){  // Mixed Spray
                    var img3 = fabric.util.groupSVGElements(obj, opt);
                        assignColor( img3.set( options ) , '#ffffff');

                    Globals['showerHead'] = new fabric.Group(
                        [ Globals['showerHead'],
                          img,
                          fabric.util.object.clone(img1).set(showerOptions),
                          fabric.util.object.clone(img2).set(showerOptions),
                          fabric.util.object.clone(img3).set(showerOptions),
                        ])

                    Globals['sprayButton'] = new fabric.Group([button, img1, img2, img3 ], {visible: false})
                        .scale(0.5)
                        .on('selected', function() {
                            ControlShowerSpray(counter);
                            counter++;
                            if (counter > 3)
                                counter = 1;
                        });
                    canvas.add(Globals['sprayButton'], Globals['showerHead']);
                })
            });
        });
    });
}




/**
 *
 */
function SetUpPowerButton(pos) {

    fabric.loadSVGFromURL('js/assets/icons/power107.svg', function(obj, opt) {
        var img = fabric.util.groupSVGElements(obj, opt);
        img.set({
            left: 500,
            top: 500,
            originX: 'center',
            originY: 'center',
            fill: "#ffffff"
        }).scale(0.2)

        var power = new fabric.Circle({
            left: 500,
            top: 500,
            originX: 'center',
            originY: 'center',
            fill: 'grey',
            stroke: 'black',
            radius: 50,
            hasControls: false,
            hasBorders: true,
            lockMovementX: true,
            lockMovementY: true
        })


        Globals['tempGradient'] = new fabric.Circle({
            left: 500,
            top: 500,
            originX: 'center',
            originY: 'center',
            fill: 'black',
            stroke: 'black',
            radius: 50,
            hasControls: false,
            hasBorders: true,
            lockMovementX: true,
            lockMovementY: true,
            visible: false
        })
        .setGradient('fill', {
            x1: Globals['coldWater'],
            x2: Globals['hotWater'],
            colorStops: {
                0: '#ff0000',
                1: '#0000ff'
            }
        });

        Globals['powerButton'] = new fabric.Group([ power, img, Globals['tempGradient'] ], {left: pos.left, top: pos.top})
            .on('selected', function() {
                if ( Globals['Mode'] === 'Shower' )
                    ControlShowerFlow();
                else
                    ControlBathFlow();
            })
        // add our powerButton to the canvas
        canvas.add( Globals['powerButton'] );

    })
}


/**
 * Creates buttons and a temperature Gradient display which controls the
 * temperature of the water. By pressing either the 'hot' or 'cold' button, a
 * visual representation of the temperature is displayed on via temperature
 * gradient.
 *
 * If the system is in debug mode, a numerical value displaying the temperature
 * will be displayed on top of the Gradient in either Celsius or Fahrenheit
 *
 * Finally, should 'ChildSafe Mode' be active, the temperature will stop at 100
 */
function SetUpTempControls(pos) {

    fabric.loadSVGFromURL('js/assets/icons/flame.svg', function(obj, opt) {
        var img = fabric.util.groupSVGElements(obj, opt);
        img.set({
            left: pos.hotL, // 1580,
            top: pos.hotT, // 525,
            originX: 'center',
            originY: 'center',
            scaleX: 0.1,
            scaleY: 0.1
        })
        .setFill('#ff0000');

        var button1 = new fabric.Circle({
            left: pos.hotL, // 1580,
            top: pos.hotR, // 525,
            originX: 'center',
            originY: 'center',
            fill: 'grey',
            radius: 50,
            // lockMovementX: true,
            // lockMovementY: true
        })

        Globals['hotButton'] = new fabric.Group([button1, img ], { visible: false })
            .scale(0.5)
            .on('selected', function() {
                console.log("Flame!");
                ControlWaterTemp(3);
            });
        canvas.add(Globals['hotButton'])
    })


    fabric.loadSVGFromURL('js/assets/icons/snowflake.svg', function(obj, opt) {
        var img = fabric.util.groupSVGElements(obj, opt);
        img.set({
            left: pos.coldL, // 1740,
            top: pos.coldT, //525,
            originX: 'center',
            originY: 'center',
            scaleX: 0.1,
            scaleY: 0.1
        })
        .setFill('#0000ff');

        var button2 = new fabric.Circle({
            left: pos.coldL, // 1740,
            top: pos.coldT, //525,
            originX: 'center',
            originY: 'center',
            fill: 'grey',
            radius: 50,
            // lockMovementX: true,
            // lockMovementY: true
        })

        Globals['coldButton'] = new fabric.Group([button2, img ], { visible: false })
            .scale(0.5)
            .on('selected', function() {
                console.log("SnowFlake!");
                ControlWaterTemp(-3);
            });
        canvas.add(Globals['coldButton'])
    })
}


function SetUpBathControls() {
    canvas.remove(Globals['bathFaucet'])

    var options = { left: 1635, top: 950, originX: 'center', originY: 'center',
                    scaleX: 0.55, scaleY: 0.45, visible: false
                  }

    fabric.loadSVGFromURL('js/assets/bathing/river3.svg', function(obj, opt){
        var img = fabric.util.groupSVGElements(obj, opt);
            assignColor(img.set( options ), '#0000ff' );

        Globals['bathFaucet'] = new fabric.Group( [ Globals['bathFaucet'], img ] )
        canvas.add(Globals['bathFaucet']);
    })
}


function SetUpBasics() {
    Globals['waterFlowing'] = false;

    Globals['backWall'] = new fabric.Rect({
      left: 0,
      top: 0,
      fill: '#fffbd6',
      stroke: 'black',
      width: 450,
      height: localHeight,
      angle: 0,
      hasControls: false,
      hasBorders: true,
      lockMovementX: true,
      lockMovementY: true
    });

    Globals['sideWall'] = new fabric.Rect({
      left: 450,
      top: 0,
      fill: '#fffbd6',
      stroke: 'black',
      width: 960,
      height: localHeight,
      angle: 0,
      hasControls: false,
      hasBorders: true,
      lockMovementX: true,
      lockMovementY: true
    });

    Globals['frontWall'] = new fabric.Rect({
      left: 1410,
      top: 0,
      fill: '#fffbd6',
      stroke: 'black',
      width: 450,
      height: localHeight,
      angle: 0,
      hasControls: false,
      hasBorders: true,
      lockMovementX: true,
      lockMovementY: true
    });


    // Get out Bath Spout
    Globals['bathFaucet'] = new fabric.Rect({
        left: 1635,
        top: 950,
        originX: 'center',
        originY: 'center',
        fill: 'grey',
        stroke: 'black',
        width: 60,
        height: 30,
        angle: 0,
        hasControls: false,
        hasBorders: true,
        lockMovementX: true,
        lockMovementY: true
    });

    Globals['showerHead'] = new fabric.Circle({
        radius: 30,
        fill: 'black',
        left: 1635,
        top: 100,
        originX: 'center',
        originY: 'center',
        hasControls: false,
        hasBorders: true,
        lockMovementX: true,
        lockMovementY: true
    });

    canvas.add( Globals['backWall'],
                Globals['sideWall'],
                Globals['frontWall'],
                Globals['bathFaucet'],
                Globals['showerHead']
            );
}
