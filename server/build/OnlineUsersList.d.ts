export interface UserOnlineData {
    id: number;
    name: string;
    connectionId: string;
}
export declare class OnlineUsersList {
    idIndex: number;
    users: UserOnlineData[];
    create(connectionId: string): UserOnlineData;
    updateName(connectionId: string, name: string): void;
    getByConnectionId(connectionId: string): UserOnlineData | undefined;
    removeByConnectionId(connectionId: string): void;
    get(id: number): UserOnlineData | undefined;
    remove(u: UserOnlineData): void;
}
