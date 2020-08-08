const {Schema, Types, model} = require("mongoose");


const schema = new Schema({
    map: {
        type: Types.ObjectId,
        ref: "map",
    },
    data: Buffer,
});

model("file", schema);

