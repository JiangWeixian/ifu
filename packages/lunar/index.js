"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var solarLunar = tslib_1.__importStar(require("solarlunar"));
var dayjs_1 = tslib_1.__importDefault(require("dayjs"));
var alfy_1 = tslib_1.__importDefault(require("alfy"));
var now = dayjs_1.default();
var lunar = solarLunar.solar2lunar(now.year(), now.month(), now.day());
console.log(lunar);
alfy_1.default.output([
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
    lunar.isTerm ? {
        title: lunar.term,
        arg: lunar.term,
        icon: {
            path: ' ',
        },
        text: {
            copy: lunar.term,
            largetype: lunar.term,
        },
    } : undefined,
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
