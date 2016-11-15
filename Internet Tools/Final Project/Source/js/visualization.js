//Visualization in Javascript Canvas.
//THIS WILL NOT WORK ON LOCAL BROWSING DUE TO BROWSER SECURITY POLICIES.
//FOR MORE INFORMATION https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy

//Get DOM elements
var menu = document.getElementById("songMenu");
var audio = document.getElementById("visualizationSong");
var slider = document.getElementById("volSlider");
var topColorDOM = document.getElementById("topColor");
var botColorDOM = document.getElementById("botColor");
var visualContainer = document.getElementById("visualizationContainer");
var visualCanvas = document.getElementById("visualization");

//Set the initial gradient colors.
var topColor = topColorDOM.value;
var botColor = botColorDOM.value;

//Setup the audio, we dont want to see the controls, we want it to start on its own, etc.
audio.src = "../assets/sounds/song1.mp3"; //Default song to play
audio.controls = false;
audio.autoplay = true;
audio.volume = 25/100; //Volume is from 0-1.0.
audio.loop = true;

//Set the default slider position and the menu position.
slider.value = 25;
menu.selectedIndex = 0;

//Setup the canvas size and the container size to match.
visualCanvas.style.width = visualContainer.width*0.75;
visualCanvas.style.height = 300;
visualCanvas.width = visualContainer.offsetWidth*0.75;
visualCanvas.height = 300;

//Get the context, and save the previous frame
var visual = visualCanvas.getContext("2d");
var lastFrame;

//Use the WebAudio HTML5 API, this syntax is used to help compatibility.
var api = new (window.AudioContext || window.webkitAudioContext)();
//The analyzer node, used to get frequency data.
var anal = api.createAnalyser();

//Init function for visualization
function beginVisualization() {

    //Initialize the MediaElement fromt he audio element, this is where same-origin policy matters.
    var init = api.createMediaElementSource(audio);
    //Connect the analyzer node to the media element so it can listen.
    init.connect(anal);
    anal.connect(api.destination);
    //Begin animation
    animate();
}

//Setting up sizes of the bars.
var barWidth = visual.canvas.width/128/2; //There are 128 frequency bands, and we have padding between them, so half size.
var barPadding = barWidth;
var barHeight = visual.canvas.height;

//Main animation function
function animate() {

    //Start off by clearing the rectangle.
    visual.clearRect(0, 0, visual.canvas.width, visual.canvas.height);

    //New javascript variable that is designed for quick access.
    streamData = new Uint8Array(128); //128 bins of frequency data
    //Load the frequency data into the byte array.
    anal.getByteFrequencyData(streamData);

    //Loop through all bins
    for(bin = 0; bin < streamData.length; bin++) {

        //Color of Bar
        var val = streamData[bin];  //From 1 to 255 (max size of a byte)

        //Create a gradient, that starts at the bottom and goes to the top, middle of both.
        var gradient = visual.createLinearGradient(visual.canvas.width/2, visual.canvas.height, visual.canvas.width/2, 0);
        //Add the color stops.
        gradient.addColorStop("0", botColor);
        gradient.addColorStop("1.0", topColor);

        //Creating Bar
        var barX = (bin * barWidth)+(bin * barPadding);
        visual.fillStyle = gradient;
        visual.fillRect(barX, barHeight, -barWidth, -barHeight*(val/255));
    }

    //Recall the animaiton
    lastFrame = requestAnimationFrame(animate);
}

//Song menu listener, changes the song that is playing and calls play
menu.addEventListener("input", function(e) {

    if(e.target.selectedOptions[0].value === "Song 1")
        audio.src = "../assets/sounds/song1.mp3";
    else if(e.target.selectedOptions[0].value === "Song 2")
        audio.src = "../assets/sounds/song2.mp3";
    else if(e.target.selectedOptions[0].value === "Song 3")
        audio.src = "../assets/sounds/song3.mp3";

    audio.play();
});

//Same thing, but Edge doesn't like the input listener.
menu.addEventListener("change", function(e) {

    if(e.target.selectedOptions[0].value === "Song 1")
        audio.src = "../assets/sounds/song1.mp3";
    else if(e.target.selectedOptions[0].value === "Song 2")
        audio.src = "../assets/sounds/song2.mp3";
    else if(e.target.selectedOptions[0].value === "Song 3")
        audio.src = "../assets/sounds/song3.mp3";

    audio.play();
});

//When the user changes the volume.
slider.addEventListener("change", function(e) {

    audio.volume = e.currentTarget.value/100.0;
});

//When the user changes the colors.
topColorDOM.addEventListener("change", function(e) {

    topColor = topColorDOM.value;
});
botColorDOM.addEventListener("change", function(e) {

    botColor = botColorDOM.value;
});

//Start the animation once everything is loaded.
beginVisualization();
