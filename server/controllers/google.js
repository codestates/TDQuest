const dotenv = require('dotenv');
const axios = require('axios')
const dotenv = require('dotenv');
const { user } = require('../models')
const { verifyToken, accessToken, refreshToken} = require('../middleware/authToken');

module.exports = {
    google : async (req, res) => {
        return res.redirect(`${process.env.GOOGLE_URL}?
        client_id=${process.env.GOOGLE_ID}&
        redirect_uri=${process.env.GOOGLE_REDIRECT}&
        response_type=code&
        include_granted_scopes=true&
        scope=https://www.googleapis.com/auth/userinfo.email`)
    },

    callback : async (req, res) => {
        const {data} = await axios({ //token
            method: 'POST',
            url: `${GOOGLE_AUTH_TOKEN_URL}`,
            headers:{
                'content-type':'application/x-www-form-urlencoded;charset=utf-8'
            },
            params:{
              grant_type: 'authorization_code',//특정 스트링
              client_id:process.env.GOOGLE_ID,
              client_secret:process.env.GOOGLE_SECRET,
              redirectUri:process.env.GOOGLE_REDIRECT,
              code: req.query.code,
            }
          })
    
          const access_token = data['access_token'];
          const {data:me} = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`);
          const {sub, email, name} = me;
          const userInfo = {
            email: email,
            nickname:name,
            sns_id : sub,
            type:'google',
            };
    }
}