const { character } = require('../models')

module.exports = {
    getCharacter : async (req, res) => {
        const characterInfo = character.findOne({
            where : { id : req.query.id }
        })
        if (characterInfo) {
            res.status(200).json({ characterInfo: characterInfo })
          } else {
            res.status(404).json({ message: "Not Found" })
          }
    },
    // 1. user 테이블 id가 req로 들어옴
    // 2. 1:1 관계 
    updatePhyStatus : async (req, res) => {
        if (req.body.is_complete) {
        const characterInfo = await character.increment(
                { status_phy : 0.5 },
                { where : req.query.user_id})
        
                res.status(200).json({characterInfo : characterInfo})
            }
        else {
        const characterInfo = await character.decrement(
                { status_phy : 0.5 },
                { where : req.query.user_id})
               
        }
        res.status(200).json({characterInfo : characterInfo})
    },

    updateIntStatus : async (req, res) => {
        if (req.body.is_complete) {
            const characterInfo = await character.increment(
                    { status_int : 0.5 },
                    { where : req.query.user_id})
            
                    res.status(200).json({characterInfo : characterInfo})
                }
            else {
            const characterInfo = await character.decrement(
                    { status_int : 0.5 },
                    { where : req.query.user_id})
                   
            }
            res.status(200).json({characterInfo : characterInfo})
    },

    updateSplStatus : async (req, res) => {
        if (req.body.is_complete) {
            const characterInfo = await character.increment(
                    { status_spl : 0.5 },
                    { where : req.query.user_id})
            
                    res.status(200).json({characterInfo : characterInfo})
                }
            else {
            const characterInfo = await character.decrement(
                    { status_spl : 0.5 },
                    { where : req.query.user_id})
                   
            }
            res.status(200).json({characterInfo : characterInfo})
    },
}