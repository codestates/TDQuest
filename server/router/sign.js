const express = require("express");
const router = express.Router(); 
const sign = require("../controllers/sign");

router.post("/in", sign.signIn);
router.delete("/out", sign.signOut);

module.exports = router;
