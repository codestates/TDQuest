const { user } = require('../models')

module.exports = {
    getUser : async (req, res) => {
        await user.findOne({
            where : {id : req.query.id}
        })
        .then(userInfo => {
            res.status(200).json({userInfo: userInfo, message: '유저정보'})
        })
        .catch(err => {
            console.log(err)
        })
    },
    
    updateUser : async (req, res) => {
        await user.update({
            password : req.body.password,
        }, {where : { id: req.body.id}})
        .then(success => {
            res.status(200).json({message: '유저정보 수정'})
        })
        .catch(err => {
            console.log(err)
        })
    },
}