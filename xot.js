let LivingCreature = require('./class.js')

module.exports = class xot extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index)
    }
    mul() {
        this.multiply++;
        var emptyCells = this.chooseCell(0);
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

       
        if (newCell && this.multiply >= 5) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 6;

            var newxot = new xot(newX, newY, 6);
            xotArr.push(newxot);
            this.multiply = 0;
        }
    }

}
