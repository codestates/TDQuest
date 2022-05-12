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
                const rankerUser = character.findOne({
                    where : { id : el }
                })
                return rankerUser
                }
            )
            res.status(200).json({ranker : ranker})
        })
    },
    statusRank : async (req, res) => {
        const statusRank =  await user.findAll({
            order: [req.params.status, 'DESC'],
        }, {limit : 5})

        if (statusRank) {
            res.status(200).json({statusRank : statusRank})
        }
        else {
            res.status(404).json({message : "Not Found"})
        }
    },
}