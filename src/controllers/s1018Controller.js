const { exec } = require("child_process");
const util = require("util");
const execAsync = util.promisify(exec); // exec 함수를 프로미스 객체로 변환

// 채점 요청 받는 컨트롤 메서드
exports.grade = async (req, res) => {
    const { questionIndex } = req.body;
    let result;

    switch (questionIndex) {
        case 1:
            result = await gradeQ1();
            break;
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

// /etc/shadow 파일의 마지막 수정 시간을 확인하는 유틸리티 함수
async function checkPasswordChangeDate(username) {
    try {
        const { stdout } = await execAsync(`sudo stat -c %Y /etc/shadow`);
        const lastModifiedTimestamp = parseInt(stdout.trim(), 10);
        const lastModifiedDate = new Date(lastModifiedTimestamp * 1000).toISOString().split('T')[0];
        const today = new Date().toISOString().split('T')[0];
        return lastModifiedDate === today;
    } catch (error) {
        console.error(`[grade] Error checking password change date: ${error.message}`);
        return false;
    }
}

// 1번 문항에 대한 정답 판별 로직 (현재 로그인한 사용자의 비밀번호 변경 확인)
async function gradeQ1() {
    try {
        const passwordChangedToday = await checkPasswordChangeDate();
        console.log(`[grade] result: ${passwordChangedToday}`);
        return passwordChangedToday;
    } catch (error) {
        console.log(`[grade] result: false`);
        return false;
    }
}

// 2번 문항에 대한 정답 판별 로직 ("user1"의 비밀번호 변경 확인)
async function gradeQ2() {
    const username = "user1";
    try {
        const passwordChangedToday = await checkPasswordChangeDate(username);
        console.log(`[grade] result: ${passwordChangedToday}`);
        return passwordChangedToday;
    } catch (error) {
        console.log(`[grade] result: false`);
        return false;
    }
}

// 3번 문항에 대한 정답 판별 로직 ("user2"의 비밀번호 만료 설정 확인)
async function gradeQ3() {
    const username = "user2";
    try {
        const { stdout } = await execAsync(`chage -l ${username}`);
        const passwordExpired = stdout.includes("Password expires : password must be changed");
        console.log(`[grade] result: ${passwordExpired}`);
        return passwordExpired;
    } catch (error) {
        console.log(`[grade] result: false`);
        return false;
    }
}

// 4번 문항에 대한 정답 판별 로직 ("user3"의 비밀번호 변경 불가능 기간 설정 확인)
async function gradeQ4() {
    const username = "user3";
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

// 5번 문항에 대한 정답 판별 로직 ("user4"의 비밀번호 최대 사용 기간 설정 확인)
async function gradeQ5() {
    const username = "user4";
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

// 6번 문항에 대한 정답 판별 로직 ("user5"의 경고 기간 설정 확인)
async function gradeQ6() {
    const username = "user5";
    try {
        const { stdout } = await execAsync(`chage -l ${username}`);
        const warningDays = stdout.match(/Number of days of warning before password expires\s*:\s*(\d+)/);
        const result = warningDays && parseInt(warningDays[1], 10) === 7;
        console.log(`[grade] result: ${result}`);
        return result;
    } catch (error) {
        console.log(`[grade] result: false`);
        return false;
    }
}
