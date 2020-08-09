const {Schema, Types, model} = require("mongoose");


const schema = new Schema({
    map: {
        type: Types.ObjectId,
        ref: "map",
    },
    data: Buffer,
    type: {
        type: String,
        enum: [
            "map",
            "snapshot",
        ],
    },
});

model("file", schema);

