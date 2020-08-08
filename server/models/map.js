const {Schema, Types, model} = require("mongoose");


const schema = new Schema({
    name: String,
    active: {
        type: Boolean,
        default: false,
    },
    background: String,
    fow: {
        type: String,
    },
    marker: {
        type: String,
    },
});

model("map", schema);

