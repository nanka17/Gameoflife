var express = require("express")
var app = express()
var server = require("http").Server(app)
var io = require("socket.io")(server)

app.use(express.static('.'))

app.get('/', function (req, res) {
    res.redirect('index.html')
})
server.listen(3000)

matrix =[]

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

function generator(matLen, gr, grEat,eat, lava,dem, xt, bomb) {
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
matrix = generator(30, 50, 20, 10, 20 , 2, 10, 3);   
console.log(matrix);

io.sockets.emit('send matrix', matrix)


function game() {
    for (var i in grassArr) {
        grassArr[i].mul();
    }
    for (var a in grassEaterArr) {
        grassEaterArr[a].eat()
        // grassEaterArr[a].mul()
        


    }
    for (var a in eaterArr) {
        eaterArr[a].move()
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

}



setInterval(game, 1000)

io.on('connection', function (socket) {
    createObject(matrix)

})
