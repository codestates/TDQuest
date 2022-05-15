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
        const auth = req.headers.authorization

        if (!auth) {
            res.status(401).json({message : '인증이 실패했습니다'})
        }
        else {
            const token = auth.split(' ')[1];
            const verify = verifyToken(token);
            
            await user.findOne({ where : {email : verify.email}})
            .then(userInfo => {
                next()
            }) 
            .catch(err => {
                return err
            })
        }
    },

    checkRefreshToken : async (req, res) => {
        const { refreshToken } = req.cookies;
        
        const verifyAccessToken = verifyToken(refreshToken);
        if(verifyAccessToken.email){
          const accessToken = makeAccessToken(verifyAccessToken.email);
          const refreshToken = makeRefreshToken(verifyAccessToken.email);
  
            res.cookie('refreshToken', refreshToken, {
                // httpOnly: true
            }).json({"accessToken" : accessToken})       
        } 
        return res.status(401).json({message : "인증 실패"})
    }
}   