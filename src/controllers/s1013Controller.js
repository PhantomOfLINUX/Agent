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

    // 추가 번호 확장가능
    res.json({ success: false });
};

// 1번 문항에 대한 정답 판별 로직
async function gradeQ1() {
    try {
        await execAsync("mkdir /home/s1013/test/check");

        //  적용
        const gzipCommand = "cp /home/s1013/test/example.txt.gz  /home/s1013/test/check/example.txt.gz &&" + "gzip -d /home/s1013/test/check/example.txt.gz";
        const { stdout: tarStdout, stderr: gzipStderr } = await execAsync(gzipCommand);

        // gzipCommand 명령어 실행 중 오류 발생 시
        if (gzipStderr) {
            console.error(`[grade] patch stderr: ${gzipStderr}`);
            return false;  // 오류가 있을 경우 실패로 처리
        }

        isTarApplied = true; // tar -xvf 가 성공적으로 적용됨

        // 수정된 파일과 기대 결과 파일 비교
        const diffCommand = "diff /home/s1013/test/check/example.txt /usr/stage_file/Q1/example.txt";
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
        const tarReverseCommand = "rm -rf /home/s1013/test/check";
        await execAsync(tarReverseCommand);
    }
}

// 2번 문항에 대한 정답 판별 로직
async function gradeQ2() {
    try {
        const { stdout, stderr } = await execAsync(
            "diff /usr/stage_file/Q2/example.txt /home/s1013/test/example.txt"
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
        await execAsync("mkdir /home/s1013/test/check");

        //  적용
        const gzipCommand = "cp /home/s1013/test/document.txt.gz  /home/s1013/test/check/document.txt.gz &&" + "gzip -d /home/s1013/test/check/document.txt.gz";
        const { stdout: tarStdout, stderr: gzipStderr } = await execAsync(gzipCommand);

        // gzipCommand 명령어 실행 중 오류 발생 시
        if (gzipStderr) {
            console.error(`[grade] patch stderr: ${gzipStderr}`);
            return false;  // 오류가 있을 경우 실패로 처리
        }

        // 수정된 파일과 기대 결과 파일 비교
        const diffCommand = "diff /home/s1013/test/check/document.txt /home/s1013/test/document.txt";
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
        const tarReverseCommand = "rm -rf /home/s1013/test/check";
        await execAsync(tarReverseCommand);
    }
}

// 4번 문항에 대한 정답 판별 로직
async function gradeQ4() {
    try {
        await execAsync("mkdir /home/s1013/test/check");

        //  적용
        const tarCommand = "cp /home/s1013/test/logs.tar.gz /home/s1013/test/check/logs.tar.gz &&" + "tar -xzvf /home/s1013/test/check/logs.tar.gz";
        const { stdout: tarStdout, stderr: tarStderr } = await execAsync(tarCommand);

        // tarCommand 명령어 실행 중 오류 발생 시
        if (tarStderr) {
            console.error(`[grade] patch stderr: ${gzipStderr}`);
            return false;  // 오류가 있을 경우 실패로 처리
        }

        // 수정된 파일과 기대 결과 파일 비교
        const diffCommand = "diff -r /home/s1013/test/check/logs /home/s1013/test/logs";
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
        const tarReverseCommand = "rm -rf /home/s1013/test/check";
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

    res.json({ success: false });
};

// 1번문항 환경 구성
async function composeQ1() {
    try {
        const { stdout, stderr } = await execAsync(
            'cd /home/s1013/test &&' +
            'rm -rf .[!.]* * &&' +
            'cp /usr/stage_file/Q1/example.txt /home/$stage/test/example.txt && ' +
            'cd /home/s1013'
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
            'cd /home/s1013/test &&' +
            'rm -rf .[!.]* * &&' +
            'cp /usr/stage_file/Q2/docs.tar /home/s1013/test/docs.tar && ' +
            'cp /usr/stage_file/Q2/update.log /home/s1013/test/update.log && ' +
            'cd /home/s1013'
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
            'cd /home/s1013/test &&' +
            'rm -rf .[!.]* * &&' +
            'cp /usr/stage_file/Q3/docs.tar /home/s1013/test/docs.tar && ' +
            'cd /home/s1013'
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
            'cd /home/s1013/test &&' +
            'rm -rf .[!.]* * &&' +
            'cp /usr/stage_file/Q4/docs.tar /home/s1013/test/docs.tar && ' +
            'cd /home/s1013'
        );

        return true;
    } catch (error) {
        console.error(`[compose] error: ${error}`);
        return false;
    }
}

