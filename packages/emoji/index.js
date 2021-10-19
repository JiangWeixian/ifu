"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var alfy_1 = tslib_1.__importDefault(require("alfy"));
var fuzzy_emoji_1 = require("fuzzy-emoji");
var toItem = function (value, _a) {
    var _b = _a === void 0 ? {} : _a, title = _b.title, subtitle = _b.subtitle;
    return {
        title: title || value,
        subtitle: subtitle || '',
        arg: value,
        icon: {
            path: ' ', // Hide icon
        },
        text: {
            copy: value,
            largetype: value,
        },
    };
};
var result = fuzzy_emoji_1.fuzzysearch.search(alfy_1.default.input);
var output = result
    .slice(0, 10)
    .map(function (item) {
    return toItem(item.emoji, { title: item.emoji + " :" + item.names[0] + ":", subtitle: item.description });
});
alfy_1.default.output(output);
