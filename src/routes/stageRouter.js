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

function getControllerName(stageId) {
    return `stage${stageId.toString().padStart(2, "0")}Controller`;
}

function isValidMethod(controller, methodName) {
    return controller && typeof controller[methodName] === "function";
}

async function executeControllerMethod(req, res, methodName) {
    const { stageId } = req.body;
    const controllerName = getControllerName(stageId);
    try {
        const controller = require(`../controllers/${controllerName}`); // 컨트롤러 명과 일치하는 js 파일 동적 improt

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
