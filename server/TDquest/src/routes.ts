import { userController } from "./controller/userController"
import { charactersController } from "./controller/characterController"
import { damageLogController } from "./controller/damageLogController"
import { monsterController } from "./controller/monsterController"
import { raidController } from "./controller/raidController"
import { todolistController } from "./controller/todolistController"
<<<<<<< HEAD
import { logController } from "./controller/log"
import { rankController } from "./controller/rankController"

export const Routes = [{
    method: "patch",
    route: "/userInfo",
=======

export const Routes = [{
    method: "put",
    route: "/user",
>>>>>>> 0258e8f (pull typescript)
    controller: userController,
    action: "updateUser"
}, {
    method: "get",
<<<<<<< HEAD
    route: "/userInfo",
=======
    route: "/user/:id",
>>>>>>> 0258e8f (pull typescript)
    controller: userController,
    action: "getUser"
}, {
    method: "post",
<<<<<<< HEAD
    route: "/sign/in",
=======
    route: "/user",
>>>>>>> 0258e8f (pull typescript)
    controller: userController,
    action: "signIn"
}, {
    method: "delete",
<<<<<<< HEAD
    route: "/sign/out",
    controller: userController,
    action: "signOut"
}, {
    method: "post",
    route: "/log/in",
    controller: logController,
    action: "login"
}, {
    method: "post",
    route: "/log/out",
    controller: logController,
    action: "logout"
}, {
=======
    route: "/user/:id",
    controller: userController,
    action: "signOut"
}, {
>>>>>>> 0258e8f (pull typescript)
    method: "get",
    route: "/character",
    controller: charactersController,
    action: "getCharacter"
}, {
    method: "get",
    route: "/damage_log",
    controller: damageLogController,
    action: "all"
}, {
    method: "get",
    route: "/monster",
    controller: monsterController,
<<<<<<< HEAD
    action: "getMonster"
=======
    action: "all"
}, {
    method: "get",
    route: "/raid",
    controller: raidController,
    action: "all"
>>>>>>> 0258e8f (pull typescript)
}, {
    method: "get",
    route: "/todo/complete",
    controller: todolistController,
    action: "completeTodo"
}, {
    method: "get",
<<<<<<< HEAD
    route: "/todo/incomplete",
=======
    route: "/todo",
>>>>>>> 0258e8f (pull typescript)
    controller: todolistController,
    action: "inCompleteTodo"
}, {
    method: "post",
    route: "/todo",
    controller: todolistController,
    action: "createTodo"
}, {
    method: "put",
    route: "/todo",
    controller: todolistController,
    action: "updateTodo"
}, {
    method: "delete",
    route: "/todo",
    controller: todolistController,
    action: "deleteTodo"
<<<<<<< HEAD
}, {
    method: "put",
    route: "/todo/complete",
    controller: todolistController,
    action: "completeFunction"
}, {
    method: "get",
    route: "/rank",
    controller: rankController,
    action: "all"
}, {
    method: "get",
    route: "/rank/status",
    controller: rankController,
    action: "statusRank"
}, {
    method: "get",
    route: "/raids/damage_logs",
    controller: raidController,
    action: "damage_logs"
}, {
    method: "post",
    route: "/raids/invite",
    controller: raidController,
    action: "inviteRaids"
=======
>>>>>>> 0258e8f (pull typescript)
}
]