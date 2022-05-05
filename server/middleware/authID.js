const { user } = require("../models")

module.exports = {
    
    existID : async (email) => {
        const userInfo = await user.findOne({
            email : email
        })
        if (userInfo) {
            return userInfo
        }
    },

    signID : (userInfo) => {
        const userInfo = await user.create({
            email : userInfo.email,
            name : userInfo.nickname
        })
        res.redirect("http://localhost:3000")
    }
}
