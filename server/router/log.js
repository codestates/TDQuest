const express = require("express");
const router = express.Router(); 
const log = require("../controllers/log");

router.post("/in", log.login);
router.post("/out", log.logout);

module.exports = router;
