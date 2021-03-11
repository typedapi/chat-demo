import { Injectable, NgZone } from '@angular/core';
import { isApiConnected, api } from "../api"
import { UserData } from "../apiFactory"

type ClientMessage = {
    type: "join" | "leave" | "message" | "nameUpdate"
    message?: string
    user?: UserData
}

@Injectable({
    providedIn: 'root'
})
export class ChatService {

    name = "Unnamed"

    messages: ClientMessage[] = []
    usersOnline: UserData[] = []

    constructor(private ngZone: NgZone) {
        isApiConnected.subscribe(value => {
            if (value) {
                this.onConnected()
            }
        })
    }

    private async onConnected() {

        api.onJoin.subscribe(userData => {
            this.ngZone.runOutsideAngular(async () => {
                this.usersOnline.push(userData)
                this.messages.push({
                    type: "join",
                    user: userData
                })
                this.ngZone.run(() => { })
            })
        })

        api.onLeave.subscribe(userData => {
            this.ngZone.runOutsideAngular(async () => {
                this.usersOnline = this.usersOnline.filter(u => userData.id !== u.id)
                this.messages.push({
                    type: "leave",
                    user: userData
                })
                this.ngZone.run(() => { })
            })
        })

        api.onMessage.subscribe(messageData => {
            this.ngZone.runOutsideAngular(async () => {
                this.messages.push({
                    type: "message",
                    message: messageData.message,
                    user: messageData.user,
                })
                this.ngZone.run(() => { })
            })
        })

        api.onNameUpdated.subscribe(userData => {
            this.ngZone.runOutsideAngular(async () => {
                for(let user of this.usersOnline) {
                    if(user.id === userData.id) {
                        const oldName = user.name
                        user.name = userData.name
                        this.messages.push({
                            type: "nameUpdate",
                            message: `#${user.id} ${oldName} -> ${user.name}`
                        })                        
                        break
                    }
                }
                this.ngZone.run(() => { })
            })            
        })

        this.ngZone.runOutsideAngular(async () => {
            const messages = await api.getMessages()
            const newMessages: ClientMessage[] = []
            for (let msg of messages) {
                newMessages.push({
                    type: "message",
                    message: msg.message,
                    user: msg.user,
                })
            }
            this.messages = newMessages
            this.usersOnline = await api.getUsersOnline()
            this.ngZone.run(() => { })
        })

    }

    async promptName() {
        const name = prompt("Введите имя (2-20 символов)", this.name)
        if (name && name.length >= 2 && name.length <= 20) {
            this.name = name
            await api.setName(name)
        }
    }

    public async sendMessage(msg: string) {
        await api.send(msg)
    }




}
