const { todo_list } = require("../models")
const { damage_log } = require('../models')
const { monster } = require("../models")
const { raid } = require("../models")
const { character } = require("../models")

module.exports = {
    createTodo: async (req, res) => {
        try {
            const todoInfo = await todo_list.create({
                kind: req.body.kind,
                content: req.body.content,
                user_id: req.body.user_id
            })
            res.status(201).json({ todoInfo: todoInfo, message: "todo_list를 추가합니다" })
        }
        catch (err) {
            res.status(401).json({ message: 'Not Found' })   
        }
    }, //todolist 추가

    getTodo: async (req, res) => {
        const todoInfo = await todo_list.findAll({
            where: {
                user_id: req.query.user_id,
                is_complete: req.query.is_complete
            }
        })
        res.status(200).json({ todoInfo: todoInfo })
    }, // 완료되지않은 todolist 불러오기

    deleteTodo: async (req, res) => {
        const todoInfo = await todo_list.findOne({ where: { id: req.query.id } })
        await todo_list.destroy({
            where: { id: req.query.id }
        })
    }, 
    
    updateTodo : async (req, res) => {
        await todo_list.update({
            kind : req.body.kind,
            content : req.body.content
        }, {where : { id : req.body.id}})

        await todo_list.findOne({ where : { id : req.body.id}})
        .then(todoInfo => {
            res.status(200).json({message : "수정되었습니다.", todoInfo : todoInfo})
        })
        .catch(err => {
            res.status(401).json({message: 'Not Found'})
        })
    },
    
    completeList : async (req, res) => {
        if (req.query.time) { // 특정 날짜
                await todo_list.findAll({
                    raw: true,
                    where: {
                        user_id: req.query.user_id,
                        updatedAt: req.query.time,
                        is_complete: req.query.is_complete
                    }
                })
                    .then(data => {
                        res.status(200).json({ todoInfo: data })
                    })
        }
        else { // 완료한 모든 todo_list
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
                    res.status(401).json({ message: 'Not Found' })
                })
        }
    },

    completeTodo: async (req, res) => {
        if (!req.body.raid_id) {
            if (req.body.is_complete === 1) { //완료버튼을 눌렀다면
                await todo_list.update({ is_complete: true },
                    {
                        where: {
                            id: req.query.id,
                            is_complete: 0
                        }
                    })
                if (req.query.status === "phy") {
                    await character.increment(
                        { status_phy: 0.5 },
                        { where: { user_id: req.query.user_id } })
                }
                else if (req.query.status === "int") {
                    await character.increment(
                        { status_int: 0.5 },
                        { where: { user_id: req.query.user_id } })
                }
                else if (req.query.status === "spi") {
                    await character.increment(
                        { status_spi: 0.5 },
                        { where: { user_id: req.query.user_id } })
                }
                else if (req.query.status === "etc") {
                    await character.increment(
                        { status_etc: 0.5 },
                        { where: { user_id: req.query.user_id } })
                }
                const todoInfo = await todo_list.findOne({
                    where: { id: req.query.id }
                })
                await character.findOne({ where: { user_id: req.query.user_id } })
                    .then(data => {
                        const characterInfo = {
                            ...data.dataValues,
                            level: data.dataValues.totalExp / 100,
                            exp: data.dataValues.totalExp % 100
                        }
                        res.status(200).json({
                            characterInfo: characterInfo,
                            todoInfo: todoInfo
                        })
                    })
            }
            else {//취소할 떄

                    await todo_list.update({is_complete : false},
                        { where : { id : req.query.id,
                            is_complete : 1
                        }})
                    
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
                    const todoInfo = await todo_list.findOne({
                        where : { id : req.query.id}
                    })

                await character.findOne(
                    { where: { user_id: req.query.user_id } })
                    .then(data => {
                        const characterInfo = {
                            ...data.dataValues,
                            level: data.dataValues.totalExp / 100,
                            exp: data.dataValues.totalExp % 100
                        }
                        res.status(200).json({
                            characterInfo: characterInfo,
                            todoInfo: todoInfo
                        })
                    })
            }
        }





        else { //레이드 참가시
            if (req.body.is_complete === 1) {
                await todo_list.update({ is_complete: true },
                    {
                        where: {
                            id: req.query.id,
                            is_complete: 0
                        }
                    })
                if (req.query.status === "phy") {
                    await character.increment(
                        { status_phy: 0.5 },
                        { where: { user_id: req.query.user_id } })
                }
                else if (req.query.status === "int") {
                    await character.increment(
                        { status_int: 0.5 },
                        { where: { user_id: req.query.user_id } })
                }
                else if (req.query.status === "spi") {
                    await character.increment(
                        { status_spi: 0.5 },
                        { where: { user_id: req.query.user_id } })
                }
                else if (req.query.status === "etc") {
                    await character.increment(
                        { status_etc: 0.5 },
                        { where: { user_id: req.query.user_id } })
                }

                await damage_log.increment(
                    { log: 0.5 },
                    {
                        where: {
                            user_id: req.body.user_id,
                            raid_id: req.body.raid_id
                        }
                    })
                await raid.increment(
                    { hit_damage: 0.5 },
                    {
                        where: {
                            id: req.body.raid_id
                        }
                    })
                await monster.decrement(
                    { hp: 0.5 },
                    {
                        where: {
                            id: req.body.monster_id
                        }
                    })

                await monster.findOne({ where: { id: req.body.monster_id } })
                    .then(async monsterInfo => {
                        if (monsterInfo.dataValues.hp === 0) {
                            const monsterInfo = await monster.findOne({ where: { id: req.body.raid_id } })
                            await character.findAll(
                                {
                                    include: {
                                        model: user,
                                        include: {
                                            model: damage_log,
                                            where: { raid_id: req.body.raid_id } //raid 참가한 인원
                                        }
                                    }
                                })
                                .then(characterArray => {
                                    characterArray.forEach(el => {
                                        character.decrement({
                                            level: monsterInfo.dataValues.reward
                                        },
                                            { where: { id: el.dataValues.id } })
                                    })
                                })
                            const todoInfo = await todo_list.findOne({ where: { id: req.query.id } })
                            const characterInfo = await character.findOne({ where: { user_id: req.query.user_id } })
                                .then(data => {
                                    return {
                                        ...data.dataValues,
                                        level: data.dataValues.totalExp / 100,
                                        exp: data.dataValues.totalExp % 100
                                    }
                                })
                            res.status(200).json({ message: "몬스터를 잡았습니다", todoInfo: todoInfo, characterInfo: characterInfo })
                        }
                        else {
                            const todoInfo = await todo_list.findOne({ where: { id: req.query.id } })
                            const characterInfo = await character.findOne({ where: { user_id: req.query.user_id } })
                                .then(data => {
                                    return {
                                        ...data.dataValues,
                                        level: data.dataValues.totalExp / 100,
                                        exp: data.dataValues.totalExp % 100
                                    }
                                })
                            res.status(200).json({ message: "데미지를 넣었습니다", todoInfo: todoInfo, characterInfo: characterInfo })
                        }
                    })
                // moster 테이블 삭제?
                //  끝낫다는 표시를 해야되나?
                // raid_id 삭제?
            }
            else { // 취소
                await todo_list.update({ is_complete: false },
                    {
                        where: {
                            id: req.query.id,
                            is_complete: 1
                        }
                    })
                if (req.query.status === "phy") {
                    await character.decrement(
                        { status_phy: 0.5 },
                        { where: { user_id: req.query.user_id } })
                }
                else if (req.query.status === "int") {
                    await character.decrement(
                        { status_int: 0.5 },
                        { where: { user_id: req.query.user_id } })
                }
                else if (req.query.status === "spi") {
                    await character.decrement(
                        { status_spi: 0.5 },
                        { where: { user_id: req.query.user_id } })
                }
                else if (req.query.status === "etc") {
                    await character.decrement(
                        { status_etc: 0.5 },
                        { where: { user_id: req.query.user_id } })
                }
                await damage_log.decrement(
                    { log: 0.5 },
                    {
                        where: {
                            user_id: req.body.user_id,
                            raid_id: req.body.raid_id
                        }
                    })
                await raid.decrement(
                    { hit_damage: 0.5 },
                    {
                        where: {
                            id: req.body.raid_id
                        }
                    })
                await monster.decrement(
                    { hp: 0.5 },
                    {
                        where: {
                            id: req.body.monster_id
                        }
                    })

                await monster.findOne({ where: { id: req.body.monster_id } })
                    .then(async monsterInfo => {
                        if (monsterInfo.dataValues.hp === 0) {
                            const monsterInfo = await monster.findOne({ where: { id: req.body.raid_id } })
                            await character.findAll(
                                {
                                    include: {
                                        model: user,
                                        include: {
                                            model: damage_log,
                                            where: { raid_id: req.body.raid_id } //raid 참가한 인원
                                        }
                                    }
                                })
                                .then(characterArray => {
                                    characterArray.forEach(el => {
                                        character.decrement({
                                            level: monsterInfo.dataValues.reward
                                        },
                                            { where: { id: el.dataValues.id } })
                                    })
                                })
                            const todoInfo = await todo_list.findOne({ where: { id: req.query.id } })
                            const characterInfo = await character.findOne({ where: { user_id: req.query.user_id } })
                                .then(data => {
                                    return {
                                        ...data.dataValues,
                                        level: data.dataValues.totalExp / 100,
                                        exp: data.dataValues.totalExp % 100
                                    }
                                })
                            res.status(200).json({ message: "몬스터를 잡았습니다", todoInfo: todoInfo, characterInfo: characterInfo })
                        }
                        else {
                            const todoInfo = await todo_list.findOne({ where: { id: req.query.id } })
                            const characterInfo = await character.findOne({ where: { user_id: req.query.user_id } })
                                .then(data => {
                                    return {
                                        ...data.dataValues,
                                        level: data.dataValues.totalExp / 100,
                                        exp: data.dataValues.totalExp % 100
                                    }
                                })
                            res.status(200).json({ message: "데미지를 넣었습니다", todoInfo: todoInfo, characterInfo: characterInfo })
                        }
                    })
            }
        }
    }
}