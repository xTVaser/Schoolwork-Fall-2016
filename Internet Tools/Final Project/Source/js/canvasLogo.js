var logoCanvasContainer = document.getElementById("canvasLogoContainer");
var logoCanvas = document.getElementById("canvasLogo");

logoCanvas.style.width = logoCanvasContainer.width;
logoCanvas.style.height = 55;
logoCanvas.width = logoCanvas.offsetWidth;
logoCanvas.height = 55;

var logo = logoCanvas.getContext("2d");
var prevFrame;

logo.font = "300 25px roboto";
logo.textBaseline = "middle";
logo.fillStyle = "#FFFFFF";

var letters;

function initLogo() {

    letters = [];
    var fullText = "Tyler Wilding";
    var letterSpacing = 0; //Extra space in between.
    var leftJustify = (logoCanvas.width/2)-(logo.measureText(fullText).width/2); // Starting position for first letter
    while(fullText != "") {

        letters.push({

            character: fullText.charAt(0),
            x: leftJustify+letterSpacing,
            y: logoCanvas.height/2,
            velX: Math.random() < 0.5 ? randomDouble(-5, -2.5) : randomDouble(2.5, 5),
            velY: Math.random() < 0.5 ? randomDouble(-5, -2.5) : randomDouble(2.5, 5),
            opacity: 0,
            draw: function() {
                logo.fillStyle = "rgba(255, 255, 255, " + this.opacity + ")";
                logo.fillText(this.character, this.x, this.y);
            }
        });

        leftJustify += logo.measureText(fullText.charAt(0)).width; //Move ahead the width of the character
        fullText = fullText.substr(1); //Delete the first character
    }

    for(i = 0; i < letters.length; i++)
        letters[i].draw();

    interval = setInterval(function() {

        logo.clearRect(0, 0, logoCanvas.width, logoCanvas.height);
        for(i = 0; i < letters.length; i++) {

            letters[i].opacity += 0.1;
            letters[i].draw();
        }

        if(letters[0].opacity >= 1.0)
            clearInterval(interval);
    }, 60);
}

function updateLetters() {

    logo.clearRect(0, 0, logoCanvas.width, logoCanvas.height);
    for(i = 0; i < letters.length; i++) {

        var temp = letters[i];

        if(temp.x + temp.velX > logoCanvas.width || temp.x + temp.velX < 0) {

            temp.velX = -temp.velX;
            temp.opacity -= 0.1;
        }
        if(temp.y + temp.velY > logoCanvas.height || temp.y + temp.velY < 0) {

            temp.velY = -temp.velY;
            temp.opacity -= 0.1;
        }

        temp.draw();
        temp.x += temp.velX;
        temp.y += temp.velY;
    }

    prevFrame = window.requestAnimationFrame(updateLetters);
}

logoCanvas.addEventListener('mouseover', function(e) {
    prevFrame = window.requestAnimationFrame(updateLetters);
});

logoCanvas.addEventListener('mouseout', function(e) {
    window.cancelAnimationFrame(prevFrame);
    logo.clearRect(0, 0, logoCanvas.width, logoCanvas.height);
    initLogo();
});

initLogo();
