const { todo_list } = require("../models")

module.exports = {
    createTodo : async (req, res) => {
        const todoInfo = await todo_list.create({
            kind : req.body.kind,
            content : req.body.content
        })
        res.status(200).json({message: "todo_list를 추가합니다"})
    }, // name column 없애기

    getTodo : async (req, res) => {
        const todoInfo = await todo_list.findAll({
            user_id : req.query.user_id
        })
        res.status(200).json({todoInfo : todoInfo})
    },// 해당 user의 모든 list
    // 그날 list를 불러올 경우?
    deleteTodo : async (req, res) => {
        await todo_list.destroy({
            id : req.query.id
        })
    },
    
    updateTodo : async (req, res) => {
        await todo_list.update({
            kind : req.body.kind,
            content : req.body.content
        }, {where : { id : req.body.id, user_id : req.body.user_id}})
    },
}