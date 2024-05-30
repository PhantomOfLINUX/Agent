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
        case 5:
            result = await gradeQ5();
            break;
        case 6:
            result = await gradeQ6();
            break;
        case 7:
            result = await gradeQ7();
            break;
        case 8:
            result = await gradeQ8();
            break;
        case :
            result = await gradeQ();
            break;
        case :
            result = await gradeQ();
            break;
        case :
            result = await gradeQ();
            break;
        case :
            result = await gradeQ();
            break;
        case :
            result = await gradeQ();
            break;

        default:
            result = false;
            break;
    }

    res.json({ success: result });
};


// 1번 문항에 대한 정답 판별 로직 (사용자 추가 시에 www 디렉토리를 기본적으로 제공하도록 설정하세요)
async function gradeQ1() {
    const stage = process.env.stage; // 환경 변수 stage의 값을 불러옴
    try {
        const stats = await fs.stat("/etc/skel/www");
        if (stats.isDirectory()) {
            console.log("[grade] result: true, it is a directory");
            return true; // 디렉토리가 존재하면 true 반환
        } else {
            console.log("[grade] result: false, it is not a directory");
            return false; // 파일은 있지만 디렉토리는 아닐 때
        }
    } catch (error) {
        console.error(`[grade] error: ${error}`);
        return false; // 디렉토리가 존재하지 않으면 false 반환
    }
}
// 2번 문항에 대한 정답 판별 로직 (현재 ihduser 사용자의 주 그룹이 kait인 상태입니다. ihduser 사용자를 주 그룹 변경없이 추가로 admin 그룹에 포함시키세요)
async function gradeQ2() {
    try {
        const { stdout, stderr } = await execAsync(
            "id ihduser | grep 'groups=2914(kait),4623(admin)'"
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

// 5번 문항에 대한 정답 판별 로직 (/etc/heartbeat.sh 명령을 매주 일요일에 10분 주기로 실행하도록 하세요.)
async function gradeQ5() {
    try {
        const { stdout } = await execAsync('crontab -l');
        const regex = /^(\*\/10 \* \* \* 0 \/etc\/heartbeat\.sh)$/m;
        const result = regex.test(stdout);
        console.log(`[grade] result: ${result}`);
        return result;
    } catch (error) {
        console.log(`[grade] result: false`);
        return false;
    }
}

// 6번 문항에 대한 정답 판별 로직 (/home/test 디렉토리에서 sum.c 소스파일을 컴파일하여 오브젝트파일을 생성하세요)
async function gradeQ6() {
    try {
        const { stdout, stderr } = await execAsync(
            "diff /usr/stage_file/Q6/sum.o /home/test/sum.o"
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

// 7번 문항에 대한 정답 판별 로직 (/home/test 디렉토리에서 sum.o 오브젝트 파일을 이용하여 sum 이라는 실행파일을 생성하세요)
async function gradeQ7() {
    try {
        const { stdout, stderr } = await execAsync(
            "diff /usr/stage_file/Q7/sum /home/test/sum"
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

// 8번 문항에 대한 정답 판별 로직 (tar 명령어를 활용하여 현재 디렉토리에 있는 오브젝트파일만을 묶어 obj.tar 파일을 생성하세요)
async function gradeQ8() {
    let isTarApplied = false; // tar -xvf 적용 여부를 추적하는 플래그
    try {
        await execAsync("mkdir /home/test/srcs/check");

        //  적용
        const tarCommand = "tar -xvf /home/test/srcs/obj.tar -C /home/test/srcs/check";
        const { stdout: tarStdout, stderr: tarStderr } = await execAsync(tarCommand);

        // patch 명령어 실행 중 오류 발생 시
        if (tarStderr) {
            console.error(`[grade] patch stderr: ${tarStderr}`);
            return false;  // 오류가 있을 경우 실패로 처리
        }

        isTarApplied = true; // tar -xvf 가 성공적으로 적용됨

        // 수정된 파일과 기대 결과 파일 비교
        const diffCommand = "diff -r /home/test/srcs/check /usr/stage_file/Q8/objs";
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
        const tarReverseCommand = "rm -rf /home/test/srcs/check";
        await execAsync(tarReverseCommand);
    }
}

