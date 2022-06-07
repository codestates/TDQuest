import { getRepository } from "typeorm"
import { NextFunction, Request, Response } from "express"
import { todo_list } from "../entity/todo_list"
import { characters } from "../entity/character"
import { damage_log } from "../entity/damage_log"
import { raid } from "../entity/raid"
import { monster } from "../entity/monster"
import { user } from "../entity/user"

export class todolistController {

    private todolistRepository = getRepository(todo_list)
    private charactersRepository = getRepository(characters)
    private damage_logRepository = getRepository(damage_log)
    private raidRepository = getRepository(raid)
    private monsterRepository = getRepository(monster)

    async completeTodo(request: Request, response: Response, next: NextFunction) {
        if (request.query.time) {
            const todo_lists = await this.todolistRepository.find({
                where : { 
                    user : {id : request.query.user_id},
                    updatedAt: request.qeury.time,
                    is_complete: true
                }
            })
            return Object.assign({
                todoInfo: todo_lists
            })
        } else {
            const todo_lists = await this.todolistRepository.find({
                where : { 
                    user : {id : request.query.user_id},
                    is_complete: true
                }
            })
            return Object.assign({
                todoInfo: todo_lists
            })
        }
    }

    async inCompleteTodo(request: Request, response: Response, next: NextFunction) {
        if (request.query.time) {
            const todo_lists = await this.todolistRepository.find({
                where : { 
                    user : {id : request.query.user_id},
                    // updatedAt: request.qeury.time,
                    is_complete: false
                }
            })
            return Object.assign({
                todoInfo: todo_lists
            })
        } else {
            const todo_lists = await this.todolistRepository.find({
                where : { 
                    user : {id : request.query.user_id},
                    is_complete: false
                }
            })
            return Object.assign({
                todoInfo: todo_lists
            })
        }
    }

    async createTodo(request: Request, response: Response, next: NextFunction) {
        const create = await this.todolistRepository.save({
            kind: request.body.kind,
            content: request.body.content,
            is_complete: false,
            user : { id: request.body.user_id }
        })
        return Object.assign({
            message: "todo_list를 추가합니다"
        })
    }

    async updateTodo(request: Request, response: Response, next: NextFunction) {
        this.todolistRepository.update(
            request.body.id,
            { kind: request.body.kind, content : request.body.content}
        )
        return Object.assign({
            message: "수정되었습니다"
        })
    }

    async deleteTodo(request:Request, response: Response, next: NextFunction) {
        this.todolistRepository.delete({ id: request.query.id })
        return Object.assign({
            message: '삭제 되었습니다'
        })
    }


    async completeFunction(request: Request, response: Response, next: NextFunction) {
        if (!request.body.raid_id) {
            if (request.body.is_complete === true) {
                await this.todolistRepository.update(
                    {
                        id: request.query.id,
                        is_complete: false
                    },
                    {
                        is_complete: true
                    }
                )
                if (request.query.status === "phy") {
                    await this.charactersRepository.increment(
                        { user: { id: request.query.user_id} },
                        "status_phy", 0.5
                    )
                }
                else if (request.query.status === "int") {
                    await this.charactersRepository.increment(
                        { user: { id: request.query.user_id} },
                        "status_int", 0.5
                    )
                }
                else if (request.query.status === "spi") {
                    await this.charactersRepository.increment(
                        { user: { id: request.query.user_id} },
                        "status_spi", 0.5
                    )
                }
                else if (request.query.status === "etc") {
                    await this.charactersRepository.increment(
                        { user: { id: request.query.user_id} },
                        "status_etc", 0.5
                    )
                }
                const todoInfo = await this.todolistRepository.findOne(request.query.id)
                const characterInfo = await this.charactersRepository.findOne({user : {id : request.query.id}})
                return Object.assign({
                    characterInfo: {
                        ...characterInfo,
                        level: characterInfo.totalExp / 100,
                        exp: characterInfo.totalExp % 100
                    },
                    todoInfo: todoInfo
                })
            } else {
                await this.todolistRepository.update({
                    id: request.query.id,
                    is_complete: true
                },{
                    is_complete: false
                })

                if (request.query.status === "phy") {
                    await this.charactersRepository.decrement({user:{id: request.query.user_id}}, "status_phy", 0.5)
                } else if (request.query.status === "int") {
                    await this.charactersRepository.decrement({user:{id: request.query.user_id}}, "status_int", 0.5)
                } else if (request.query.status === "spi") {
                    await this.charactersRepository.decrement({user:{id: request.query.user_id}}, "status_spi", 0.5)
                } else if (request.query.status === "etc") {
                    await this.charactersRepository.decrement({user:{id: request.query.user_id}}, "status_etc", 0.5)
                }
                const todoInfo = await this.todolistRepository.findOne(request.query.id)
                const characterInfo = await this.charactersRepository.findOne({user: {id: request.query.user_id}})
                return Object.assign({
                    characterInfo : {...characterInfo,
                        level: characterInfo.totalExp / 100,
                        exp: characterInfo.totalExp % 100
                    },
                    todoInfo: todoInfo
                })
            }
        } else {
            if (request.body.is_complete === true) {
                await this.todolistRepository.update({ id: request.query.id, is_complete: false}, {is_complete: true})
                if (request.query.status === "phy") {
                    await this.charactersRepository.increment({user:{id: request.query.user_id}}, "status_phy", 0.5)
                } else if (request.query.status === "int") {
                    await this.charactersRepository.increment({user:{id: request.query.user_id}}, "status_int", 0.5)
                } else if (request.query.status === "spi") {
                    await this.charactersRepository.increment({user:{id: request.query.user_id}}, "status_spi", 0.5)
                } else if (request.query.status === "etc") {
                    await this.charactersRepository.increment({user:{id: request.query.user_id}}, "status_etc", 0.5)
                }

                await this.damage_logRepository.increment({user:{id: request.body.user_id}, raid:{id: request.body.raid_id}}, "log", 0.5)
                await this.raidRepository.increment({id: request.body.raid_id}, "hit_damage", 0.5)
                await this.monsterRepository.decrement({id: request.body.monster_id}, "hp", 0.5)

                const monsterInfo = await this.monsterRepository.findOne(request.query.monster_id)
                if (monsterInfo.hp === 0) {
                    const monsterInfo = await this.monsterRepository.findOne(request.query.raid_id)
                    const characterArray = await this.charactersRepository.find({
                        where: { 
                            user : {
                                damage_log: {
                                    raid: {
                                        id: request.query.raid_id 
                                    }
                                }
                            }
                        }
                    })
                    characterArray.forEach(el => {
                        this.charactersRepository.decrement({id: el.id}, "level", monsterInfo.reward)
                    })
                    
                    const todoInfo = await this.todolistRepository.findOne({user: {id: request.query.user_id}})
                    const characterInfo = await this.charactersRepository.findOne({user: {id: request.query.user_id}})
                    return Object.assign({
                        message: "몬스터를 잡았습니다",
                        todoInfo: todoInfo,
                        characterInfo: {
                            ...characterInfo,
                            level: characterInfo.totalExp / 100,
                            exp: characterInfo.totalExp % 100
                        }
                    })
                } else {
                    const todoInfo = await this.todolistRepository.findOne(request.query.id)
                    const characterInfo = await this.charactersRepository.findOne({user: {id: request.query.user_id}})
                    return Object.assign({
                        message: "데미지를 입혔습니다",
                        todoInfo: todoInfo,
                        characterInfo: {
                            ...characterInfo,
                            level: characterInfo.totalExp / 100,
                            exp: characterInfo.totalExp % 100
                        }
                    })
                }
                
            } else {
                await this.todolistRepository.update({id: request.query.id, is_complete: true}, {is_complete: false})
                if (request.query.status === "phy") {
                    await this.charactersRepository.decrement(
                        { user: {id: request.query.user_id}}, 
                        "status_phy", 
                        0.5)
                } else if (request.query.status === "int") {
                    await this.charactersRepository.decrement(
                        { user: {id: request.query.user_id}}, 
                        "status_int", 
                        0.5)
                } else if (request.query.status === "spi") {
                    await this.charactersRepository.decrement(
                        { user: {id: request.query.user_id}}, 
                        "status_spi", 
                        0.5)
                } else if (request.query.status === "etc") {
                    await this.charactersRepository.decrement(
                        { user: {id: request.query.user_id}}, 
                        "status_etc", 
                        0.5)
                }
                await this.damage_logRepository.decrement(
                    { user: {id: request.query.user_id}, raid: {id: request.query.raid_id}},
                    "log",
                    0.5)
                await this.raidRepository.decrement(
                    {id: request.query.raid_id},
                    "hit_damage",
                    0.5)
                await this.monsterRepository.decrement(
                    {id: request.query.monster_id},
                    "hp",
                    0.5)
                
                const monsterInfo = await this.monsterRepository.findOne(request.query.monster_id)
                if (monsterInfo.hp === 0) {
                    const monsterInfo = await this.monsterRepository.findOne(request.query.raid_id)
                    const characterArray = await this.charactersRepository.find({
                        where: {
                            user: {
                                damage_log: {
                                    raid: {
                                        id: request.query.raid_id
                                    }
                                }
                            }
                        }
                    })
                    characterArray.forEach(el => {
                        this.charactersRepository.decrement(
                            {id: el.id},
                            "level",
                            monsterInfo.reward
                        )
                    })
                    const todoInfo = await this.todolistRepository.findOne(request.query.id)
                    const characterInfo = await this.charactersRepository.findOne({user: {id: request.query.user_id}})
                    return Object.assign({
                        message: "몬스터를 잡았습니다",
                        todoInfo: todoInfo,
                        characterInfo: {
                            ...characterInfo,
                            level: characterInfo.totalExp / 100,
                            exp: characterInfo.totalExp % 100
                        }
                    })
                } else {
                    const todoInfo = await this.todolistRepository.findOne(request.query.id)
                    const characterInfo = await this.charactersRepository.findOne({user: {id: request.query.user_id}})
                    return Object.assign({
                        message: "데미지를 입혔습니다",
                        todoInfo: todoInfo,
                        characterInfo: {
                            ...characterInfo,
                            level: characterInfo.totalExp / 100,
                            exp: characterInfo.totalExp % 100
                        }
                    })
                }
            }
        }
    }
}