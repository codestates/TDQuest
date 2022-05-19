const { todo_list } = require("../models")
const sequelize = require('sequelize');
const moment = require('moment')
module.exports = {
    createTodo: async (req, res) => {
        await todo_list.create({
            kind: req.body.kind,
            content: req.body.content,
            user_id: req.body.user_id
        })
            .then(todoInfo => {
                console.log(todoInfo)
                res.status(201).json({ todoInfo: todoInfo, message: "todo_list를 추가합니다" })
            })
            .catch(err => {
                console.log(err)
            })
    }, //todolist 추가

    getTodo: async (req, res) => {
        console.log('getTodo');
        const todoInfo = await todo_list.findAll({
            where: {
                user_id: req.query.user_id,
                is_complete: req.query.is_complete
            }
        })
        res.status(200).json({ todoInfo: todoInfo })
    }, // 완료되지않은 todolist 불러오기

    deleteTodo: async (req, res) => {
        await todo_list.destroy({
            where: { id: req.query.id }
        })
            .then(success => {
                res.status(200).json({ message: '삭제 되었습니다' })
            })
            .catch(err => {
                console.log(err)
            })
    }, //todolist삭제

    updateTodo: async (req, res) => {
        await todo_list.update({
            kind: req.body.kind,
            content: req.body.content
        },
            {
                where: {
                    id: req.body.id
                }
            })
            .then(success => {
                res.status(200).json({ message: "수정되었습니다" })
            })
            .catch(err => {
                console.log(err)
            })
    },
    completeTodo: async (req, res) => {
        if (req.body.time) {
            await todo_list.findAll({
                raw: true,
                where: {
                    user_id: req.query.user_id,
                    updatedAt: {
                        $eq: req.body.time
                    }
                }
            })
                .then(data => {
                    console.log(data)
                })
        }
        else {
            await todo_list.findAll({
                where: {
                    user_id: req.query.user_id,
                    is_complete: 1
                }
            })
                .then(todo_lists => {
                    res.status(200).json({ todo_list: todo_lists })
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }
}