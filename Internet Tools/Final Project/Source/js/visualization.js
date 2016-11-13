var menu = document.getElementById("songMenu");
var audio = document.getElementById("visualizationSong");
var slider = document.getElementById("volSlider");

audio.src = "../assets/sounds/song1.mp3"; //Default song to play
audio.controls = false;
audio.autoplay = true;

var api = new AudioContext() || new webkitAudioContext();
var anal = api.createAnalyser();

var visualContainer = document.getElementById("visualizationContainer");
var visualCanvas = document.getElementById("visualization");

visualCanvas.style.width = visualContainer.width/2;
visualCanvas.style.height = 300;
visualCanvas.width = visualContainer.offsetWidth/2;
visualCanvas.height = 300;

var visual = visualCanvas.getContext("2d");
var lastFrame;


function beginVisualization() {

    var init = api.createMediaElementSource(audio);
    init.connect(anal);
    anal.connect(api.destination);

    animate();
}

function animate() {

    streamData = new Uint8Array(128); //128 bins of frequency data
    anal.getByteFrequencyData(streamData);

    for(bin = 0; bin < streamData.length; bin++) {

        var val = streamData[bin];
        var red = val;
        var green = 255 - val;
        var blue = val / 2;
        visual.fillStyle = 'rgb(' + red + ', ' + green + ', ' + blue + ')';
        visual.fillRect(bin * 2, 0, 2, visual.height);
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

slider.addEventListener("change", function(e) {

    audio.volume = e.currentTarget.value/100.0;
});

beginVisualization();
