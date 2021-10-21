"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isInstallAlfred = void 0;
var tslib_1 = require("tslib");
var fs_1 = tslib_1.__importDefault(require("fs"));
var isInstallAlfred = function () {
    return fs_1.default.existsSync('/Applications/Alfred 4.app/');
};
exports.isInstallAlfred = isInstallAlfred;
