const express = require("express");
const router = express.Router(); 
const kakao = require("../controllers/kakao")
const google = require("../controllers/google")

router.get("/kakao", kakao.kakao);
router.get("/kakao/callback", kakao.callback)

router.get("/google", google.google);
router.get("/google/callback", google.callback);

module.exports = router;
