// Setup Functions

function SetUpKeyboard() {}

function SetUpUserModel() {
    var KRBA = Lockr.get('krba');
    var MODE = KRBA[ Globals['Mode'] ];

    var count = 0;
    Globals['Users'] = [];

    for (usr in MODE) {

        var button = new fabric.Circle({
            radius: 50,
            fill: 'grey',
            left: 701 + (120 * count),
            top: 500,
            originX: 'center',
            originY: 'center',
            hasControls: false,
            hasBorders: true,
            lockMovementX: true,
            lockMovementY: true
        })


        var textParams = {
             top: 500,
             left: 701 + (120 * count),
             fontSize: 30,
             fontFamily: 'Helvetica',
             originX: 'center',
             originY: 'center',
             visible: true,
             fill: '#ffffff',
             text: usr.toString()
        }

        var userText = new fabric.Text('default', textParams )
        var userGroup = new fabric.Group( [ button, userText ])
            .on('selected', function() {
                Globals['User'] = usr;
                console.log('Fuck you! usergroup', Globals['User']);
                LoadSession()
            })
        Globals['Users'].push(userGroup);
        canvas.add(userGroup);
        count++
    }


    fabric.loadSVGFromURL('js/assets/icons/plussign1.svg', function(obj, opt){
      var button = new fabric.Circle({
            radius: 50,
            fill: 'grey',
            left: 701,
            top: 630,
            originX: 'center',
            originY: 'center',
            hasControls: false,
            hasBorders: true,
            lockMovementX: true,
            lockMovementY: true
        })
        var img = fabric.util.groupSVGElements(obj, opt);
            img.set( { left: 701, top: 630,
                        originX: 'center',
                        originY:'center',
                        scaleX: 0.1,
                        scaleY: 0.1,
                        visible: true
                    } )
        Globals['newUser'] = new fabric.Group([button, img])
            .on('selected', function() {
                console.log('Fuck you! newUser');
                var phrase = ""
                switch(Globals['Language']) {
                    case 'Italiano':
                        phrase = "Inserire fino a quattro lettere per il nome qui";
                        break;
                    case 'French':
                        phrase = "Entrez jusqu'à quatre lettres pour le nom ici";
                        break;
                    case 'Basque':
                        phrase = "Idatzi gehienez lau letrak name for hemen";
                        break;
                    case 'Afrikaans':
                        phrase = "Jy kan slegs vier letters vir naam hier";
                        break;
                    case 'English':
                    default:
                        phrase = 'Enter up to four letters for name here'
                        break;
                }
                var itext = new fabric.IText(phrase, {
                                 top: 500,
                                 left: 701,
                                 fontSize: 30,
                                 fontFamily: 'Helvetica',
                                 originX: 'center',
                                 originY: 'center',
                                 visible: true,
                                 fill: '#000000'
                            })
                for (var i = 0; i < Globals['Users'].length; i++) {
                    Globals['Users'][i].visible = false;
                    canvas.remove(Globals['Users'][i]);
                    // Globals['Users'].pop()
                };

                canvas.add(itext).setActiveObject(itext);
                itext.enterEditing();

                setTimeout(function(){
                    if(itext.text === '' || itext.text.length > 4)
                        Globals['User'] = 'you!';
                    else
                        Globals['User'] = itext.text;
                    console.log(Globals['User'], itext.text);
                    canvas.remove(itext);
                    canvas.remove(Globals['newUser'])
                    LoadSession();
                }, 8000)
            })
        canvas.add(Globals['newUser'])
    })

}


function SetUpSettings(pos) {
    for (var i = 0; i < Globals['Users'].length; i++) {
        Globals['Users'][i].visible = false;
        canvas.remove(Globals['Users'][i]);
    };
    // canvas.remove(Globals['Users'].pop());
    console.log("SetUpSettings", Globals['Users']);
    canvas.remove(Globals['newUser']);


    var on = false;
    var saved = false;

    var parameters = { radius: 30, fill: 'grey', left: 500, top: 500,
                       originX: 'center', originY: 'center'  }

    // Generating the F/C options
    var textParams = {
                 left: 500, top: 505, fontFamily: 'Helvetica', fontSize: 40,
                 originX: 'center', originY: 'center', text: Globals['Units']
            }

    var button = new fabric.Circle( parameters )
    var imgText = new fabric.Text('default', textParams )
    Globals['unitsButton'] = new fabric.Group([button, imgText], {visible: false, left: pos.left+80*3, top: pos.top })
        .on('selected', function(){
            var text = Globals['unitsButton'].item(1).text;
            console.log(text);
            if ( text === 'F' )
                text = 'C'
            else
                text = 'F'
            Globals['Units'] = Globals['unitsButton'].item(1).text = text;
            Globals['temperature'].text = UnitConversion();
            canvas.renderAll();
            canvas.deactivateAll(); // deselect everything
        })


    fabric.loadSVGFromURL('js/assets/icons/floppy13.svg', function(obj, opt) {
        var imgFloppy = fabric.util.groupSVGElements(obj, opt)  // Gear
            imgFloppy.set({
                left: 500, top: 500,
                originX: 'center', originY: 'center',
                scaleX: 0.1, scaleY: 0.1,
                visible: true
            })

        var button = new fabric.Circle( parameters )
        Globals['saveButton'] = new fabric.Group( [button, imgFloppy] , {visible: false, left: pos.left+80*4, top: pos.top })
            .on(
                {
                    "mousedown": function(){
                        SaveSession();
                    },

                    "mouseup": function(){
                        Globals['saveButton'].item(1).set('fill', '#000000')
                        canvas.renderAll();
                        canvas.deactivateAll(); // deselect everything

                    }
                })


        fabric.loadSVGFromURL('js/assets/icons/information15.svg', function(obj, opt) {
            var imgInfo = fabric.util.groupSVGElements(obj, opt)  // Gear
                imgInfo.set({
                    left: 500, top: 500,
                    originX: 'center', originY: 'center',
                    scaleX: 0.1, scaleY: 0.1,
                    fill: 'blue',
                    visible: true
                })
            var button = new fabric.Circle( parameters )
            Globals['infoButton'] = new fabric.Group([button, imgInfo], {visible: false, left: pos.left+80*2, top: pos.top })
                .on('selected', function(){
                    if (Globals['Debug']) {
                        Globals['Debug'] = false;
                        Globals['infoButton'].item(1).set('fill', '#0000ff')
                        Globals['temperature'].visible = false;
                    } else {
                        Globals['Debug'] = true;
                        Globals['infoButton'].item(1).set('fill', '#ffffff');
                        if (Globals['waterFlowing'])
                            Globals['temperature'].visible = true;
                    }
                    canvas.renderAll();
                    canvas.deactivateAll(); // deselect everything

                })

            fabric.loadSVGFromURL('js/assets/icons/characters1.svg', function(obj, opt) {
                var imgLang = fabric.util.groupSVGElements(obj, opt)  // Gear
                    imgLang.set({
                        left: 500, top: 500,
                        originX: 'center', originY: 'center',
                        scaleX: 0.4, scaleY: 0.4,
                        fill: 'blue',
                        visible: true
                    })

                var button = new fabric.Circle( parameters )
                Globals['languageButton'] = new fabric.Group([button, imgLang], {visible: false, left: pos.left+80*1, top: pos.top })
                    .on('selected', function() { })

                fabric.loadSVGFromURL('js/assets/icons/settings49.svg', function(obj, opt) {
                    var imgGear = fabric.util.groupSVGElements(obj, opt)  // Gear
                        imgGear.set({
                            left: 500, top: 500,
                            originX: 'center', originY: 'center',
                            scaleX: 0.1, scaleY: 0.1,
                            visible: true
                        })

                        var button = new fabric.Circle( parameters )
                        Globals['settingsButton'] = new fabric.Group([button, imgGear], {visible: true, left: pos.left, top: pos.top })
                            .on('selected', function(){
                                console.log('on', on);
                                if (on) {
                                    on = false
                                    Globals['settingsButton'].item(1).set('fill', '#000000')
                                    Globals['saveButton'].visible=false
                                    Globals['infoButton'].visible=false
                                    Globals['languageButton'].visible=false
                                    Globals['unitsButton'].visible=false

                                } else {
                                    on = true
                                    Globals['settingsButton'].item(1).set('fill', '#ffffff')
                                    Globals['saveButton'].visible=true
                                    Globals['infoButton'].visible=true
                                    Globals['languageButton'].visible=true
                                    Globals['unitsButton'].visible=true
                                }
                                canvas.renderAll();
                                canvas.deactivateAll(); // deselect everything
                            })

                        canvas.add( Globals['settingsButton'],
                                     Globals['saveButton'],
                                     Globals['infoButton'],
                                     Globals['languageButton'],
                                     Globals['unitsButton'] )
                })
            })
        })
    })
}

/**
 * Determines the layout of all the things!
 * User selects either Bath or Shower MODE, which calls the appropriate functions
 * which thereby determines the layout of the overall interface
 */
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
                SetUpUserModel()
                // SetUpSettings({left: 460, top: 708})
                // SetUpAnalogClock(); // This can stay where it is
                // SetUpBathControls();
                // SetUpChildSafe( {left: 468, top: 834} );  // give it an object containing position information
                // SetUpPowerButton( {left: 534, top: 880} );  // give it an object containing position information
                // SetUpAnalogClock(); // This can stay where it is
                // SetUpTempControls( {hotL: 516, hotT: 960, coldL: 701, coldT: 960} );  // give it an object containing position information

                Globals['ShowerMode'].visible = false;
                Globals['BathMode'].visible = false;
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
                SetUpUserModel()
                // SetUpSettings({left: 10, top: 126})
                // SetUpAnalogClock(); // This can stay where it is
                // SetUpChildSafe( {top: 404, left: 1525} );  // give it an object containing position information
                // SetUpPowerButton( {left: 1583, top: 452} );  // give it an object containing position information
                // SetUpTempControls( {hotL: 1580, hotT: 525, coldL: 1740, coldT: 525} );  // give it an object containing position information
                // SetUpSprayControls();
                // SetUpBathControls()
                Globals['ShowerMode'].visible = false;
                Globals['BathMode'].visible = false;
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

    if (! Globals.hasOwnProperty('ChildSafeButton') ) {
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
                            visible: (Globals['ChildSafe'] === false )  // if ChildSafe is off, then turn the sad face on
                        } )

            fabric.loadSVGFromURL('js/assets/icons/baby67.svg', function(obj, opt){
                var img1 = fabric.util.groupSVGElements(obj, opt);
                    img1.set( { left: 500, top: 500,
                                originX: 'center',
                                originY:'center',
                                visible: (Globals['ChildSafe'] === true)  // if ChildSafe is on, then turn the happy face on
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
    };
}


/**
 * A simple Analog Clock to be displayed during a shower and a bath to inform the
 * user how long they have been in the shower
 */
function SetUpAnalogClock() {
    if (!Globals.hasOwnProperty('analogClock')){
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
    if ( !Globals.hasOwnProperty('sprayButton') ) {
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
}




/**
 * This activates the water
 */
function SetUpPowerButton(pos) {
    if ( !Globals.hasOwnProperty('powerButton') ) {
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



            var textParams = {
                         left: 500, top: 505, fontFamily: 'Helvetica', fontSize: 28,
                         originX: 'center', originY: 'center', visible: false,
                         fill: '#ffffff', text: UnitConversion()
                    }

            Globals['temperature'] = new fabric.Text('default', textParams )

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

            Globals['powerButton'] = new fabric.Group([ power, img, Globals['tempGradient'], Globals['temperature'] ], {left: pos.left, top: pos.top})
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
}


/**
 * Creates buttons and a temperature Gradient display which controls the
 * temperature of the water. By pressing either the 'hot' or 'cold' button, a
 * visual representation of the temperature is displayed on via temperature
 * gradient.
 *
 * If the system is in debug MODE, a numerical value displaying the temperature
 * will be displayed on top of the Gradient in either Celsius or Fahrenheit
 *
 * Finally, should 'ChildSafe Mode' be active, the temperature will stop at 100
 */
function SetUpTempControls(pos) {

    if ( !Globals.hasOwnProperty('hotButton') ) {
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
                .on({
                    "mousedown": function(){
                        console.log("Flame!");
                        Globals['hotButton'].item(1).set('fill', '#ffffff')
                        ControlWaterTemp(3);
                    },
                    "mouseup": function(){
                        Globals['hotButton'].item(1).set('fill', '#ff0000')
                        canvas.renderAll();
                        canvas.deactivateAll(); // deselect everything
                    }
                });
            canvas.add(Globals['hotButton'])
        })
    }

    if ( !Globals.hasOwnProperty('coldButton') ) {
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
    if ( !Globals.hasOwnProperty('backWall') ) {
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
}
