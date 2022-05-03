const express = require("express");
const router = express.Router(); 
const raids = require("../controllers/raids");

router.post("/invite", raids.inviteRaids);
router.post("/attack", raids.attack)

module.exports = router;
