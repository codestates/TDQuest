const express = require("express");
const router = express.Router(); 
const rank = require("../controllers/rank");

router.get("/", rank.All);
router.get("/phy", rank.phyRank);
router.get("/int", rank.intRank);
router.get("/spl", rank.splRank);


module.exports = router;
