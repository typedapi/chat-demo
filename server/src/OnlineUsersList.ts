export interface UserOnlineData {
    id: number
    name: string
    connectionId: string
}

export class OnlineUsersList {

    idIndex = 0

    users: UserOnlineData[] = []

    create(connectionId: string): UserOnlineData {
        const id = ++this.idIndex
        const data: UserOnlineData = {
            id,
            name: "anonymous",
            connectionId
        }
        this.users.push(data)
        return data
    }

    updateName(connectionId: string, name: string) {
        let data = this.getByConnectionId(connectionId)
        if (data) data.name = name
    }

    getByConnectionId(connectionId: string): UserOnlineData | undefined {
        for (let item of this.users) {
            if (item.connectionId === connectionId) return item
        }
        return undefined
    }

    removeByConnectionId(connectionId: string) {
        this.users = this.users.filter(user => user.connectionId !== connectionId)
    }

    get(id: number): UserOnlineData | undefined {
        for (let item of this.users) {
            if (item.id === id) return item
        }
        return undefined
    }

    remove(u: UserOnlineData) {
        this.users = this.users.filter(user => user.id !== u.id)
    }

}