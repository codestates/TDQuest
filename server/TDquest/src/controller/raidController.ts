import { getRepository } from "typeorm"
import { NextFunction, Request, Response } from "express"
import { raid } from "../entity/raid"

export class raidController {

    private raidRepository = getRepository(raid)

    async all(request: Request, response: Response, next: NextFunction) {
        return this.raidRepository.find()
    }

}