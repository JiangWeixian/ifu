'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var cronstrue = require('cronstrue/i18n.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var cronstrue__default = /*#__PURE__*/_interopDefaultLegacy(cronstrue);

var DEFAULT_LOCALE = 'en';
var popcron = {
    parse: function (input) {
        return cronstrue__default["default"].toString(input, { locale: process.env.locale || DEFAULT_LOCALE });
    },
};

exports.popcron = popcron;
