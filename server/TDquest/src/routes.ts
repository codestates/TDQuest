import { userController } from "./controller/userController"
import { charactersController } from "./controller/characterController"
import { damageLogController } from "./controller/damageLogController"
import { monsterController } from "./controller/monsterController"
import { raidController } from "./controller/raidController"
import { todolistController } from "./controller/todolistController"
import { logController } from "./controller/log"
import { rankController } from "./controller/rankController"

export const Routes = [{
    method: "patch",
    route: "/userInfo",
    controller: userController,
    action: "updateUser"
}, {
    method: "get",
    route: "/userInfo",
    controller: userController,
    action: "getUser"
}, {
    method: "post",
    route: "/sign/in",
    controller: userController,
    action: "signIn"
}, {
    method: "delete",
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
    action: "getMonster"
}, {
    method: "get",
    route: "/todo/complete",
    controller: todolistController,
    action: "completeTodo"
}, {
    method: "get",
    route: "/todo/incomplete",
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
}
]