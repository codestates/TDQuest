const dotenv = require('dotenv');
const axios = require('axios')
const { character } = require("../../models")
const { verifyToken, makeAccessToken, makeRefreshToken } = require('../../middleware/token');
const { existID, signID } = require("./authID")

module.exports = {
    kakao : async (req, res) => {
        return res.redirect(`${process.env.KAKAO_URL}/
        authorize?client_id=${process.env.KAKAO_ID}&
        redirect_uri=${process.env.KAKAO_REDIRECT}&
        response_type=code`)
    },

    callback : async (req, res) => {
        const {data} = await axios({ //token
          method: 'POST',
          url: `${process.env.KAKAO_URL}/token`,
          headers:{
            'content-type':'application/x-www-form-urlencoded;charset=utf-8'
            },
            params:{
              grant_type: 'authorization_code',
              client_id:process.env.KAKAO_ID,
              client_secret:process.env.KAKAO_SECRET,
              redirectUri:process.env.KAKAO_REDIRECT,
              code: req.query.code,
            }
          })
          const kakao_access_token = data['access_token'];
        
          const {data:me} = await axios({
                method: 'GET',
                url: `https://kapi.kakao.com/v2/user/me`,
                headers:{
                    'authorization':`bearer ${kakao_access_token}`,
                }
             });

          const userId = {
               email: me.kakao_account.email,
               nickname: me.kakao_account.profile.nickname,
             };

          const userInfo = await existID(userId.email, 'kakao');
          
            if(userInfo){
              const accessToken = makeAccessToken(userInfo.dataValues.email)
              const refreshToken = makeRefreshToken(userInfo.dataValues.email)
              await character.findOne({
                where : { user_id : userInfo.dataValues.id}
              })
              .then(character => {
                const characterInfo = {...character.dataValues, 
                  level : character.dataValues.totalExp / 100,
                  exp : character.dataValues.totalExp % 100
                }
                res.cookie('refreshToken', refreshToken)
                .json({characterInfo : characterInfo, accessToken : accessToken})
              })//{ httpOnly: true}
            } //{ httpOnly: true}
            
            else{
              try {
              const signUpUserId = await signID(userInfo.dataValues.email, 'kakao');
              await character.findOne({
                where : { user_id : userInfo.dataValues.id}
              })
              .then(character => {
                const characterInfo = {...character.dataValues, 
                  level : character.dataValues.totalExp / 100,
                  exp : character.dataValues.totalExp % 100
                }
                
                const accessToken = makeAccessToken(signUpUserId.dataValues.email)
                const refreshToken = makeRefreshToken(signUpUserId.dataValues.email)
                res.cookie('refreshToken', refreshToken)
                .json({characterInfo : characterInfo, accessToken : accessToken})
              }) //{ httpOnly: true}
            }//{ httpOnly: true}
            catch (err) {
              res.status(400).json({message : err})
            }
          }
  },
}