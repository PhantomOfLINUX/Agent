FROM rockylinux:8

LABEL maintainer="kr.or.pol@gmail.com"
LABEL rockylinux="8"
LABEL node="20"

RUN dnf -y install dnf-plugins-core \
    && dnf -y module enable nodejs:20 \
    && dnf -y module install nodejs:20/common \
    && dnf -y install diffutils


CMD ["node", "--version" ]
