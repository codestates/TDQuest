const express = require("express");
const router = express.Router(); 
const character = require("../controllers/character");

router.get("/", character.getCharacter);
router.put("/phy", character.updatePhyStatus);
router.put("/int", character.updateIntStatus);
router.put("/spl", character.updateSplStatus);

module.exports = router;
