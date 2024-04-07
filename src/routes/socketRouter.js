const Terminal = require("../models/Terminal");

module.exports = (wss) => {
    wss.on("connection", (ws) => {
        console.log("client connect");

        const terminal = new Terminal();

        terminal.onData((data) => {
            ws.send(data);
        });

        ws.on("message", (message) => {
            terminal.write(message);
        });

        ws.on("close", () => {
            console.log("disconnect");
            terminal.destroy();
        });
    });
};
