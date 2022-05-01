const express = require("express");
const router = express.Router(); 
const todo = require("../controllers/todo");

router.get("/", todo.getTodo);
router.post("/", todo.createTodo);
router.delete("/", todo.deleteTodo);
router.put("/", todo.updateTodo);

module.exports = router;
