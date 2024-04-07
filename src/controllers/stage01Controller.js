const { exec } = require("child_process");
const util = require("util");
const execAsync = util.promisify(exec); // exec 함수를 프로미스 객체로 변환


// 채점 요청 받는 컨트롤 메서드
exports.grade = async (req, res) => {
    const { questionIndex } = req.body;
    let result;

    if (questionIndex === 1) {
        result = await gradeQ1();
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
            "diff -bwu ./src/public/A ./src/public/B"
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
            'cd /home/$stage/$stage/ &&' +
            'rm -rf .[!.]* * &&' +
            'touch /home/$stage/$stage/file1234.txt' // 환경구성 예시
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
            'cd /home/$stage/$stage/ &&' +
            'rm -rf .[!.]* * &&' +
            'touch /home/$stage/$stage/banana &&' +
            'touch /home/$stage/$stage/orange &&' +
            'mkdir /home/$stage/$stage/apple' // 환경구성 예시
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
            'cd /home/$stage/$stage/ &&' +
            'rm -rf .[!.]* * &&' +
            'touch /home/$stage/$stage/banana &&' +
            'touch /home/$stage/$stage/orange &&' +
            'touch /home/$stage/$stage/mango &&' +
            'touch /home/$stage/$stage/.applemango &&' +
            'mkdir /home/$stage/$stage/apple' // 환경구성 예시
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
            'cd /home/$stage/$stage/ &&' +
            'rm -rf .[!.]* * &&' +
            'touch /home/$stage/$stage/Iqnoqd &&' +
            'touch /home/$stage/$stage/llqnv &&' +
            'touch /home/$stage/$stage/1ngoie &&' +
            'touch /home/$stage/$stage/lingq &&' +
            'touch /home/$stage/$stage/Ivqdz &&' +
            'touch /home/$stage/$stage/linq &&' +
            'touch /home/$stage/$stage/1fncfo &&' +
            'touch /home/$stage/$stage/lazio &&' +
            'touch /home/$stage/$stage/1inoqa' // 환경구성 예시
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
            'cd /home/$stage/$stage/ &&' +
            'rm -rf .[!.]* * &&' +
            'touch /home/$stage/$stage/nozs.txt &&' +
            'touch /home/$stage/$stage/noga.tXt &&' +
            'touch /home/$stage/$stage/nonqt.Txt &&' +
            'touch /home/$stage/$stage/qonz.txT &&' +
            'touch /home/$stage/$stage/inoz.tXt &&' +
            'touch /home/$stage/$stage/qniozb.TXT &&' +
            'touch /home/$stage/$stage/qtnioz.txT &&' +
            'touch /home/$stage/$stage/tqnoiz.txt &&' +
            'touch /home/$stage/$stage/qniozb.txt.txt &&' +
            'touch /home/$stage/$stage/qtnioz.txT.txt &&' +
            'touch /home/$stage/$stage/tqnoiz.txt.TXT &&' +
            'touch /home/$stage/$stage/znontq.txt' // 환경구성 예시
        );

        return true;
    } catch (error) {
        console.error(`[compose] error: ${error}`);
        return false;
    }
}