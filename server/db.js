const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URL);

require("./models/file");
require("./models/creature");
require("./models/player");

