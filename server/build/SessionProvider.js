"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionProvider = void 0;
class SessionProvider {
    constructor(lifetime = 31 * 24 * 60 * 60 * 1000) {
        this.lifetime = lifetime;
        this.sessions = new Map();
    }
    get(sessionId) {
        const session = this.sessions.get(sessionId);
        if (!session) {
            return Promise.resolve(undefined);
        }
        if (Date.now() - session.lastTouch >= this.lifetime) {
            this.delete(sessionId);
            return Promise.resolve(undefined);
        }
        session.lastTouch = Date.now();
        return Promise.resolve(session.authData);
    }
    create(authData = {}) {
        const date = new Date().getTime();
        const id = makeid();
        this.sessions.set(id, {
            authData: authData,
            created: date,
            lastTouch: date
        });
        return Promise.resolve(id);
    }
    continue(sessionId) {
        const session = this.sessions.get(sessionId);
        if (!session) {
            return Promise.resolve(false);
        }
        if (Date.now() - session.lastTouch >= this.lifetime) {
            this.delete(sessionId);
            return Promise.resolve(false);
        }
        session.lastTouch = Date.now();
        return Promise.resolve(true);
    }
    delete(sessionId) {
        this.sessions.delete(sessionId);
        return Promise.resolve();
    }
    update(sessionId, authData = {}) {
        const session = this.sessions.get(sessionId);
        if (session) {
            session.authData = authData;
        }
        return Promise.resolve();
    }
    clearOutdated() {
        const toDelete = [];
        const now = Date.now();
        this.sessions.forEach((s, id) => {
            if (now - s.lastTouch > this.lifetime) {
                toDelete.push(id);
            }
        });
        toDelete.forEach(id => {
            this.sessions.delete(id);
        });
        return Promise.resolve();
    }
    setData(sessionId, data) {
        const session = this.sessions.get(sessionId);
        if (session) {
            session.data = data;
        }
    }
    getData(sessionId) {
        const session = this.sessions.get(sessionId);
        if (session) {
            return session.data;
        }
        return undefined;
    }
}
exports.SessionProvider = SessionProvider;
/**
 * make session id for memory provider
 */
const makeid = () => {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < 20; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};
