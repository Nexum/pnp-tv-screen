// Backend
import formidable from 'formidable';
import os from "os";
import fs from "fs";

const fileModel = require("mongoose").model("file");

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async (req, res) => {
    const form = new formidable.IncomingForm();
    form.uploadDir = os.tmpdir();
    form.keepExtensions = true;
    form.parse(req, async (err, fields, files) => {
        await fileModel.update({
            _id: "map",
        }, {
            $set: {
                _id: "map",
                data: fs.readFileSync(files.file.path),
            },
        }, {
            upsert: true,
        });


        req.io.emit("mapChanged");

        res.json({
            success: true,
        });
    });
};