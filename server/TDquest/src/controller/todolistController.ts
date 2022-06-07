import { getRepository } from "typeorm"
import { NextFunction, Request, Response } from "express"
import { todo_list } from "../entity/todo_list"
import { characters } from "../entity/character"
import { damage_log } from "../entity/damage_log"
import { raid } from "../entity/raid"
import { monster } from "../entity/monster"
import { error } from "console"

export class todolistController {

    private todolistRepository = getRepository(todo_list)
    private charactersRepository = getRepository(characters)
    private damage_logRepository = getRepository(damage_log)
    private raidRepository = getRepository(raid)
    private monsterRepository = getRepository(monster)

    async completeTodo(request: Request, response: Response, next: NextFunction) {
        try {
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
        } catch (err) {
            response.status(400).json({ message: err })
        }
    }

    async inCompleteTodo(request: Request, response: Response, next: NextFunction) {
        try {
            if (request.query.time) {
                const todo_lists = await this.todolistRepository.find({
                    where : { 
                        user : {id : request.query.user_id},
                        updatedAt: request.qeury.time,
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
        } catch (err) {
            response.status(400).json({ message: err })
        }
    }

    async createTodo(request: Request, response: Response, next: NextFunction) {
        try {
            const todoInfo = await this.todolistRepository.save({
                kind: request.body.kind,
                content: request.body.content,
                is_complete: false,
                user : { id: request.body.user_id }
            })
            return Object.assign({
                todoInfo: todoInfo,
                message: "todo_list를 추가합니다"
            })

        }
        catch (err) {
            response.status(401).json({ message: 'Not Found' })
        }
    }

    async updateTodo(request: Request, response: Response, next: NextFunction) {
        try {
            await this.todolistRepository.update(
            request.body.id,
            { kind: request.body.kind, content : request.body.content}
            )
            return Object.assign({
                message: "수정되었습니다"
            })
        } catch (err) {
            response.status(401).json({ message: 'Not Found' })
        }
    }

    async deleteTodo(request:Request, response: Response, next: NextFunction) {
        try {  
            const todoInfo = await this.todolistRepository.findOne(request.query.id)
            this.todolistRepository.delete({ id: request.query.id })
            return Object.assign({
                todoInfo: todoInfo,
                message: '삭제 되었습니다'
            })
        } catch (err) {
            response.status(400).json({ message: err })
        }
    }


    async completeFunction(request: Request, response: Response, next: NextFunction) {
        if (!request.body.raid_id) {
            if (request.body.is_complete === true) {
                try {
                    let todoInfo; 
                    await this.todolistRepository.update(
                        {
                            id: request.query.id,
                            is_complete: false
                        },
                        {
                            is_complete: true
                        }
                    )
                    .then(async data => {
                        todoInfo = await this.todolistRepository.findOne(request.query.id)
                    })
                    if (request.query.status === "phy") {
                        await this.charactersRepository.increment(
                            { user: { id: request.query.user_id} },
                            "status_phy", 1
                        )
                    }
                    else if (request.query.status === "int") {
                        await this.charactersRepository.increment(
                            { user: { id: request.query.user_id} },
                            "status_int", 1
                        )
                    }
                    else if (request.query.status === "spi") {
                        await this.charactersRepository.increment(
                            { user: { id: request.query.user_id} },
                            "status_spi", 1
                        )
                    }
                    else if (request.query.status === "etc") {
                        await this.charactersRepository.increment(
                            { user: { id: request.query.user_id} },
                            "status_etc", 1
                        )
                    }
                    const characterInfo = await this.charactersRepository.findOne({user : {id : request.query.id}})
                    .then(data => {
                        if (data === null) {
                            throw error
                        } else {
                            return {
                                    ...data,
                                    level: data.totalExp / 100,
                                    exp: data.totalExp % 100
                            }
                            
                        }
                    })
                    return Object.assign({
                        characterInfo: characterInfo,
                        todoInfo: todoInfo
                    })
                } catch (err) {
                    response.status(400).json({ message: "실패" })
                }
            } else {
                try {
                    let todoInfo; 
                    await this.todolistRepository.update(
                        {
                            id: request.query.id,
                            is_complete: true
                        },
                        {
                            is_complete: false
                        }
                    )
                    .then(async data => {
                        todoInfo = await this.todolistRepository.findOne(request.query.id)
                    })
                    if (request.query.status === "phy") {
                        await this.charactersRepository.decrement(
                            { user: { id: request.query.user_id} },
                            "status_phy", 1
                        )
                    }
                    else if (request.query.status === "int") {
                        await this.charactersRepository.decrement(
                            { user: { id: request.query.user_id} },
                            "status_int", 1
                        )
                    }
                    else if (request.query.status === "spi") {
                        await this.charactersRepository.decrement(
                            { user: { id: request.query.user_id} },
                            "status_spi", 1
                        )
                    }
                    else if (request.query.status === "etc") {
                        await this.charactersRepository.decrement(
                            { user: { id: request.query.user_id} },
                            "status_etc", 1
                        )
                    }
                    const characterInfo = await this.charactersRepository.findOne({user : {id : request.query.id}})
                    .then(data => {
                        if (data === null) {
                            throw error
                        } else {
                            return {
                                    ...data,
                                    level: data.totalExp / 100,
                                    exp: data.totalExp % 100
                            }
                            
                        }
                    })
                    return Object.assign({
                        characterInfo: characterInfo,
                        todoInfo: todoInfo
                    })
                } catch (err) {
                    response.status(400).json({ message: "실패" })
                }
            }
        } else {
            if (request.body.is_complete === true) {
                try {
                    let todoInfo;
                    let damage_logInfo;
                    let damage = 1
                    let characterStat = {
                        status_phy: 0,
                        status_int: 0,
                        status_spi: 0,
                        totalExp: 0,
                        medal: ''
                    }
                    await this.charactersRepository.findOne({user: {id: request.query.user_id}})
                    .then(data => {
                        characterStat = data
                    })

                    await this.todolistRepository.update({ 
                        id: request.query.id, 
                        is_complete: false
                    }, {
                        is_complete: true
                    })
                    .then(async data => {
                        todoInfo = await this.todolistRepository.findOne(request.query.id)
                    })
                    if (request.query.status === "phy") {
                        await this.charactersRepository.increment({user:{id: request.query.user_id}}, "status_phy", 1)
                        damage = 1 * characterStat.status_phy
                    } else if (request.query.status === "int") {
                        await this.charactersRepository.increment({user:{id: request.query.user_id}}, "status_int", 1)
                        damage = 1 * characterStat.status_int
                    } else if (request.query.status === "spi") {
                        await this.charactersRepository.increment({user:{id: request.query.user_id}}, "status_spi", 1)
                        damage = 1 * characterStat.status_spi
                    } else if (request.query.status === "etc") {
                        await this.charactersRepository.increment({user:{id: request.query.user_id}}, "status_etc", 1)
                        damage = 1 * Math.floor(characterStat.totalExp / 100)
                    }

                    await this.damage_logRepository.save({
                        log: damage,
                        user: {id: request.query.user_id},
                        raid: {id: request.query.raid_id}
                    })
                    .then(data => {
                        damage_logInfo = data
                    })

                    await this.monsterRepository.decrement({id: request.body.monster_id}, "hp", damage)

                    const monsterInfo = await this.monsterRepository.findOne(request.query.monster_id)
                    if (monsterInfo.hp <= 0) {
                        const characterArray = await this.charactersRepository.find({
                            where: { 
                                user : {
                                    damage_log: {
                                        raid: {
                                            id: request.query.raid_id 
                                        }
                                    },
                                    required: true
                                }
                            }
                        })
                        characterArray.forEach(el => {
                            this.charactersRepository.increment({
                                id: el.id
                            }, "totalEXP", monsterInfo.reward)
                            if (el.medal === null) {
                                this.charactersRepository.update({
                                    id: el.id
                                }, {medal : monsterInfo.name})
                            } else {
                                this.charactersRepository.update(
                                    {id: el.id},
                                    {medal: el.medal.concat(`,${monsterInfo.name}`)}
                                )
                            }
                        })
                        const todoInfo = await this.todolistRepository.findOne({user: {id: request.query.user_id}})
                        const characterInfo = await this.charactersRepository.findOne({user: {id: request.query.user_id}})
                        .then(data => {
                            return {
                                ...data,
                                level: data.totalExp / 100,
                                exp: data.totalExp % 100
                            }
                        })
                        await this.monsterRepository.update({id: request.query.raid_id},{reward : 0})
                        return Object.assign({
                            message: "몬스터를 잡았습니다",
                            todoInfo: todoInfo,
                            characterInfo: characterInfo,
                            damage_logInfo: damage_logInfo
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
                            },
                            damage_logInfo: damage_logInfo
                        })
                    }
                } catch (err) {
                    response.status(400).json({message: "실패"})
                }

            } else {
                try {
                    let todoInfo;
                    let damage_logInfo;

                    await this.todolistRepository.update({
                        id: request.query.id, 
                        is_complete: true
                    }, {is_complete: false})
                    .then(async data => {
                        todoInfo = await this.todolistRepository.findOne(request.query.id)
                    })
                    if (request.query.status === "phy") {
                        await this.charactersRepository.decrement(
                            { user: {id: request.query.user_id}}, 
                            "status_phy", 
                            1)
                    } else if (request.query.status === "int") {
                        await this.charactersRepository.decrement(
                            { user: {id: request.query.user_id}}, 
                            "status_int", 
                            1)
                    } else if (request.query.status === "spi") {
                        await this.charactersRepository.decrement(
                            { user: {id: request.query.user_id}}, 
                            "status_spi", 
                            1)
                    } else if (request.query.status === "exp") {
                        await this.charactersRepository.decrement(
                            { user: {id: request.query.user_id}}, 
                            "status_etc", 
                            1)
                    }

                    await this.damage_logRepository.findOne({
                        where: {
                            user: {id: request.query.user_id},
                            raid: {id: request.query.raid_id}
                        },
                        relations: ['user', 'todo_list']
                    })
                    .then(async data => {
                        await this.damage_logRepository.delete(data.id)
                    })

                    await this.monsterRepository.increment(
                        {id: request.query.monster_id},
                        "hp",
                        1)
                    
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
                                    },
                                    required: true
                                }
                            }
                        })
                        characterArray.forEach(el => {
                            this.charactersRepository.decrement(
                                {id: el.id},
                                "totalExp",
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
                } catch (err) {
                    console.log(err)
                    response.status(400).json({message: '실패'})
                }
            }
        }
    }
}
}