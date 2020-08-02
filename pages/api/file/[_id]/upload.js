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
    const {_id} = req.query;
    const form = new formidable.IncomingForm();

    form.uploadDir = os.tmpdir();
    form.keepExtensions = true;
    form.parse(req, async (err, fields, files) => {
        await fileModel.update({
            _id: _id,
        }, {
            $set: {
                _id: _id,
                data: fs.readFileSync(files.file.path),
            },
        }, {
            upsert: true,
        });

        req.io.emit("file." + _id + ".changed");

        res.json({
            success: true,
        });
    });
};