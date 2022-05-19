const { character } = require('../models')

module.exports = {
    getCharacter : async (req, res) => {
            const characterInfo = await character.findOne({
                where : {user_id : req.query.user_id}
            })
            .then(character => {
                const characterInfo = {...character.dataValues, 
                    level : character.dataValues.totalExp / 100,
                    exp : character.dataValues.totalExp % 100
                }
                res.status(200).json({ characterInfo: characterInfo })
            })
            .catch(err => {
                console.log(err)
            })
    },
}