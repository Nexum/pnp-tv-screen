const mapModel = require("mongoose").model("map");

export default async (req, res) => {
    const data = await mapModel.findOne({active: true});
    res.json(data);
    res.end();
};