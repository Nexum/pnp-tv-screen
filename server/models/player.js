const {Schema, Types, model} = require("mongoose");


const schema = new Schema({

    name: String,
    playerName: String,

});

const playerModel = model("player", schema);


(async () => {
    const result = await playerModel.update({
        name: "gm",
    }, {
        $set: {
            name: "gm"
        }
    }, {
        upsert: true
    });
})()

