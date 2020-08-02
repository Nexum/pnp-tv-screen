const {Schema, Types, model} = require("mongoose");


const schema = new Schema({

    _id: String,
    data: Buffer,

});

model("file", schema);

