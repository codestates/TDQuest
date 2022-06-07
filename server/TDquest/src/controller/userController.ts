import { getRepository } from "typeorm"
import { NextFunction, Request, Response } from "express"
import { user } from "../entity/user"
import { hash } from "bcrypt"
import { characters } from "../entity/character"

export class userController {
 
    private userRepository = getRepository(user)
    private charactersRepository = getRepository(characters)

    async updateUser(request: Request, response: Response, next: NextFunction) {
        try {
            let hashPassword;
            if (request.body.password) {
                hashPassword = await hash(request.body.password.toString(), Number(process.env.BCRYPT))
            }
            await this.userRepository.update({
                id: request.query.id
            },{
                password: hashPassword,
                nickname: request.body.nickname
            })

            const userInfo = await this.userRepository.findOne({
                select: ['password'],
                where: { id: request.query.id }
            })
            return Object.assign({
                message: '유저정보 수정',
                userInfo: userInfo
            }) 
        } catch (err) {
            response.status(400).json({message: err})
        }
    }

    async getUser(request: Request, response: Response, next: NextFunction) {
        try {
            const userInfo = await this.userRepository.findOne({where: {id :request.params.id}})
            return Object.assign({
                userInfo: userInfo,
                message: '유저정보'
            })
        } catch (err) {
            response.status(404).json({message: err})
        }
        
    }

    async signIn(request: Request, response: Response, next: NextFunction) {
        const hashPassword = await hash(request.body.password.toString(), Number(process.env.BCRYPT))
        console.log(hashPassword)
        const findAlreadyEmail = await this.userRepository.findOne({where: {email: request.body.email}})
        if (!findAlreadyEmail) {
            try {
                const userInfo = await this.userRepository.save({
                    nickname: request.body.nickname,
                    email: request.body.email,
                    password: hashPassword,
                    logintype: request.body.logintype
                })
                const characterInfo = await this.charactersRepository.save({
                    user : {id: userInfo.id}
                })
                return Object.assign({
                    message: "회원가입 성공"
                })
            } catch (err) {
                response.status(400).json({message: err})
            }
        } else {
            response.status(409).json({message: "already exist email"})
        }
    }

    async signOut(request: Request, response: Response, next: NextFunction) {
        try {
            this.userRepository.delete(request.query.id)
            return Object.assign({
                message: "삭제되었습니다"
            })
        } catch (err) {
            response.status(404).json({message: err})
        } 
    }
}