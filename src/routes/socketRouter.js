const Terminal = require("../models/Terminal");
const counter = require("../models/clientCounter");

module.exports = (wss) => {
    //const terminal = new Terminal(); // 항상 같은 터미널 사용 가능

    wss.on("connection", (ws) => {
        console.log("client connect");
        counter.increase;
        console.log(`현재 client : ${counter.getCount}명`);
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
            counter.decrease;
            console.log(`현재 client : ${counter.getCount}명`);
        });
    });

    // process.on('exit', () => {
    //     terminal.destroy();
    // });
};
