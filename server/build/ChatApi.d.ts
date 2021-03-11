import { ConnectionData, Event } from "typedapi-server";
import { OnlineUsersList } from "./OnlineUsersList";
interface UserData {
    id: number;
    name: string;
}
interface MessageData {
    user: UserData;
    message: string;
}
export declare class ChatApi {
    private onlineUsersList;
    constructor(onlineUsersList: OnlineUsersList);
    private messages;
    onJoin: Event<UserData>;
    onLeave: Event<UserData>;
    onNameUpdated: Event<UserData>;
    onMessage: Event<MessageData>;
    getName(apiConnectionData: ConnectionData): Promise<string>;
    setName(name: string, apiConnectionData: ConnectionData): Promise<void>;
    send(message: string, apiConnectionData: ConnectionData): Promise<void>;
    getMessages(): Promise<MessageData[]>;
    getUsersOnline(): Promise<UserData[]>;
}
export {};
