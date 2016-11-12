//ctx.fillRect(0, 0, 10, volume);

var canvas = document.getElementById('canvasNonLogo');
fitToContainer(canvas);

function fitToContainer(canvas) {
    // Make it visually fill the positioned parent
    canvas.style.width = '75%';
    canvas.style.height = '350px';
    // ...then set the internal size to match
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
}

var theCanvas = canvas;
var theContext = theCanvas.getContext("2d");

function drawScreen() {
    //background
    theContext.fillStyle = "#ffffaa";
    theContext.fillRect(0, 0, 500, 300);

    //text
    theContext.fillStyle = "#000000";
    theContext.font = "20px _sans";
    theContext.textBaseline = "top";
    theContext.fillText("IM A CANVAS!", 195, 80);

    //box
    theContext.strokeStyle = "#000000";
    theContext.strokeRect(5, 5, 490, 290);

}

drawScreen();
