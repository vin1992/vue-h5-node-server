let express = require("express");
const { responseClient } = require("../util");
const router = express.Router();

const pageApi = require("./page");

// page api
router.use("/page", pageApi);

module.exports = router;
