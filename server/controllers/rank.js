const { character } = require("../models")
const { user } = require("../models")
module.exports = {
    All: async (req, res) => {
        try {
            const characterStat = await character.findAll({
                attribute: ['status_phy', 'status_int', 'status_spi'],
                raw: true
            })

            let max = 0
            let ranker = []
            await Promise.all(characterStat.map((el, idx) => {
                const stat = el.status_phy + el.status_int + el.status_spi
                    if (max < stat) { //최댓값을 구하고, 
                        max = stat
                    }
                    return [stat, el.id] //다 더한 값으로 바꾸기
                }))// 같은 값이 있을 수 있기 때문에 최대값과 같은 요소
            .then(characterArray => 
                characterArray.forEach((el, idx) => {
                if (el[0] === max) {
                    ranker.push(el[1])
                }
            }))
            .then(async data => 
                await Promise.all(ranker.map(async el => {
                const rankerUser = await character.findOne({
                    where: { id: el },
                    include : { model : user,
                        attributes: { exclude: 'password'}
                    }
                }, { raw : true })
                return rankerUser
            })))
            .then(data =>
                res.status(200).json({ranker : data})
            )
        }
        catch (err) {
            throw err
        }
    },

    statusRank: async (req, res) => {
        try {
                const phyRank = await character.findAll({
                    order: [["status_phy", "DESC"]],
                    include : { model : user,
                        attributes: { exclude: 'password'}
                    },
                    limit: 5 
                })

                const intRank = await character.findAll({
                    order: [["status_int", "DESC"]],
                    include : { model : user,
                        attributes: { exclude: 'password'}
                    },
                    limit: 5
                })
                
                const spiRank = await character.findAll({
                    order: [["status_spi", "DESC"]],
                    include : { model : user,
                        attributes: { exclude: 'password'}
                    },
                    limit: 5
                })
            res.status(200).json({ phyRank : phyRank, intRank : intRank, spiRank : spiRank })
        }
        catch (err) {
            throw err
        }
    },
}