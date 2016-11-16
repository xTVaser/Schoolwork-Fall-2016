var table = document.getElementById("results")
table.innerHTML += "<tr><th>Ounces</th><th>Grams</th><th>Millitres</th></tr>"

for(i = 0; i < 25; i++) {

    table.innerHTML += "<tr><td>"+(i+1)+"</td><td>"+((i+1)*28.35)+"</td><td>"+((i+1)*28.413)+"</td></tr>"
}

var div = document.getElementById("question3")

var userInput = "10";//prompt("Give me a number NOW!!!")

var array = new Array(parseInt(userInput))

var a = 1
var b = 1
var temp = 0

for(i = 0; i < array.length; i++) {

    if(i == 0)
        array[i] = 1
    else {
        array[i] = b
        temp = b
        b = a + b
        a = temp
    }
}

for(i = 0; i < array.length; i++) {

    div.innerHTML += array[i] + ", "
}

var q2 = document.getElementById("question2");

var input = parseInt(prompt("Give number please"));

for(i = 0; i < input/2; i++) {

    for(x = 0; x < input/2; x++) {
        q2.innerHTML += "&nbsp"
    }

    for(j = 0; j < i*2+1; j++) {

        q2.innerHTML += "* ";
    }

    q2.innerHTML += "<br>";
}

for(i = input/2; i > 0; i--) {

    for(j = 0; j < i*2+1; j++) {

        q2.innerHTML += "* ";
    }

    q2.innerHTML += "<br>";
}
