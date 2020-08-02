const {Schema, Types, model} = require("mongoose");


const schema = new Schema({
    name: String,
    health: Number,
    currentHealth: Number,
});

schema.pre("save", function () {
    if(this.health < 1) {
        this.health = 1;
    }

    if (this.currentHealth === undefined) {
        this.currentHealth = this.health;
    }

    if (this.currentHealth > this.health) {
        this.currentHealth = this.health;
    }
});


model("creature", schema);

