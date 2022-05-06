const { user } = require("../models")
const { raids } = require('../models')
const { damage_log } = require("../models")
const user = require('../models/user')

module.exports = {
    inviteRaids : async (req, res) => {
        await raids.create({
            hit_damage : 0,
        })
        res.status(200).json({message : "레이드에 참가합니다"})
    },
    
    attack : async (req, res) => {
        const damage_logInfo = await damage_log.increment(
            { log : 0.5 },
            { include : [
                { model : user,
                  where : { id : req.body.user_id }
                },
                { model : raids,
                  where : { id : req.body.raid_id}
                }
            ]})
    res.status(200).json({damage_logInfo : damage_logInfo})
    },
}