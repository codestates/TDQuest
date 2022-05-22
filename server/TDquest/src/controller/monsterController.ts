import { getRepository } from "typeorm"
import { NextFunction, Request, Response } from "express"
import { monster } from "../entity/monster"

export class monsterController {

    private monsterRepository = getRepository(monster)

    async all(request: Request, response: Response, next: NextFunction) {
        return this.monsterRepository.find()
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.monsterRepository.findOne(request.params.id)
    }

}