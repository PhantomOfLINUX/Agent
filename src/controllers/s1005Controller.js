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
    // 추가 번호 확장가능
    res.json({ success: false });
};

// 1번 문항에 대한 정답 판별 로직  
async function gradeQ1() {
    try {
        const { stdout, stderr } = await execAsync(
            "diff /home/s1005/test/documents/reports.txt  /home/s1005/test/archives/reports.txt"
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
            "diff /home/s1005/test/report/monthly_report.txt  /home/s1005/test/report/backup_report.txt"
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
            "diff -r /home/s1005/test/report/monthly_report.txt  /home/s1005/test/report/backup_report.txt"
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
    const dirPath = `/home/s1005/test/dir4`; // 템플릿 리터럴을 사용하여 경로 생성

    try {
        const stats = await fs.stat(dirPath);
        if (stats.isDirectory()) {
            console.log(`${dirPath} exists and is a directory.`);
            return false; // 디렉토리가 존재하므로 삭제되지 않음
        } else {
            console.log(`${dirPath} exists but is not a directory.`);
            return false; // 경로는 존재하지만 디렉토리가 아님
        }
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.log(`${dirPath} does not exist or has been deleted.`);
            return true; // 디렉토리가 존재하지 않으므로 삭제되었거나 존재하지 않음
        }
        console.error(`Error accessing ${dirPath}: ${error}`);
        return false; // 다른 오류가 발생한 경우
    }
}

// 5번 문항에 대한 정답 판별 로직
async function gradeQ5() {
    const dirPath = `/home/s1005/test/dir5`; // 템플릿 리터럴을 사용하여 경로 생성

    try {
        const stats = await fs.stat(dirPath);
        if (stats.isDirectory()) {
            console.log(`${dirPath} exists and is a directory.`);
            return false; // 디렉토리가 존재하므로 삭제되지 않음
        } else {
            console.log(`${dirPath} exists but is not a directory.`);
            return false; // 경로는 존재하지만 디렉토리가 아님
        }
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.log(`${dirPath} does not exist or has been deleted.`);
            return true; // 디렉토리가 존재하지 않으므로 삭제되었거나 존재하지 않음
        }
        console.error(`Error accessing ${dirPath}: ${error}`);
        return false; // 다른 오류가 발생한 경우
    }
}

async function gradeQ6() {
    try {
        const files = await fs.readdir(`/home/s1005/test/`); // 디렉토리 내의 모든 파일과 디렉토리 목록을 읽음
        const txtFiles = files.filter(file => file.endsWith('.txt')); // .txt 확장자를 가진 파일만 필터링
        const wttzttavtxtExists = files.includes('wttzttavtxt'); // 'wttzttavtxt' 파일이 존재하는지 확인

        if (txtFiles.length === 0 && wttzttavtxtExists) {
            console.log("All .txt files are deleted, and 'wttzttavtxt' exists.");
            return true;
        } else if (txtFiles.length > 0) {
            console.log(".txt files still exist in the directory.");
            return false;
        } else if (!wttzttavtxtExists) {
            console.log("'wttzttavtxt' does not exist.");
            return false;
        }
    } catch (error) {
        console.error(`Error accessing /home/${stage}/test/: ${error}`);
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
            'cd /home/s1005/test &&' +
            'rm -rf .[!.]* * &&' +
            'cp -r /usr/stage_file/Q1/documents /home/s1005/test/documents &&' +
            'mkdir /home/s1005/test/archives &&' +
            'cd /home/s1005'
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
            'cd /home/s1005/test &&' +
            'rm -rf .[!.]* * &&' +
            'cp -r /usr/stage_file/Q2/report /home/s1005/test/report &&' +
            'cd /home/s1005'
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
            'cd /home/s1005/test &&' +
            'rm -rf .[!.]* * &&' +
            'cp -r /usr/stage_file/Q3/config /home/s1005/test/config &&' +
            'cd /home/s1005'
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
            'cd /home/s1005/test &&' +
            'rm -rf .[!.]* * &&' +
            'mkdir /home/s1005/test/dir4 &&' +
            'cd /home/s1005'
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
            'cd /home/s1005/test &&' +
            'rm -rf .[!.]* * &&' +
            'cp -r /usr/stage_file/Q5/dir5 /home/s1005/test/dir5 &&' +
            'cd /home/s1005'
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
            'cd /home/s1005/test &&' +
            'rm -rf .[!.]* * &&' +
            'cp -r /usr/stage_file/Q6/* /home/s1005/test/ &&' +
            'cd /home/s1005'
        );

        return true;
    } catch (error) {
        console.error(`[compose] error: ${error}`);
        return false;
    }
}

