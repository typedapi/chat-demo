import { ConnectionData, Event } from "typedapi-server"
import { RequestError } from "typedapi-core"
import { OnlineUsersList } from "./OnlineUsersList"

interface UserData {
    id: number
    name: string
}

interface MessageData {
    user: UserData,
    message: string
}

export class ChatApi {

    constructor(private onlineUsersList: OnlineUsersList) { }

    private messages: MessageData[] = []

    onJoin = new Event<UserData>()
    onLeave = new Event<UserData>()
    onNameUpdated = new Event<UserData>()
    onMessage = new Event<MessageData>()

    getName(apiConnectionData: ConnectionData): Promise<string> {
        
        let returnValue = "Unnamed"

        if (!apiConnectionData.connectionId) {
            throw new RequestError("No connection id")
        }

        const data = this.onlineUsersList.getByConnectionId(apiConnectionData.connectionId)

        if (data) {
            returnValue = data.name
        }

        return Promise.resolve(returnValue)
    }

    setName(name: string, apiConnectionData: ConnectionData): Promise<void> {

        if (name.length < 2 || name.length > 20) {
            throw new RequestError("Bad name")
        }

        if (!apiConnectionData.connectionId) {
            throw new RequestError("No connection id")
        }

        this.onlineUsersList.updateName(apiConnectionData.connectionId, name)
        const data = this.onlineUsersList.getByConnectionId(apiConnectionData.connectionId)
        if (data) {
            this.onNameUpdated.fire({
                id: data.id,
                name: data.name
            })
        }

        return Promise.resolve()
    }

    send(message: string, apiConnectionData: ConnectionData): Promise<void> {

        if (message.length < 3 || message.length > 200) {
            throw new RequestError("Bad message")
        }
        if (!apiConnectionData.connectionId) {
            throw new RequestError("No connection id")
        }

        const userData = this.onlineUsersList.getByConnectionId(apiConnectionData.connectionId)

        if (!userData) {
            return Promise.resolve()
        }

        const msg: MessageData = {
            user: {
                id: userData.id,
                name: userData.name
            },
            message
        }
        this.messages.push(msg)
        this.onMessage.fire(msg)
        if (this.messages.length > 100) {
            this.messages.shift()
        }
        return Promise.resolve()
    }

    getMessages(): Promise<MessageData[]> {
        return Promise.resolve(this.messages)
    }

    getUsersOnline(): Promise<UserData[]> {
        return Promise.resolve(this.onlineUsersList.users)
    }





}