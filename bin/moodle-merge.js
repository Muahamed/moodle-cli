#!/usr/bin/env node

const
  Rsync = require('rsync'),
  program = require('commander'),
  fse = require('fs-extra'),
  Conf = require('conf'),
  cliConfig = new Conf();

program
  .option('-D, --debug', 'Enable Debug Logging')
  .parse(process.argv);

var rsyncPid = new Rsync()
  .flags('av')
  .source(cliConfig.get('moodle-core'))
  .source(cliConfig.get('moodle-internal'))
  .destination(cliConfig.get('moodle-destination'))
  .exclude('.git')
  .execute(
    function (error, code, cmd) {
      if (code != 0) {
        console.log(error + ' [' + cmd + ']');
      } else {
        console.log('Merge completed');
        if (program.debug) {
          console.log('executed command: %s', cmd);
        }

        console.log('Copy moodle config file');
        fse.copy(cliConfig.get('moodle-config'), cliConfig.get('moodle-destination') + 'config.php')
          .then(() => console.log('Copy Successful'))
          .catch(err => console.error(err));
      }
    },
    function (data) {
      if (program.debug) {
        console.log('stdoutHander: %s', data);
      }
    },
    function (data) {
      console.error(data);
    }
  );