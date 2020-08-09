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

    await new Promise((resolve, reject) => {
        form.parse(req, async (err, fields, files) => {
            try {
                await fileModel.updateOne({
                    map: _id,
                    type: "snapshot",
                }, {
                    $set: {
                        map: _id,
                        data: fs.readFileSync(files.file.path),
                        type: "snapshot",
                    },
                }, {
                    upsert: true,
                });

                req.io.emit("file." + _id + ".changed");
                req.io.emit("map.snapshot");

                res.json({
                    success: true,
                });

                return resolve();
            } catch (e) {
                return reject(e);
            }
        });
    });
};