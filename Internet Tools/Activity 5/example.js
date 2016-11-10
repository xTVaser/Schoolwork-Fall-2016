var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    spritesheet = new Image();
    paused = true;

var runnerCells = [{
        left: 0,
        top: 0,
        width: 47,
        height: 64
    }, {
        left: 55,
        top: 0,
        width: 44,
        height: 64
    }, {
        left: 107,
        top: 0,
        width: 39,
        height: 64
    }, {
        left: 152,
        top: 0,
        width: 46,
        height: 64
    }, {
        left: 208,
        top: 0,
        width: 49,
        height: 64
    }, {
        left: 265,
        top: 0,
        width: 46,
        height: 64
    }, {
        left: 320,
        top: 0,
        width: 42,
        height: 64
    }, {
        left: 380,
        top: 0,
        width: 35,
        height: 64
    }, {
        left: 425,
        top: 0,
        width: 35,
        height: 64
    }];

var sprite = {
    posX: canvas.width + 20,
    posY: canvas.height - 115,
    imagePos: 0
};

spritesheet.src = "./running-sprite-sheet.png";

var framesPerSecond = 20;
var velocityX = 50 / framesPerSecond; // pixels/second

spritesheet.onload = function() {

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(
        spritesheet,
        runnerCells[sprite.imagePos].left,
        runnerCells[sprite.imagePos].top,
        runnerCells[sprite.imagePos].width,
        runnerCells[sprite.imagePos].height,
        sprite.posX,
        sprite.posY,
        runnerCells[sprite.imagePos].width,
        runnerCells[sprite.imagePos].height
    )

    setInterval(function() {

            context.clearRect(0, 0, canvas.width, canvas.height);
            sprite.posX -= velocityX;
            if(sprite.posX < -35)
                sprite.posX = canvas.width + 20;
            sprite.imagePos++;
            if(sprite.imagePos > 8)
                sprite.imagePos = 0;

            context.drawImage(
                spritesheet,
                runnerCells[sprite.imagePos].left,
                runnerCells[sprite.imagePos].top,
                runnerCells[sprite.imagePos].width,
                runnerCells[sprite.imagePos].height,
                sprite.posX,
                sprite.posY,
                runnerCells[sprite.imagePos].width,
                runnerCells[sprite.imagePos].height
            );
    }, 1000 / framesPerSecond);
};



onmousedown=function(event){
    console.log(paused);
    if(paused == true)
        paused = false;
    else
        paused = true;
    event.preventDefault();
    event.stopPropagation();
};
