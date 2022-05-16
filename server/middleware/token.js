const jwt = require('jsonwebtoken');
const { user } = require('../models')

module.exports = {
    
    makeAccessToken : (el) => {
        try {
            return jwt.sign({el}, process.env.ACCESS_SECRET, {expiresIn : '30m'})
        } catch (error) {
            return 'error'   
        }
    },

    makeRefreshToken : (el) => {
        try {
            return jwt.sign({el}, process.env.REFRESH_SECRET, { expiresIn: '7d' })
            
        } catch (error) {
            return "error"
        }
    },

    verifyToken : (token) => {
        try {
            const decoded = jwt.verify(token, process.env.ACCESS_SECRET)
            return decoded;
        } catch (error) {
            if(error.name === 'TokenExpiredError'){
                res.status(404).json({message: "Not Found"})        
            }
            if(error.name === 'JsonWebTokenError'){
                res.status(404).json({message: "Not Found"})
            }
            if(error.name === 'NotBeforeError'){
                console.log(error);
                res.status(404).json({message: "Not Found"})
            }
            return false
        }
    },


    checkAccessToken : async (req, res) => {
        const token = req.headers.authorization.split(' ')[1];
        const refreshToken = req.headers.refreshToken;

        if (!token) {
            res.status(401).json({message : 'not Auhtorized'})
        }
        else {
            verifyToken(token)
            .then(async verify => {
                await user.findOne({ where : {email : verify.email}})
                    .then(userInfo => {
                        next()
                    })    
            })
            .catch(err => {
                if(error.name === 'TokenExpiredError'){
                    jwt.verify(refreshToken, proccess.env.REFRESH_SECRET)
                    .then(token => {
                        const accessToken = makeAccessToken(req.body.email);
                        res.status(200).cookie({refreshToken : req.headers.refreshToken})
                        .json({accessToken : accessToken})
                        next()
                    })
                }
                if(error.name === 'JsonWebTokenError'){
                    res.status(404).json({message: "Not Found"})
                }
                if(error.name === 'NotBeforeError'){
                    console.log(error);
                    res.status(404).json({message: "Not Found"})
                }
            })
        }
    },
}   