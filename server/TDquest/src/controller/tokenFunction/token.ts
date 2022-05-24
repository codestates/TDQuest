import jwt from 'jsonwebtoken'
import 'dotenv/config'
import { getRepository } from 'typeorm'
import { Request, Response, NextFunction } from 'express'
import { user } from '../../entity/user'

export class tokenFunction {
  
  private userRepository = getRepository(user)

  async makeAccessToken (el: string) {
    try {
      return jwt.sign({el}, String(process.env.ACCESS_SECRET), { expiresIn: '30m' })
    }
    catch (error) {
      return 'error'
    }
  }
  
  async makeRefreshToken (el: string) {
    try{
      return jwt.sign({el}, String(process.env.REFRESH_SECRET), { expiresIn: '7d' })
    }
    catch (error) {
      return 'error'
    }
  }
  
  async verifyToken (token: string) {
    try {
      const decoded = jwt.verify(token, String(process.env.ACCESS_SECRET))
      return decoded;
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return Object.assign({message: "Not Found"})
      }
      if (error.name === 'JsonWebTokenError') {
        return Object.assign({message: "Not Found"})
      }
      if (error.name === 'NotBeforeError') {
        console.log(error)
        return Object.assign({message: "Not Found"})
      }
      return false
    }
  }
  
    
  async checkAccessToken (request: Request, response: Response, next: NextFunction, error: unknown) { 
    const token: string = request.cookies.accessToken;
    const refreshToken: string = request.headers.refreshToken;
  
    if (!token) {
      return Object({
        message: 'not Authorized'
      })
    } else {
      const decoded = jwt.verify(token, String(process.env.ACCESS_SECRET))
      if (decoded) {
        const users = await this.userRepository.findOne({email: decoded.el})
        .then(userInfo => {
          next()
        })
      } else {
        if (error === 'TokenExpiredError') {
          jwt.verify(refreshToken, String(process.env.RESFRESH_SECRET))
          .then(token => {
            const accessToken = this.makeAccessToken(request.body.email);
            response.cookie({refreshToken: request.headers.refreshToken})
            return Object.assign({
              accessToken: accessToken
            })
          })
        }
        if (error === 'NotBeforeError') {
          console.log(error)
          return Object.assign({
            message: 'Not Found'
          })
        }
        if (error === 'JsonWebTokenError') {
          return Object.assign({
            message: 'Not Found'
          })
        }
      }
    }
  }
}