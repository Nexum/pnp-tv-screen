const {Schema, Types, model} = require("mongoose");


const schema = new Schema({
    _id: String,
    active: {
        type: Boolean,
        default: false,
    },
    fow: {
        type: String,
    },
    marker: {
        type: String,
    },
});

model("map", schema);

