// Backend
import fs from "fs";

const fileModel = require("mongoose").model("file");
const FileType = require('file-type');

export default async (req, res) => {
    const {_id, ext} = req.query;
    const file = await fileModel.findOne({
        map: req.query._id,
        type: "snapshot",
    });

    if (!file) {
        return res.status(404).end("404 File Not Found");
    }

    const fileType = await FileType.fromBuffer(file.data);

    if (fileType.ext !== ext) {
        return res.redirect(`/api/snapshot/${_id}/${fileType.ext}`);
    }

    res.setHeader("Content-Type", fileType.mime);
    res.end(file.data);
};