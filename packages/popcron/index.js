"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var i18n_1 = tslib_1.__importDefault(require("cronstrue/i18n"));
var alfy_1 = tslib_1.__importDefault(require("alfy"));
var DEFAULT_LOCALE = 'en';
var item = i18n_1.default.toString(alfy_1.default.input, { locale: process.env.locale || DEFAULT_LOCALE });
alfy_1.default.output([
    {
        title: item,
        icon: {
            path: ' ',
        },
    },
]);
