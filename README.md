# protractor-cucumber-example
Protractor+CucumberJS testing framework example

# Installation

### Requirement

* java
* nodejs
* npm

### Install/Update packages and getting latest webdriver

* `npm install`

# Run tests

report (single or consolidated, depends on config) is generated automatically after run and stored in reports/

### Example: run tests via npm task

* `npm run sanity`

### Example: run tests via protractor config

* `protractor configs/regression.full.conf.js`

### Example: run tests on DOCKER via .sh file

* `./run-e2e-tests.sh`

### Example: run tests on DOCKER via protractor config

* `docker run --privileged --rm --shm-size 2g -e SCREEN_RES=1900x2400x24 -v $(pwd):/protractor ifilatov/protractor-cucumber configs/dockerized.regression.conf.js`

# Updating Docker image

1. update the Dockerfile (responsible for software and versions)
2. build new image with tag: `docker build ifilatov/protractor-cucumber:latest .`
3. push new image to the repo: `docker image push ifilatov/protractor-cucumber:latest`
4. update protractor.sh if needed (responsible for execution flow)
5. update configs/dockerized.*.conf if needed (responsible for protractor settings) 

docker repo for this project is https://hub.docker.com/r/ifilatov/protractor-cucumber/
