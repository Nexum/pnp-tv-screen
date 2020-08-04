const mapModel = require("mongoose").model("map");

export const config = {
    api: {
        bodyParser: {
            json: true,
        },
    },
};

export default async (req, res) => {
    let {_id} = req.query;
    const data = JSON.parse(req.body);

    await mapModel.update({
        _id: _id,
    }, {
        $set: {
            _id: _id,
            fow: data.data,
            marker: data.marker,
        },
    }, {
        upsert: true,
    });

    req.io.emit("map." + _id + ".changed");

    res.json(await mapModel.findOne({_id: _id}));
};