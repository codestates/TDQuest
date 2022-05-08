const jwt = require('jsonwebtoken');


module.exports = {
    
    makeAccessToken : (el) => {
        try {
            return jwt.sign({el}, process.env.ACCESS_SECRET)
        } catch (error) {
            return 'error'   
        }
    },

    makeRefreshToken : (email) => {
        try {
            return jwt.sign({email}, process.env.REFRESH_SECRET, { expiresIn: '3d' })
            
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
                
            }
            if(error.name === 'JsonWebTokenError'){
                console.log(error);
            }
            if(error.name === 'NotBeforeError'){
                console.log(error);
            }
    
            console.log(err)
            return false
        }
    },

    authCheck : async (req, res) => {
        const { refreshToken } = req.cookies;

        const verifyAccessToken = verifyToken(refreshToken);
  
        if(verifyAccessToken.email){
          const accessToken = makeAccessToken(verifyAccessToken.email);
          const refreshToken = makeRefreshToken(verifyAccessToken.email);
  
            res.cookie('refreshToken', refreshToken, {
                // httpOnly: true
            }).json({accessToken})       
        } 
        return res.json({message : "인증 실패"})
    }
}   