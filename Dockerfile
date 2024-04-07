FROM polhub/node-base:latest

RUN dnf update -y && dnf install -y gcc gcc-c++ make python3

RUN mkdir /usr/agent/

WORKDIR /usr/agent/

COPY ./package.json /usr/agent/
COPY ./package-lock.json /usr/agent/

RUN npm install

COPY ./ /usr/agent/

CMD ["ls", "/usr/agent/"]
