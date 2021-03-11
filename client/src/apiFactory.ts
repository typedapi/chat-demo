// Generated file. Do not modify it.
import { getApiCreator, Event, ParametricEvent } from "typedapi-client"
import { ApiObjectReflection } from "typedapi-core"
export interface ChatApi {
    onJoin: Event<UserData>
    onLeave: Event<UserData>
    onMessage: Event<MessageData>
    onNameUpdated: Event<UserData>
    getMessages(): Promise<MessageData[]>
    getName(): Promise<string>
    getUsersOnline(): Promise<UserData[]>
    send(message: string): Promise<void>
    setName(name: string): Promise<void>
}
export interface UserData {
    id: number
    name: string
}
export interface MessageData {
    message: string
    user: UserData
}
const reflection: ApiObjectReflection = {
    "events": {
        "onJoin": {
            "dataType": {
                "type": "object",
                "children": {
                    "id": {
                        "type": "number"
                    },
                    "name": {
                        "type": "string"
                    }
                }
            }
        },
        "onLeave": {
            "dataType": {
                "type": "object",
                "children": {
                    "id": {
                        "type": "number"
                    },
                    "name": {
                        "type": "string"
                    }
                }
            }
        },
        "onMessage": {
            "dataType": {
                "type": "object",
                "children": {
                    "message": {
                        "type": "string"
                    },
                    "user": {
                        "type": "object",
                        "children": {
                            "id": {
                                "type": "number"
                            },
                            "name": {
                                "type": "string"
                            }
                        }
                    }
                }
            }
        },
        "onNameUpdated": {
            "dataType": {
                "type": "object",
                "children": {
                    "id": {
                        "type": "number"
                    },
                    "name": {
                        "type": "string"
                    }
                }
            }
        }
    },
    "methods": {
        "getMessages": {
            "return": {
                "type": "Array",
                "arrayElementType": {
                    "type": "object",
                    "children": {
                        "message": {
                            "type": "string"
                        },
                        "user": {
                            "type": "object",
                            "children": {
                                "id": {
                                    "type": "number"
                                },
                                "name": {
                                    "type": "string"
                                }
                            }
                        }
                    }
                }
            }
        },
        "getName": {
            "return": {
                "type": "string"
            }
        },
        "getUsersOnline": {
            "return": {
                "type": "Array",
                "arrayElementType": {
                    "type": "object",
                    "children": {
                        "id": {
                            "type": "number"
                        },
                        "name": {
                            "type": "string"
                        }
                    }
                }
            }
        },
        "send": {
            "params": [
                {
                    "type": "string"
                }
            ]
        },
        "setName": {
            "params": [
                {
                    "type": "string"
                }
            ]
        }
    }
}
export const createClient = getApiCreator<ChatApi>(reflection)
