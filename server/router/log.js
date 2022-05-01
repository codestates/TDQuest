const express = require("express");
const router = express.Router(); 
const log = require("../controllers/log");
const oauth = require("../controllers/oauth")

router.get("/kakao", log.kakao);
router.get("/google", log.google);

router.post("/in", log.login);
router.post("/out", log.logout);

module.exports = router;
