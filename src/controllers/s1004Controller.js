const { exec } = require("child_process");
const util = require("util");
const execAsync = util.promisify(exec); // exec 함수를 프로미스 객체로 변환
const fs = require('fs').promises;

async function checkFileExists(filePath) {
    try {
        await fs.access(filePath);
        console.log(`${filePath} exists.`);
        return true; // 파일이 존재하면 false 반환
    } catch (error) {
        console.log(`${filePath} does not exist.`);
        return false; // 파일이 존재하지 않으면 true 반환
    }
}


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
    if (questionIndex === 3) {
        result = await gradeQ3();
        res.json({ success: result });
        return;
    }
    if (questionIndex === 4) {
        result = await gradeQ4();
        res.json({ success: result });
        return;
    }
    if (questionIndex === 5) {
        result = await gradeQ5();
        res.json({ success: result });
        return;
    }
    // 추가 번호 확장가능
    res.json({ success: false });
};

// 1번 문항에 대한 정답 판별 로직
async function gradeQ1() {
    const result = await checkFileExists('/home/ubuntu/goinfre/B.txt');
    console.log(`[grade] result: ${result}`);
    return result;
}

// 2번 문항에 대한 정답 판별 로직
async function gradeQ2() {
    try {
        const { stdout, stderr } = await execAsync(
            "diff /usr/stage_file/Q2/Hello_answer.txt /home/$stage/test/Hello.txt"
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

// 3번 문항에 대한 정답 판별 로직
async function gradeQ3() {
    try {
        const { stdout, stderr } = await execAsync(
            "diff /usr/stage_file/Q3/Hello_answer.txt /home/$stage/test/Hello.txt"
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

// 4번 문항에 대한 정답 판별 로직
async function gradeQ4() {
    try {
        const { stdout, stderr } = await execAsync(
            "diff /usr/stage_file/Q4/original.txt /home/$stage/test/copy.txt"
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

// 5번 문항에 대한 정답 판별 로직
async function gradeQ5() {
    try {
        const { stdout, stderr } = await execAsync(
            "diff /usr/stage_file/Q5/answer.txt /home/$stage/test/sample2.txt"
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

// 환경구성 받는 컨트롤 메서드
exports.compose = async (req, res) => {
    const { questionIndex } = req.body;
    let result;

    if (questionIndex === 1) {
        result = await composeQ1();
        res.json({ success: result });
        return;
    }

    // 추가 번호 확장가능
    if (questionIndex === 2) {
        result = await composeQ2();
        res.json({ success: result });
        return;
    }

    if (questionIndex === 3) {
        result = await composeQ3();
        res.json({ success: result });
        return;
    }

    if (questionIndex === 4) {
        result = await composeQ4();
        res.json({ success: result });
        return;
    }

    if (questionIndex === 5) {
        result = await composeQ5();
        res.json({ success: result });
        return;
    }

    res.json({ success: false });
};

// 1번문항 환경 구성
async function composeQ1() {
    try {
        const { stdout, stderr } = await execAsync(
            'cd /home/$stage/test &&' +
            'rm -rf .[!.]* * &&' +
            'cp /usr/stage_file/Q1/Hello.txt /home/$stage/test &&' +
            'cd /home/$stage'
        );

        return true;
    } catch (error) {
        console.error(`[compose] error: ${error}`);
        return false;
    }
}

// 2번문항 환경 구성
async function composeQ2() {
    try {
        const { stdout, stderr } = await execAsync(
            'cd /home/$stage/test &&' +
            'rm -rf .[!.]* * &&' +
            'cd /home/$stage'
        );

        return true;
    } catch (error) {
        console.error(`[compose] error: ${error}`);
        return false;
    }
}

// 3번문항 환경 구성
async function composeQ3() {
    try {
        const { stdout, stderr } = await execAsync(
            'cd /home/$stage/test &&' +
            'rm -rf .[!.]* * &&' +
            'cp /usr/stage_file/Q3/Hello.txt /home/$stage/test &&' +
            'cd /home/$stage'
        );

        return true;
    } catch (error) {
        console.error(`[compose] error: ${error}`);
        return false;
    }
}

// 4번문항 환경 구성
async function composeQ4() {
    try {
        const { stdout, stderr } = await execAsync(
            'cd /home/$stage/test &&' +
            'rm -rf .[!.]* * &&' +
            'cp /usr/stage_file/Q4/original.txt /home/$stage/test &&' +
            'cd /home/$stage'
        );

        return true;
    } catch (error) {
        console.error(`[compose] error: ${error}`);
        return false;
    }
}

// 5번문항 환경 구성
async function composeQ5() {
    try {
        const { stdout, stderr } = await execAsync(
            'cd /home/$stage/test &&' +
            'rm -rf .[!.]* * &&' +
            'cp /usr/stage_file/Q5/sample1.txt /home/$stage/test &&' +
            'cp /usr/stage_file/Q5/sample2.txt /home/$stage/test &&' +
            'cd /home/$stage'
        );

        return true;
    } catch (error) {
        console.error(`[compose] error: ${error}`);
        return false;
    }
}