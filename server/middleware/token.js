const jwt = require('jsonwebtoken');
const { user } = require('../models')
const { promisify } = require('util');
// const redisClient = require("../middleware/redis")

module.exports = {

    makeAccessToken: (el) => {
        try {
            return jwt.sign({ el }, process.env.ACCESS_SECRET, { expiresIn: '30m' })
        } catch (error) {
            return 'error'
        }
    },

    makeRefreshToken: (el) => {
        try {
            // redisClient.set(el, refreshToken);
            return jwt.sign({ el }, process.env.REFRESH_SECRET, { expiresIn: '7d' })

        } catch (error) {
            return "error"
        }
    },

    verifyToken: (token) => {
        try {
            const decoded = jwt.verify(token, process.env.ACCESS_SECRET)
            return decoded;
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                res.status(404).json({ message: "Not Found" })
            }
            if (error.name === 'JsonWebTokenError') {
                res.status(404).json({ message: "Not Found" })
            }
            if (error.name === 'NotBeforeError') {
                console.log(error);
                res.status(404).json({ message: "Not Found" })
            }
            return false
        }
    },


    checkAccessToken: async (req, res, next) => {
        const token = req.headers.authorization.split(' ')[1];
        const refreshToken = req.headers.refreshToken;

        if (!token) {
            res.status(401).json({ message: 'not Authorized' })
        }
        else {
            const decoded = jwt.verify(token, process.env.ACCESS_SECRET)
            if (decoded) {
                await user.findOne({ where: { email: decoded.el } })
                    .then(userInfo => {
                        next()
                    })
            }
            else {
                if (error.name === 'TokenExpiredError') {
                    // const getAsync = promisify(redisClient.get).bind(redisClient);
                    // const data = await getAsync(userId);
                    // if (refreshToken === data) {
                    jwt.verify(refreshToken, proccess.env.REFRESH_SECRET)
                        .then(token => {
                            const accessToken = makeAccessToken(req.body.email);
                            res.status(200).cookie({ refreshToken: req.headers.refreshToken })
                                .json({ accessToken: accessToken })
                            next()
                        })
                    // }
                }
                if (error.name === 'JsonWebTokenError') {
                    res.status(404).json({ message: "Not Found" })
                }
                if (error.name === 'NotBeforeError') {
                    console.log(error);
                    res.status(404).json({ message: "Not Found" })
                }
            }
        }
    },
}