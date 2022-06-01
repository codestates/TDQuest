const express = require("express");
const router = express.Router();

const character = require("../controllers/character");
const log = require("../controllers/log");
const kakao = require("../controllers/oauth/kakao")
const google = require("../controllers/oauth/google")
const monster = require("../controllers/monster");
const raids = require("../controllers/raids");
const rank = require("../controllers/rank");
const sign = require("../controllers/sign");
const todo = require("../controllers/todo");
const userInfo = require("../controllers/userInfo");
const {checkAccessToken} = require("../middleware/token")

//character
router.get("/character", character.getCharacter);

//log
router.post("/log/in", log.login);
router.post("/log/out", log.logout);

//log kakao
router.get("/kakao", kakao.kakao);
router.get("/oauth/kakao/callback", kakao.callback)

//log google
router.get("/google", google.google);
router.get("/oauth/google/callback", google.callback);

//monster
router.get("/monster", monster.getMonster);

//raids
router.post("/raids/invite", raids.inviteRaids);
router.get("/raids/damage_logs", raids.damage_logs)
//rank
router.get("/rank", rank.All);
router.get("/rank/status", rank.statusRank);

//sign
router.post("/sign/in", sign.signIn);
router.delete("/sign/out", sign.signOut);

//userInfo
router.get("/userInfo", checkAccessToken, userInfo.getUser);
router.patch("/userInfo", userInfo.updateUser);

//todo
router.post("/todo", todo.createTodo);
router.delete("/todo", checkAccessToken, todo.deleteTodo);
router.put("/todo", checkAccessToken, todo.updateTodo);

router.get("/todo/incomplete", todo.incompleteList);
router.get("/todo/complete", todo.completeList)
router.put("/todo/complete", todo.completeTodo)


module.exports = router;