const jwt = require('jsonwebtoken')
const { user } = require('../models')
const { character } = require('../models')
const { verifyToken, makeAccessToken, makeRefreshToken} = require('../middleware/auth');

module.exports = {
    login: async (req, res) => {
        console.log(req.body)
        const userInfo = await user.findOne({ where: { email: req.body.email, password: req.body.password } })
        
        if (!userInfo) {
            res.status(401).send({ message: 'not authorized' })
        } //401: 권한없음
        else {
            const AccessToken = makeAccessToken(userInfo.dataValues.email)
            const RefreshToken = makeRefreshToken(userInfo.dataValues.email)
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