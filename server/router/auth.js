const express = require("express");
const router = express.Router(); 
const authCheck = require("../middleware/auth")

router.post("/", authCheck.authCheck);

module.exports = router;
