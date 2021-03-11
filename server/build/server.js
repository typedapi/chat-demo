"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typedapi_server_1 = require("typedapi-server");
const apiReflection_1 = require("./apiReflection");
const ChatApi_1 = require("./ChatApi");
const OnlineUsersList_1 = require("./OnlineUsersList");
const typedapi_server_ws_1 = require("typedapi-server-ws");
const sessionProvider = new typedapi_server_1.MemorySessionProvider();
const onlineUsersList = new OnlineUsersList_1.OnlineUsersList();
const api = new ChatApi_1.ChatApi(onlineUsersList);
const apiMap = typedapi_server_1.buildMap(apiReflection_1.reflection, api);
const server = new typedapi_server_ws_1.WebSocketServer({
    apiMap,
    port: 8080,
    sessionProvider
});
server.onClientConnect.subscribe(d => {
    if (!d.connectionId)
        return;
    const userData = onlineUsersList.create(d.connectionId);
    api.onJoin.fire(userData);
});
server.onClientDisconnect.subscribe(d => {
    if (!d.connectionId)
        return;
    const userData = onlineUsersList.getByConnectionId(d.connectionId);
    if (!userData)
        return;
    onlineUsersList.remove(userData);
    api.onLeave.fire(userData);
});
setInterval(() => {
    sessionProvider.clearOutdated();
}, 60000);
console.log("Server started");
