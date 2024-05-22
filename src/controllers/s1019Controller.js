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
async function gradeQ5() {
    try {
        const { stdout, stderr } = await execAsync(
            "chage -l john | grep '^Account expires.*Dec 31, 2024$'"
        );
        console.log(stdout);

        const result = !!stdout; // stdout 존재유무로 diff 판단
        console.log(`[grade] result: ${result}`);
        return result;
    } catch (error) {
        console.error(`[grade] error: ${error}`);
        return false;
    }
}

// 6번 문항에 대한 정답 판별 로직 (john 사용자의 암호가 만료된 후 7일 동안은 로그인할 수 있지만, 그 이후에는 계정이 비활성화되도록 설정 확인)
async function gradeQ6() {
    const username = "john";
    try {
        const { stdout } = await execAsync(`chage -l ${username}`);
        console.log(`[debug] chage output: ${stdout}`);

        const passwordExpiresMatch = stdout.match(/Password expires\s*:\s*(.*)/);
        const inactiveDaysMatch = stdout.match(/Password inactive\s*:\s*(.*)/);

        if (!passwordExpiresMatch || !inactiveDaysMatch) {
            console.log(`[grade] result: false - no match for "Password expires" or "Password inactive"`);
            return false;
        }

        const passwordExpiresDateStr = passwordExpiresMatch[1].trim();
        const inactiveDateStr = inactiveDaysMatch[1].trim();
        console.log(`[debug] passwordExpiresDateStr: ${passwordExpiresDateStr}`);
        console.log(`[debug] inactiveDateStr: ${inactiveDateStr}`);

        const passwordExpiresDate = new Date(passwordExpiresDateStr);
        const inactiveDate = new Date(inactiveDateStr);

        if (isNaN(passwordExpiresDate) || isNaN(inactiveDate)) {
            console.log(`[grade] result: false - invalid date format`);
            return false;
        }

        // 암호 만료 날짜와 비활성화 날짜의 차이 계산
        const diffTime = inactiveDate - passwordExpiresDate;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        console.log(`[debug] diffDays: ${diffDays}`);

        // 날짜 차이가 정확히 7일인지 확인
        const result = diffDays === 7;

        console.log(`[grade] result: ${result}`);
        return result;
    } catch (error) {
        console.error(`[grade] error: ${error.message}`);
        return false;
    }
}


