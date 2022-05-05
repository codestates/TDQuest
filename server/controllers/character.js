const { character } = require('../models')

module.exports = {
    getCharacter : async (req, res) => {
        const characterInfo = character.findOne({
            include : {
                model : user,
                where : { user_id : req.query.id }
            }
        })
        if (characterInfo) {
            res.status(200).json({ characterInfo: characterInfo })
          } else {
            res.status(404).json({ message: "Not Found" })
          }
    },
    // to do list가 완료 되면
    // raid 참가하기를 눌렀을 때와 안눌렀을 때 client차원에서 구분
    updatePhyStatus : async (req, res) => {
        if (req.body.is_complete) {
        const characterInfo = await character.increment(
                { status_phy : 0.5 },
                {include : {
                    model : user,
                    where : { user_id : req.query.id }
                }})
                res.status(200).json({characterInfo : characterInfo})
            }
        else {
        const characterInfo = await character.decrement(
                { status_phy : 0.5 },
                {include : {
                    model : user,
                    where : { user_id : req.query.id }
                }})
        }
        res.status(200).json({characterInfo : characterInfo})
    },

    updateIntStatus : async (req, res) => {
        if (req.body.is_complete) {
            const characterInfo = await character.increment(
                    { status_int : 0.5 },
                    {include : {
                        model : user,
                        where : { user_id : req.query.id }
                    }})
                    res.status(200).json({characterInfo : characterInfo})
                }
            else {
            const characterInfo = await character.decrement(
                    { status_int : 0.5 },
                    {include : {
                        model : user,
                        where : { user_id : req.query.id }
                    }})
            }
            res.status(200).json({characterInfo : characterInfo})
    },

    updateSpiStatus : async (req, res) => {
        if (req.body.is_complete) {
            const characterInfo = await character.increment(
                    { status_spl : 0.5 },
                    {include : {
                        model : user,
                        where : { user_id : req.query.id }
                    }})
                    res.status(200).json({characterInfo : characterInfo})
                }
            else {
            const characterInfo = await character.decrement(
                    { status_spl : 0.5 },
                    {include : {
                        model : user,
                        where : { user_id : req.query.id }
                    }})
            }
            res.status(200).json({characterInfo : characterInfo})
    },
    updateEtcStatus : async (req, res) => {
        if (req.body.is_complete) {
            const characterInfo = await character.increment(
                    { status_etc : 0.5 },
                    {include : {
                        model : user,
                        where : { user_id : req.query.id }
                    }})
                    res.status(200).json({characterInfo : characterInfo})
                }
            else {
            const characterInfo = await character.decrement(
                    { status_etc : 0.5 },
                    {include : {
                        model : user,
                        where : { user_id : req.query.id }
                    }})
            }
            res.status(200).json({characterInfo : characterInfo})
    },
}