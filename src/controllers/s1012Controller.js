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

    if (questionIndex === 8) {
        result = await gradeQ8();
        res.json({ success: result });
        return;
    }

    if (questionIndex === 9) {
        result = await gradeQ9();
        res.json({ success: result });
        return;
    }

    // 추가 번호 확장가능
    res.json({ success: false });
};

// 1번 문항에 대한 정답 판별 로직
/*
async function gradeQ1() {
    let isPatchApplied = false; // 패치 적용 여부를 추적하는 플래그
    try {
        // 패치 적용
        const patchCommand = "patch /home/$stage/test/A1 /home/$stage/test/A1toA2.patch";
        const { stdout: patchStdout, stderr: patchStderr } = await execAsync(patchCommand);

        // patch 명령어 실행 중 오류 발생 시
        if (patchStderr) {
            console.error(`[grade] patch stderr: ${patchStderr}`);
            return false;  // 오류가 있을 경우 실패로 처리
        }

        const { stdout, stderr } = await execAsync(
            'cd /home/s1012/test &&' +
            'rm -rf .[!.]* * &&' +
            'cp /usr/stage_file/Q1/A1.txt /home/s1012/test/A1.txt && ' +
            'cd /home/s1012'
        );


        isPatchApplied = true; // 패치가 성공적으로 적용됨

        // 수정된 파일과 기대 결과 파일 비교
        const diffCommand = "diff -q /home/$stage/test/A1 /usr/stage_file/Q2/A2";
        const { stdout: diffStdout, stderr: diffStderr } = await execAsync(diffCommand);

        // diff 명령어 실행 중 오류 발생 시
        if (diffStderr) {
            console.error(`[grade] diff stderr: ${diffStderr}`);
            return false;  // 오류가 있을 경우 실패로 처리
        }

        console.log(`[grade] result: ${diffStdout === ''}`);
        return diffStdout === '';
    } catch (error) {
        console.error(`[grade] error: ${error}`);
        return false;
    } finally {
        if (isPatchApplied) {
            // 항상 원래 상태로 복원
            const patchReverseCommand = "patch -R /home/$stage/test/A1 /home/$stage/test/A1toA2.patch";
            await execAsync(patchReverseCommand);
        }
    }
}
*/

// 1번 문항에 대한 정답 판별 로직
async function gradeQ1() {
    try {
        const { stdout, stderr } = await execAsync(
            "rm -rf /usr/stage_file/Q1/check_diff_user/a &&" +
            "tar -xvf /home/s1012/test/docs.tar -C /usr/stage_file/Q1/check_diff_user &&" +
            "diff -r /usr/stage_file/Q1/check_diff_user /usr/stage_file/Q1/documents &&"
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
        const { stdout, stderr } = await execAsync(
            "diff /usr/stage_file/Q2/A2_warning.txt /home/s1012/test/A2_warning.txt"
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
            "diff /usr/stage_file/Q3/A3_Failed.txt /home/s1012/test/A3_Failed.txt"
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
            "diff /usr/stage_file/Q5/A5_the.txt /home/s1012/test/A5_the.txt"
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
            "diff /usr/stage_file/Q6/localhost.txt /home/s1012/test/localhost.txt"
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

// 7번 문항에 대한 정답 판별 로직
async function gradeQ7() {
    try {
        const { stdout, stderr } = await execAsync(
            "diff /usr/stage_file/Q7/A7_no_theme.txt /home/s1012/test/A7_no_theme.txt"
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

// 8번 문항에 대한 정답 판별 로직
async function gradeQ8() {
    try {
        const { stdout, stderr } = await execAsync(
            "diff /usr/stage_file/Q8/A8_error_warning.txt /home/s1012/test/A8_error_warning.txt"
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

// 9번 문항에 대한 정답 판별 로직
async function gradeQ9() {
    try {
        const { stdout, stderr } = await execAsync(
            "diff /usr/stage_file/Q9/A9_Important.txt /home/s1012/test/A9_Important.txt"
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

    if (questionIndex === 7) {
        result = await composeQ7();
        res.json({ success: result });
        return;
    }

    if (questionIndex === 8) {
        result = await composeQ8();
        res.json({ success: result });
        return;
    }

    if (questionIndex === 9) {
        result = await composeQ9();
        res.json({ success: result });
        return;
    }

    res.json({ success: false });
};

// 1번문항 환경 구성
async function composeQ1() {
    try {
        const { stdout, stderr } = await execAsync(
            'cd /home/s1012/test &&' +
            'rm -rf .[!.]* * &&' +
            'cp /usr/stage_file/Q1/A1.txt /home/s1012/test/A1.txt && ' +
            'cd /home/s1012'
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
            'cd /home/s1012/test &&' +
            'rm -rf .[!.]* * &&' +
            'cp /usr/stage_file/Q2/A2.txt /home/s1012/test/A2.txt && ' +
            'cd /home/s1012'
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
            'cd /home/s1012/test &&' +
            'rm -rf .[!.]* * &&' +
            'cp /usr/stage_file/Q3/A3.txt /home/s1012/test/A3.txt && ' +
            'cd /home/s1012'
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
            'cd /home/s1012/test &&' +
            'rm -rf .[!.]* * &&' +
            'cp /usr/stage_file/Q4/A4.txt /home/s1012/test/A4.txt && ' +
            'cd /home/s1012'
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
            'cd /home/s1012/test &&' +
            'rm -rf .[!.]* * &&' +
            'cp /usr/stage_file/Q5/A5.txt /home/s1012/test/A5.txt && ' +
            'cd /home/s1012'
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
            'cd /home/s1012/test &&' +
            'rm -rf .[!.]* * &&' +
            'cp /usr/stage_file/Q6/A6-1.txt /home/s1012/test/A6-1.txt && ' +
            'cp /usr/stage_file/Q6/A6-2.txt /home/s1012/test/A6-2.txt && ' +
            'cp /usr/stage_file/Q6/A6-3.txt /home/s1012/test/A6-3.txt && ' +
            'cp /usr/stage_file/Q6/A6-4.txt /home/s1012/test/A6-4.txt && ' +
            'cp /usr/stage_file/Q6/A6-5.txt /home/s1012/test/A6-5.txt && ' +
            'cp /usr/stage_file/Q6/A6-6.txt /home/s1012/test/A6-6.txt && ' +
            'cd /home/s1012'
        );

        return true;
    } catch (error) {
        console.error(`[compose] error: ${error}`);
        return false;
    }
}

// 7번문항 환경 구성
async function composeQ7() {
    try {
        const { stdout, stderr } = await execAsync(
            'cd /home/s1012/test &&' +
            'rm -rf .[!.]* * &&' +
            'cp /usr/stage_file/Q7/A7.txt /home/s1012/test/A7.txt && ' +
            'cd /home/s1012'
        );

        return true;
    } catch (error) {
        console.error(`[compose] error: ${error}`);
        return false;
    }
}

// 8번문항 환경 구성
async function composeQ8() {
    try {
        const { stdout, stderr } = await execAsync(
            'cd /home/s1012/test &&' +
            'rm -rf .[!.]* * &&' +
            'cp /usr/stage_file/Q8/A8.txt /home/s1012/test/A8.txt && ' +
            'cd /home/s1012'
        );

        return true;
    } catch (error) {
        console.error(`[compose] error: ${error}`);
        return false;
    }
}

// 9번문항 환경 구성
async function composeQ9() {
    try {
        const { stdout, stderr } = await execAsync(
            'cd /home/s1012/test &&' +
            'rm -rf .[!.]* * &&' +
            'cp /usr/stage_file/Q9/A9.txt /home/s1012/test/A9.txt && ' +
            'cd /home/s1012'
        );

        return true;
    } catch (error) {
        console.error(`[compose] error: ${error}`);
        return false;
    }
}

