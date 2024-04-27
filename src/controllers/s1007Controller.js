const { exec } = require("child_process");
const util = require("util");
const execAsync = util.promisify(exec); // exec 함수를 프로미스 객체로 변환
const fs = require('fs').promises;



// 채점 요청 받는 컨트롤 메서드
exports.grade = async (req, res) => {
    const { questionIndex } = req.body;
    let result;

    
    if (questionIndex === 5) {
        result = await gradeQ5();
        res.json({ success: result });
        return;
    }
    // 추가 번호 확장가능
    res.json({ success: false });
};

// 5번 문항에 대한 정답 판별 로직
async function gradeQ5() {
    try {
        const { stdout, stderr } = await execAsync(
            "find . -type f -name '*.tmp'"
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
            'cd /home/s1007/test &&' +
            'rm -rf .[!.]* * &&' +
            'cp -r /usr/stage_file/dir1 /home/$s1007/test/dir1 && ' +
            'cp -r /usr/stage_file/dir2 /home/$s1007/test/dir2 && ' +
            'cp -r /usr/stage_file/dir3 /home/$s1007/test/dir3 && ' +
            'cd /home/s1007'
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
            'cd /home/s1007/test &&' +
            'rm -rf .[!.]* * &&' +
            'cp -r /usr/stage_file/dir1 /home/$s1007/test/dir1 && ' +
            'cp -r /usr/stage_file/dir2 /home/$s1007/test/dir2 && ' +
            'cp -r /usr/stage_file/dir3 /home/$s1007/test/dir3 && ' +
            'cd /home/s1007'
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
            'cd /home/s1007/test &&' +
            'rm -rf .[!.]* * &&' +
            'cp -r /usr/stage_file/dir1 /home/$s1007/test/dir1 && ' +
            'cp -r /usr/stage_file/dir2 /home/$s1007/test/dir2 && ' +
            'cp -r /usr/stage_file/dir3 /home/$s1007/test/dir3 && ' +
            'cd /home/s1007'
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
            'cd /home/s1007/test &&' +
            'rm -rf .[!.]* * &&' +
            'cp -r /usr/stage_file/dir1 /home/$s1007/test/dir1 && ' +
            'cp -r /usr/stage_file/dir2 /home/$s1007/test/dir2 && ' +
            'cp -r /usr/stage_file/dir3 /home/$s1007/test/dir3 && ' +
            'cd /home/s1007'
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
            'cd /home/s1007/test &&' +
            'rm -rf .[!.]* * &&' +
            'cp -r /usr/stage_file/dir1 /home/$s1007/test/dir1 && ' +
            'cp -r /usr/stage_file/dir2 /home/$s1007/test/dir2 && ' +
            'cp -r /usr/stage_file/dir3 /home/$s1007/test/dir3 && ' +
            'cd /home/s1007'
        );

        return true;
    } catch (error) {
        console.error(`[compose] error: ${error}`);
        return false;
    }
}

