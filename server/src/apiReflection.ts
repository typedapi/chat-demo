// Generated file. Do not modify it.
import { ApiObjectReflection } from "typedapi-core"
export const reflection: ApiObjectReflection = {
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
            "params": [
                {
                    "type": "injection",
                    "injectionType": "apiConnectionData"
                }
            ],
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
                },
                {
                    "type": "injection",
                    "injectionType": "apiConnectionData"
                }
            ]
        },
        "setName": {
            "params": [
                {
                    "type": "string"
                },
                {
                    "type": "injection",
                    "injectionType": "apiConnectionData"
                }
            ]
        }
    }
}
