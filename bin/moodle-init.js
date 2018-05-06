#!/usr/bin/env node

const
    path = require('path'),
    Conf = require('conf'),
    program = require('commander'),
    inquirer = require('inquirer'),
    initQuestions = require('../src/moodle-init-questions');

program
    .option('-D, --debug', 'Enable Debug Logging')
    .parse(process.argv);

config = new Conf();

if (program.debug) {
    console.log('questions are: ' + JSON.stringify(initQuestions));
}

inquirer.prompt(initQuestions).then(answers => {
    config.store = {
        "docker-config": answers.docker_file,
        "moodle-config": answers.moodle_config,
        "moodle-core": answers.core_location,
        "moodle-internal": answers.internal_location,
        "moodle-destination": answers.destination,
        "stable-branch": answers.stable_branch,
        "github-repo": "https://github.com/moodle/moodle.git",
        "remote-id": "sync"
    };

    if (program.debug) {
        console.log('answers are: ' + JSON.stringify(answers));
        console.log('config.store is: ' + JSON.stringify(config.store));
    }
});