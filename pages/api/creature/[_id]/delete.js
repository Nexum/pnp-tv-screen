const creatureModel = require("mongoose").model("creature");

export default async (req, res) => {
    let {_id} = req.query;

    await creatureModel.remove({
        _id: _id,
    });

    req.io.emit("creature." + _id + ".deleted");
    req.io.emit("creatures.changed");

    res.json({
        success: true,
    });
};