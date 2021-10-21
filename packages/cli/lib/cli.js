#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var commander_1 = require("commander");
var index_1 = require("./index");
var logger_1 = tslib_1.__importDefault(require("./utils/logger"));
var cli = commander_1.program.version(require('../package.json').version).name('bin-template');
cli.option('-c, --check', 'check is alfred installed').action(function () {
    if (!index_1.isInstallAlfred()) {
        logger_1.default.log('alfred is not installed');
        process.exit(0);
    }
    logger_1.default.log('alfred is installed');
    process.exit(1);
});
commander_1.program.parse(process.argv);
