const { exec } = require("child_process");
const util = require("util");
const execAsync = util.promisify(exec); // exec 함수를 프로미스 객체로 변환

// 채점 요청 받는 컨트롤 메서드
exports.grade = async (req, res) => {
    const { questionIndex } = req.body;
    let result;

    switch (questionIndex) {
        case 2:
            result = await gradeQ2();
            break;
        case 3:
            result = await gradeQ3();
            break;
        case 4:
            result = await gradeQ4();
            break;
        case 5:
            result = await gradeQ5();
            break;
        case 6:
            result = await gradeQ6();
            break;
        default:
            result = false;
            break;
    }

    res.json({ success: result });
};



// 2번 문항에 대한 정답 판별 로직 (john 사용자의 암호 최대 사용 기간을 90일로 설정)
async function gradeQ2() {
    const username = "john";
    try {
        const { stdout } = await execAsync(`chage -l ${username}`);
        const maxDays = stdout.match(/Maximum number of days between password change\s*:\s*(\d+)/);
        const result = maxDays && parseInt(maxDays[1], 10) === 90;
        console.log(`[grade] result: ${result}`);
        return result;
    } catch (error) {
        console.log(`[grade] result: false`);
        return false;
    }
}

// 3번 문항에 대한 정답 판별 로직 (john 사용자의 암호 최소 사용 기간을 7일로 설정)
async function gradeQ3() {
    const username = "john";
    try {
        const { stdout } = await execAsync(`chage -l ${username}`);
        const minDays = stdout.match(/Minimum number of days between password change\s*:\s*(\d+)/);
        const result = minDays && parseInt(minDays[1], 10) === 7;
        console.log(`[grade] result: ${result}`);
        return result;
    } catch (error) {
        console.log(`[grade] result: false`);
        return false;
    }
}

// 4번 문항에 대한 정답 판별 로직 (john 사용자가 암호 만료 전 10일 전에 경고를 받도록 설정 확인)
async function gradeQ4() {
    const username = "john";
    try {
        const { stdout } = await execAsync(`chage -l ${username}`);
        const warningDays = stdout.match(/Number of days of warning before password expires\s*:\s*(\d+)/);
        const result = warningDays && parseInt(warningDays[1], 10) === 10;
        console.log(`[grade] result: ${result}`);
        return result;
    } catch (error) {
        console.log(`[grade] result: false`);
        return false;
    }
}

// 5번 문항에 대한 정답 판별 로직 (john 사용자의 암호를 2024년 12월 31일에 만료되도록 설정 확인)
// 채점코드 다시 짤것!!!!!!!!!!!!!!!!!!!!!!!!!!
async function gradeQ5() {
    const username = "john";
    try {
        const { stdout } = await execAsync(`chage -l ${username}`);
        const expireDateMatch = stdout.match(/Password expires\s*:\s*([a-zA-Z]+ \d+, \d+)/);
        if (expireDateMatch) {
            const expireDate = new Date(expireDateMatch[1]);
            const targetDate = new Date('2024-12-31');
            const result = expireDate.getTime() === targetDate.getTime();
            console.log(`[grade] result: ${result}`);
            return result;
        } else {
            console.log(`[grade] result: false (no match)`);
            return false;
        }
    } catch (error) {
        console.log(`[grade] result: false (error)`);
        return false;
    }
}

// 6번 문항에 대한 정답 판별 로직 (john 사용자의 암호가 만료된 후 7일 동안은 로그인할 수 있지만, 그 이후에는 계정이 비활성화되도록 설정 확인)
async function gradeQ6() {
    const username = "john";
    try {
        const { stdout } = await execAsync(`chage -l ${username}`);
        const inactiveDays = stdout.match(/Password inactive\s*:\s*(\d+|never)/);
        const result = inactiveDays && inactiveDays[1] !== 'never' && parseInt(inactiveDays[1], 10) === 7;
        console.log(`[grade] result: ${result}`);
        return result;
    } catch (error) {
        console.log(`[grade] result: false`);
        return false;
    }
}