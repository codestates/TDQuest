const { character } = require('../models')
const { todo_list } = reqiuire("../models")
module.exports = {
    getCharacter : async (req, res) => {
        const characterInfo = character.findOne({
            where : {user_id : req.body.user_id}
        })
        if (characterInfo) {
            res.status(200).json({ characterInfo: characterInfo })
          } else {
            res.status(404).json({ message: "Not Found" })
          }
    },
    // to do list가 완료 되면
    // raid 참가하기를 눌렀을 때와 안눌렀을 때 client차원에서 구분
    updatePhyStatus : async (req, res) => {
        if (req.body.is_complete) { //완료버튼을 눌렀다면
        await todo_list.update({is_complete : true},
                { where : { id : req.body.id}}
            )
        const characterInfo = await character.increment(
                { status_phy : 0.5 },
                { where : { user_id : req.query.user_id }})
                res.status(200).json({characterInfo : characterInfo})
            }
        else {
            await todo_list.update({is_complete : false},
                { where : { id : req.body.id}}
            )
        const characterInfo = await character.decrement(
                { status_phy : 0.5 },
                { where : { user_id : req.query.user_id }})
        }
        res.status(200).json({characterInfo : characterInfo})
    },

    updateIntStatus : async (req, res) => {
        if (req.body.is_complete) {
            await todo_list.update({is_complete : true},
                { where : { id : req.body.id}}
            )
            const characterInfo = await character.increment(
                    { status_int : 0.5 },
                    { where : { user_id : req.query.user_id }})
                    res.status(200).json({characterInfo : characterInfo})
                }
            else {
                await todo_list.update({is_complete : false},
                    { where : { id : req.body.id}}
                )
            const characterInfo = await character.decrement(
                    { status_int : 0.5 },
                    { where : { user_id : req.query.user_id }})
            }
            res.status(200).json({characterInfo : characterInfo})
    },

    updateSpiStatus : async (req, res) => {
        if (req.body.is_complete) {
            await todo_list.update({is_complete : true},
                { where : { id : req.body.id}}
            )
            const characterInfo = await character.increment(
                    { status_spl : 0.5 },
                    { where : { user_id : req.query.user_id }})
                    res.status(200).json({characterInfo : characterInfo})
                }
            else {
                await todo_list.update({is_complete : false},
                    { where : { id : req.body.id}}
                )
            const characterInfo = await character.decrement(
                    { status_spl : 0.5 },
                    { where : { user_id : req.query.user_id }})
            }
            res.status(200).json({characterInfo : characterInfo})
    },
    updateEtcStatus : async (req, res) => {
        if (req.body.is_complete) {
            await todo_list.update({is_complete : true},
                { where : { id : req.body.id}}
            )
            const characterInfo = await character.increment(
                    { status_etc : 0.5 },
                    { where : { user_id : req.query.user_id }})
                    res.status(200).json({characterInfo : characterInfo})
                }
            else {
                await todo_list.update({is_complete : false},
                    { where : { id : req.body.id}}
                )
            const characterInfo = await character.decrement(
                    { status_etc : 0.5 },
                    { where : { user_id : req.query.user_id }})
            }
            res.status(200).json({characterInfo : characterInfo})
    },
}