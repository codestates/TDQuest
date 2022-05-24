const { damage_log } = require("../models")
const { monster } = require("../models")

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

            res.status(404).json({ message: "Not Found" })
        }
    },
}