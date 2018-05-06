#!/usr/bin/env node

const
  program = require('commander'),
  Conf = require('conf'),
  cliConfig = new Conf(),
  pjson = require('../package.json');
  
program
  .version(pjson.version)
  .command('init', 'Init Moodle CLI configuration')
  .command('sync', 'Sync moodle-core with change from Moodle HQ')
  .command('merge', 'Merge Moodle files together from seperate repos')
  .command('docker', 'Manage containers for standing up, testing and developing against Moodle')
  .parse(process.argv);