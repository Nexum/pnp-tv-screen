// Backend
import formidable from 'formidable';
import os from "os";
import fs from "fs";

const targetPath = `public/upload/map.png`;

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async (req, res) => {
    const form = new formidable.IncomingForm();
    form.uploadDir = os.tmpdir();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        fs.renameSync(files.file.path, targetPath);

        req.io.emit("mapChanged");

        res.json({
            success: true,
        });
    });
};