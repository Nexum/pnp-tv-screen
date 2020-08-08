const creatureModel = require("mongoose").model("creature");

export default async (req, res) => {

    const query = {
        map: req.query.map,
        visible: true,
    };

    if (req.query.isGm === "true") {
        delete query.visible;
    }

    const data = await creatureModel.find(query);
    res.json(data);
    res.end();
};