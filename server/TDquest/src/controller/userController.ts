import { getRepository } from "typeorm"
import { NextFunction, Request, Response } from "express"
import { user } from "../entity/user"

export class userController {

    private userRepository = getRepository(user)

    async updateUser(request: Request, response: Response, next: NextFunction) {
        const update = await this.userRepository.update(
            request.body.id , { password: request.body.password }
        )
        return Object.assign({
            message: '유저정보 수정'
        })
    }

    async getUser(request: Request, response: Response, next: NextFunction) {
        const find = await this.userRepository.findOne({where: {id :request.params.id}})
        return Object.assign({
            userInfo: find,
            message: '유저정보'
        })
    }

    async signIn(request: Request, response: Response, next: NextFunction) {
        const findAlreadyEmail = await this.userRepository.findOne({where: {email: request.body.email}})
        if (!findAlreadyEmail) {
            return await this.userRepository.save({
                nickname: request.body.nickname,
                email: request.body.email,
                password: request.body.password
            })
        } else {
            return Object.assign({
                statusMsg: "already exist userinfo"
            })
        }
    }

    async signOut(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.delete(request.params.id)
    }


}