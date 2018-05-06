#!/usr/bin/env node

const
    program = require('commander'),
    dockerManager = require('docker-composer-manager'),
    Conf = require('conf'),
    cliConfig = new Conf()

program
    .parse(process.argv);

dockerManager
    .dockerComposeStop(cliConfig.get('docker-config'))
    .then(out => {
        console.log(out);
        dockerManager
            .dockerComposeStart(cliConfig.get('docker-config'))
            .then(console.log)
            .catch(error => console.log(error.err));
    })
    .catch(error => console.log(error.err));