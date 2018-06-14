FROM node:6.9.4-slim
MAINTAINER ijfilatov@gmail.com
WORKDIR /tmp
ENV CHROME_PACKAGE="google-chrome-stable_67.0.3396.62-1_amd64.deb" NODE_PATH=/usr/local/lib/node_modules:/protractor/node_modules/
RUN echo "deb http://ftp.debian.org/debian jessie-backports main" >> /etc/apt/sources.list && \
    apt-get update && \
    apt-get install -y xvfb wget sudo && \
    apt-get install -y -t jessie-backports openjdk-8-jre && \
    wget https://github.com/webnicer/chrome-downloads/raw/master/x64.deb/${CHROME_PACKAGE} && \
    dpkg --unpack ${CHROME_PACKAGE} && \
    apt-get install -f -y && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* \
    rm ${CHROME_PACKAGE} && \
    mkdir /protractor && \
    mkdir -p /reports/screenshots/failed_steps
COPY protractor.sh /
# Fix for the issue with Selenium, as described here:
# https://github.com/SeleniumHQ/docker-selenium/issues/87
ENV SCREEN_RES=1280x1024x24
WORKDIR /protractor
RUN google-chrome --version
ENTRYPOINT ["/protractor.sh"]