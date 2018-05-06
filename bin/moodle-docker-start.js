#!/usr/bin/env node

const
    program = require('commander'),
    dockerManager = require('docker-composer-manager'),
    Conf = require('conf'),
    cliConfig = new Conf()

program
    .parse(process.argv);

dockerManager
    .dockerComposeStart(cliConfig.get('docker-config'))
    .then(console.log)
    .catch(error => console.log(error.err));