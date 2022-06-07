import { getRepository } from "typeorm"
import  axios  from "axios"
import { NextFunction, Request, Response } from "express"
import { characters } from "../../entity/character"
import { user } from "../../entity/user"
import { damage_log } from "../../entity/damage_log"
import { tokenFunction } from "../tokenFunction/token"

export class kakaoController {

    private characterRepository = getRepository(characters)
    private userRepository = getRepository(user)
    private damage_logRepository = getRepository(damage_log)

    async google(request: Request, response: Response, next: NextFunction) {
        try {
            const {makeAccessToken, makeRefreshToken} = new tokenFunction;
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
                  code: request.query.code,
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

            const userInfo = await this.userRepository.findOne({
                where: { email: userId.email, logintype: "google" },
            })

            if (userInfo) {
                const accessToken = await makeAccessToken(userInfo.email)
                const refreshToken = await makeRefreshToken(userInfo.email)
                await this.characterRepository.findOne({ where : { user_id : userInfo.id}})
                .then(async character => {
                    const damage_logInfo = await this.damage_logRepository.findOne({
                        where : { user_id : userInfo.id}
                    })

                    const characterInfo = {
                        ...character,
                        level : character.totalExp / 100,
                        exp : character.totalExp % 100
                    }
                    response.cookie('refreshToken' , refreshToken)
                    .json({
                        characterInfo : characterInfo,
                        userInfo : {
                            id: userInfo.id,
                            email: userInfo.email,
                            nickname: userInfo.nickname,
                            logintype: userInfo.logintype,
                        },
                        accessToken : accessToken,
                        damage_logInfo : damage_logInfo,
                    })
                })

            }
            else {
                await this.userRepository.save({
                    email : userId.email,
                    nickname : userId.nickname,
                    logintype : "kakao"
                })
                .then(async (userInfo) => {
                    await this.characterRepository.save({ id : userInfo.id})
                    .then(async (character) => {
                        const damage_logInfo = await this.damage_logRepository.findOne({
                            where : { user_id : userInfo.id},
                        })

                        const characterInfo = {
                            ...character,
                            level: character.totalExp / 100,
                            exp: character.totalExp % 100,   
                        }
                        const accessToken = makeAccessToken(userInfo.email)
                        const refreshToken = makeRefreshToken(userInfo.email)
                        response.cookie("refreshToken", refreshToken)
                        .json({
                            characterInfo : characterInfo,
                            userInfo : {
                                id : userInfo.id,
                                email : userId.email,
                                nickname : userId.nickname,
                                logintype : userInfo.logintype
                            },
                            accessToken : accessToken,
                            damage_logInfo : damage_logInfo,
                        })
                    })
                })
            }
          }
          catch(err) {
            return Object.assign({
              message: "Wrong user Id"
            })
          }
        }
      }  
