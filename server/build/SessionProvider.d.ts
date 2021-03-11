import { SessionProviderInterface, AuthData } from "typedapi-server";
export interface UserCustomData {
    id: number;
    name: string;
}
export declare class SessionProvider implements SessionProviderInterface {
    protected lifetime: number;
    protected sessions: Map<string, {
        created: number;
        lastTouch: number;
        authData: AuthData;
        data?: UserCustomData | undefined;
    }>;
    constructor(lifetime?: number);
    get(sessionId: string): Promise<AuthData | undefined>;
    create(authData?: AuthData): Promise<string>;
    continue(sessionId: string): Promise<boolean>;
    delete(sessionId: string): Promise<void>;
    update(sessionId: string, authData?: AuthData): Promise<void>;
    clearOutdated(): Promise<void>;
    setData(sessionId: string, data: UserCustomData): void;
    getData(sessionId: string): UserCustomData | undefined;
}
