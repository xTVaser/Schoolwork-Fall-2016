//Generates the Canvas Logo on the Top Left

//Get the DOM elements
var logoCanvasContainer = document.getElementById("canvasLogoContainer");
var logoCanvas = document.getElementById("canvasLogo");

//Set the canvas width and height and have it match the contianers
logoCanvas.style.width = logoCanvasContainer.width;
logoCanvas.style.height = 55;
logoCanvas.width = logoCanvas.offsetWidth;
logoCanvas.height = 55;

//Get the canvas context
var logo = logoCanvas.getContext("2d");
//Store the previous frame
var prevFrame;

//Set the font style.
logo.font = "300 25px roboto";
logo.textBaseline = "middle";
logo.fillStyle = "#FFFFFF";

var letters;

//Sets up the logo and the letters.
function initLogo() {

    letters = [];
    var fullText = "Tyler Wilding";
    var letterSpacing = 0; //Extra space in between.
    var leftJustify = (logoCanvas.width/2)-(logo.measureText(fullText).width/2); // Starting position for first letter
    while(fullText != "") { //Loop through the string, each letter will be seperate object.

        //Each object has the character, x and y position, its movement, and opacity, and the functio to draw it.
        letters.push({
            //Get the top character off the string
            character: fullText.charAt(0),
            x: leftJustify+letterSpacing,   //Move it over the required amount
            y: logoCanvas.height/2,         //Vertical centered
            velX: Math.random() < 0.5 ? randomDouble(-5, -2.5) : randomDouble(2.5, 5),
            velY: Math.random() < 0.5 ? randomDouble(-5, -2.5) : randomDouble(2.5, 5),
            opacity: 0, //Opacity starts at 0 so we can fade it in.
            draw: function() { //We can loop through the letter arrays and callthe draw function on each letter to update them.
                logo.fillStyle = "rgba(255, 255, 255, " + this.opacity + ")";
                logo.fillText(this.character, this.x, this.y);
            }
        });
        //Move to the next character spot, we use the measureText on just the letter itself so we can position them all naturally.
        leftJustify += logo.measureText(fullText.charAt(0)).width; //Move ahead the width of the character
        fullText = fullText.substr(1); //Delete the first character
    }

    //Initial draw, they are invisible at this point.
    for(i = 0; i < letters.length; i++)
        letters[i].draw();

    //Call the draw function, increasing the opacity by 10% each time at 60fps
    interval = setInterval(function() {

        logo.clearRect(0, 0, logoCanvas.width, logoCanvas.height);
        for(i = 0; i < letters.length; i++) {

            letters[i].opacity += 0.1;
            letters[i].draw();
        }

        //If we are are opaque, stop the interval.
        if(letters[0].opacity >= 1.0)
            clearInterval(interval);
    }, 1000/60);
}

//Main animate function, called every frame.
function updateLetters() {

    //Clear the entire canvas
    logo.clearRect(0, 0, logoCanvas.width, logoCanvas.height);
    //For every letter
    for(i = 0; i < letters.length; i++) {

        var temp = letters[i];
        //Move it in its direction, if it hits the boundaries, reverse directions
        //Everytime a letter hits the walls it gets 10% more transparent
        if(temp.x + temp.velX > logoCanvas.width || temp.x + temp.velX < 0) {

            temp.velX = -temp.velX;
            temp.opacity -= 0.1;
        }
        if(temp.y + temp.velY > logoCanvas.height || temp.y + temp.velY < 0) {

            temp.velY = -temp.velY;
            temp.opacity -= 0.1;
        }
        //Draw with the updated values from the previous frames.
        temp.draw();
        temp.x += temp.velX;
        temp.y += temp.velY;
    }

    //Use requestAnimationFrame instead of intervals as this is more consistent across browsers and allows us to store the previous frame.
    prevFrame = window.requestAnimationFrame(updateLetters);
}

//When the user mouses over the logo, start animation by calling the animation function that will tail recursively call itself.
logoCanvas.addEventListener('mouseover', function(e) {
    prevFrame = window.requestAnimationFrame(updateLetters);
});

//When the user moves off the logo.
logoCanvas.addEventListener('mouseout', function(e) {
    //Stop the animation
    window.cancelAnimationFrame(prevFrame);
    //Clear the canvas
    logo.clearRect(0, 0, logoCanvas.width, logoCanvas.height);
    //Redraw the logo.
    initLogo();
});

initLogo();
