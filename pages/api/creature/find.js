const creatureModel = require("mongoose").model("creature");

export default async (req, res) => {
    const data = await creatureModel.find();
    res.json(data);
    res.end();
};