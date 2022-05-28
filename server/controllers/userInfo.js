const { user } = require('../models')
const bcrypt = require("bcrypt")

module.exports = {
    getUser: async (req, res) => {
        try {
            const userInfo = await user.findOne({
                where: { id: req.query.id }
            })
            res.status(200).json({ userInfo: userInfo, message: '유저정보' })
        }
        catch (err) {
            res.status(404).json({ message: err })
        }
    },

    updateUser: async (req, res) => {
        try {
            let hashPassword
            if (req.body.password) {
                hashPassword = await bcrypt.hash(req.body.password.toString(), Number(process.env.BCRYPT))
            }
            await user.update({
                password: hashPassword,
                nickname: req.body.nickname
            },
                { where: { id: req.query.id } })

            const userInfo = await user.findOne({
                attributes: {exclude: 'password'},
                where: { id: req.query.id }
            })
            res.status(200).json({ message: '유저정보 수정', userInfo: userInfo })
        }
        catch (err) {
            throw err
            res.status(400).json({ message: err })
        }
    },
}