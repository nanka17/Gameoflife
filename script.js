var socket = io()

var side = 30

function setup() {
    createCanvas(20 * side, 20 * side);
    background('#acacac');
    
}


function nkarel(matrix) {


    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            var obj = matrix[y][x]

            if(obj == 0){
                fill("gray");
                rect(x * side, y * side, side, side)
            }
            else if (obj == 1) {
                fill("green");
                rect(x * side, y * side, side, side)
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
function logGrass(a){
    console.log(a.length)

} 
function logGrassEater(a){
        console.log(a.length)
}
function logEater(a){
    console.log(a.length)
}
function logDemon(a){
    console.log(a.length)
}
function logLava(a){
    console.log(a.length)
}
function logXot(a){
    console.log(a.length)
}
function logBomb(a){
    console.log(a.length)
}


setInterval(
    function() { 
        socket.on('send grass', logGrass)
        socket.on('send grassEater', logGrassEater)
        socket.on('send eater', logEater)
        socket.on('send demon', logDemon)
        socket.on('send lava', logLava)
        socket.on('send xot', logXot)
        socket.on('send bomb', logBomb)
        socket.on('send matrix', nkarel)
    }, 1000
)

