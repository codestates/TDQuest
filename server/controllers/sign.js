const jwt = require('jsonwebtoken')
const { user } = require('../models')
const { character } = require("../models")
const { makeAccessToken } = require('../middleware/auth');

module.exports = {
    signIn : async (req, res) => {
        const { email, nickname, password } = req.body.userInfo
        const passwordToken = makeAccessToken(password)
        const userInfo = user.create({
            email: email,
            nickname: nickname,
            password: passwordToken
        })

        await user.findOne({ where : {
            email : req.body.email
        }})
        .then(data => {
            const characterInfo = character.create({
                user_id : data.dataValues.id
            })
            res.status(200).redirect('/login').json({characterInfo: characterInfo})
        })
    },

  signOut: async (req, res) => {
    user.destory({ where: { id: req.query.id } });
    res.status(200);
  },
};
