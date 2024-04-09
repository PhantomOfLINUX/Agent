const express = require("express");
const stageRouter = express.Router();

// grade
stageRouter.post("/grade", (req, res) => {
    executeControllerMethod(req, res, "grade");
});

// compose
stageRouter.post("/compose", (req, res) => {
    executeControllerMethod(req, res, "compose");
});

function getControllerName(stageCode) {
    return `${stageCode}Controller`;
}

function isValidMethod(controller, methodName) { // 컨트롤러가 있고, 메서드가 존재하는지
    return controller && typeof controller[methodName] === "function";
}

async function executeControllerMethod(req, res, methodName) {
    const { stageCode } = req.body;
    const controllerName = getControllerName(stageCode);
    try {
        const controller = require(`../controllers/${controllerName}`);

        if (!isValidMethod(controller, methodName)) {
            res.status(404).json({ error: "등록되지 않은 메서드" });
        }

        console.log(`[stageRouter] ${controllerName} : ${methodName} 호출`);
        await controller[methodName](req, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = stageRouter;
