class Lava extends LivingCreature {
    constructor(x, y) {
        super(x, y)
        this.energy = 5;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(character) {
        this.getNewCoordinates()
        return super.chooseCell(character)
    }
    mul() {
        this.multiply++;
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);
        console.log(emptyCells)

        if (newCell && this.multiply >= 8) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 5;

            var newDemon = new Demon(newX, newY);
            demonArr.push(newDemon);
            this.multiply = 0;
        }
    }


    eat() {
        var emptyCells = this.chooseCell(1)
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
        if (newCell) {

            this.energy++
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
            for (var i in lavaArr) {
                if (newX == lavaArr[i].x && newY == lavaArr[i].y) {
                    lavaArr.splice(i, 1);
                    break;
                }
            }



        }

    }
    die() {
        matrix[this.y][this.x] = 0
        for (var i in lavaArr) {
            if (this.x == lavaArr[i].x && this.y == lavaArr[i].y) {
                lavaArr.splice(i, 1);
                break;
            }
        }
    }
}
