const cron = require("node-cron");
const { damage_log } = require("../models")
const { monster } = require("../models")
const { user } = require("../models")
const { raid } = require("../models")
const number = require("./monsterInfo/monsterInfo")

let count = 0
cron.schedule('* * * Jan,Dec Sat', async () => {
    await monster.create(
        number[count]
    )
    await raid.create({
        monser_id : count
    })
})

cron.schedule('* * * Jan,Dec Mon', async () => {
    await monster.destroy({
        where : {id : count}
    })
    await raid.destroy({
        where : {id : count}
    })
    count++
})

module.exports = {
    inviteRaids: async (req, res) => {
        try {
            const damage_log_Info = await damage_log.create({
                user_id: req.query.user_id,
                raid_id: req.query.raid_id,
            })
            const monsterInfo = await monster.findOne({
                include: {
                    model: raid,
                    include: {
                        model: damage_log,
                        where: {
                            raid_id: req.query.raid_id
                        }
                    }
                }
            })
            res.status(201).json({
                message: "레이드에 참가합니다",
                damage_log_Info: damage_log_Info,
                monsterInfo: monsterInfo
            })
        }
        catch (err) {
            console.log(err)
            res.status(404).json({ message: "Not Found" })
        }
    },

    damage_logs : async (req, res) => {
        try {
            const damage_log_Info = await damage_log.findAll({
                where : {
                    raid_id : req.query.raid_id,
                },
                include : { model : user,
                    attributes: { exclude: 'password'}
                }
            })
            res.status(200).json({damage_log_Info : damage_log_Info})
        }
        catch (err) {
            res.status(404).json({message : err})
        }
    }
}