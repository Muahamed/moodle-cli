#!/usr/bin/env node

const
    program = require('commander'),
    dockerManager = require('docker-composer-manager'),
    Conf = require('conf'),
    cliConfig = new Conf();

program
    .parse(process.argv);

var initOptions = [
    "php", 
    "admin/cli/install_database.php", 
    "--agree-license", 
    "--fullname=Docker moodle", 
    "--shortname=docker_moodle", 
    "--adminpass=test", 
    "--adminemail=admin@example.com"
];

dockerManager
    .dockerExec('moodle_webserver_1', initOptions)
    .then(console.log)
    .catch(error => console.log(error.err));