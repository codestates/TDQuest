const { raids } = require('../models')

module.exports = {
    inviteRaids : async (req, res) => {
        await raids.create({
            user_id : req.body.user_id,
            moster_id : req.body.monster_id,
            hit_damage : 0,
        })
        res.status(200).json({message : "레이드에 참가합니다"})
    },
    
    attack : async (req, res) => {
        const raidsInfo = await raids.findAll({
            where : {moster_id : req.query.monster_id}
        })// 데미지를 넣은 정보 
        res.status(200).json({raidsInfo : raidsInfo})
    },
}