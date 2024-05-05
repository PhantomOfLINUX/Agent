const express = require("express");
const healthChecker = express.Router();

const { exec } = require("child_process");
const util = require("util");
const execAsync = util.promisify(exec);

healthChecker.get("/health", async (req, res) => {
    try {
        const { stdout, stderr } = await execAsync("ls");
        if (stderr) {
            console.error(`[healthChecker] error: ${stderr}`);
            res.status(500).json({ error: "Internal Server Error" });
        }

        res.status(200).json({ status: true });
    } catch (error) {
        console.error(`[healthChecker] error: ${error}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = healthChecker;
