// Backend
import fs from "fs";

const fileModel = require("mongoose").model("file");

export default async (req, res) => {
    const file = await fileModel.findOne({
        _id: req.query._id,
    });

    if (!file) {
        return res.status(404).end("404 File Not Found");
    }

    res.json({
        file: file,
    });
};