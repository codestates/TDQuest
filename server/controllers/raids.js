const { damage_log } = require("../models")
const { monster } = require("../models")
const { raids } = require("../models")
const { character } = require("../models")
const user = require("../models/user")

module.exports = {
    inviteRaids : async (req, res) => {
        await damage_log.create({
            user_id : req.body.user_id,
            raid_id : req.body.raid_id,
            log : 0
        })
        res.status(200).json({message : "레이드에 참가합니다"})
    },
    
    attack : async (req, res) => {
        await damage_log.increment(
            { log : 0.5 },
            { where : {
                user_id : req.body.user_id,
                raid_id : req.body.raid_id}})
        await raids.increment(
            { hit_damge : 0.5},
            { where : {
                id : req.body.raid_id}})
        await monster.decrement(
            { hp : 0.5},
            { where : {
                id : req.body.monster_id}})
                .then(monster => {
                    if (monster.dataValues.hp === 0) {
                        // character level + reward
                        const characterArray = await character.findAll({
                            include : {
                                model : user,
                                include : {
                                    model : damage_log,
                                    where : { raid_id : req.body.raid_id}
                                }
                            }
                        })
                        characterArray.map(el => {
                            character.increment({ level : monster.dataValues.reward},
                                { include : {
                                    model : user,
                                    include : {
                                        model : damage_log,
                                        where : { raid_id : req.body.raid_id}
                                    }
                                }
                            })
                        })
                    } // 잡고 난 후에, 다른 테이블 삭제?
                })
    res.status(200).json({message : '데미지를 넣었습니다.'})
    },
}