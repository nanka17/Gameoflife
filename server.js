var express = require("express")
var app = express()
var server = require("http").Server(app)
var io = require("socket.io")(server)
var fs = require('fs')


app.use(express.static('.'))

app.get('/', function (req, res) {
    res.redirect('index.html')
})
server.listen(3000)

matrix = []

grassArr = []

grassEaterArr = []

eaterArr = []

lavaArr = []

demonArr = []

xotArr = []

bombArr = []




Grass = require("./grass")
GrassEater = require("./grassEater")
Eater = require("./eater")
Lava = require("./lava")
Demon = require("./demon")
xot = require("./xot")
bomb = require("./bomb")


function createObject(matrix) {

    for (var y = 0; y < matrix.length; ++y) {

        for (var x = 0; x < matrix[y].length; ++x) {
            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y, 1);
                grassArr.push(gr);
            }
            else if (matrix[y][x] == 2) {
                var ab = new GrassEater(x, y, 2)
                grassEaterArr.push(ab)

            }
            else if (matrix[y][x] == 3) {
                var ea = new Eater(x, y, 3)
                eaterArr.push(ea)

            }
            else if (matrix[y][x] == 4) {
                var lv = new Lava(x, y, 4)
                lavaArr.push(lv)

            }
            else if (matrix[y][x] == 5) {
                var dm = new Demon(x, y, 5)
                demonArr.push(dm)

            }
            else if (matrix[y][x] == 6) {
                var xt = new xot(x, y, 6)
                xotArr.push(xt)

            }
            else if (matrix[y][x] == 7) {
                var bo = new bomb(x, y, 7)
                bombArr.push(bo)

            }


            io.sockets.emit('send matrix', matrix)

        }


    }
}

function generator(matLen, gr, grEat, eat, lava, dem, xt, bomb) {
    let matrix = [];
    for (let i = 0; i < matLen; i++) {
        matrix[i] = [];
        for (let j = 0; j < matLen; j++) {
            matrix[i][j] = 0;
        }
    }
    for (let i = 0; i < gr; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 1;
        }
    }
    for (let i = 0; i < grEat; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 2;
        }
    }
    for (let i = 0; i < eat; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 3;
        }
    }
    for (let i = 0; i < lava; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 4;
        }
    }
    for (let i = 0; i < dem; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 5;
        }
    }
    for (let i = 0; i < xt; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 6;
        }
    }
    for (let i = 0; i < bomb; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 7;
        }
    }
    return matrix;
}

matrix = generator(30, 50, 5, 4, 20, 10, 30, 6)

// io.sockets.emit('send matrix', matrix)
// io.sockets.emit('send grass', grassArr)
// io.sockets.emit('send grassEater', grassEaterArr)
// io.sockets.emit('send eater', eaterArr)
// io.sockets.emit('send demon', demonArr)
// io.sockets.emit('send lava', lavaArr)
// io.sockets.emit('send xot', xotArr)
// io.sockets.emit('send bomb', bombArr)


weath = "summer"

setInterval(function(){
    // console.log(weath);
    
    if(weath == "summer") weath = "autumn"
    else if (weath == "autumn") weath = "winter"
    else if (weath == "winter") weath= "spring"
    else if (weath == "spring") weath="summer"

    io.sockets.emit('send weather', weath)

}, 3000)


function game() {
    for (var i in grassArr) {
        grassArr[i].mul();
    }
    for (var a in grassEaterArr) {
        grassEaterArr[a].mul()
        grassEaterArr[a].eat()

    }
    for (var a in eaterArr) {
        eaterArr[a].eat()

    }
    for (var a in lavaArr) {

        lavaArr[a].mul()
    }
    for (var a in demonArr) {
        demonArr[a].eat()


    }
    for (var a in xotArr) {
        xotArr[a].mul()



    }
    for (var a in bombArr) {
        bombArr[a].die()

    }
    io.sockets.emit("send matrix", matrix)

    // io.sockets.emit('send grass', grassArr)

    // io.sockets.emit('send grassEater', grassEaterArr)

    // io.sockets.emit('send eater', eaterArr)

    // io.sockets.emit('send demon', demonArr)

    // io.sockets.emit('send lava', lavaArr)

    // io.sockets.emit('send xot', xotArr)

    // io.sockets.emit('send bomb', bombArr)



}

var statistics = {}

setInterval(function () {
    statistics.grass = grassArr.length
    statistics.grassEater = grassEaterArr.length
    statistics.eater = eaterArr.length
    statistics.demon = demonArr.length
    statistics.lava = lavaArr.length
    statistics.xot = xotArr.length
    statistics.bomb = bombArr.length

    fs.writeFileSync("statistics.json",
        JSON.stringify(statistics))

}, 1000
)



setInterval(game, 1000)



let flag = true

    io.on('connection', function (socket) {
       if (flag) { 
           createObject(matrix)

            flag = false
        }
       
        
    })



