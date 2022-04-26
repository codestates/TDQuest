const express = require("express");
const router = express.Router(); 
const character = require("../controllers/character");

router.get("/", character.getCharacter);
router.put("/", character.updateCharacter);

module.exports = router;
