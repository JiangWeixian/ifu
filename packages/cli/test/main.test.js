"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var execa_1 = tslib_1.__importDefault(require("execa"));
var path_1 = tslib_1.__importDefault(require("path"));
var package_json_1 = tslib_1.__importDefault(require("../package.json"));
var cli = path_1.default.resolve(__dirname, '../lib/cli.js');
describe('version', function () {
    it('print version should work', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var stdout;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, execa_1.default.node(cli, ['-V'])];
                case 1:
                    stdout = (_a.sent()).stdout;
                    expect(stdout).toBe(package_json_1.default.version);
                    return [2 /*return*/];
            }
        });
    }); });
    it('check install should work', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var exitCode;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, execa_1.default
                        .node(cli, ['-c'], { stderr: 'inherit' })
                        .catch(function () { return ({ exitCode: 1 }); })];
                case 1:
                    exitCode = (_a.sent()).exitCode;
                    if (process.platform === 'darwin') {
                        expect(exitCode).toBe(1);
                    }
                    else {
                        expect(exitCode).toBe(0);
                    }
                    return [2 /*return*/];
            }
        });
    }); });
});
