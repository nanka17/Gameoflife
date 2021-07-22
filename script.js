var socket = io()

var side = 30

function setup() {
    createCanvas(30 * side, 30 * side);
    background('#acacac');

}

socket.on("weather", function(data){
    weath = data
})


function nkarel(matrix) {


    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            var obj = matrix[y][x]

            if (obj == 0) {
                fill("gray");
                rect(x * side, y * side, side, side)
            }
            if (obj == 1) {
                if (weath == "summer"){
                fill("green");
                rect(x * side, y * side, side, side)
                }
            else if (weath == "autumn"){
                fill("#333300");
                rect(x * side, y * side, side, side)
            }
            else if (weath == "winter"){
                fill("white");
                rect(x * side, y * side, side, side)
            }
            else if (weath == "spring"){
                fill("#4dffa61");
                rect(x * side, y * side, side, side)
            }
        }
            else if (obj == 2) {
                fill("yellow")
                rect(x * side, y * side, side, side)
            }
            else if (obj == 3) {
                fill("red")
                rect(x * side, y * side, side, side)
            }
            else if (obj == 4) {
                fill("orange")
                rect(x * side, y * side, side, side)
            }
            else if (obj == 5) {
                fill("black")
                rect(x * side, y * side, side, side)
            }
            else if (obj == 6) {
                fill("lime")
                rect(x * side, y * side, side, side)
            }
            else if (obj == 7) {
                fill("purple")
                rect(x * side, y * side, side, side)
            }

        }
    }
}
function logGrass(a) {
    console.log(a.length)

}
function logGrassEater(a) {
    console.log(a.length)
}
function logEater(a) {
    console.log(a.length)
}
function logDemon(a) {
    console.log(a.length)
}
function logLava(a) {
    console.log(a.length)
}
function logXot(a) {
    console.log(a.length)
}
function logBomb(a) {
    console.log(a.length)
}



// setInterval(
//     function () {
//         socket.on('send grass', logGrass)
//         socket.on('send grassEater', logGrassEater)
//         socket.on('send eater', logEater)
//         socket.on('send demon', logDemon)
//         socket.on('send lava', logLava)
//         socket.on('send xot', logXot)
//         socket.on('send bomb', logBomb)
//         
//     }, 1000
// )
setInterval(
    function () {
    socket.on('send matrix', nkarel)
}, 1000)