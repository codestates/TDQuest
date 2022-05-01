const express = require("express");
const router = express.Router(); 
const monster = require("../controllers/monster");

router.get("/", monster.getMonster);
router.put("/". monster.updateMonster);
module.exports = router;
