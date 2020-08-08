const {Schema, Types, model} = require("mongoose");


const schema = new Schema({
    name: String,
    health: Number,
    currentHealth: Number,
    visible: Boolean,
    map: {
        type: String,
        ref: "map",
    },
    width: {
        type: Number,
        default: 200,
    },
    height: {
        type: Number,
        default: 32,
    },
    scale: {
        x: {
            type: Number,
            default: 1,
        },
        y: {
            type: Number,
            default: 1,
        },
    },
    rotation: {
        type: Number,
        default: 0,
    },
    pos: {
        x: {
            type: Number,
            default: 0,
        },
        y: {
            type: Number,
            default: 0,
        },
    },
});

schema.pre("save", function () {
    if (this.health < 1) {
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

