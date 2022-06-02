import { getRepository } from "typeorm"
import { NextFunction, Request, Response } from "express"
import { monster } from "../entity/monster"

export class monsterController {

    private monsterRepository = getRepository(monster)

    async getMonster(request: Request, response: Response, next: NextFunction) {
        try{ 
            const monsterInfo = await this.monsterRepository.findOne(request.query.monster_id)
            return Object.assign({
                monsterInfo: monsterInfo
            })
        } catch (err) {
            return Object.assign({
                message: "Not Found"
            })
        }
    }

}