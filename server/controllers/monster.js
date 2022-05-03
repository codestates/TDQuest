const { monster } = require("../models")
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
    }, // 레이드 첫 화면

    updateMonster : async (req, res) => {
        if (req.body.is_complete) {
            const raids = await raids.increment(
                    { hit_damage : 0.5 },
                    { where : {user_id : req.body.user_id}
                })
            const monster = await monster.decrement(
                    { hp : 0.5 },
                    { where : { monster_id : req.body.monster_id}
                }) 
            res.status(200).json({message : "데이지를 넣었습니다.", raids: raids, monster : monster})
        }
        else {
            const raids = await raids.decrement(
                { hit_damage : 0.5 },
                { where : {user_id : req.body.user_id}
            })
            const monster = await monster.increment(
                { hp : 0.5 },
                { where : { moster_id : req.body.monster_id}
            })                   
            res.status(200).json({message : "데미지를 취소합니다"})
        }
    }
}