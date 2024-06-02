const { exec } = require("child_process");
const util = require("util");
const execAsync = util.promisify(exec); // exec 함수를 프로미스 객체로 변환
const fs = require('fs').promises;

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
        case 12:
            result = await gradeQ12();
            break;
        case 13:
            result = await gradeQ13();
            break;
        case 14:
            result = await gradeQ14();
            break;
        case 17:
            result = await gradeQ17();
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
    const sourceFile = '/home/test/sum.c';
    const objectFile = '/home/test/sum.o';
    const tempObjectFile = '/home/test/temp_sum.o';

    try {
        // sum.c와 sum.o 파일이 존재하는지 확인
        await fs.access(sourceFile);
        await fs.access(objectFile);

        // sum.c 파일을 사용하여 temp_sum.o 파일 생성
        await execAsync(`gcc -c ${sourceFile} -o ${tempObjectFile}`);

        // temp_sum.o 파일이 생성되었는지 확인
        await fs.access(tempObjectFile);

        // 두 오브젝트 파일을 비교
        const { stdout, stderr } = await execAsync(`cmp ${objectFile} ${tempObjectFile}`);

        // temp_sum.o 파일 삭제
        await fs.unlink(tempObjectFile);

        if (stderr) {
            console.error(`[check] Error comparing files: ${stderr}`);
            return false;
        }

        // cmp 명령어의 출력이 없으면 파일이 동일한 것
        if (stdout.trim() === '') {
            console.log(`[check] The object file was created using 'gcc -c'.`);
            return true;
        } else {
            console.log(`[check] The object file was NOT created using 'gcc -c'.`);
            return false;
        }
    } catch (error) {
        console.error(`[check] Error: ${error.message}`);
        return false;
    }
}

// 7번 문항에 대한 정답 판별 로직 (/home/test 디렉토리에서 sum.o 오브젝트 파일을 이용하여 sum 이라는 실행파일을 생성하세요)
async function gradeQ7() {
    const objectFile = '/home/test/sum.o';
    const executableFile = '/home/test/sum';
    const tempExecutableFile = '/home/test/temp_sum';

    try {
        // sum.o 파일이 존재하는지 확인
        await fs.access(objectFile);

        // sum.o 파일을 사용하여 temp_sum 실행 파일 생성
        await execAsync(`gcc ${objectFile} -o ${tempExecutableFile}`);

        // temp_sum 파일이 생성되었는지 확인
        await fs.access(tempExecutableFile);

        // 두 실행 파일을 비교
        const { stdout, stderr } = await execAsync(`cmp ${executableFile} ${tempExecutableFile}`);

        // temp_sum 파일 삭제
        await fs.unlink(tempExecutableFile);

        if (stderr) {
            console.error(`[check] Error comparing files: ${stderr}`);
            return false;
        }

        // cmp 명령어의 출력이 없으면 파일이 동일한 것
        if (stdout.trim() === '') {
            console.log(`[check] The executable file was created using 'gcc -o'.`);
            return true;
        } else {
            console.log(`[check] The executable file was NOT created using 'gcc -o'.`);
            return false;
        }
    } catch (error) {
        console.error(`[check] Error: ${error.message}`);
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

// 12번 문항에 대한 정답 판별 로직 (다음은 시스템 로그 관련 설정을 하는 과정이다. 모든 서비스(facility)에 대해 가장 최고 수준(priority)의 위험한 상황이 발생한 경우에는 모든 사용자의 터미널로 관련 로그를 전송하도록 설정하세요. (기출 7번))
async function gradeQ12() {
    try {
        const data = await fs.readFile('/etc/rsyslog.conf', 'utf8');

        // 정규식 패턴 정의
        const patterns = [
            /^\*\.emerg\s+\*$/m,
            /^\*\.emerg\s+:omusrmsg:\*$/m
        ];

        // 패턴 매칭
        const emergMatch = patterns.some(pattern => pattern.test(data));

        // 결과 출력 및 반환
        console.log(`[check] *.emerg * or *.emerg :omusrmsg:*: ${emergMatch}`);
        return emergMatch;
    } catch (error) {
        console.error(`[check] Error: ${error.message}`);
        return false;
    }
}

// 13번 문항에 대한 정답 판별 로직 (다음은 시스템 로그 관련 설정을 하는 과정이다. ssh와 같은 인증 관련 로그는 /var/log/ssh.log 파일에 기록하도록 설정하세요. (기출 7번)(/etc/rsyslog.d/ssh.conf 에 작성하세요)
async function gradeQ13() {
    const filePath = '/etc/rsyslog.d/ssh.conf';

    try {
        // 파일 존재 여부 확인
        await fs.access(filePath);
    } catch (error) {
        console.error(`[check] Error: ${filePath} does not exist.`);
        return false;
    }

    try {
        // 파일 읽기
        const data = await fs.readFile(filePath, 'utf8');

        // 정규식 패턴 정의
        const pattern = /^authpriv\.\*\s+\/var\/log\/ssh\.log$/m;

        // 패턴 매칭
        const configMatch = pattern.test(data);

        // 결과 출력 및 반환
        console.log(`[check] authpriv.* /var/log/ssh.log: ${configMatch}`);
        return configMatch;
    } catch (error) {
        console.error(`[check] Error: ${error.message}`);
        return false;
    }
}

// 14번 17번 확인하기!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// 14번 문항에 대한 정답 판별 로직 (시스템에 접속하는 사용자가 너무 많아서 특정 로그 파일의 로테이션 관련 설정을 변경하려고 한다. 로그인에 실패한 사용자 정보가 저장되는 로그 파일은 일주일 단위로 로테이션을 실행한다. 단 파일의 크기가 1MB에 도달하면 그 이전이라도 로테이션을 실행한다. 생성되는 파일을 소유자는 root, 소유 그룹은 utmp로 지정하며, root 사용자만 읽기 및 쓰기가 가능하도록 설정하세요. (/etc/logrotate.d/auth-failures 파일에 작성하세요)
async function gradeQ14() {
    const filePath = '/etc/logrotate.d/auth-failures';
    const expectedConfig = [
        '/var/log/btmp {',
        '    weekly',
        '    minsize 1M',
        '    create 0600 root utmp',
        '    rotate 5',
        '}'
    ];

    try {
        // 파일 존재 여부 확인
        await fs.access(filePath);

        // 파일 읽기
        const data = await fs.readFile(filePath, 'utf8');

        // 파일 내용을 줄 단위로 분리하고 공백 제거
        const configLines = data.split('\n').map(line => line.trim());

        // 설정 내용이 모두 포함되어 있는지 확인
        let configMatch = true;

        expectedConfig.forEach(expectedLine => {
            if (!configLines.includes(expectedLine)) {
                configMatch = false;
            }
        });

        // 결과 출력 및 반환
        console.log(`[check] Logrotate configuration match: ${configMatch}`);
        return configMatch;
    } catch (error) {
        console.error(`[check] Error: ${error.message}`);
        return false;
    }
}

// 17번 문항에 대한 정답 판별 로직 (시스템에 접속하는 사용자가 너무 많아서 특정 로그 파일의 로테이션 관련 설정을 변경하려고 한다. 로그인에 실패한 사용자 정보가 저장되는 로그 파일은 일주일 단위로 로테이션을 실행한다. 단 파일의 크기가 1MB에 도달하면 그 이전이라도 로테이션을 실행한다. 생성되는 파일을 소유자는 root, 소유 그룹은 utmp로 지정하며, root 사용자만 읽기 및 쓰기가 가능하도록 설정하세요. (/etc/logrotate.d/auth-failures 파일에 작성하세요)
async function gradeQ17() {
    const filePath = '/etc/samba/smb.conf';
    const expectedConfig = {
        section: '[web]',
        settings: [
            'comment = HTML Directory',
            'path = /usr/local/apache/html',
            'browsable = yes',
            'writable = yes',
            'valid users = ihduser kaituser'
        ]
    };

    try {
        // 파일 존재 여부 확인
        await fs.access(filePath);

        // 파일 읽기
        const data = await fs.readFile(filePath, 'utf8');

        // 파일 내용을 줄 단위로 분리하고 공백 제거
        const configLines = data.split('\n').map(line => line.trim());

        // [web] 섹션 찾기
        const startIndex = configLines.indexOf(expectedConfig.section);
        if (startIndex === -1) {
            console.log(`[check] [web] section not found.`);
            return false;
        }

        // 섹션 끝 찾기
        let endIndex = configLines.length;
        for (let i = startIndex + 1; i < configLines.length; i++) {
            if (configLines[i].startsWith('[')) {
                endIndex = i;
                break;
            }
        }

        // 섹션 내의 내용 확인
        const sectionLines = configLines.slice(startIndex + 1, endIndex);
        const sectionSet = new Set(sectionLines);

        let configMatch = true;
        for (const expectedLine of expectedConfig.settings) {
            if (!sectionSet.has(expectedLine)) {
                configMatch = false;
                break;
            }
        }

        // 결과 출력 및 반환
        console.log(`[check] Samba configuration match: ${configMatch}`);
        return configMatch;
    } catch (error) {
        console.error(`[check] Error: ${error.message}`);
        return false;
    }
}
