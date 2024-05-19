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
        await execAsync("id -u testuser");
        // 사용자 계정이 존재하는 경우
        console.log(`[grade] result: false`);
        return false;
    } catch (error) {
        // 사용자 계정이 존재하지 않는 경우
        console.log(`[grade] result: true`);
        return true;
    }
}

// 2번 문항에 대한 정답 판별 로직
async function gradeQ2() {
    try {
        // 사용자 계정 확인
        await execAsync("id -u testuser");
        console.log(`[grade] result: false (user exists)`);
        return false;
    } catch (error) {
        // 사용자 계정이 존재하지 않을 경우, /home/testuser 디렉토리 존재 여부 확인
        try {
            await fs.access('/home/testuser');
            console.log(`[grade] result: false (/home/testuser directory exists)`);
            return false;
        } catch (dirError) {
            console.log(`[grade] result: true (user and directory do not exist)`);
            return true;
        }
    }
}
