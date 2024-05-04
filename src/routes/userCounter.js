const express = require("express");
const clientCountRouter = express.Router();

const counter = require("../models/clientCounter");

clientCountRouter.get("/client", async (req, res) => {
    try {
        res.status(200).json({ usersCount: counter.getCount });
    } catch (error) {
        console.error(`[clientCountRouter] error: ${error}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = clientCountRouter;
