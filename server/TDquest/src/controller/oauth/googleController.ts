import { getRepository } from "typeorm"
import { axios } from "axios"
import { NextFunction, Request, Response } from "express"
import { characters } from "../../entity/character"
import { user } from "../../entity/user"
import { damage_log } from "../../entity/damage_log"
import { tokenFunction } from "../tokenFunction/token"

export class googleController {

    private characterRepository = getRepository(characters)
    private userRepository = getRepository(user)
    private damage_logRepository = getRepository(damage_log)

    async google(request: Request, response: Response, next: NextFunction) {
        try {
            const {makeAccessToken, makeRefreshToken} = new tokenFunction;
            const { data } = await axios({
                //token
                method: "POST",
                url: `${process.env.GOOGLE_TOKEN}`,
                headers: {
                  "content-type": "application/x-www-form-urlencoded;charset=utf-8",
                },
                params: {
                  grant_type: "authorization_code", //특정 스트링
                  client_id: process.env.GOOGLE_ID,
                  client_secret: process.env.GOOGLE_SECRET,
                  redirectUri: process.env.GOOGLE_REDIRECT,
                  code: request.query.code,
                },
              });
              const access_token = data["access_token"];
              const { data: me } = await axios.get(
                `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`
              );
                
              const userId = {
                  email : me.email,
                  nickname : me.name,
              }

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
                    logintype : "google"
                })
                .then(async (userInfo) => {
                    await this.characterRepository.save({ user_id : userInfo.id})
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
      
        async logout(request: Request, response: Response, next: NextFunction) {
          response.clearCooke('accessToken');
          return Object.assign({
            message: '로그아웃되었습니다'
          })
        }
      }  
}