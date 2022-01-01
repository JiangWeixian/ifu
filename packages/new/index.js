"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var alfy_1 = tslib_1.__importDefault(require("alfy"));
var constants_1 = require("./constants");
alfy_1.default.output(constants_1.shortcuts.map(function (item) {
    return {
        title: item.name,
        autocomplete: item.name,
        action: {
            url: item.url,
        },
    };
}));
