//Function handler to get a JSON data with no external libraries.
var fetchJSON = function(url, func) {

    //Setup the request, its a GET request, and we are expecting json
    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.responseType = "json";
    //Once the request returns, check if its valid, if it is return the function with no arrays.
    request.onload = function() {
        var flag = request.status;
        if (flag == 200) // HTTP200 = OK
            func(null, request.response);
        else
            func(flag);
    };
    //Send the request, it is asychronous so it the fact that this is at the end, doesnt matter.
    request.send();
}

//Looks for the word youtube in the url link.
function verifyVideoLink(url) {

    if (url.indexOf("youtube") !== -1)
        return true;
    return false;
}

//Makes sure the pictures are jpgs or pngs.
function verifyImageURL(url) {

    if (url.indexOf("jpg") !== -1)
        return true;
    else if (url.indexOf("jpeg") !== -1)
        return true;
    else if (url.indexOf("png") !== -1)
        return true;
    return false;
}

//Returns a random int in a range, inclusive.
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Returns a random int in a range, inclusive.
function randomDouble(min, max) {
    return Math.random() * (max - min) + min;
}

//Converts degrees to radians.
function toRads(degrees) {
    return degrees * (3.14 / 180)
}

//get the magnitude of a 3D vector
function magnitude(vector3) {
    return vector3.x * vector3.x + vector3.y * vector3.y + vector3.z * vector3.z;
}

//Calculates some random values for matrix transform CSS rule
function randomMatrixTransform() {

    var scaleX = randomDouble(0, 1);
    var scaleY = randomDouble(0, 1);
    var skewX = randomDouble(0, 0.15);
    var skewY = randomDouble(0, 0.15);

    return "matrix(" + scaleX + ", " + skewY + ", " + skewX + ", " + scaleY + ", 0, 0)";
}

//Creates a random color by generating a string and converting to an int.
function randomColor() {

    return '#' + Math.floor(Math.random() * 16777215).toString(16);
}
