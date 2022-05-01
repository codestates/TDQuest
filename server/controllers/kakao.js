const dotenv = require('dotenv');
const axios = require('axios')
const { verifyToken, accessToken, refreshToken} = require('../middleware/authToken');

module.exports = {
    kakao : async (req, res) => {
        return res.redirect(`${process.env.KAKAO_URL}/
        authorize?client_id=${process.env.KAKAO_ID}&
        redirect_uri=${process.env.KAKAO_REDIRECT}&
        response_type=code`)
    },

    callback : async (req, res) => {
        const {data} = await axios({
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
    },

}