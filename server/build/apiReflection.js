"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reflection = void 0;
exports.reflection = {
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
};
