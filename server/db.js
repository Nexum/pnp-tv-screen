const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true
});

require("./models/map");
require("./models/file");
require("./models/creature");

