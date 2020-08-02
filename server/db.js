const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URL);

require("./models/file");
require("./models/enemy");
require("./models/player");

