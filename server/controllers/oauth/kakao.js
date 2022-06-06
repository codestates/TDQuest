const dotenv = require("dotenv");
const axios = require("axios");
const { user } = require("../../models");
const { character } = require("../../models");
const { damage_log } = require("../../models");
const { makeAccessToken, makeRefreshToken } = require("../../middleware/token");

module.exports = {
  kakao: async (req, res) => {
    return res.redirect(`${process.env.KAKAO_URL}/
        authorize?client_id=${process.env.KAKAO_ID}&
        redirect_uri=${process.env.KAKAO_REDIRECT}&
        response_type=code`);
  },

  callback: async (req, res) => {
    const { data } = await axios({
      //token
      method: "POST",
      url: `${process.env.KAKAO_URL}/token`,
      headers: {
        "content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      params: {
        grant_type: "authorization_code",
        client_id: process.env.KAKAO_ID,
        client_secret: process.env.KAKAO_SECRET,
        redirectUri: process.env.KAKAO_REDIRECT,
        code: req.query.code,
      },
    });
    const kakao_access_token = data["access_token"];

    const { data: me } = await axios({
      method: "GET",
      url: `https://kapi.kakao.com/v2/user/me`,
      headers: {
        authorization: `bearer ${kakao_access_token}`,
      },
    });

    const userId = {
      email: me.kakao_account.email,
      nickname: me.kakao_account.profile.nickname,
    };
    const userInfo = await user.findOne({
      where: { email : userId.email, nickname: userId.nickname, logintype: "kakao" },
    });

    if (userInfo) {
      const accessToken = makeAccessToken(userInfo.dataValues.email);
      const refreshToken = makeRefreshToken(userInfo.dataValues.email);
      await character.findOne({
          where: { user_id: userInfo.dataValues.id },
        })
        .then(async (character) => {
          const damage_logInfo = await damage_log.findOne({
            where: { user_id: userInfo.dataValues.id },
          });

          const characterInfo = {
            ...character.dataValues,
            level: character.dataValues.totalExp / 100,
            exp: character.dataValues.totalExp % 100,
          };
          res.cookie("refreshToken", refreshToken).json({
            characterInfo: characterInfo,
            userInfo: {
              id: userInfo.id,
              email: userInfo.email,
              nickname: userInfo.nickname,
              logintype: userInfo.logintype,
              createdAt: userInfo.createdAt,
              updatedAt: userInfo.updatedAt,
            },
            accessToken: accessToken,
            damage_logInfo: damage_logInfo,
          });
        }); //{ httpOnly: true}
    }
    else {
      try {
        await user.create({ email : userId.email, nickname: userId.nickname, logintype: "kakao" })
          .then(async (userInfo) => {
            await character.create({ user_id: userInfo.dataValues.id })
              .then(async (character) => {
                const damage_logInfo = await damage_log.findOne({
                  where: { user_id: userInfo.dataValues.id },
                });

                const characterInfo = {
                  ...character.dataValues,
                  level: character.dataValues.totalExp / 100,
                  exp: character.dataValues.totalExp % 100,
                };

                const accessToken = makeAccessToken(userInfo.dataValues.email);
                const refreshToken = makeRefreshToken(
                  userInfo.dataValues.email
                );
                res.cookie("refreshToken", refreshToken).json({
                  characterInfo: characterInfo,
                  userInfo: {
                    id: userInfo.id,
                    email: userInfo.email,
                    nickname: userInfo.nickname,
                    logintype: userInfo.logintype,
                    createdAt: userInfo.createdAt,
                    updatedAt: userInfo.updatedAt,
                  },
                  accessToken: accessToken,
                  damage_logInfo: damage_logInfo,
                });
              });
          }); //{ httpOnly: true}
      } catch (err) {
        //{ httpOnly: true}
        res.status(400).json({ message: err });
      }
    }
  },
};
