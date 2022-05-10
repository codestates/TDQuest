const jwt = require('jsonwebtoken')
const { user } = require('../models')
const { character } = require('../models')
const { redisSet } = require("../middleware/session")

module.exports = {
    login: async (req, res) => {
    
        await user.findOne({ where: { email: req.body.email}})
        .then(userInfo => {
            req.session.key = userInfo.dataValues.email
            // redisSet("email", userInfo.dataValues.email)
            jwt.verify(userInfo.dataValues.password, process.env.ACCESS_SECRET, (err, decoded) => {
                if (err) {
                    res.status(401).send({ message: 'not authorized' })
                }
                else {
                    character.findOne({
                        include : {
                            model : user,
                            where : { id : userInfo.dataValues.id }
                        }
                    })
                    .then(characterInfo => {
                        res.status(200).json({characterInfo : characterInfo})
                    })
                }
              });
        })
    },

    logout : async (req, res) => {
        // res.clearCookie('accessToken');
        res.session.destroy()
        return res.status(200).redirect('/')
    },
}