import { getRepository } from "typeorm"
import { NextFunction, Request, Response } from "express"
import { characters } from "../entity/character"
import { user } from "../entity/user"

export class charactersController {

    private characterRepository = getRepository(characters)

    async getCharacter(request: Request, response: Response, next: NextFunction) {
        const getting = await this.characterRepository.findOne({where : { user : { id: request.query.user_id }}})
        return Object.assign({
            characterInfo: { ...getting,
                level: getting.totalExp / 100,
                exp: getting.totalExp % 100
            }
        })
    }
}