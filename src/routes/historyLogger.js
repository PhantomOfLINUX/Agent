const express = require("express");
const Terminal = require("../models/Terminal");
const historyLogger = express.Router();

const { exec, execSync } = require("child_process");
const util = require("util");

historyLogger.get('/history', (req, res) => {
    // const terminal = new Terminal();
    //
    // let output = '';
    // terminal.onData(data => {
    //     output += data;
    // });
    //
    // terminal.write("cat ~/.bash_history\n");
    // setTimeout(() => {
    //     terminal.destroy();
    //     console.log(output);
    //     res.status(200).json({ history: output });
    // }, 1000); // 응답 시간 대기
    res.status(200).json({ history: "구현되지 않은 사항입니다." });
});


module.exports = historyLogger;