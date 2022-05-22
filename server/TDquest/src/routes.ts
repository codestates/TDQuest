import { userController } from "./controller/userController"
import { charactersController } from "./controller/characterController"
import { damageLogController } from "./controller/damageLogController"
import { monsterController } from "./controller/monsterController"
import { raidController } from "./controller/raidController"
import { todolistController } from "./controller/todolistController"

export const Routes = [{
    method: "put",
    route: "/user",
    controller: userController,
    action: "updateUser"
}, {
    method: "get",
    route: "/user/:id",
    controller: userController,
    action: "getUser"
}, {
    method: "post",
    route: "/user",
    controller: userController,
    action: "signIn"
}, {
    method: "delete",
    route: "/user/:id",
    controller: userController,
    action: "signOut"
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
    action: "all"
}, {
    method: "get",
    route: "/raid",
    controller: raidController,
    action: "all"
}, {
    method: "get",
    route: "/todo/complete",
    controller: todolistController,
    action: "completeTodo"
}, {
    method: "get",
    route: "/todo",
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
}
]