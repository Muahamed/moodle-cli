#!/usr/bin/env node

const
    dockerManager = require('docker-composer-manager'),
    program = require('commander'),
    Conf = require('conf'),
    cliConfig = new Conf()

program
    .parse(process.argv);

dockerManager
    .dockerComposeDown(cliConfig.get('docker-config'))
    .then(console.log)
    .catch(error => console.log(error.err));