const express = require("express");
const router = express.Router();

const sign = require("./sign");
const userInfo = require("./userInfo")
const log = require("./log")
const character = require("./character")
const monster = require("./monster")
const todo = require("./todo")
const oauth = require("./oauth")
const rank = require("./rank")
const raids = require("./raids")
const auth = require("./auth")

router.use("/sign", sign);
router.use("/userInfo", userInfo)
router.use("/log", log)
router.use("/oauth", oauth)
router.use("/character", character)
router.use("/monster", monster)
router.use("/todo", todo)
router.use("/rank", rank)
router.use("/raids", raids);
router.use("/auth", auth)

module.exports = router;