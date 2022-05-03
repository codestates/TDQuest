const { user } = require('../models')

module.exports = {
    getUser : async (req, res) => {
        const userInfo = await user.findOne({
            where : {id : req.query.id}
        })
        res.status(200).json({userInfo: userInfo, message: '유저정보'})
    },
    
    updateUser : async (req, res) => {
        await user.update({
            password : req.body.password,
        }, {where : { id: req.body.id}})
        res.status(200).json({message: '유저정보 수정'})
    },
}