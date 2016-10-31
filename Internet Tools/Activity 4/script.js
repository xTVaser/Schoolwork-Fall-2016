var dragged;
var startMove = document.getElementById("startmove");
startMove.addEventListener('dragstart', function(e) {
    e.dataTransfer.effectAllowed = 'copy';
    e.dataTransfer.setData('text/uri', "image.jpg");
    e.dataTransfer.setData('text/plain', "hello!");
    e.dataTransfer.setData('text', "hello!");
    dragged = e.target;
}, false);

var endcopy = document.getElementById("endcopy");
endcopy.addEventListener('dragover', function(e) {
    e.dataTransfer.dropEffect = "copy";
    e.preventDefault(); //this is needed
}, false);

endcopy.addEventListener('drop', function(e) {
    e.target.innerHTML = "Ready for another copy!<br>" + dragged.innerHTML;
    e.target.draggable = true;
    e.preventDefault();
}, false);

endcopy.addEventListener('dragstart', function(e) {
    e.dataTransfer.effectAllowed = 'copy';
    e.dataTransfer.setData('text/uri', "image.jpg");
    e.dataTransfer.setData('text/plain', "hello!");
    e.dataTransfer.setData('text', "hello!");
    dragged = e.target;
}, false);

var endmove = document.getElementById("endmove");
endmove.addEventListener('dragover', function(e) {
    e.dataTransfer.dropEffect = "copy";
    e.preventDefault(); //this is needed
}, false);

endmove.addEventListener('drop', function(e) {
    e.target.innerHTML = dragged.innerHTML;
    e.target.draggable = true;
    e.preventDefault();
}, false);
