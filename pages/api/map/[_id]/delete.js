const mapModel = require("mongoose").model("map");

export default async (req, res) => {
    let {_id} = req.query;

    await mapModel.remove({
        _id: _id,
    });

    req.io.emit("map.deleted");
    req.io.emit("map." + _id + ".changed");

    res.json({
        success: true,
    });
};