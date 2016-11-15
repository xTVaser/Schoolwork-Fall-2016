var menu = document.getElementById("songMenu");
var audio = document.getElementById("visualizationSong");
var slider = document.getElementById("volSlider");
var topColorDOM = document.getElementById("topColor");
var botColorDOM = document.getElementById("botColor");

var topColor = topColorDOM.value;
var botColor = botColorDOM.value;

audio.src = "../assets/sounds/song1.mp3"; //Default song to play
audio.controls = false;
audio.autoplay = true;
audio.volume = 25/100;
audio.loop = true;

slider.value = 25;
menu.selectedIndex = 0;

var api = new (window.AudioContext || window.webkitAudioContext)();
var anal = api.createAnalyser();

var visualContainer = document.getElementById("visualizationContainer");
var visualCanvas = document.getElementById("visualization");

visualCanvas.style.width = visualContainer.width*0.75;
visualCanvas.style.height = 300;
visualCanvas.width = visualContainer.offsetWidth*0.75;
visualCanvas.height = 300;

var visual = visualCanvas.getContext("2d");
var lastFrame;


function beginVisualization() {

    var init = api.createMediaElementSource(audio);
    init.connect(anal);
    anal.connect(api.destination);

    animate();
}
var barWidth = visual.canvas.width/128/2;
var barPadding = barWidth;
var barHeight = visual.canvas.height;

function animate() {

    visual.clearRect(0, 0, visual.canvas.width, visual.canvas.height);

    streamData = new Uint8Array(128); //128 bins of frequency data
    anal.getByteFrequencyData(streamData);

    for(bin = 0; bin < streamData.length; bin++) {

        //Color of Bar
        var val = streamData[bin];  //From 1 to 255 (max size of a byte)
        var red = val;
        var green = 255 - val;
        var blue = val / 2;

        var gradient = visual.createLinearGradient(visual.canvas.width/2, visual.canvas.height, visual.canvas.width/2, 0);
        gradient.addColorStop("0", botColor);
        gradient.addColorStop("1.0", topColor);

        //Creating Bar
        var barX = (bin * barWidth)+(bin * barPadding);
        visual.fillStyle = gradient;//'rgb(' + red + ', ' + green + ', ' + blue + ')';
        visual.fillRect(barX, barHeight, -barWidth, -barHeight*(val/255));
    }

    requestAnimationFrame(animate);
}

menu.addEventListener("input", function(e) {

    if(e.target.selectedOptions[0].value === "Song 1")
        audio.src = "../assets/sounds/song1.mp3";
    else if(e.target.selectedOptions[0].value === "Song 2")
        audio.src = "../assets/sounds/song2.mp3";
    else if(e.target.selectedOptions[0].value === "Song 3")
        audio.src = "../assets/sounds/song3.mp3";

    audio.play();
});

menu.addEventListener("change", function(e) {

    if(e.target.selectedOptions[0].value === "Song 1")
        audio.src = "../assets/sounds/song1.mp3";
    else if(e.target.selectedOptions[0].value === "Song 2")
        audio.src = "../assets/sounds/song2.mp3";
    else if(e.target.selectedOptions[0].value === "Song 3")
        audio.src = "../assets/sounds/song3.mp3";

    audio.play();
});

slider.addEventListener("change", function(e) {

    audio.volume = e.currentTarget.value/100.0;
});

topColorDOM.addEventListener("change", function(e) {

    topColor = topColorDOM.value;
});

botColorDOM.addEventListener("change", function(e) {

    botColor = botColorDOM.value;
});

beginVisualization();
