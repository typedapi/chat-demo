import { buildMap, MemorySessionProvider } from "typedapi-server"
import { reflection } from "./apiReflection"
import { ChatApi } from "./ChatApi"
import { OnlineUsersList } from "./OnlineUsersList"
import { WebSocketServer } from "typedapi-server-ws"

const sessionProvider = new MemorySessionProvider()
const onlineUsersList = new OnlineUsersList()
const api = new ChatApi(onlineUsersList)
const apiMap = buildMap(reflection, api)
const server = new WebSocketServer({
    apiMap,
    port: 8080,
    sessionProvider
})

server.onClientConnect.subscribe(d => {
    if (!d.connectionId) return
    const userData = onlineUsersList.create(d.connectionId)
    api.onJoin.fire(userData)
})

server.onClientDisconnect.subscribe(d => {
    if (!d.connectionId) return
    const userData = onlineUsersList.getByConnectionId(d.connectionId)
    if (!userData) return
    onlineUsersList.remove(userData)
    api.onLeave.fire(userData)
})

setInterval(() => {
    sessionProvider.clearOutdated()
}, 60000)

console.log("Server started")