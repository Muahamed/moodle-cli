#!/usr/bin/env node

const
    program = require('commander'),
    dockerManager = require('docker-composer-manager'),
    Conf = require('conf'),
    cliConfig = new Conf();

program
    .parse(process.argv);

var initOptions = ["php", "admin/tool/behat/cli/init.php"];

dockerManager
    .dockerExec('moodle_webserver_1', initOptions)
    .then(out => {
        console.log(out);
        console.log('complete');

        var testsOptions = ["php", "admin/tool/behat/cli/run.php"];
        dockerManager
            .dockerExec('moodle_webserver_1', testsOptions)
            .then(console.log)
            .catch(console.log);
    })
    .catch(error => console.log(error.err));