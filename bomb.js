let LivingCreature = require('./class.js')

module.exports = class bomb extends LivingCreature {
    constructor(x, y) {
        super(x, y)
        this.energy = 5;
    }
    die() {
        this.energy -= 10
    }
}