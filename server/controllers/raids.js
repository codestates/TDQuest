const { damage_log } = require("../models")
const { monster } = require("../models")
const user = require("../models/user")

module.exports = {
    inviteRaids : async (req, res) => {
        try {
            await damage_log.create({
                user_id : req.body.user_id,
                raid_id : req.body.raid_id,
            })
            .then(async damage_log_Info => {
                const monsterInfo = await monster.findOne({
                    include : {
                        model : raid,
                        include : {
                            model : damage_log,
                            where : {
                                raid_id : req.body.raid_id
                            }
                        }
                    }
                })
            res.status(201).json({message : "레이드에 참가합니다",
                damage_log_Info : damage_log_Info,
                monsterInfo : monsterInfo
                }) 
            })
        }
        catch {
            res.status(404).json({message : "Not Found"})
        }},
}