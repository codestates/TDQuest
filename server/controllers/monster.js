const { monster } = require("../monster")
const { raids } =require("../models")

module.exports = {
    getMonster : async (req, res) => {
        const monsterInfo = monster.findOne({
            where : {id : req.query.monster_id}
        })
        if (monsterInfo) {
            res.status(200).json({monsterInfo : monsterInfo})
        }
        else {
            res.status(404).json({message : "Not Found"})
        }
    },

    updateMonster : async (req, res) => {
        if (req.body.is_complete) {
            const raids = await raids.increment(
                    { hit_damage : 0.5 },
                    { where : req.query.user_id})
            
            const monster = await raids.increment(
                    { hit_damage : 0.5 },
                    { where : req.query.user_id}) 
            }
        else {
            const characterInfo = await character.decrement(
                    { status_phy : 0.5 },
                    { where : req.query.user_id})
                   
            }
            res.status(200).json({characterInfo : characterInfo})
    }
}