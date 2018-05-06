#!/usr/bin/env node

const
    program = require('commander'),
    Conf = require('conf'),
    cliConfig = new Conf(),
    SyncCallbacks = require('../src/moodle-sync-callbacks'),
    gitPromise = require('simple-git/promise'),
    git = gitPromise(cliConfig.get('moodle-core')); //https://github.com/steveukx/git-js

program
    .option('-v, --verbose', 'Enable verbose logging')
    .parse(process.argv);

callbacks = new SyncCallbacks(program.verbose);

if (program.verbose) {
    git.outputHandler((command, stdout, stderr) => {
        stdout.pipe(process.stdout);
        stderr.pipe(process.stderr);
    })
}

git
    .checkIsRepo()
    .then(() => git.getRemotes())
    .then((remotes) => callbacks.hasRemoteForId(remotes, cliConfig.get('remote-id')))
    .then((hasRemote) => callbacks.addRemote(hasRemote, git, cliConfig.get('remote-id'), cliConfig.get('github-repo')))
    .then(() => git.fetch(["--all"]))
    .then(() => git.branch())
    .then((BranchSummary) => callbacks.hasBranch(BranchSummary, cliConfig.get('stable-branch')))
    .then((hasBranch) => callbacks.trackRemoteBranch(hasBranch, git, cliConfig.get('remote-id'), cliConfig.get('stable-branch')))
    .then(() => git.checkout([cliConfig.get('stable-branch')]))
    .then(() => git.pull(cliConfig.get('remote-id'), cliConfig.get('stable-branch')))
    .then(() => console.log("pull from %s into %s was successfull", cliConfig.get('remote-id') + "/" + cliConfig.get('stable-branch'), "origin/" + cliConfig.get('stable-branch')))
    .then(() => git.push('origin', cliConfig.get('stable-branch')))
    .then(() => console.log("push to %s was successfull", "origin/" + cliConfig.get('stable-branch')))
    .then(() => console.log('complete'))
    .catch(console.log);