const { todo_list } = require("../models")

module.exports = {
    createTodo : async (req, res) => {
        const todoInfo = await todo_list.create({
            kind : req.body.kind,
            content : req.body.content
        })
        res.status(200).json({message: "todo_list를 추가합니다"})
    }, //todolist 추가

    getTodo : async (req, res) => {
        const todoInfo = await todo_list.findAll({
            where : { user_id : req.query.id,
                is_complete : false
            }
        })
        res.status(200).json({todoInfo : todoInfo})
    }, // 완료되지않은 todolist 불러오기

    deleteTodo : async (req, res) => {
        await todo_list.destroy({
            id : req.query.id
        })
        res.status(200).json({message: '삭제 되었습니다'})
    }, //todolist삭제
    
    updateTodo : async (req, res) => {
        await todo_list.update({
            kind : req.body.kind,
            content : req.body.content
        }, 
        {where : { id : req.body.id,
            user_id : req.body.user_id
        }})
        res.status(200).json({message : "수정되었습니다"})
    },
    // todoList를 완료시는 character에!
}