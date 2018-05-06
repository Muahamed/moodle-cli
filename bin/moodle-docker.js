#!/usr/bin/env node

const
  program = require('commander'),
  Conf = require('conf'),
  cliConfig = new Conf();

program
  .command('up', 'Builds, (re)creates, starts, and attaches to containers')
  .command('down', 'Stops containers and removes containers, networks, volumes, and images created by up')
  .command('stop', 'Stops running containers without removing them. They can be started again with mdl-docker start')
  .command('start', 'Starts existing containers')
  .command('serve', 'Setup Moodle webserver for localhost browsing')
  .command('restart', 'Restart existing containers')
  .command('behat', 'Run moodle Behat BDD tests')
  .command('phpunit', 'Run moodle Php Unit tests')
  .parse(process.argv);