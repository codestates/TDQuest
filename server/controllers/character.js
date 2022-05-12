const { character } = require('../models')
const { todo_list } = require("../models")
module.exports = {
    getCharacter : async (req, res) => {
            const characterInfo = await character.findOne({
                where : {user_id : req.query.user_id}
            })
            .then(characterInfo => {
                res.status(200).json({ characterInfo: characterInfo })
            })
            .catch(err => {
                console.log(err)
            })
    },
    // to do list가 완료 되면
    // raid 참가하기를 눌렀을 때와 안눌렀을 때 client차원에서 구분
     updateStatus : async (req, res) => {
       try {
        if (req.body.is_complete) { //완료버튼을 눌렀다면
            await todo_list.update({is_complete : true},
                { where : { id : req.body.id}}
            )
            
            if (req.query.status === "phy") {
                await character.increment(
                { status_phy : 0.5 },
                { where : { user_id : req.query.user_id }})
                .then(async data => {
                    const characterInfo = await character.findOne(
                        { where : { user_id : req.query.user_id }})
                    res.status(200).json({characterInfo : characterInfo})
                })
              }
            }
            else if (req.query.status === "int") {
                await character.increment(
                { status_int : 0.5 },
                { where : { user_id : req.query.user_id }})
                .then(async data => {
                    const characterInfo = await character.findOne(
                        { where : { user_id : req.query.user_id }})
                    res.status(200).json({characterInfo : characterInfo})
                })
            }
            else if (req.query.status === "spi") {
                await character.increment(
                    { status_spi : 0.5 },
                    { where : { user_id : req.query.user_id }})
                    .then(async data => {
                        const characterInfo = await character.findOne(
                            { where : { user_id : req.query.user_id }})
                        res.status(200).json({characterInfo : characterInfo})
                })
            }
            else if (req.query.status === "etc") {
                await character.increment(
                    { status_etc : 0.5 },
                    { where : { user_id : req.query.user_id }})
                    .then(async data => {
                        const characterInfo = await character.findOne(
                            { where : { user_id : req.query.user_id }})
                        res.status(200).json({characterInfo : characterInfo})
                })
            }
        // 취소할 떄
        else {
            if (req.body.is_complete) { //완료버튼을 눌렀다면
                await todo_list.update({is_complete : false},
                    { where : { id : req.body.id}})
                
                if (req.query.status === "phy") {
                    await character.decrement(
                        { status_phy : 0.5 },
                        { where : { user_id : req.query.user_id }})
                        .then(async data => {
                            const characterInfo = await character.findOne(
                                { where : { user_id : req.query.user_id }})
                            res.status(200).json({characterInfo : characterInfo})
                        })
                }
                else if (req.query.status === "int") {
                    await character.decrement(
                        { status_int : 0.5 },
                        { where : { user_id : req.query.user_id }})
                        .then(async data => {
                            const characterInfo = await character.findOne(
                                { where : { user_id : req.query.user_id }})
                            res.status(200).json({characterInfo : characterInfo})
                        })
                }
                else if (req.query.status === "spi") {
                    await character.decrement(
                        { status_spi : 0.5 },
                        { where : { user_id : req.query.user_id }})
                        .then(async data => {
                            const characterInfo = await character.findOne(
                                { where : { user_id : req.query.user_id }})
                            res.status(200).json({characterInfo : characterInfo})
                        })
                }
                else if (req.query.status === "etc") {
                    await character.decrement(
                        { status_etc : 0.5 },
                        { where : { user_id : req.query.user_id }})
                        .then(async data => {
                            const characterInfo = await character.findOne(
                                { where : { user_id : req.query.user_id }})
                            res.status(200).json({characterInfo : characterInfo})
                        })
                }
            }
          }
        }
      catch {
        res.status(404).json({message: "Not Found"})
      }
    },
}