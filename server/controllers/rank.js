const { character } = require("../models")

module.exports = {
    All : async (req, res) => {
        const characterStat = await character.findAll({
            attribute : ['status_phy', 'status_int', 'status_spi'],
            raw: true
        })
        .then(data => { // 유저 배열이 주어짐
            let max = 0
            let ranker = []
            data.map((el, idx) => {  // 한 유저 객체
                const stat = el.status_phy + el.status_int + el.status_spi
                if (max < stat) {
                    max = stat
                }
                return stat
            }) // data는 각 스탯을 더한 값으로 바뀜
            .forEach((el , idx) => {
                if (el === max) {
                    ranker.push(idx+1)
                }
            })
            ranker.map(el => { 
                const rankerUser = await character.findOne({
                    where : { id : el }
                })
                return rankerUser
                }
            )
            res.status(200).json({ranker : ranker})
        })
    },
    phyRank : async (req, res) => {
        const phyRank =  await user.findAll({
            order: ['status_phy', 'DESC'],
        }, {limit : 5})

        if (phyRank) {
            res.status(200).json({phyRank : phyRank})
        }
        else {
            res.status(404).json({message : "Not Found"})
        }
    },

    intRank : async (req, res) => {
        const intRank = await user.findAll({
            order: ['status_int', 'DESC'],
        }, {limit : 5})

        if (phyRank) {
            res.status(200).json({intRank : intRank})
        }
        else {
            res.status(404).json({message : "Not Found"})
        }
    },

    spiRank : async (req, res) => {
        const splRank = await user.findAll({
            order: ['status_spi', 'DESC'],
        }, {limit : 5})

        if (splRank) {
            res.status(200).json({splRank : splRank})
        }
        else {
            res.status(404).json({message : "Not Found"})
        }
    },
}