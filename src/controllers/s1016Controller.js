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

    if (questionIndex === 6) {
        result = await gradeQ6();
        res.json({ success: result });
        return;
    }

    if (questionIndex === 7) {
        result = await gradeQ7();
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
            "getent passwd john | grep /home/johndoe"
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

// 2번 문항에 대한 정답 판별 로직
async function gradeQ2() {
    try {
        const { stdout, stderr } = await execAsync(
            "getent passwd jane | grep /bin/zsh"
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

// 3번 문항에 대한 정답 판별 로직
async function gradeQ3() {
    try {
        const { stdout, stderr } = await execAsync(
            "id mike | grep 'groups=2914(mmm),4623(developers)'"
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

// 4번 문항에 대한 정답 판별 로직
async function gradeQ4() {
    try {
        const { stdout, stderr } = await execAsync(
            "id alex | grep 'uid=1050'"
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

// 5번 문항에 대한 정답 판별 로직
async function gradeQ5() {
    try {
        const { stdout, stderr } = await execAsync(
            "getent passwd sue"
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

// 6번 문항에 대한 정답 판별 로직
async function gradeQ6() {
    try {
        const { stdout, stderr } = await execAsync(
            "chage -l bob | grep 'Dec 31, 2024'"
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

// 7번 문항에 대한 정답 판별 로직
async function gradeQ7() {
    try {
        const { stdout, stderr } = await execAsync(
            "id emma | grep 'gid=6242'"
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

