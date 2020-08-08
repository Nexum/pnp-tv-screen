const mapModel = require("mongoose").model("map");

export default async (req, res) => {
    let {_id} = req.query;

    await mapModel.update({
    }, {
        $set: {
            active: false,
        },
    }, {
        multi: true,
    });

    await mapModel.update({
        _id: _id,
    }, {
        $set: {
            active: true,
        },
    }, {
        upsert: true,
    });

    req.io.emit("map.activated");

    res.json(await mapModel.findOne({_id: _id}));
};