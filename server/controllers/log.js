const jwt = require('jsonwebtoken')
const { user } = require('../models')
const { character } = require('../models')
const { makeAccessToken, makeRefreshToken } = require("../middleware/token")
const bcrypt = require("bcrypt")

module.exports = {
    login: async (req, res) => {
        try {
            const userInfo = await user.findOne({
                where: {
                    email: req.body.email
                }
            })
            const hash = await  bcrypt.compare(req.body.password.toString(), userInfo.dataValues.password)
              if (!hash) {
                res.status(404).json({ message: "Wrong user password" })
              }  
              else {
                const accessToken = await makeAccessToken(userInfo.dataValues.email)
                const refreshToken = await makeRefreshToken(userInfo.dataValues.email)
    
                await character.findOne({
                    where: { user_id: userInfo.dataValues.id }
                })
                    .then(character => {
                        const characterInfo = {
                            ...character.dataValues,
                            level: character.dataValues.totalExp / 100,
                            exp: character.dataValues.totalExp % 100
                        }
                        res.status(200).cookie('accessToken', accessToken)
                            .json({
                                characterInfo: characterInfo,
                                userInfo: {
                                    id : userInfo.id,
                                    email : userInfo.email,
                                    nickname : userInfo.nickname,
                                    logintype : userInfo.logintype,
                                    createdAt : userInfo.createdAt,
                                    updatedAt : userInfo.updatedAt
                                },
                                accessToken: accessToken,
                                refreshToken: refreshToken
                            })
                    })
              }
        }
        catch (err) {
            res.status(404).json({ message: "Wrong user Id" })
        }
    },

    logout: async (req, res) => {
        res.clearCookie('accessToken');
        res.status(200).json({ message: '로그아웃되었습니다.' })
    },
}