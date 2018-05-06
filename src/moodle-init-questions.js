#!/usr/bin/env node

const path = require('path');

module.exports = [{
    type: 'input',
    name: 'core_location',
    message: "The location of the moodle-core directory",
    default: function () {
        return path.join(__dirname, '..', '..', 'moodle-core', path.sep);
    },
    validate: function (value) {
        var pass = value.match(
            /^.*\/$/i
        );
        if (pass) {
            return true;
        }

        return 'Please enter a valid path with trailing slash';
    }
}, {
    type: 'input',
    name: 'internal_location',
    message: "The location of the moodle-internal directory",
    default: function () {
        return path.join(__dirname, '..', '..', 'moodle-internal', path.sep);
    },
    validate: function (value) {
        var pass = value.match(
            /^.*\/$/i
        );
        if (pass) {
            return true;
        }

        return 'Please enter a valid path with trailing slash';
    }
}, {
    type: 'input',
    name: 'destination',
    message: "The location of the moodle directory",
    default: function () {
        return path.join(__dirname, '..', 'moodle', path.sep);
    }
}, {
    type: 'input',
    name: 'docker_file',
    message: "The location of the docker compose fle",
    default: function () {
        return path.join(__dirname, '..', 'docker-compose.yml');
    }
}, {
    type: 'input',
    name: 'moodle_config',
    message: "The location of the moodle config fle",
    default: function () {
        return path.join(__dirname, '..', 'config.docker-template.php');
    }
}, {
    type: 'input',
    name: 'stable_branch',
    message: "The remote Moodle stable branch",
    default: function () {
        return "MOODLE_34_STABLE";
    }
}]