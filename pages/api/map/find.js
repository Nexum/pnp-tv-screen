const mapModel = require("mongoose").model("map");

export default async (req, res) => {
    const data = await mapModel.find();
    res.json(data);
    res.end();
};