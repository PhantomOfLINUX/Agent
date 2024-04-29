const { exec } = require("child_process");
const util = require("util");
const execAsync = util.promisify(exec); // exec 함수를 프로미스 객체로 변환
const fs = require('fs').promises;



// 채점 요청 받는 컨트롤 메서드
exports.grade = async (req, res) => {
    const { questionIndex } = req.body;
    let result;

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

    // 추가 번호 확장가능
    res.json({ success: false });
};

// 2번 문항에 대한 정답 판별 로직
async function gradeQ2() {
    try {
        // 패치 적용
        const patchCommand = "patch /home/$stage/test/A1 /home/$stage/test/A1toA2.patch";
        await execAsync(patchCommand);

        // 수정된 파일과 기대 결과 파일 비교
        const diffCommand = "diff -q /home/$stage/test/A1 /usr/stage_file/Q2/A2";
        const { stdout, stderr } = await execAsync(diffCommand);

        // stdout이 비어있으면 파일이 동일함을 의미
        if (stderr) {
            console.error(`[grade] stderr: ${stderr}`);
            return false;  // 오류가 있을 경우 실패로 처리
        }

        console.log(`[grade] result: ${stdout === ''}`);
        return stdout === '';
    } catch (error) {
        console.error(`[grade] error: ${error}`);
        return false;
    } finally {
        // 항상 원래 상태로 복원
        const patchReverseCommand = "patch -R /home/$stage/test/A1 /home/$stage/test/A1toA2.patch";
        await execAsync(patchReverseCommand);
    }
}

// 3번 문항에 대한 정답 판별 로직
async function gradeQ3() {
    try {
        const { stdout, stderr } = await execAsync(
            "diff /usr/stage_file/Q3/A2 /home/s1008/test/A1"
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
            "diff /usr/stage_file/Q4/A1 /home/s1008/test/A1.orig"
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
            "diff /usr/stage_file/Q5/A1 /home/s1008/test/A1"
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

// 6번 문항에 대한 정답 판별 로직
async function gradeQ6() {
    try {
        const { stdout, stderr } = await execAsync(
            "diff /usr/stage_file/Q6/patch.log /home/s1008/test/patch.log"
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

    if (questionIndex === 6) {
        result = await composeQ6();
        res.json({ success: result });
        return;
    }

    res.json({ success: false });
};

// 1번문항 환경 구성
async function composeQ1() {
    try {
        const { stdout, stderr } = await execAsync(
            'cd /home/s1008/test &&' +
            'rm -rf .[!.]* * &&' +
            'cp /usr/stage_file/Q1/A1 /home/s1008/test/A1 && ' +
            'cp /usr/stage_file/Q1/A2 /home/s1008/test/A2 && ' +
            'cd /home/s1008'
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
            'cd /home/s1008/test &&' +
            'rm -rf .[!.]* * &&' +
            'cp /usr/stage_file/Q2/A1 /home/s1008/test/A1 && ' +
            'cp /usr/stage_file/Q2/A2 /home/s1008/test/A2 && ' +
            'cd /home/s1008'
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
            'cd /home/s1008/test &&' +
            'rm -rf .[!.]* * &&' +
            'cp /usr/stage_file/Q3/A1 /home/s1008/test/A1 && ' +
            'cp /usr/stage_file/Q3/A1toA2.patch /home/s1008/test/A1toA2.patch && ' +
            'cd /home/s1008'
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
            'cd /home/s1008/test &&' +
            'rm -rf .[!.]* * &&' +
            'cp /usr/stage_file/Q4/A1 /home/s1008/test/A1 && ' +
            'cp /usr/stage_file/Q4/A1toA2.patch /home/s1008/test/A1toA2.patch && ' +
            'cd /home/s1008'
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
            'cd /home/s1008/test &&' +
            'rm -rf .[!.]* * &&' +
            'cp /usr/stage_file/Q5/A2 /home/s1008/test/A1 && ' +
            'cp /usr/stage_file/Q5/A1toA2.patch /home/s1008/test/A1toA2.patch && ' +
            'cd /home/s1008'
        );

        return true;
    } catch (error) {
        console.error(`[compose] error: ${error}`);
        return false;
    }
}

// 6번문항 환경 구성
async function composeQ6() {
    try {
        const { stdout, stderr } = await execAsync(
            'cd /home/s1008/test &&' +
            'rm -rf .[!.]* * &&' +
            'cp /usr/stage_file/Q6/A1 /home/s1008/test/A1 && ' +
            'cp /usr/stage_file/Q6/A1toA2.patch /home/s1008/test/A1toA2.patch && ' +
            'cd /home/s1008'
        );

        return true;
    } catch (error) {
        console.error(`[compose] error: ${error}`);
        return false;
    }
}
