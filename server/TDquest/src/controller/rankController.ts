import { getRepository } from "typeorm";
import { Request, Response, NextFunction }from 'express'
import { characters } from "../entity/character";

export class rankController {

  private charactersRepository = getRepository(characters)

  async all(request: Request, response: Response, next: NextFunction) {
    try {
      const characterStat = await this.charactersRepository.find({select: ["status_phy", "status_int", "status_spi"]})
      
      let max = 0;
      let ranker = [];
      characterStat.map(el => {
        const stat = el.status_phy + el.status_int + el.status_spi
        if (max < stat) {
          max = stat
        }
        return stat
      }).forEach((el, idx) => {
        if (el === max) {
          ranker.push(idx + 1)
        }
      })
      ranker.map(async el => {
        const rankerUser = await this.charactersRepository.findOne(el)
        return rankerUser
      })
      return Object.assign({
        ranker: ranker
      })
    }
    catch (err) {
      return err
    }
  }

  async statusRank(request: Request, response: Response, next: NextFunction) {
    try {
      let statusRank = null;
      if (request.query.kind === "status_phy") {
        statusRank = await this.charactersRepository.find({
          order: {
            status_phy: "DESC"
          },
          skip: 0,
          take: 5
        })
      } else if (request.query.kind === "status_int") {
        statusRank = await this.charactersRepository.find({
          order: {
            status_int: "DESC"
          },
          skip: 0,
          take: 5
        })
      } else if (request.query.kind === "status_spi") {
        statusRank = await this.charactersRepository.find({
          order: {
            status_spi: "DESC"
          },
          skip: 0,
          take: 5
        })
      }
      return Object.assign({
        statusRank: statusRank
      })
    } catch (err) {
      return err
    }
  }
}