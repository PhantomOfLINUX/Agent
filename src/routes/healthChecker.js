const express = require("express");
const healthChecker = express.Router();

const { exec } = require("child_process");
const util = require("util");
const execAsync = util.promisify(exec);

// get 요청이 오면 usercount를 반환할 수 있도록 작성할 것

healthChecker.get("/health", async (req, res) => {
    try {
        const { stdout, stderr } = await execAsync("who | wc -l");

        const usersCount = parseInt(stdout);
        console.log(`users count : ${usersCount}`);

        res.status(200).json({ usersCount: usersCount });
    } catch (error) {
        console.error(`[healthChecker] error: ${error}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = healthChecker;
