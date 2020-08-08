const mapModel = require("mongoose").model("map");

export const config = {
    api: {
        bodyParser: {
            json: true,
        },
    },
};

export default async (req, res) => {
    const data = JSON.parse(req.body);
    const doc = new mapModel(data);

    doc.set("active", true);
    await doc.save();

    await mapModel.updateMany({
        _id: {$ne: doc._id},
    }, {
        $set: {
            active: false,
        },
    });

    req.io.emit("map." + doc._id + ".changed");
    req.io.emit("map.created");
    req.io.emit("map.changed");

    res.json(await mapModel.findOne({_id: doc._id}));
};