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

    await mapModel.update({}, {
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
            ...data,
            _id: _id,
            active: true,
        },
    }, {
        upsert: true,
    });

    req.io.emit("map." + _id + ".changed");
    req.io.emit("map.created");

    res.json(await mapModel.findOne({_id: _id}));
};