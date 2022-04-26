const express = require("express");
const router = express.Router(); 
const userInfo = require("../controllers/userInfo");

router.get("/", userInfo.getUser);
router.put("/", userInfo.updateUser);

module.exports = router;
