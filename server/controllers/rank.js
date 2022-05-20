const { character } = require("../models")

module.exports = {
    All : async (req, res) => {
        try {
            const characterStat = await character.findAll({
                attribute : ['status_phy', 'status_int', 'status_spi'],
                raw: true
            })

            let max = 0
            let ranker = []
            characterStat.map((el, idx) => {
                const stat = el.status_phy + el.status_int + el.status_spi
                if (max < stat) { //최댓값을 구하고, 
                    max = stat
                }
                return stat //다 더한 값으로 바꾸기
            })// 같은 값이 있을 수 있기 때문에 최대값과 같은 요소
            .forEach((el , idx) => {
                if (el === max) {
                    ranker.push(idx+1)
                }
            })
            ranker.map(async el => {
                const rankerUser = await character.findOne({
                    where : { id : el }
                })
                return rankerUser
                }
            )
            res.status(200).json({ranker : ranker})
        }
        catch (err) {
            res.status(400).json({message : err})
        }
    },
    statusRank : async (req, res) => {
        try {
            const statusRank = null;
            if (req.query.kind === "status_phy") {
                statusRank = await character.findAll({
                    order: [["status_phy", "DESC"]],
                }, {limit : 5})    
            }
            else if (req.query.kind === "status_int") {
                const statusRank =  await character.findAll({
                    order: [["status_int", "DESC"]],
                }, {limit : 5})    
            }
            else if (req.query.kind === "status_spi") {
                const statusRank =  await character.findAll({
                    order: [["status_spi", "DESC"]],
                }, {limit : 5})    
            }
            res.status(200).json({statusRank: statusRank})
        }
        catch (err) {
            res.status(400).json({message : err})
        }
    },
}