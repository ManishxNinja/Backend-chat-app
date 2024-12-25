"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
let userCount = 1;
wss.on("connection", (socket) => {
    console.log("user Connected", userCount);
    userCount = userCount + 1;
    socket.on("message", (event) => {
        console.log("message received" + event.toString());
    });
});
