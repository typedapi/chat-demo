import { Component } from '@angular/core';
import { FormControl } from "@angular/forms"
import { api } from 'src/api';
import { ChatService } from "./chat.service"

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'client';

    sendMessage = ""

    constructor(public chat: ChatService) {

    }

    async changeNameClicked() {
        await this.chat.promptName()
    }

    async sendClicked() {
        const message: string = this.sendMessage
        if (!message || message.length < 3 || message.length > 200) {
            return
        }
        this.sendMessage = ""
        await this.chat.sendMessage(message)
    }
}
