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

        if (req.body.nickname) {
            await user.update({
                nickname : req.body.nickname
            }, {where : { id: req.body.id}}).then(() => {
                console.log("Changed User");
                res.status(200).json({message: 'change user'})
            })
        } else {
            await user.update({
                password : req.body.password,
            }, {where : { id: req.body.id}})
            await user.findOne({
                where : {id : req.body.id}
            })
            .then(userInfo => {
                res.status(200).json({message: '유저정보 수정', userInfo : userInfo})
            })
            .catch(err => {
                console.log(err)
            })    
        }
    },
}