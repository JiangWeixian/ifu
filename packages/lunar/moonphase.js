"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.moonphase = void 0;
var tslib_1 = require("tslib");
var suncalc_1 = tslib_1.__importDefault(require("suncalc"));
var phases = [
    { emoji: '🌑', code: ':new_moon_with_face:', name: 'New Moon', cname: '朔月', weight: 1 },
    {
        emoji: '🌒',
        code: ':waxing_crescent_moon:',
        name: 'Waxing Crescent',
        cname: '蛾眉月',
        weight: 6.3825,
    },
    { emoji: '🌓', code: ':first_quarter_moon:', name: 'First Quarter', cname: '上弦月', weight: 1 },
    {
        emoji: '🌔',
        code: ':waxing_gibbous_moon:',
        name: 'Waxing Gibbous',
        cname: '盈亏月',
        weight: 6.3825,
    },
    { emoji: '🌝', code: ':full_moon_with_face:', name: 'Full Moon', cname: '满月', weight: 1 },
    {
        emoji: '🌖',
        code: ':waning_gibbous_moon:',
        name: 'Waning Gibbous',
        cname: '亏凸月',
        weight: 6.3825,
    },
    { emoji: '🌗', code: ':last_quarter_moon:', name: 'Last Quarter', cname: '下弦月', weight: 1 },
    {
        emoji: '🌘',
        code: ':waning_crescent_moon:',
        name: 'Waning Crescent',
        cname: '残月',
        weight: 6.3825,
    },
];
var step = function (phase) {
    var weight = phases.reduce(function (a, b) {
        return a + b.weight;
    }, 0);
    phase *= weight;
    for (var rv = 0; rv < phases.length; rv++) {
        phase -= phases[rv].weight;
        if (phase <= 0) {
            break;
        }
    }
    return rv;
};
exports.moonphase = function (date) {
    var phase = suncalc_1.default.getMoonIllumination(date).phase;
    var moonmoji = phases[step(phase)];
    return moonmoji;
};
