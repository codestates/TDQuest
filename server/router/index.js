const express = require("express");
const router = express.Router();

const sign = require("./sign");
const userInfo = require("./userInfo")
const log = require("./log")
const character = require("./character")
const monster = require("./monster")
const todo = require("./todo")

router.use("/sign", sign);
router.use("/userInfo", userInfo)
router.use("/log", log)
router.use("/character", character)
router.use("/monster", monster)
router.use("/todo", todo)

module.exports = router;