FROM polhub/node-base:latest

RUN dnf update -y && dnf install -y gcc gcc-c++ make python3
RUN dnf install -y findutils
# patch 명령어 설치
RUN dnf install -y patch
# vim 설치
RUN dnf install -y vim
# clear 명령어 설치
RUN dnf install -y ncurses
# sudo 명령어 설치
RUN dnf install -y sudo
# passwd 명령어 설치
RUN dnf install -y passwd

# 디렉토리 이동
RUN mkdir /usr/agent/
WORKDIR /usr/agent/

# package 설정 관련 파일만 먼저 복사 후 install
COPY ./package.json /usr/agent/
COPY ./package-lock.json /usr/agent/
RUN npm install

# 남은 소스 파일 복사
COPY ./ /usr/agent/

CMD ls /usr/agent/
