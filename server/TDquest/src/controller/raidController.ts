import { getRepository } from "typeorm"
import { NextFunction, Request, Response } from "express"
import { raid } from "../entity/raid"
import { damage_log } from "../entity/damage_log"
import { monster } from "../entity/monster"
import cron from "node-cron"
import "./monsterInfo/monsterInfo"

export class raidController {

    private raidRepository = getRepository(raid)
    private damage_logRepository = getRepository(damage_log)
    private monsterRepository = getRepository(monster)

    count = 0;

    async schedule () {
        let number = new Number()
        console.log(number)
        
        cron.schedule('* * * Jan,Dec Sat', async () => {
            await this.monsterRepository.save(
                number[this.count]
            )
            await this.raidRepository.save({
                monster: {id: this.count}
            })
        })

        cron.schedule('* * * Jan,Dec Mon', async () => {
            await this.monsterRepository.delete(
               {id : this.count})
            await this.raidRepository.delete({id : this.count}
            )
            this.count++
        })

        this.schedule()
    }


    async inviteRaids(request: Request, response: Response, next: NextFunction) {
        try {
            const damage_log_Info = await this.damage_logRepository.save({
            user: { id: request.query.user_id },
            raid: { id: request.query.raid_id }
            })
            
            const monsterInfo = await this.monsterRepository.find({
                where: {raid: {id: request.query.raid_id}}
            })
            return Object.assign({
                message: "레이드에 참가합니다",
                damage_log_Info: damage_log_Info,
                monsterInfo: monsterInfo
            })
        } catch (err) {
            Object.assign({
                message: "Not Found"
            })
        }
    }

    async damage_logs (request: Request, response: Response, next: NextFunction) {
        try {
            const damage_log_Info = await this.damage_logRepository.find({
                where: {
                    raid: {id: request.query.raid_id}
                },
                relations: ['password']
            })
            return Object.assign({
                damage_log_Info: damage_log_Info
            })
        } catch (err) {
            console.log(err)
            return Object.assign({
                message: err
            })
        }
    }

}