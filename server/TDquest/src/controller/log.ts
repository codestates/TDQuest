import { getRepository } from "typeorm"
import { NextFunction, Request, Response } from "express"
import { user } from "../entity/user"
import { characters } from "../entity/character"
<<<<<<< HEAD
import { TokenFunction } from './tokenFunction/token'
=======
import { tokenFunction } from './tokenFunction/token'
import { ServerResponse } from "http"
>>>>>>> 0258e8f (pull typescript)

export class logController {

  private userRepository = getRepository(user)
  private charactersRepository = getRepository(characters)

  async login(request: Request, response: Response, next: NextFunction) {
    try {
<<<<<<< HEAD
      const {makeAccessToken, makeRefreshToken} = new TokenFunction;
      const userInfo = await this.userRepository.findOne({email: request.body.email})
      const accessToken = await makeAccessToken(userInfo.email)
      console.log(accessToken)
=======
      const {makeAccessToken, makeRefreshToken} = new tokenFunction;
      const userInfo = await this.userRepository.findOne({email: request.query.email})
      const accessToken = await makeAccessToken(userInfo.email)
>>>>>>> 0258e8f (pull typescript)
      const refreshToken = await makeRefreshToken(userInfo.email)
      const characterInfo = await this.charactersRepository.findOne({user: {id: userInfo.id}})
      response.cookie('accessToken', accessToken)
      return Object.assign({
        characterInfo: {
          ...characterInfo,
          level: characterInfo.totalExp / 100,
          exp: characterInfo.totalExp % 100
        },
        userInfo: userInfo,
        accessToken: accessToken,
        refreshToken: refreshToken
      })
    }
    catch(err) {
      return Object.assign({
        message: "Wrong user Id"
      })
    }
  }

  async logout(request: Request, response: Response, next: NextFunction) {
<<<<<<< HEAD
    response.clearCookie('accessToken');
=======
    response.clearCooke('accessToken');
>>>>>>> 0258e8f (pull typescript)
    return Object.assign({
      message: '로그아웃되었습니다'
    })
  }
}