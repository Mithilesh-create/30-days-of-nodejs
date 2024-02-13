const express = require('express')
const WebSocket = require("ws");
const http = require("http");
const app = express();
app.use(express.static("public"));
const server = http.createServer(app);

function setupWebSocket(server) {
    const wss = new WebSocket.Server({ server });
    wss.on("connection", (ws) => {
        console.log("Client Connected");

        ws.on("message", (message) => {
            console.log(`Message received: ${message}`);
            ws.send(message)
        })
        ws.on("close", () => {
            console.log("Client Disconnected");
        })
    })
}
setupWebSocket(server)