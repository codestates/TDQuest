import * as express from "express"
import * as bodyParser from "body-parser"
import * as cors from "cors"
import * as https from 'https'
import * as fs from 'fs'
import * as util from 'util'
import { Request, Response } from "express"
import { Routes } from "./routes"
import { user } from "./entity/user"
import { createConnection } from "typeorm"
import { characters } from "./entity/character"
import { todo_list } from './entity/todo_list'

createConnection().then(async connection => {

    // create express app
    const app = express()
    app.use(bodyParser.json())
    app.use(express.urlencoded({extended: false}))

    app.use(
        cors({
            origin: ["http://localhost:3000", "seonghyeon.link"],
            credentials: true,
            methods: ["GET", "POST", "PUT", "DELETE"]
        })
    )

    // register express routes from defined application routes
    Routes.forEach(route => {
        (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any))[route.action](req, res, next)
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined)

            } else if (result !== null && result !== undefined) {
                res.json(result)
            }
        })
    })

    // setup express app here
    // ...
    app.listen(3001)
    // start express server
    const readFile = util.promisify(fs.readFile);
    // async function startServer() {
    //     const [key, cert] = await Promise.all([
    //       readFile(__dirname + '/key.pem'),
    //       readFile(__dirname + '/cert.pem')
    //     ]);
    //     https.createServer({ key, cert }, (req, res) => {
    //       res.statusCode = 200;
    //       res.end('hello world');
    //     })
    //       .listen(3001, () => {
    //         console.log('Server started');
    //       });
    //   }
       
    //   startServer();
    // insert new users for test

    // await connection.manager.save(
    //     connection.manager.create(user, {
    //         nickname: 'new',
    //         email: "123@123.com",
    //         password: "123456"
    //     })
    // )

    // await connection.manager.save(
    //     connection.manager.create(characters, {
    //         totalExp: 300,
    //         status_phy: 50,
    //         status_int: 10,
    //         status_spi: 10,
    //         user: { id: 101 },
    //         image: '',
    //         medal: ''
    //     })
    // )


    // await connection.manager.save(
    //     connection.manager.create(todo_list, {
    //         content: '오늘의 할일',
    //         is_complete: false,
    //         kind: "phy",
    //         user: { id: 101 }
    //     })
    // )
    

}).catch(error => console.log(error))
