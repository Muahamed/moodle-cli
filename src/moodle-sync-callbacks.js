#!/usr/bin/env node

(function () {

    /**
     * 
     *
     * @param {boolean} debug Enable debug messages
     *
     * @constructor
     */
    function SyncCallbacks(debug) {
        this._debug = debug;
    }

    SyncCallbacks.prototype.hasRemoteForId = function (remotes, remoteId) {
        if (remotes.length == 1) {
            return false;
        } else {
            for (var i = 0; i < remotes.length; i++) {
                let remote = remotes[i];
                if (remoteId == remote.name) {
                    return true;
                }
            }
            return false;
        }
    };

    SyncCallbacks.prototype.addRemote = function (hasRemote, git, remoteId, remoteUrl) {
        if (this._debug) {
            console.log("hasRemote evaluated to: ", hasRemote);
        }
        return (!hasRemote) ? git.addRemote(remoteId, remoteUrl) : hasRemote;
    }

    SyncCallbacks.prototype.hasBranch = function (BranchSummary, stableBranch) {
        return BranchSummary.all.indexOf(stableBranch) > -1;
    }

    SyncCallbacks.prototype.trackRemoteBranch = function (hasBranch, git, remoteId, stableBranch) {
        if (this._debug) {
            console.log("hasBranch evaluated to: ", hasBranch);
        }
        return (!hasBranch) ?
        git.branch(["--track", stableBranch, remoteId + "/" + stableBranch]) :
            hasBranch;
    }

    module.exports = SyncCallbacks;

}());