var table = document.getElementById("results")
table.innerHTML += "<tr><th>Ounces</th><th>Grams</th><th>Millitres</th></tr>"

for(i = 0; i < 25; i++) {

    table.innerHTML += "<tr><td>"+(i+1)+"</td><td>"+((i+1)*28.35)+"</td><td>"+((i+1)*28.413)+"</td></tr>"
}

var div = document.getElementById("question3")

var userInput = prompt("Give me a number NOW!!!")

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
