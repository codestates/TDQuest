const jwt = require('jsonwebtoken')
const { user } = require('../models')
const { character } = require('../models')
const { redisSet } = require("../middleware/session")

module.exports = {
    login: async (req, res) => {
        await user.findOne({ where: { email: req.body.email}})
        .then(async userInfo => {
            req.session.key = userInfo.dataValues.email
            // redisSet("email", userInfo.dataValues.email)
            jwt.verify(userInfo.dataValues.password, process.env.ACCESS_SECRET, async (err, decoded) => {
                if (decoded.el !== req.body.password) {
                 res.status(404).send({ message: "Wrong user password" });
                }
                else {
                    await character.findOne({
                        where : { user_id : userInfo.dataValues.id}
                    })
                    .then(character => {
                        const characterInfo = {...character.dataValues, 
                            level : character.dataValues.totalExp / 100,
                            exp : character.dataValues.totalExp % 100
                        }
                        res.status(200).json({characterInfo : characterInfo, 
                            userInfo : { id : userInfo.dataValues.id,
                                nickname : userInfo.dataValues.nickname,
                                email : userInfo.dataValues.email,
                                createdAt : userInfo.dataValues.createdAt,
                                updatedAt : userInfo.dataValues.updatedAt
                        }})
                    })
                }
              });
        })
        .catch(err => {
            res.status(404).json({message : "Wrong user Id"})
        })
    },

    logout : async (req, res) => {
        // res.clearCookie('accessToken');
        res.session.destroy()
        return res.status(200)
    },
}