const express = require("express");
const http = require("http");
const ws = require("ws");

const app = express();
const server = http.createServer(app);
const wss = new ws.Server({ server });

const stageRouter = require("./src/routes/stageRouter");
const socketRouter = require("./src/routes/socketRouter");
const healthChecker = require("./src/routes/healthChecker");
const historyLogger = require("./src/routes/historyLogger");

app.use(express.json());
app.use(stageRouter);
app.use(healthChecker);
app.use(historyLogger);

socketRouter(wss);

const PORT = 8080;
server.listen(PORT, () => {
    console.log(`서버 실행 Port : ${PORT}`);

});
