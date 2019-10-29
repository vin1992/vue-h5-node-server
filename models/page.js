let mongoose = require("mongoose");
let pageSchema = require("../schemas/page.js");

module.exports = mongoose.model("Page", pageSchema);
