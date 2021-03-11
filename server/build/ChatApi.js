"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatApi = void 0;
const typedapi_server_1 = require("typedapi-server");
const typedapi_core_1 = require("typedapi-core");
class ChatApi {
    constructor(onlineUsersList) {
        this.onlineUsersList = onlineUsersList;
        this.messages = [];
        this.onJoin = new typedapi_server_1.Event();
        this.onLeave = new typedapi_server_1.Event();
        this.onNameUpdated = new typedapi_server_1.Event();
        this.onMessage = new typedapi_server_1.Event();
    }
    getName(apiConnectionData) {
        let returnValue = "Unnamed";
        if (!apiConnectionData.connectionId) {
            throw new typedapi_core_1.RequestError("No connection id");
        }
        const data = this.onlineUsersList.getByConnectionId(apiConnectionData.connectionId);
        if (data) {
            returnValue = data.name;
        }
        return Promise.resolve(returnValue);
    }
    setName(name, apiConnectionData) {
        if (name.length < 2 || name.length > 20) {
            throw new typedapi_core_1.RequestError("Bad name");
        }
        if (!apiConnectionData.connectionId) {
            throw new typedapi_core_1.RequestError("No connection id");
        }
        this.onlineUsersList.updateName(apiConnectionData.connectionId, name);
        const data = this.onlineUsersList.getByConnectionId(apiConnectionData.connectionId);
        if (data) {
            this.onNameUpdated.fire({
                id: data.id,
                name: data.name
            });
        }
        return Promise.resolve();
    }
    send(message, apiConnectionData) {
        if (message.length < 3 || message.length > 200) {
            throw new typedapi_core_1.RequestError("Bad message");
        }
        if (!apiConnectionData.connectionId) {
            throw new typedapi_core_1.RequestError("No connection id");
        }
        const userData = this.onlineUsersList.getByConnectionId(apiConnectionData.connectionId);
        if (!userData) {
            return Promise.resolve();
        }
        const msg = {
            user: {
                id: userData.id,
                name: userData.name
            },
            message
        };
        this.messages.push(msg);
        this.onMessage.fire(msg);
        if (this.messages.length > 100) {
            this.messages.shift();
        }
        return Promise.resolve();
    }
    getMessages() {
        return Promise.resolve(this.messages);
    }
    getUsersOnline() {
        return Promise.resolve(this.onlineUsersList.users);
    }
}
exports.ChatApi = ChatApi;
