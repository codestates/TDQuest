const jwt = require('jsonwebtoken');

const makeAccessToken = (email, password) => {
    try {
        return jwt.sign(email, process.env.ACCESS_SECRET, { expiresIn: '1d'})
    } catch (error) {
        
    }
}

const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_SECRET)
        return decoded;
    }
    catch (error) {
 
        if(error.name === 'TokenExpiredError'){
            console.log(error)
        }
        if(error.name === 'JsonWebTokenError'){
            console.log(error);
        }
        if(error.name === 'NotBeforeError'){
            console.log(error);
        }
        return
    }   
}

const makeRefreshToken = (email) => {
    try {
        return jwt.sign(email, process.env.REFRESH_SECRET, { expiresIn: '3d' })
        
    } catch (error) {
        return "error"
    }
}

module.exports = {verifyToken , makeAccessToken, makeRefreshToken }