'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var fs = require('fs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var fs__default = /*#__PURE__*/_interopDefaultLegacy(fs);

const isInstallAlfred = () => {
  return fs__default["default"].existsSync("/Applications/Alfred 4.app/");
};

exports.isInstallAlfred = isInstallAlfred;
