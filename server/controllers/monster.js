const { monster } = require("../models")
const { raids } =require("../models")
const { character } = require("../models")
const { user } = require("../models/user")

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

    updateMonster : async (req, res) => { // todoList 완료시
        if (req.body.is_complete) {
            await raids.increment(
                    { hit_damage : 0.5 },
                    { include : monsters,
                      where : { id : req.body.monster_id }
                    })
            .then(raids => {
                if (raids.hit_damage >= monster.hp) {
                    monster.findOne({
                        attribute : 'reward',
                        where : { id : req.body.monster_id }
                    })
                    .then(monsterClear => {
                        character.increment(
                            { 'level' : monsterClear.reward},
                            { include : { model : user,
                                include : { model : damage_log,
                                    include : { model : raids,
                                        include : { model : monsters,
                                            where : { id : req.body.monster_id}
                                        }
                                    }
                                }
                            }
                        })
                    })
                }
                else {
                    res.status(200).josn({message : "몬스터를 공격했습니다."})
                }
            })
            const monster = await monster.decrement(
                    { hp : 0.5 },
                    { include : monsters,
                        where : { id : req.body.monster_id }
                      })
        }
        else {
            const raids = await raids.decrement(
                { hit_damage : 0.5 },
                { include : monsters,
                    where : { id : req.body.monster_id }
                  })
            const monster = await monster.increment(
                { hp : 0.5 },
                { include : monsters,
                    where : { id : req.body.monster_id }
                  })                   
            res.status(200).json({message : "데미지를 취소합니다"})
        }
    }
}