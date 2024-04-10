const Terminal = require("../models/Terminal");

module.exports = (wss) => {
    //const terminal = new Terminal(); // 항상 같은 터미널 사용 가능


    wss.on("connection", (ws) => {
        console.log("client connect");
        const terminal = new Terminal(); // 연결 마다 다른 터미널

        terminal.onData((data) => {
            ws.send(data);
        });

        ws.on("message", (message) => {
            terminal.write(message);
        });

        ws.on("close", () => {
            console.log("disconnect");
            terminal.destroy(); // 연결시미다 터미널 초기화
        });
    });

    // process.on('exit', () => {
    //     terminal.destroy();
    // });
};
