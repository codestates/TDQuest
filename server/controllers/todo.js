const { todo_list } = require("../models")

module.exports = {
    createTodo : async (req, res) => {
        const todoInfo = await todo_list.create({
            kind : req.body.kind,
            content : req.body.content
        })
        res.status(200).json({message: "todo_list를 추가합니다"})
    },

    getTodo : async (req, res) => {
        const todoInfo = await todo_list.findAll({
            where : { user_id : req.query.id }
        })
        res.status(200).json({todoInfo : todoInfo})
    },

    deleteTodo : async (req, res) => {
        await todo_list.destroy({
            id : req.query.id
        })
        res.status(200).json({message: '삭제 되었습니다'})
    },
    
    updateTodo : async (req, res) => {
        await todo_list.update({
            kind : req.body.kind,
            content : req.body.content
        }, 
        { include : 
            { model : user,
              where : {id : req.body.user_id}
            }
        },
        {where : { id : req.body.id}})
        res.status(200).json({message : "수정되었습니다"})
    },
    // todoList를 완료시는 character에!
}