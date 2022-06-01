'use strict';

var commander = require('commander');
var index = require('./index.cjs');
var util = require('util');
var chalk = require('chalk');
require('fs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var chalk__default = /*#__PURE__*/_interopDefaultLegacy(chalk);

const sep = chalk__default["default"].gray("\xB7");
const log = (...args) => {
  const msg = util.format.apply(util.format, args);
  console.log(chalk__default["default"].bgBlue.black(" info "), sep, msg);
};
const fatal = (...args) => {
  if (args[0] instanceof Error)
    args[0] = args[0].message.trim();
  const msg = util.format.apply(util.format, args);
  console.error(chalk__default["default"].bgRed.black(" failed "), sep, msg);
  process.exit(1);
};
const success = (...args) => {
  const msg = util.format.apply(util.format, args);
  console.log(chalk__default["default"].bgGreen.black(" success "), sep, msg);
};
var logger = {
  log,
  fatal,
  success
};

const cli = commander.program.version(require("../package.json").version).name("bin-template");
cli.option("-c, --check", "check is alfred installed").action(() => {
  if (!index.isInstallAlfred()) {
    logger.log("alfred is not installed");
    process.exit(0);
  }
  logger.log("alfred is installed");
  process.exit(1);
});
commander.program.parse(process.argv);
