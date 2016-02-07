// Setup Functions


function SetUpKeyboard() {}

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
        originY: 'center'
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

function SetUpShowerControls() {

    var showerHead = new fabric.Circle({
        radius: 30,
        fill: 'black',
        left: 1635,
        top: 100,
        originX: 'center',
        originY: 'center'
    });


    var button = new fabric.Circle({
      left: 1580,
      top: 425,
      originX: 'center',
      originY: 'center',
      fill: 'grey',
      radius: 50,
      lockMovementX: true,
      lockMovementY: true
    })

    var counter = 2;

    var options = { left: 1580, top: 425, originX: 'center',
                    originY: 'center', scaleX: 1.0, scaleY: 1.0, visible: false }


    var showerOptions = { left: 1635, top: 100,  originX: 'center',
                         originY: 'center', scaleX: 0.5, scaleY: 0.5, visible: false }


    fabric.loadSVGFromURL('js/assets/icons/shower0.svg', function(obj, opt){
        var img = fabric.util.groupSVGElements(obj, opt)
            img.set( options ).visible = true;
            assignColor(img, '#ffffff');

        fabric.loadSVGFromURL('js/assets/icons/shower1.svg', function(obj, opt){
            var img1 = fabric.util.groupSVGElements(obj, opt);
                assignColor( img1.set( options ) , '#ffffff');

            fabric.loadSVGFromURL('js/assets/icons/shower2.svg', function(obj, opt){
                var img2 = fabric.util.groupSVGElements(obj, opt);
                    assignColor( img2.set( options ) , '#ffffff');

                fabric.loadSVGFromURL('js/assets/icons/shower3.svg', function(obj, opt){
                    var img3 = fabric.util.groupSVGElements(obj, opt);
                        assignColor( img3.set( options ) , '#ffffff');

                    var _img = fabric.util.object.clone(img).set(showerOptions)
                    _img.visible = true;
                    Globals['showerHead'] = new fabric.Group(
                        [ showerHead,
                          _img,
                          fabric.util.object.clone(img1).set(showerOptions),
                          fabric.util.object.clone(img2).set(showerOptions),
                          fabric.util.object.clone(img3).set(showerOptions),
                        ])

                    Globals['showerButton'] = new fabric.Group([button, img , img1, img2, img3 ])
                        .scale(0.5)
                        .on('selected', function() {
                            console.log("Shower!!", counter);
                            for (var i = 2; i < Globals['showerButton']._objects.length; i++) {
                                Globals['showerButton'].item(i).visible = counter === i;
                                Globals['showerHead'].item(i).visible = counter === i;
                            };

                            counter++;
                            if (counter > 4)
                                counter = 2;

                            canvas.renderAll();
                            canvas.deactivateAll(); // deselect everything
                        });
                    canvas.add(Globals['showerButton'], Globals['showerHead']);
                })
            });
        });
    });
}


function SetUpBathControls() {
    // var button = new fabric.Circle({
    //     left: 1580,
    //     top: 425,
    //     originX: 'center',
    //     originY: 'center',
    //     fill: 'grey',
    //     radius: 50,
    //     lockMovementX: true,
    //     lockMovementY: true
    // })

    // var options = { left: 1580, top: 425, originX: 'center',
    //         originY: 'center', scaleX: 1.0, scaleY: 1.0, visible: false }

    // fabric.loadSVGFromURL('js/assets/icons/bath0.svg', function(obj, opt){
    //     var img = fabric.util.groupSVGElements(obj, opt);
    //         img.visible = true;
    //         assignColor(img.set( options ), '#ffffff' );

    //     fabric.loadSVGFromURL('js/assets/icons/bath1.svg', function(obj, opt){
    //         var img1 = fabric.util.groupSVGElements(obj, opt);
    //             assignColor(img1.set( options ), '#ffffff' );

    //             Globals['bathButton'] = new fabric.Group( [ button, img, img1 ] )
    //                 .scale(0.5)
    //                 .on('selected', function() {
    //                     console.log("Shower!!", counter);
    //                     for (var i = 2; i < Globals['showerButton']._objects.length; i++) {
    //                         Globals['showerButton'].item(i).visible = counter === i;
    //                         Globals['showerHead'].item(i).visible = counter === i;
    //                     };

    //                     counter++;
    //                     if (counter > 4)
    //                         counter = 2;

    //                     canvas.renderAll();
    //                     canvas.deactivateAll(); // deselect everything
    //                 });

    //             canvas.add(Globals['bathButton']);

    //     })
    // })

    var bathSpout = new fabric.Rect({
        left: 1635,
        top: 950,
        originX: 'center',
        originY: 'center',
        fill: 'grey',
        stroke: 'black',
        width: 60,
        height: 30,
        angle: 0
    });

    bathSpout.hasControls = bathSpout.hasBorders = false;
    bathSpout.lockMovementX = bathSpout.lockMovementY = true;
    canvas.add(bathSpout);
}

function SetUpTempControls() {
    Globals['tempGradient'] = new fabric.Circle({
        left: 1635,
        top: 500,
        originX: 'center',
        originY: 'center',
        fill: 'green',
        stroke: 'black',
        width: 30,
        height: 100,
        radius: 50,
        hasControls: false,
        hasBorders: true,
        lockMovementX: true,
        lockMovementY: true
    });


    Globals['tempGradient'].setGradient('fill', {
        x1: Globals['hotWater'],
        x2: Globals['coldWater'],
        colorStops: {
            0: 'red',
            1: 'blue'
        }
    });
    canvas.add(Globals['tempGradient'])

    fabric.loadSVGFromURL('js/assets/icons/flame.svg', function(obj, opt) {
        var img = fabric.util.groupSVGElements(obj, opt);
        img.set({
            left: 1580,
            top: 525,
            originX: 'center',
            originY: 'center',
            scaleX: 0.1,
            scaleY: 0.1
        })
        .setFill('#ff0000');

        var button = new fabric.Circle({
          left: 1580,
          top: 525,
          originX: 'center',
          originY: 'center',
          fill: 'grey',
          radius: 50,

          // hasBorders: true,
          lockMovementX: true,
          lockMovementY: true
        })

        Globals['hotButton'] = new fabric.Group([button, img ], { hasControls: false }).scale(0.5)

        // Globals['hotButton'].on('mousedown', function() {
        //           Globals['hotButton'].item(0).set('fill', '#ffffff')
        //         console.log("Flame!");
        //         ControlWaterTemp(3);
        //     })

        // Globals['hotButton'].on('mouseup', function() {
        //           Globals['hotButton'].item(0).set('fill', '#000000')
        //     })
            .on('selected', function() {
                console.log("Flame!");
                ControlWaterTemp(3);
            });
        canvas.add(Globals['hotButton'])
    })


    fabric.loadSVGFromURL('js/assets/icons/snowflake.svg', function(obj, opt) {
        var img = fabric.util.groupSVGElements(obj, opt);
        img.set({
            left: 1740,
            top: 525,
            originX: 'center',
            originY: 'center',
            scaleX: 0.1,
            scaleY: 0.1
        })
        .setFill('#0000ff');

        var button = new fabric.Circle({
          left: 1740,
          top: 525,
          originX: 'center',
          originY: 'center',
          fill: 'grey',
          radius: 50,
          lockMovementX: true,
          lockMovementY: true
        })

        Globals['coldButton'] = new fabric.Group([button, img ])
            .scale(0.5)
            .on('selected', function() {
                console.log("SnowFlake!");
                ControlWaterTemp(-3);
            });
        canvas.add(Globals['coldButton'])
    })
}




function SetUpShower() {

    Globals['backWall'] = new fabric.Rect({
      left: 0,
      top: 0,
      fill: 'white',
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
      fill: 'white',
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
      fill: 'white',
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
    Globals['bathSpout'] = new fabric.Rect({
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

    // this lets me 'select' it but I cant keep clicking on it more than once



    Globals['tempText'] = new fabric.Text('default', {
        left: 1500,
        top: 90,
        fontFamily: 'Arial',
        fontSize: 40,
        fontWeight: 'italic',
        originX: 'center',
        originY: 'center',
        hasControls: false,
        hasBorders: false,
        lockMovementX: true,
        lockMovementY: true,
        selectable: false,
        evented: false
    });


    canvas.add( Globals['backWall'],
                Globals['sideWall'],
                Globals['frontWall']
            );
}
