const { user } = require("../../models")

module.exports = { //oauth ID 검증
    
    existID : async (email, logintype) => {
        const userInfo = await user.findOne({
            where : { email : email,
                logintype : logintype
            }
        })
        if (userInfo) {
            return userInfo
        }
        else {
            
        }
    },

    signID : async (email, logintype) => {
        await user.create({
            email : email,
            logintype : logintype 
        })
    }
}
