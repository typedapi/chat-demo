"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnlineUsersList = void 0;
class OnlineUsersList {
    constructor() {
        this.idIndex = 0;
        this.users = [];
    }
    create(connectionId) {
        const id = ++this.idIndex;
        const data = {
            id,
            name: "anonymous",
            connectionId
        };
        this.users.push(data);
        return data;
    }
    updateName(connectionId, name) {
        let data = this.getByConnectionId(connectionId);
        if (data)
            data.name = name;
    }
    getByConnectionId(connectionId) {
        for (let item of this.users) {
            if (item.connectionId === connectionId)
                return item;
        }
        return undefined;
    }
    removeByConnectionId(connectionId) {
        this.users = this.users.filter(user => user.connectionId !== connectionId);
    }
    get(id) {
        for (let item of this.users) {
            if (item.id === id)
                return item;
        }
        return undefined;
    }
    remove(u) {
        this.users = this.users.filter(user => user.id !== u.id);
    }
}
exports.OnlineUsersList = OnlineUsersList;
