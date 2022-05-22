import { getRepository } from "typeorm"
import { NextFunction, Request, Response } from "express"
import { damage_log } from "../entity/damage_log"

export class damageLogController {

    private damageLogRepository = getRepository(damage_log)

    async all(request: Request, response: Response, next: NextFunction) {
        return this.damageLogRepository.find()
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.damageLogRepository.findOne(request.params.id)
    }

}