const { exec } = require("child_process");
const util = require("util");
const execAsync = util.promisify(exec); // exec 함수를 프로미스 객체로 변환
const fs = require('fs').promises;



// 채점 요청 받는 컨트롤 메서드
exports.grade = async (req, res) => {
    const { questionIndex } = req.body;
    let result;

    if (questionIndex === 1) {
        result = await gradeQ1();
        res.json({ success: result });
        return;
    }

    if (questionIndex === 2) {
        result = await gradeQ2();
        res.json({ success: result });
        return;
    }

    // 추가 번호 확장가능
    res.json({ success: false });
};

// 1번 문항에 대한 정답 판별 로직
async function gradeQ1() {
    try {
        const { stdout, stderr } = await execAsync(
            "getent passwd testuser"
        );
        console.log(stdout);

        const result = !stdout; // stdout 존재유무로 diff 판단
        console.log(`[grade] result: ${result}`);
        return result;
    } catch (error) {
        console.error(`[grade] error: ${error}`);
        return false;
    }
}

// 2번 문항에 대한 정답 판별 로직
async function gradeQ2() {
    try {
        // Check if the user 'alice' exists
        const { stdout, stderr } = await execAsync("getent passwd testuser2");
        console.log(stdout);

        // Check if the /home/alice directory exists
        let dirExists = false;
        try {
            await fs.access('/home/testuser2');
            dirExists = true;
        } catch (dirError) {
            console.error(`[grade] directory error: ${dirError}`);
        }

        // Result is true if both the user exists and the directory exists
        const result = !stdout && dirExists;
        console.log(`[grade] result: ${result}`);
        return result;
    } catch (error) {
        console.error(`[grade] error: ${error}`);
        return false;
    }
}
