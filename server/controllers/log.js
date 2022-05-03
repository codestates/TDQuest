const jwt = require('jsonwebtoken')
const { user } = require('../models')
const { character } = require('../models')

module.exports = {
    login: async (req, res) => {
        const userInfo = await user.findOne({ where: { email: req.body.email, password: req.body.password } })
        
        if (!userInfo) {
            res.status(401).send({ message: 'not authorized' })
        } //401: 권한없음
        else {
            let payload = {
                email: userInfo.dataValues.email,
                nickname: userInfo.dataValues.nickname,
                password: userInfo.dataValues.password,

            }
            const AccessToken = jwt.sign(payload, process.env.ACCESS_SECRET, { expiresIn: '1h' })
            const RefreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, { expiresIn: '24h' })
            const characterInfo = await character.findOne({ where : {id : userInfo.dataValues.id}})
            res.status(200).cookie('refreshToken', RefreshToken)
                .json({
                    'accessToken': AccessToken, characterInfo : characterInfo})
        }
    },

    logout : async (req, res) => {
        res.clearCookie('accessToken');
        return res.status(200).redirect('/')
    },

}