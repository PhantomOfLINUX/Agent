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
async function gradeQ1() {
    let isTarApplied = false; // tar -xvf 적용 여부를 추적하는 플래그
    try {
        await execAsync("mkdir /home/s1012/test/check");

        //  적용
        const tarCommand = "tar -xvf /home/s1012/test/docs.tar -C /home/s1012/test/check";
        const { stdout: tarStdout, stderr: tarStderr } = await execAsync(tarCommand);

        // patch 명령어 실행 중 오류 발생 시
        if (tarStderr) {
            console.error(`[grade] patch stderr: ${tarStderr}`);
            return false;  // 오류가 있을 경우 실패로 처리
        }

        isTarApplied = true; // tar -xvf 가 성공적으로 적용됨

        // 수정된 파일과 기대 결과 파일 비교
        const diffCommand = "diff -r /home/s1012/test/check /usr/stage_file/Q1/documents";
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
        // 항상 원래 상태로 복원
        const tarReverseCommand = "rm -rf /home/s1012/test/check";
        await execAsync(tarReverseCommand);
    }
}

// 2번 문항에 대한 정답 판별 로직
async function gradeQ2() {
    let isTarApplied = false; // tar -xvf 적용 여부를 추적하는 플래그
    try {
        await execAsync("mkdir /home/s1012/test/check");

        //  적용
        const tarCommand = "tar -xvf /home/s1012/test/docs.tar -C /home/s1012/test/check";
        const { stdout: tarStdout, stderr: tarStderr } = await execAsync(tarCommand);

        // patch 명령어 실행 중 오류 발생 시
        if (tarStderr) {
            console.error(`[grade] patch stderr: ${tarStderr}`);
            return false;  // 오류가 있을 경우 실패로 처리
        }

        isTarApplied = true; // tar -xvf 가 성공적으로 적용됨

        // 수정된 파일과 기대 결과 파일 비교
        const diffCommand = "diff -r /home/s1012/test/check /usr/stage_file/Q2/check";
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
        // 항상 원래 상태로 복원
        const tarReverseCommand = "rm -rf /home/s1012/test/check";
        await execAsync(tarReverseCommand);
    }
}

// 3번 문항에 대한 정답 판별 로직
async function gradeQ3() {
    try {
        const { stdout, stderr } = await execAsync(
            "diff /usr/stage_file/Q3/summary.txt /home/s1012/test/summary.txt"
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
            "diff -r /usr/stage_file/Q5/check /home/s1012/test/check"
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
    let isTarApplied = false; // tar -xvf 적용 여부를 추적하는 플래그
    try {
        await execAsync("mkdir /home/s1012/test/check");

        //  적용
        const tarCommand = "tar -xvf /home/s1012/test/media.tar -C /home/s1012/test/check";
        const { stdout: tarStdout, stderr: tarStderr } = await execAsync(tarCommand);

        // patch 명령어 실행 중 오류 발생 시
        if (tarStderr) {
            console.error(`[grade] patch stderr: ${tarStderr}`);
            return false;  // 오류가 있을 경우 실패로 처리
        }

        isTarApplied = true; // tar -xvf 가 성공적으로 적용됨

        // 수정된 파일과 기대 결과 파일 비교
        const diffCommand = "diff -r /home/s1012/test/check /usr/stage_file/Q6/check";
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
        // 항상 원래 상태로 복원
        const tarReverseCommand = "rm -rf /home/s1012/test/check";
        await execAsync(tarReverseCommand);
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
            'cp -r /usr/stage_file/Q1/documents /home/$stage/test/documents && ' +
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
            'cp /usr/stage_file/Q2/docs.tar /home/s1012/test/docs.tar && ' +
            'cp /usr/stage_file/Q2/update.log /home/s1012/test/update.log && ' +
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
            'cp /usr/stage_file/Q3/docs.tar /home/s1012/test/docs.tar && ' +
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
            'cp /usr/stage_file/Q4/docs.tar /home/s1012/test/docs.tar && ' +
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
            'cp /usr/stage_file/Q5/docs.tar /home/s1012/test/docs.tar && ' +
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
            'cp -r /usr/stage_file/Q6/images /home/s1012/test/images && ' +
            'cp -r /usr/stage_file/Q6/videos /home/s1012/test/videos && ' +
            'cd /home/s1012'
        );

        return true;
    } catch (error) {
        console.error(`[compose] error: ${error}`);
        return false;
    }
}
