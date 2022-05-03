const jwt = require('jsonwebtoken')
const { user } = require('../models')

module.exports = {
    signIn : async (req, res) => {
        const { email, name, password } = req.body.userInfo

        const userInfo = user.create({
            email: email,
            name: name,
            password: password
        })
        res.status(200).redirect('/log/in')
    },

    signOut : async (req, res) => {
        user.destory({where: {id : req.query.id}})
        res.status(200)
    },
}