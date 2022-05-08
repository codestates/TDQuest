<<<<<<< HEAD
const jwt = require("jsonwebtoken");
const { user } = require("../models");

module.exports = {
  signIn: async (req, res) => {
    const { email, name, password } = req.body.userInfo;

    const userInfo = user.create({
      email: email,
      nickname: nickname,
      password: password,
    });
    res.status(200).redirect("/login");
  },
=======
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
            const characterInfo = character.create()
            res.status(200).redirect('/login').json({characterInfo: characterInfo})
        })
    },
>>>>>>> 07a5d80 (create Redis)

  signOut: async (req, res) => {
    user.destory({ where: { id: req.query.id } });
    res.status(200);
  },
};
