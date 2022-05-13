const { character } = require('../models')
const { todo_list } = require("../models")
const { damage_log } = require('../models')
const { monster } = require("../models")
const { raid } = require("../models")

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
            // raid 버튼을 눌렀을 시
            if (req.body.raid_id) {
                try {
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
                        
                    await monster.finById(req.body.monster_id)
                    .then(async monsterInfo => {
                        if (monsterInfo.dataValues.hp === 0) {
                            const characterArray = await character.findAll({
                                include : {
                                    model : user,
                                    include : {
                                        model : damage_log,
                                        where : { raid_id : req.body.raid_id} //raid 참가한 인원
                                            }
                                        }
                                    })
                                const monsterInfo =  await monster.findOne({
                                    where : {id : req.body.raid_id}
                                })
                                characterArray.map(el => {
                                    character.increment({
                                        level : monsterInfo.dataValues.reward
                                        },
                                        {where : { id : el.dataValues.id}})})
                          }
                          // moster 테이블 삭제?
                          // 끝낫다는 표시를 해야되나?
                          // raid_id 삭제?
                        })
                        res.status(200).json({message : '데미지를 넣었습니다.'})
                        }
                        catch {
                            res.status(404).json({message : "Not Found"})
                        }
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