const { monster } = require("../models")

module.exports = {
    getMonster: async (req, res) => {
        try {
            const monsterInfo = await monster.findOne({
                where: { id: req.query.monster_id }
            })
            res.status(200).json({ monsterInfo: monsterInfo })
        }
        catch {
            res.status(404).json({ message: "Not Found" })
        }
    }, // 레이드 첫 화면
}