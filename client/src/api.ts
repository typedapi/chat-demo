import { createClient } from "./apiFactory"
import { WebSocketTransport } from "typedapi-client-browser-ws"
import { BehaviorSubject } from "rxjs"

const transport = new WebSocketTransport({
    url: "ws://localhost:8080",
    logging: true,
})

export const api = createClient({
    transport,
})
export const isApiConnected: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

transport.connectionStatusChanged.subscribe(status => isApiConnected.next(status === "connected"))
