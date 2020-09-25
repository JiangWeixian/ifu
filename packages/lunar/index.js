"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var solarLunar = tslib_1.__importStar(require("solarlunar"));
var dayjs_1 = tslib_1.__importDefault(require("dayjs"));
var alfy_1 = tslib_1.__importDefault(require("alfy"));
var moonphase_1 = require("./moonphase");
var now = dayjs_1.default();
var lunar = solarLunar.solar2lunar(now.year(), now.month(), now.day());
var phase = moonphase_1.moonphase(now.toDate());
var years = {
    '鼠': '🐭',
    '牛': '🐮',
    '虎': '🐯',
    '兔': '🐇',
    '龙': '🐉',
    '蛇': '🐍',
    '马': '🦄',
    '羊': '🐏',
    '猴': '🐒',
    '鸡': '🐤',
    '狗': '🐶',
    '猪': '🐷',
};
alfy_1.default.output([
    {
        title: years[lunar.animal] + "\u00B7" + lunar.animal + "\u5E74",
        arg: lunar.animal,
        icon: {
            path: ' ',
        },
        text: {
            copy: lunar.animal,
            largetype: lunar.animal,
        },
    },
    {
        title: phase.emoji + "\u00B7" + phase.cname,
        arg: phase.emoji + " " + phase.cname,
        icon: {
            path: ' ',
        },
        text: {
            copy: phase.emoji + " " + phase.cname,
            largetype: phase.emoji + " " + phase.cname,
        },
    },
    {
        title: [lunar.monthCn, lunar.dayCn].join(''),
        arg: [lunar.monthCn, lunar.dayCn].join(''),
        icon: {
            path: ' ',
        },
        text: {
            copy: [lunar.monthCn, lunar.dayCn].join(''),
            largetype: [lunar.monthCn, lunar.dayCn].join(''),
        },
    },
    lunar.isTerm
        ? {
            title: lunar.term,
            arg: lunar.term,
            icon: {
                path: ' ',
            },
            text: {
                copy: lunar.term,
                largetype: lunar.term,
            },
        }
        : undefined,
    {
        title: [lunar.monthCn, lunar.dayCn].join(''),
        arg: [lunar.monthCn, lunar.dayCn].join(''),
        icon: {
            path: ' ',
        },
        text: {
            copy: [lunar.monthCn, lunar.dayCn].join(''),
            largetype: [lunar.monthCn, lunar.dayCn].join(''),
        },
    },
    {
        title: [lunar.gzYear + "\u5E74", lunar.gzMonth + "\u6708", lunar.gzDay + "\u65E5"].join('·'),
        arg: [lunar.gzYear + "\u5E74", lunar.gzMonth + "\u6708", lunar.gzDay + "\u65E5"].join('·'),
        icon: {
            path: ' ',
        },
        text: {
            copy: [lunar.gzYear + "\u5E74", lunar.gzMonth + "\u6708", lunar.gzDay + "\u65E5"].join('·'),
            largetype: [lunar.gzYear + "\u5E74", lunar.gzMonth + "\u6708", lunar.gzDay + "\u65E5"].join('·'),
        },
    },
].filter(function (v) { return !!v; }));
