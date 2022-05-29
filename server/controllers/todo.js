const { todo_list } = require("../models")
const { damage_log } = require('../models')
const { monster } = require("../models")
const { raid } = require("../models")
const { character } = require("../models")
const { sequelize } = require("../models")
const bcrypt = require("bcrypt")

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

    deleteTodo: async (req, res) => {
        try {
            const todoInfo = await todo_list.findOne({ where: { id: req.query.id } })
            await todo_list.destroy({
                where: { id: req.query.id }
            })
            res.status(200).json({ todoInfo: todoInfo, message: "삭제했습니다." })
        }
        catch (err) {
            res.status(400).json({ message: err })
        }
    },

    updateTodo: async (req, res) => {
        try {
            await todo_list.update({
                kind: req.body.kind,
                content: req.body.content
            }, { where: { id: req.query.id } })

            const todoInfo = await todo_list.findOne({ where: { id: req.query.id } })
            res.status(200).json({ message: "수정되었습니다.", todoInfo: todoInfo })
        }
        catch (err) {
            res.status(401).json({ message: 'Not Found' })
        }
    },


    incompleteList: async (req, res) => {
        try { //미완료
            if (req.query.time) { //시간있을경우
                const todo_lists = await todo_list.findAll({
                    where: {
                        user_id: req.query.user_id,
                        updatedAt: req.query.time,
                        is_complete: 0
                    }
                })
                res.status(200).json({ todoInfo: todo_lists })
            }
            else { // 없을경우 
                const todoInfo = await todo_list.findAll({
                    where: {
                        user_id: req.query.user_id,
                        is_complete: 0
                    }
                })
                res.status(200).json({ todoInfo: todoInfo })
            }
        }
        catch (err) {
            res.status(400).json({ message: err })
        }
    }, // 완료되지않은 todolist 불러오기

    completeList: async (req, res) => {
        try {
            if (req.query.time) { // 특정 날짜
                const todo_lists = await todo_list.findAll({
                    where: {
                        user_id: req.query.user_id,
                        updatedAt: req.query.time,
                        is_complete: 1
                    }
                })
                res.status(200).json({ todoInfo: todo_lists })
            }
            else { // 
                const todo_lists = await todo_list.findAll({
                    where: {
                        user_id: req.query.user_id,
                        is_complete: 1
                    }
                })
                res.status(200).json({ todo_lists: todo_lists })
            }
        }
        catch (err) {
            res.status(400).json({ message: err })
        }
    },

    completeTodo: async (req, res) => {
        const transaction = await sequelize.transaction();
        if (!req.query.raid_id) {
            if (req.query.is_complete === '1') { //완료버튼을 눌렀다면
                try {
                    await todo_list.update({ is_complete: true },
                        {
                            where: {
                                id: req.query.id,
                                is_complete: 0
                            }
                        }, transaction)

                    if (req.query.status === "phy") {
                        await character.increment(
                            { status_phy: 0.5 },
                            {
                                where: { user_id: req.query.user_id }
                            }, transaction)
                    }
                    else if (req.query.status === "int") {
                        await character.increment(
                            { status_int: 0.5 },
                            {
                                where: { user_id: req.query.user_id }
                            }, transaction)
                    }
                    else if (req.query.status === "spi") {
                        await character.increment(
                            { status_spi: 0.5 },
                            {
                                where: { user_id: req.query.user_id }
                            }, transaction)
                    }
                    else if (req.query.status === "etc") {
                        await character.increment(
                            { status_etc: 0.5 },
                            {
                                where: { user_id: req.query.user_id },
                            }, transaction)
                    }
                    const todoInfo = await todo_list.findOne({
                        where: { id: req.query.id }
                    }, transaction)

                    const characterInfo = await character.findOne({ where: { user_id: req.query.user_id } }, transaction)
                        .then(data => {
                            return {
                                ...data.dataValues,
                                level: data.dataValues.totalExp / 100,
                                exp: data.dataValues.totalExp % 100
                            }
                        })
                    await transaction.commit()
                    res.status(200).json({
                        characterInfo: characterInfo,
                        todoInfo: todoInfo
                    })
                }
                catch (err) {
                    await transaction.rollback()
                    res.status(400).json({ message: "실패" })
                }
            }
            else {//취소할 떄
                try {
                    await todo_list.update({ is_complete: false },
                        {
                            where: {
                                id: req.query.id,
                                is_complete: 1
                            }
                        }, transaction)

                    if (req.query.status === "phy") {
                        await character.decrement(
                            { status_phy: 0.5 },
                            {
                                where: { user_id: req.query.user_id }
                            }, transaction)
                    }
                    else if (req.query.status === "int") {
                        await character.decrement(
                            { status_int: 0.5 },
                            {
                                where: { user_id: req.query.user_id }
                            }, transaction)
                    }
                    else if (req.query.status === "spi") {
                        await character.decrement(
                            { status_spi: 0.5 },
                            {
                                where: { user_id: req.query.user_id }
                            }, transaction)
                    }
                    else if (req.query.status === "etc") {
                        await character.decrement(
                            { status_etc: 0.5 },
                            {
                                where: { user_id: req.query.user_id }
                            }, transaction)
                    }
                    const todoInfo = await todo_list.findOne({
                        where: { id: req.query.id },
                    }, transaction)

                    const characterInfo = await character.findOne(
                        { where: { user_id: req.query.user_id } }, transaction)
                        .then(data => {
                            return {
                                ...data.dataValues,
                                level: data.dataValues.totalExp / 100,
                                exp: data.dataValues.totalExp % 100
                            }
                        })
                    await transaction.commit()
                    res.status(200).json({
                        characterInfo: characterInfo,
                        todoInfo: todoInfo
                    })
                }
                catch (err) {
                    await transaction.rollback()
                    res.status(400).json({ message: "실패" })
                }
            }
        }



        else { //레이드 참가
            if (req.query.is_complete === '1') {
                try {
                    await todo_list.update({ is_complete: true },
                        {
                            where: {
                                id: req.query.id,
                                is_complete: 0
                            }
                        }, transaction)
                    if (req.query.status === "phy") {
                        await character.increment(
                            { status_phy: 0.5 },
                            { where: { user_id: req.query.user_id } }, transaction)
                    }
                    else if (req.query.status === "int") {
                        await character.increment(
                            { status_int: 0.5 },
                            { where: { user_id: req.query.user_id } }, transaction)
                    }
                    else if (req.query.status === "spi") {
                        await character.increment(
                            { status_spi: 0.5 },
                            { where: { user_id: req.query.user_id } }, transaction)
                    }
                    else if (req.query.status === "etc") {
                        await character.increment(
                            { status_etc: 0.5 },
                            { where: { user_id: req.query.user_id } }, transaction)
                    }

                    await damage_log.increment(
                        { log: 0.5 },
                        {
                            where: {
                                user_id: req.query.user_id,
                                raid_id: req.query.raid_id
                            }
                        }, transaction)
                    await raid.increment(
                        { hit_damage: 0.5 },
                        {
                            where: {
                                id: req.query.raid_id
                            }
                        }, transaction)
                    await monster.decrement(
                        { hp: 0.5 },
                        {
                            where: {
                                id: req.query.monster_id
                            }
                        }, transaction)

                    const monsterInfo = await monster.findOne({ where: { id: req.query.monster_id } }, transaction)
                    if (monsterInfo.dataValues.hp === 0) { // 몬스터를 잡았을 때
                        const monsterInfo = await monster.findOne({ where: { id: req.query.raid_id } }, transaction)
                        const characterArray = await character.findAll(
                            {
                                include: {
                                    model: user,
                                    include: {
                                        model: damage_log,
                                        where: { raid_id: req.query.raid_id } //raid 참가한 인원
                                    }
                                }
                            }, transaction)
                        characterArray.forEach(el => {
                            character.decrement({
                                level: monsterInfo.dataValues.reward
                            },
                                { where: { id: el.dataValues.id } })
                        }, transaction)
                        const todoInfo = await todo_list.findOne({ where: { id: req.query.id } }, transaction)
                        const characterInfo = await character.findOne({ where: { user_id: req.query.user_id } }, transaction)
                            .then(data => {
                                return {
                                    ...data.dataValues,
                                    level: data.dataValues.totalExp / 100,
                                    exp: data.dataValues.totalExp % 100
                                }
                            })
                        await transaction.commit()
                        res.status(200).json({ message: "몬스터를 잡았습니다", todoInfo: todoInfo, characterInfo: characterInfo })

                    }

                    else { //monster를 잡지못하고 데미지만 넣었을 때
                        const todoInfo = await todo_list.findOne({ where: { id: req.query.id } }, transaction)
                        const characterInfo = await character.findOne({ where: { user_id: req.query.user_id } }, transaction)
                            .then(data => {
                                return {
                                    ...data.dataValues,
                                    level: data.dataValues.totalExp / 100,
                                    exp: data.dataValues.totalExp % 100
                                }
                            })
                        await transaction.commit()
                        res.status(200).json({ message: "데미지를 넣었습니다", todoInfo: todoInfo, characterInfo: characterInfo })
                    }

                }
                catch (err) {
                    await transaction.rollback()
                    res.status(400).json({ message: "실패" })
                }
                // moster 테이블 삭제?
                //  끝낫다는 표시를 해야되나?
                // raid_id 삭제?
            }
            else { // 취소
                try {
                    await todo_list.update({ is_complete: false },
                        {
                            where: {
                                id: req.query.id,
                                is_complete: 1
                            }
                        }, transaction)
                    if (req.query.status === "phy") {
                        await character.decrement(
                            { status_phy: 0.5 },
                            { where: { user_id: req.query.user_id } },
                            transaction)
                    }
                    else if (req.query.status === "int") {
                        await character.decrement(
                            { status_int: 0.5 },
                            { where: { user_id: req.query.user_id } },
                            transaction)
                    }
                    else if (req.query.status === "spi") {
                        await character.decrement(
                            { status_spi: 0.5 },
                            { where: { user_id: req.query.user_id } },
                            transaction)
                    }
                    else if (req.query.status === "etc") {
                        await character.decrement(
                            { status_etc: 0.5 },
                            { where: { user_id: req.query.user_id } },
                            transaction)
                    }
                    await damage_log.decrement(
                        { log: 0.5 },
                        {
                            where: {
                                user_id: req.query.user_id,
                                raid_id: req.query.raid_id
                            }
                        }, transaction)
                    await raid.decrement(
                        { hit_damage: 0.5 },
                        {
                            where: {
                                id: req.query.raid_id
                            }
                        }, transaction)
                    await monster.decrement(
                        { hp: 0.5 },
                        {
                            where: {
                                id: req.query.monster_id
                            }
                        }, transaction)

                    const monsterInfo = await monster.findOne({ where: { id: req.query.monster_id } }, transaction)
                    if (monsterInfo.dataValues.hp === 0) {
                        const monsterInfo = await monster.findOne({ where: { id: req.query.raid_id } })
                        const characterArray = await character.findAll(
                            {
                                include: {
                                    model: user,
                                    include: {
                                        model: damage_log,
                                        where: { raid_id: req.query.raid_id } //raid 참가한 인원
                                    }
                                }
                            })
                        characterArray.forEach(el => {
                            character.decrement({
                                level: monsterInfo.dataValues.reward
                            },
                                { where: { id: el.dataValues.id } })
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
                        await transaction.commit()
                        res.status(200).json({ message: "몬스터를 잡았습니다", todoInfo: todoInfo, characterInfo: characterInfo })
                    }
                    else {
                        const todoInfo = await todo_list.findOne({ where: { id: req.query.id } }, transaction)
                        const characterInfo = await character.findOne({ where: { user_id: req.query.user_id } }, transaction)
                            .then(data => {
                                return {
                                    ...data.dataValues,
                                    level: data.dataValues.totalExp / 100,
                                    exp: data.dataValues.totalExp % 100
                                }
                            })
                        await transaction.commit()
                        res.status(200).json({ message: "데미지를 넣었습니다", todoInfo: todoInfo, characterInfo: characterInfo })
                    }
                }
                catch (err) {
                    await transaction.rollback()
                    res.status(400).json({ message: "실패" })
                }
            }
        }
    }
}
