const creatureModel = require("mongoose").model("creature");

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
    delete data._id;
    const creature = _id === "new" ? new creatureModel({...data}) : await creatureModel.findOne({_id});

    for (const path in data) {
        creature.set(path, data[path]);
    }

    await creature.save();

    req.io.emit("creature." + creature._id + ".changed");
    req.io.emit("creatures.changed");

    res.json({
        success: true,
    });
};