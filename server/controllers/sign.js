const jwt = require('jsonwebtoken')
const { user } = require('../models')
const { character } = require("../models")
const { makeAccessToken } = require('../middleware/token');
const bcrypt = require("bcrypt")

module.exports = {
    signIn: async (req, res) => {
        const { email, nickname, password } = req.body
        const hashPassword = await bcrypt.hash(password.toString(), Number(process.env.BCRYPT));
        const isUser = await user.findOne({
            where: { email: email }
        })
        console.log(hashPassword)
        if (isUser) {
            res.status(409).json({ message: "이미 아이디가 있습니다." })
        }
        else {
            try {
                const userInfo = await user.create({
                    email: email,
                    nickname: nickname,
                    password: hashPassword
                })
                const characterInfo = await character.create({
                    user_id: userInfo.dataValues.id
                })
                res.status(200).json({ message: "회원가입 성공" })
            }
            catch (err) {
                res.status(400).json({ message: err })
            }
        }
    },
    signOut: async (req, res) => {
        try {
            user.destroy({ where: { id: req.query.id } })
            res.status(200).json({message : "삭제되었습니다"});    
        }
        catch(err) {
            res.status(200).json({message : err})
        }
    },
};
