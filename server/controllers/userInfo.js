const { user } = require('../models')

module.exports = {
    getUser : async (req, res) => {
        try {
            const userInfo = await user.findOne({
                where : { id : req.query.id}
            })
            res.status(200).json({userInfo: userInfo, message: '유저정보'})
        }
        catch(err)  {
            res.status(404).json({message : err})
        }
    },
    
    updateUser : async (req, res) => {
        try {
            await user.update({
                password : req.body.password,
                nickname : req.body.nickname
            }, 
            {where : { id: req.body.id}})
            
            const userInfo = await user.findOne({
                where : {id : req.body.id}
            })
            res.status(200).json({message: '유저정보 수정', userInfo : userInfo})
        }
        catch {
            res.status(400).json({message : err})
        }
    },
}