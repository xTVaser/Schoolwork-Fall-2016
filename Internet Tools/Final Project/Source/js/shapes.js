//Very simple script to make new shapes for ever.

var shapeContainer = document.getElementById("shapeGallery");

function newShape() {

    shapeContainer.style.backgroundColor = randomColor();
    shapeContainer.style.borderRadius = randomInt(1, 100) + "%";
    shapeContainer.style.transform = randomMatrixTransform();
    shapeContainer.style.borderLeft = randomInt(1, 100) + "px solid " + Math.random() > 0.5 ? "transparent" : randomColor();
    shapeContainer.style.borderRight = randomInt(1, 100) + "px solid " + Math.random() > 0.5 ? "transparent" : randomColor();
    shapeContainer.style.borderTop = randomInt(1, 100) + "px solid " + Math.random() > 0.5 ? "transparent" : randomColor();
    shapeContainer.style.borderBottom = randomInt(1, 100) + "px solid " + Math.random() > 0.5 ? "transparent" : randomColor();
    shapeContainer.style.transition = randomDouble(0.25, 2.5) + "s";
}
//Every 2.5 seconds we call it.
setInterval(newShape, 2500);
