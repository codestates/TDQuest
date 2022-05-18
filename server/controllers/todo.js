const { todo_list } = require("../models")
const { damage_log } = require('../models')
const { monster } = require("../models")
const { raid } = require("../models")
const { character } = require("../models")
module.exports = {
    createTodo : async (req, res) => {
        await todo_list.create({
            kind : req.body.kind,
            content : req.body.content,
            user_id : req.body.user_id
        })
        .then(todoInfo => {
            res.status(201).json({todoInfo : todoInfo, message: "todo_list를 추가합니다"})
        })
        .catch(err => {
            res.status(401).json({message: 'Not Found'})
        })
    }, //todolist 추가

    getTodo : async (req, res) => {
        const todoInfo = await todo_list.findAll({
            where : { user_id : req.query.user_id,
                is_complete : req.query.is_complete
            }
        })
        res.status(200).json({todoInfo : todoInfo})
    }, // 완료되지않은 todolist 불러오기

    deleteTodo : async (req, res) => {
        const todoInfo = await todo_list.findOne({ where : { id : req.query.id}})
        await todo_list.destroy({
            where : { id : req.query.id }
        })
        .then(data => {
            res.status(200).json({message: '삭제 되었습니다', todoInfo : todoInfo})
        })
        .catch(err => {    
            res.status(401).json({message: 'Not Found'})
        })
    }, 
    
    updateTodo : async (req, res) => {
        await todo_list.update({
            kind : req.body.kind,
            content : req.body.content
        }, {where : { id : req.query.id}})

        await todo_list.findOne({ where : { id : req.query.id}})
        .then(todoInfo => {
            res.status(200).json({message : "수정되었습니다.", todoInfo : todoInfo})
        })
        .catch(err => {
            res.status(401).json({message: 'Not Found'})
        })
    },

    completeList : async (req, res) => {
        if (req.body.time) {
            await todo_list.findAll({
                raw : true,
                where: {user_id : req.query.user_id,
                    updatedAt : {
                        $eq: req.body.time}
                }
            })
            .then(data => {
                console.log(data)
            })
        }
        else { 
        await todo_list.findAll({
            where : {user_id : req.query.user_id,
                is_complete : 1
            }
        })
        .then(todo_lists => {
            res.status(200).json({todo_list : todo_lists})
        })
        .catch(err => {
            res.status(401).json({message: 'Not Found'})
        })}
    },

    completeTodo : async (req, res) => {
            if (req.body.is_complete === 1) { //완료버튼을 눌렀다면
                await todo_list.update({is_complete : true},
                    { where : { id : req.query.id}})

                if (req.query.status === "phy") {
                    await character.increment(
                    { status_phy : 0.5 },
                    { where : { user_id : req.query.user_id }})
                }
                else if (req.query.status === "int") {
                    await character.increment(
                    { status_int : 0.5 },
                    { where : { user_id : req.query.user_id }})
                }
                else if (req.query.status === "spi") {
                    await character.increment(
                        { status_spi : 0.5 },
                        { where : { user_id : req.query.user_id }})
                }
                else if (req.query.status === "etc") {
                    await character.increment(
                        { status_etc : 0.5 },
                        { where : { user_id : req.query.user_id }})
                }
                const todoInfo = await todo_list.findOne({
                    where : { id : req.query.id}
                })
                await character.findOne(
                        { where : { user_id : req.query.user_id }})
                        .then(character => {
                        const characterInfo = {...character.dataValues, 
                            level : character.dataValues.totalExp / 100,
                            exp : character.dataValues.totalExp % 100
                        }
                        res.status(200).json({characterInfo : characterInfo,
                            todoInfo : todoInfo
                        })
                })
                // raid 버튼을 눌렀을 시
                if (req.body.raid_id) {
                        await damage_log.increment(
                            { log : 0.5 },
                            { where : {
                                user_id : req.body.user_id,
                                raid_id : req.body.raid_id}})
    
                        await raid.increment(
                            { hit_damage : 0.5},
                            { where : {
                                id : req.body.raid_id}})
                        await monster.decrement(
                            { hp : 0.5},
                            { where : {
                                id : req.body.monster_id}})
                            
                        await monster.findOne({ where : {id : req.body.monster_id}})
                        .then(async monsterInfo => {
                            if (monsterInfo.dataValues.hp === 0) {
                                const monsterInfo =  await monster.findOne({
                                    where : {id : req.body.raid_id}
                                })
                                await character.update({ level : monsterInfo.dataValues.reward},
                                    { include : {
                                        model : user,
                                          include : {
                                            model : damage_log,
                                              where : { raid_id : req.body.raid_id} //raid 참가한 인원
                                                }
                                            }
                                        })
                              // moster 테이블 삭제?
                             //  끝낫다는 표시를 해야되나?
                              // raid_id 삭제?
                            res.status(200).json({message : '데미지를 넣었습니다.'})
                            }})
                        .catch(err => {
                            res.status(404).json({message : 'Not Found'})
                        })
            }
            else {//취소할 떄
                if (req.body.is_complete === 0) { //완료버튼을 눌렀다면
                    await todo_list.update({is_complete : false},
                        { where : { id : req.query.id}})
                    
                    if (req.query.status === "phy") {
                        await character.decrement(
                            { status_phy : 0.5 },
                            { where : { user_id : req.query.user_id }})
                    }
                    else if (req.query.status === "int") {
                        await character.decrement(
                            { status_int : 0.5 },
                            { where : { user_id : req.query.user_id }})
                    }
                    else if (req.query.status === "spi") {
                        await character.decrement(
                            { status_spi : 0.5 },
                            { where : { user_id : req.query.user_id }})
                    }
                    else if (req.query.status === "etc") {
                        await character.decrement(
                            { status_etc : 0.5 },
                            { where : { user_id : req.query.user_id }})
                    }
                    const todoInfo = todo_list.findOne({
                        where : { id : req.query.id}
                    })
                    await character.findOne(
                            { where : { user_id : req.query.user_id }})
                            .then(character => {
                            const characterInfo = {...character.dataValues, 
                                level : character.dataValues.totalExp / 100,
                                exp : character.dataValues.totalExp % 100
                            }
                            res.status(200).json({characterInfo : characterInfo,
                                todoInfo : todoInfo
                            })
                    })
                }
              }
            }
    }
}