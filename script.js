function generator(matLen, gr, grEat,eat, lava,dem) {
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
    return matrix;
}

let side = 20;

let matrix = generator(15, 50, 5, 10, 20);


grassArr = []

grassEaterArr = []

eaterArr=[]

lavaArr=[]

demonArr=[]


function setup() {
    frameRate(5);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');
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
            else if (matrix[y][x] == 8) {

            }
        }
    }
    console.log(grassArr);


}

function draw() {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("green");
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
            }
            else if (matrix[y][x] == 2) {
                fill("yellow")
            }
            else if (matrix[y][x] == 3) {
                fill("red")
            }
            else if (matrix[y][x] == 4) {
                fill("orange")
            }
            else if (matrix[y][x] == 5) {
                fill("black")
            }

            rect(x * side, y * side, side, side);


        }
    }

    for (var i in grassArr) {
        grassArr[i].mul();
    }
    for (var a in grassEaterArr) {
        grassEaterArr[a].mul();
        grassEaterArr[a].eat()
    }
    for(var a in eaterArr){
        eaterArr[a].mul()
        eaterArr[a].eat()

    }
    for (var a in lavaArr) {
       
        lavaArr[a].mul()
    }
    for(var a in demonArr){
        demonArr[a].eat()

    }

}



