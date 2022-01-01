"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
// refs: https://github.com/vuejs/vue-cli/blob/v2/lib/logger.js
var util_1 = require("util");
var chalk_1 = tslib_1.__importDefault(require("chalk"));
/**
 * Prefix.
 */
var sep = chalk_1.default.gray('·');
/**
 * Log a `message` to the console.
 *
 * @param {String} message
 */
var log = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var msg = util_1.format.apply(util_1.format, args);
    console.log(chalk_1.default.bgBlue.black(' info '), sep, msg);
};
/**
 * Log an error `message` to the console and exit.
 *
 * @param {String} message
 */
var fatal = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    if (args[0] instanceof Error)
        args[0] = args[0].message.trim();
    var msg = util_1.format.apply(util_1.format, args);
    console.error(chalk_1.default.bgRed.black(' failed '), sep, msg);
    process.exit(1);
};
/**
 * Log a success `message` to the console and exit.
 *
 * @param {String} message
 */
var success = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var msg = util_1.format.apply(util_1.format, args);
    console.log(chalk_1.default.bgGreen.black(' success '), sep, msg);
};
exports.default = {
    log: log,
    fatal: fatal,
    success: success,
};
