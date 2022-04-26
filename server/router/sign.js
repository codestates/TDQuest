const express = require("express");
const router = express.Router(); 
const sign = require("../controllers/sign");

router.post("/", sign.signIn);
router.delete("/", sign.signOut);

module.exports = router;
