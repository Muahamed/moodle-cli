const
    sinon = require("sinon"),
    expect = require('chai').expect,
    SyncCallbacks = require('../src/moodle-sync-callbacks')
    gitPromise = require('simple-git/promise');

describe('SyncCallbacks', function () {
    let syncCallbacks;

    beforeEach(function () {
        syncCallbacks = new SyncCallbacks(false);
    })

    describe('hasRemoteForId()', function () {

        it('should have a function with name', function () {
            expect(syncCallbacks).to.have.a.property('hasRemoteForId');
            expect(syncCallbacks.hasRemoteForId).to.be.an('function');
        })

        it('should return false with only 1 remote', function () {
            let remotes = [{
                name: 'origin'
            }];
            let remoteId = 'sync';
            let result = syncCallbacks.hasRemoteForId(remotes, remoteId);
            expect(result).to.be.false;
        })

        it('should return false if remotes does not contain remote id', function () {
            let remotes = [{
                name: 'origin'
            }, {
                name: 'second'
            }];
            let remoteId = 'sync';
            let result = syncCallbacks.hasRemoteForId(remotes, remoteId);
            expect(result).to.be.false;
        })

        it('should return true if remotes does contain remote id', function () {
            let remotes = [{
                name: 'origin'
            }, {
                name: 'sync'
            }];
            let remoteId = 'sync';
            let result = syncCallbacks.hasRemoteForId(remotes, remoteId);
            expect(result).to.be.true;
        })

    })

    describe('addRemote()', function () {
        let git, mock;

        beforeEach(function () {
            git = gitPromise();
            mock = sinon.mock(git);
        })

        afterEach(function(){
            mock.verify();
        })

        it('should have a function with name', function () {
            expect(syncCallbacks).to.have.a.property('addRemote');
            expect(syncCallbacks.addRemote).to.be.an('function');
        })

        it('should not add remote when it does exist', function () {
            let remoteId = 'sync';
            let remoteUrl = 'url';
            mock.expects("addRemote").never().withArgs(remoteId, remoteUrl);

            let result = syncCallbacks.addRemote(true, git, remoteId, remoteUrl);

            expect(result).to.be.true;
        })

        it('should add remote when it does not exist', function () {
            let remoteId = 'sync';
            let remoteUrl = 'url';
            mock.expects("addRemote").once().withArgs(remoteId, remoteUrl);

            let result = syncCallbacks.addRemote(false, git, remoteId, remoteUrl);

            expect(result).to.be.undefined;
        })

    })

    describe('hasBranch()', function () {
        let BranchSummary;

        beforeEach(function () {
            BranchSummary = {
                all: [
                    'MOODLE_33_STABLE'
                ]
            };
        })

        it('should have a function with name', function () {
            expect(syncCallbacks).to.have.a.property('hasBranch');
            expect(syncCallbacks.hasBranch).to.be.an('function');
        })

        it('should return false if the branch does not exist', function () {
            let stableBranch = 'MOODLE_34_STABLE';
            let result = syncCallbacks.hasBranch(BranchSummary, stableBranch);
            expect(result).to.be.false;
        })

        it('should return true if remotes does contain remote id', function () {
            let stableBranch = 'MOODLE_33_STABLE';
            let result = syncCallbacks.hasBranch(BranchSummary, stableBranch);
            expect(result).to.be.true;
        })

    })

    describe('trackRemoteBranch()', function () {
        let git, mock;

        beforeEach(function () {
            git = gitPromise();
            mock = sinon.mock(git);
        })

        afterEach(function(){
            mock.verify();
        })

        it('should have a function with name', function () {
            expect(syncCallbacks).to.have.a.property('trackRemoteBranch');
            expect(syncCallbacks.trackRemoteBranch).to.be.an('function');
        })

        it('should not add branch when it does exist', function () {
            let remoteId = 'sync';
            let stableBranch = 'branch';
            mock.expects("branch").never().withArgs(["--track", stableBranch, remoteId + "/" + stableBranch]);

            let result = syncCallbacks.trackRemoteBranch(true, git, remoteId, stableBranch);

            expect(result).to.be.true;
        })

        it('should add branch when it does not exist', function () {
            let remoteId = 'sync';
            let stableBranch = 'branch';
            mock.expects("branch").once().withArgs(["--track", stableBranch, remoteId + "/" + stableBranch]);

            let result = syncCallbacks.trackRemoteBranch(false, git, remoteId, stableBranch);

            expect(result).to.be.undefined;
        })

    })

})