import alfy from 'alfy';

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

var cronstrueI18n = {exports: {}};

(function (module, exports) {
(function webpackUniversalModuleDefinition(root, factory) {
	module.exports = factory();
})(typeof self !== 'undefined' ? self : commonjsGlobal, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressionDescriptor = void 0;
var stringUtilities_1 = __webpack_require__(1);
var cronParser_1 = __webpack_require__(2);
var ExpressionDescriptor = (function () {
    function ExpressionDescriptor(expression, options) {
        this.expression = expression;
        this.options = options;
        this.expressionParts = new Array(5);
        if (ExpressionDescriptor.locales[options.locale]) {
            this.i18n = ExpressionDescriptor.locales[options.locale];
        }
        else {
            console.warn("Locale '" + options.locale + "' could not be found; falling back to 'en'.");
            this.i18n = ExpressionDescriptor.locales["en"];
        }
        if (options.use24HourTimeFormat === undefined) {
            options.use24HourTimeFormat = this.i18n.use24HourTimeFormatByDefault();
        }
    }
    ExpressionDescriptor.toString = function (expression, _a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.throwExceptionOnParseError, throwExceptionOnParseError = _c === void 0 ? true : _c, _d = _b.verbose, verbose = _d === void 0 ? false : _d, _e = _b.dayOfWeekStartIndexZero, dayOfWeekStartIndexZero = _e === void 0 ? true : _e, use24HourTimeFormat = _b.use24HourTimeFormat, _f = _b.locale, locale = _f === void 0 ? "en" : _f;
        var options = {
            throwExceptionOnParseError: throwExceptionOnParseError,
            verbose: verbose,
            dayOfWeekStartIndexZero: dayOfWeekStartIndexZero,
            use24HourTimeFormat: use24HourTimeFormat,
            locale: locale,
        };
        var descripter = new ExpressionDescriptor(expression, options);
        return descripter.getFullDescription();
    };
    ExpressionDescriptor.initialize = function (localesLoader) {
        ExpressionDescriptor.specialCharacters = ["/", "-", ",", "*"];
        localesLoader.load(ExpressionDescriptor.locales);
    };
    ExpressionDescriptor.prototype.getFullDescription = function () {
        var description = "";
        try {
            var parser = new cronParser_1.CronParser(this.expression, this.options.dayOfWeekStartIndexZero);
            this.expressionParts = parser.parse();
            var timeSegment = this.getTimeOfDayDescription();
            var dayOfMonthDesc = this.getDayOfMonthDescription();
            var monthDesc = this.getMonthDescription();
            var dayOfWeekDesc = this.getDayOfWeekDescription();
            var yearDesc = this.getYearDescription();
            description += timeSegment + dayOfMonthDesc + dayOfWeekDesc + monthDesc + yearDesc;
            description = this.transformVerbosity(description, this.options.verbose);
            description = description.charAt(0).toLocaleUpperCase() + description.substr(1);
        }
        catch (ex) {
            if (!this.options.throwExceptionOnParseError) {
                description = this.i18n.anErrorOccuredWhenGeneratingTheExpressionD();
            }
            else {
                throw "" + ex;
            }
        }
        return description;
    };
    ExpressionDescriptor.prototype.getTimeOfDayDescription = function () {
        var secondsExpression = this.expressionParts[0];
        var minuteExpression = this.expressionParts[1];
        var hourExpression = this.expressionParts[2];
        var description = "";
        if (!stringUtilities_1.StringUtilities.containsAny(minuteExpression, ExpressionDescriptor.specialCharacters) &&
            !stringUtilities_1.StringUtilities.containsAny(hourExpression, ExpressionDescriptor.specialCharacters) &&
            !stringUtilities_1.StringUtilities.containsAny(secondsExpression, ExpressionDescriptor.specialCharacters)) {
            description += this.i18n.atSpace() + this.formatTime(hourExpression, minuteExpression, secondsExpression);
        }
        else if (!secondsExpression &&
            minuteExpression.indexOf("-") > -1 &&
            !(minuteExpression.indexOf(",") > -1) &&
            !(minuteExpression.indexOf("/") > -1) &&
            !stringUtilities_1.StringUtilities.containsAny(hourExpression, ExpressionDescriptor.specialCharacters)) {
            var minuteParts = minuteExpression.split("-");
            description += stringUtilities_1.StringUtilities.format(this.i18n.everyMinuteBetweenX0AndX1(), this.formatTime(hourExpression, minuteParts[0], ""), this.formatTime(hourExpression, minuteParts[1], ""));
        }
        else if (!secondsExpression &&
            hourExpression.indexOf(",") > -1 &&
            hourExpression.indexOf("-") == -1 &&
            hourExpression.indexOf("/") == -1 &&
            !stringUtilities_1.StringUtilities.containsAny(minuteExpression, ExpressionDescriptor.specialCharacters)) {
            var hourParts = hourExpression.split(",");
            description += this.i18n.at();
            for (var i = 0; i < hourParts.length; i++) {
                description += " ";
                description += this.formatTime(hourParts[i], minuteExpression, "");
                if (i < hourParts.length - 2) {
                    description += ",";
                }
                if (i == hourParts.length - 2) {
                    description += this.i18n.spaceAnd();
                }
            }
        }
        else {
            var secondsDescription = this.getSecondsDescription();
            var minutesDescription = this.getMinutesDescription();
            var hoursDescription = this.getHoursDescription();
            description += secondsDescription;
            if (description.length > 0 && minutesDescription.length > 0) {
                description += ", ";
            }
            description += minutesDescription;
            if (description.length > 0 && hoursDescription.length > 0) {
                description += ", ";
            }
            description += hoursDescription;
        }
        return description;
    };
    ExpressionDescriptor.prototype.getSecondsDescription = function () {
        var _this = this;
        var description = this.getSegmentDescription(this.expressionParts[0], this.i18n.everySecond(), function (s) {
            return s;
        }, function (s) {
            return stringUtilities_1.StringUtilities.format(_this.i18n.everyX0Seconds(), s);
        }, function (s) {
            return _this.i18n.secondsX0ThroughX1PastTheMinute();
        }, function (s) {
            return s == "0"
                ? ""
                : parseInt(s) < 20
                    ? _this.i18n.atX0SecondsPastTheMinute()
                    : _this.i18n.atX0SecondsPastTheMinuteGt20() || _this.i18n.atX0SecondsPastTheMinute();
        });
        return description;
    };
    ExpressionDescriptor.prototype.getMinutesDescription = function () {
        var _this = this;
        var secondsExpression = this.expressionParts[0];
        var hourExpression = this.expressionParts[2];
        var description = this.getSegmentDescription(this.expressionParts[1], this.i18n.everyMinute(), function (s) {
            return s;
        }, function (s) {
            return stringUtilities_1.StringUtilities.format(_this.i18n.everyX0Minutes(), s);
        }, function (s) {
            return _this.i18n.minutesX0ThroughX1PastTheHour();
        }, function (s) {
            try {
                return s == "0" && hourExpression.indexOf("/") == -1 && secondsExpression == ""
                    ? _this.i18n.everyHour()
                    : parseInt(s) < 20
                        ? _this.i18n.atX0MinutesPastTheHour()
                        : _this.i18n.atX0MinutesPastTheHourGt20() || _this.i18n.atX0MinutesPastTheHour();
            }
            catch (e) {
                return _this.i18n.atX0MinutesPastTheHour();
            }
        });
        return description;
    };
    ExpressionDescriptor.prototype.getHoursDescription = function () {
        var _this = this;
        var expression = this.expressionParts[2];
        var description = this.getSegmentDescription(expression, this.i18n.everyHour(), function (s) {
            return _this.formatTime(s, "0", "");
        }, function (s) {
            return stringUtilities_1.StringUtilities.format(_this.i18n.everyX0Hours(), s);
        }, function (s) {
            return _this.i18n.betweenX0AndX1();
        }, function (s) {
            return _this.i18n.atX0();
        });
        return description;
    };
    ExpressionDescriptor.prototype.getDayOfWeekDescription = function () {
        var _this = this;
        var daysOfWeekNames = this.i18n.daysOfTheWeek();
        var description = null;
        if (this.expressionParts[5] == "*") {
            description = "";
        }
        else {
            description = this.getSegmentDescription(this.expressionParts[5], this.i18n.commaEveryDay(), function (s) {
                var exp = s;
                if (s.indexOf("#") > -1) {
                    exp = s.substr(0, s.indexOf("#"));
                }
                else if (s.indexOf("L") > -1) {
                    exp = exp.replace("L", "");
                }
                return daysOfWeekNames[parseInt(exp)];
            }, function (s) {
                if (parseInt(s) == 1) {
                    return "";
                }
                else {
                    return stringUtilities_1.StringUtilities.format(_this.i18n.commaEveryX0DaysOfTheWeek(), s);
                }
            }, function (s) {
                return _this.i18n.commaX0ThroughX1();
            }, function (s) {
                var format = null;
                if (s.indexOf("#") > -1) {
                    var dayOfWeekOfMonthNumber = s.substring(s.indexOf("#") + 1);
                    var dayOfWeekOfMonthDescription = null;
                    switch (dayOfWeekOfMonthNumber) {
                        case "1":
                            dayOfWeekOfMonthDescription = _this.i18n.first();
                            break;
                        case "2":
                            dayOfWeekOfMonthDescription = _this.i18n.second();
                            break;
                        case "3":
                            dayOfWeekOfMonthDescription = _this.i18n.third();
                            break;
                        case "4":
                            dayOfWeekOfMonthDescription = _this.i18n.fourth();
                            break;
                        case "5":
                            dayOfWeekOfMonthDescription = _this.i18n.fifth();
                            break;
                    }
                    format = _this.i18n.commaOnThe() + dayOfWeekOfMonthDescription + _this.i18n.spaceX0OfTheMonth();
                }
                else if (s.indexOf("L") > -1) {
                    format = _this.i18n.commaOnTheLastX0OfTheMonth();
                }
                else {
                    var domSpecified = _this.expressionParts[3] != "*";
                    format = domSpecified ? _this.i18n.commaAndOnX0() : _this.i18n.commaOnlyOnX0();
                }
                return format;
            });
        }
        return description;
    };
    ExpressionDescriptor.prototype.getMonthDescription = function () {
        var _this = this;
        var monthNames = this.i18n.monthsOfTheYear();
        var description = this.getSegmentDescription(this.expressionParts[4], "", function (s) {
            return monthNames[parseInt(s) - 1];
        }, function (s) {
            if (parseInt(s) == 1) {
                return "";
            }
            else {
                return stringUtilities_1.StringUtilities.format(_this.i18n.commaEveryX0Months(), s);
            }
        }, function (s) {
            return _this.i18n.commaMonthX0ThroughMonthX1() || _this.i18n.commaX0ThroughX1();
        }, function (s) {
            return _this.i18n.commaOnlyInMonthX0 ? _this.i18n.commaOnlyInMonthX0() : _this.i18n.commaOnlyInX0();
        });
        return description;
    };
    ExpressionDescriptor.prototype.getDayOfMonthDescription = function () {
        var _this = this;
        var description = null;
        var expression = this.expressionParts[3];
        switch (expression) {
            case "L":
                description = this.i18n.commaOnTheLastDayOfTheMonth();
                break;
            case "WL":
            case "LW":
                description = this.i18n.commaOnTheLastWeekdayOfTheMonth();
                break;
            default:
                var weekDayNumberMatches = expression.match(/(\d{1,2}W)|(W\d{1,2})/);
                if (weekDayNumberMatches) {
                    var dayNumber = parseInt(weekDayNumberMatches[0].replace("W", ""));
                    var dayString = dayNumber == 1
                        ? this.i18n.firstWeekday()
                        : stringUtilities_1.StringUtilities.format(this.i18n.weekdayNearestDayX0(), dayNumber.toString());
                    description = stringUtilities_1.StringUtilities.format(this.i18n.commaOnTheX0OfTheMonth(), dayString);
                    break;
                }
                else {
                    var lastDayOffSetMatches = expression.match(/L-(\d{1,2})/);
                    if (lastDayOffSetMatches) {
                        var offSetDays = lastDayOffSetMatches[1];
                        description = stringUtilities_1.StringUtilities.format(this.i18n.commaDaysBeforeTheLastDayOfTheMonth(), offSetDays);
                        break;
                    }
                    else if (expression == "*" && this.expressionParts[5] != "*") {
                        return "";
                    }
                    else {
                        description = this.getSegmentDescription(expression, this.i18n.commaEveryDay(), function (s) {
                            return s == "L"
                                ? _this.i18n.lastDay()
                                : _this.i18n.dayX0
                                    ? stringUtilities_1.StringUtilities.format(_this.i18n.dayX0(), s)
                                    : s;
                        }, function (s) {
                            return s == "1" ? _this.i18n.commaEveryDay() : _this.i18n.commaEveryX0Days();
                        }, function (s) {
                            return _this.i18n.commaBetweenDayX0AndX1OfTheMonth();
                        }, function (s) {
                            return _this.i18n.commaOnDayX0OfTheMonth();
                        });
                    }
                    break;
                }
        }
        return description;
    };
    ExpressionDescriptor.prototype.getYearDescription = function () {
        var _this = this;
        var description = this.getSegmentDescription(this.expressionParts[6], "", function (s) {
            return /^\d+$/.test(s) ? new Date(parseInt(s), 1).getFullYear().toString() : s;
        }, function (s) {
            return stringUtilities_1.StringUtilities.format(_this.i18n.commaEveryX0Years(), s);
        }, function (s) {
            return _this.i18n.commaYearX0ThroughYearX1() || _this.i18n.commaX0ThroughX1();
        }, function (s) {
            return _this.i18n.commaOnlyInYearX0 ? _this.i18n.commaOnlyInYearX0() : _this.i18n.commaOnlyInX0();
        });
        return description;
    };
    ExpressionDescriptor.prototype.getSegmentDescription = function (expression, allDescription, getSingleItemDescription, getIncrementDescriptionFormat, getRangeDescriptionFormat, getDescriptionFormat) {
        var description = null;
        var doesExpressionContainIncrement = expression.indexOf("/") > -1;
        var doesExpressionContainRange = expression.indexOf("-") > -1;
        var doesExpressionContainMultipleValues = expression.indexOf(",") > -1;
        if (!expression) {
            description = "";
        }
        else if (expression === "*") {
            description = allDescription;
        }
        else if (!doesExpressionContainIncrement && !doesExpressionContainRange && !doesExpressionContainMultipleValues) {
            description = stringUtilities_1.StringUtilities.format(getDescriptionFormat(expression), getSingleItemDescription(expression));
        }
        else if (doesExpressionContainMultipleValues) {
            var segments = expression.split(",");
            var descriptionContent = "";
            for (var i = 0; i < segments.length; i++) {
                if (i > 0 && segments.length > 2) {
                    descriptionContent += ",";
                    if (i < segments.length - 1) {
                        descriptionContent += " ";
                    }
                }
                if (i > 0 && segments.length > 1 && (i == segments.length - 1 || segments.length == 2)) {
                    descriptionContent += this.i18n.spaceAnd() + " ";
                }
                if (segments[i].indexOf("/") > -1 || segments[i].indexOf("-") > -1) {
                    var isSegmentRangeWithoutIncrement = segments[i].indexOf("-") > -1 && segments[i].indexOf("/") == -1;
                    var currentDescriptionContent = this.getSegmentDescription(segments[i], allDescription, getSingleItemDescription, getIncrementDescriptionFormat, isSegmentRangeWithoutIncrement ? this.i18n.commaX0ThroughX1 : getRangeDescriptionFormat, getDescriptionFormat);
                    if (isSegmentRangeWithoutIncrement) {
                        currentDescriptionContent = currentDescriptionContent.replace(", ", "");
                    }
                    descriptionContent += currentDescriptionContent;
                }
                else if (!doesExpressionContainIncrement) {
                    descriptionContent += getSingleItemDescription(segments[i]);
                }
                else {
                    descriptionContent += this.getSegmentDescription(segments[i], allDescription, getSingleItemDescription, getIncrementDescriptionFormat, getRangeDescriptionFormat, getDescriptionFormat);
                }
            }
            if (!doesExpressionContainIncrement) {
                description = stringUtilities_1.StringUtilities.format(getDescriptionFormat(expression), descriptionContent);
            }
            else {
                description = descriptionContent;
            }
        }
        else if (doesExpressionContainIncrement) {
            var segments = expression.split("/");
            description = stringUtilities_1.StringUtilities.format(getIncrementDescriptionFormat(segments[1]), segments[1]);
            if (segments[0].indexOf("-") > -1) {
                var rangeSegmentDescription = this.generateRangeSegmentDescription(segments[0], getRangeDescriptionFormat, getSingleItemDescription);
                if (rangeSegmentDescription.indexOf(", ") != 0) {
                    description += ", ";
                }
                description += rangeSegmentDescription;
            }
            else if (segments[0].indexOf("*") == -1) {
                var rangeItemDescription = stringUtilities_1.StringUtilities.format(getDescriptionFormat(segments[0]), getSingleItemDescription(segments[0]));
                rangeItemDescription = rangeItemDescription.replace(", ", "");
                description += stringUtilities_1.StringUtilities.format(this.i18n.commaStartingX0(), rangeItemDescription);
            }
        }
        else if (doesExpressionContainRange) {
            description = this.generateRangeSegmentDescription(expression, getRangeDescriptionFormat, getSingleItemDescription);
        }
        return description;
    };
    ExpressionDescriptor.prototype.generateRangeSegmentDescription = function (rangeExpression, getRangeDescriptionFormat, getSingleItemDescription) {
        var description = "";
        var rangeSegments = rangeExpression.split("-");
        var rangeSegment1Description = getSingleItemDescription(rangeSegments[0]);
        var rangeSegment2Description = getSingleItemDescription(rangeSegments[1]);
        rangeSegment2Description = rangeSegment2Description.replace(":00", ":59");
        var rangeDescriptionFormat = getRangeDescriptionFormat(rangeExpression);
        description += stringUtilities_1.StringUtilities.format(rangeDescriptionFormat, rangeSegment1Description, rangeSegment2Description);
        return description;
    };
    ExpressionDescriptor.prototype.formatTime = function (hourExpression, minuteExpression, secondExpression) {
        var hour = parseInt(hourExpression);
        var period = "";
        var setPeriodBeforeTime = false;
        if (!this.options.use24HourTimeFormat) {
            setPeriodBeforeTime = this.i18n.setPeriodBeforeTime && this.i18n.setPeriodBeforeTime();
            period = setPeriodBeforeTime ? this.getPeriod(hour) + " " : " " + this.getPeriod(hour);
            if (hour > 12) {
                hour -= 12;
            }
            if (hour === 0) {
                hour = 12;
            }
        }
        var minute = minuteExpression;
        var second = "";
        if (secondExpression) {
            second = ":" + ("00" + secondExpression).substring(secondExpression.length);
        }
        return "" + (setPeriodBeforeTime ? period : "") + ("00" + hour.toString()).substring(hour.toString().length) + ":" + ("00" + minute.toString()).substring(minute.toString().length) + second + (!setPeriodBeforeTime ? period : "");
    };
    ExpressionDescriptor.prototype.transformVerbosity = function (description, useVerboseFormat) {
        if (!useVerboseFormat) {
            description = description.replace(new RegExp(", " + this.i18n.everyMinute(), "g"), "");
            description = description.replace(new RegExp(", " + this.i18n.everyHour(), "g"), "");
            description = description.replace(new RegExp(this.i18n.commaEveryDay(), "g"), "");
            description = description.replace(/\, ?$/, "");
        }
        return description;
    };
    ExpressionDescriptor.prototype.getPeriod = function (hour) {
        return hour >= 12 ? (this.i18n.pm && this.i18n.pm()) || "PM" : (this.i18n.am && this.i18n.am()) || "AM";
    };
    ExpressionDescriptor.locales = {};
    return ExpressionDescriptor;
}());
exports.ExpressionDescriptor = ExpressionDescriptor;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.StringUtilities = void 0;
var StringUtilities = (function () {
    function StringUtilities() {
    }
    StringUtilities.format = function (template) {
        var values = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            values[_i - 1] = arguments[_i];
        }
        return template.replace(/%s/g, function () {
            return values.shift();
        });
    };
    StringUtilities.containsAny = function (text, searchStrings) {
        return searchStrings.some(function (c) {
            return text.indexOf(c) > -1;
        });
    };
    return StringUtilities;
}());
exports.StringUtilities = StringUtilities;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.CronParser = void 0;
var CronParser = (function () {
    function CronParser(expression, dayOfWeekStartIndexZero) {
        if (dayOfWeekStartIndexZero === void 0) { dayOfWeekStartIndexZero = true; }
        this.expression = expression;
        this.dayOfWeekStartIndexZero = dayOfWeekStartIndexZero;
    }
    CronParser.prototype.parse = function () {
        var parsed = this.extractParts(this.expression);
        this.normalize(parsed);
        this.validate(parsed);
        return parsed;
    };
    CronParser.prototype.extractParts = function (expression) {
        if (!this.expression) {
            throw new Error("Expression is empty");
        }
        var parsed = expression.trim().split(/[ ]+/);
        if (parsed.length < 5) {
            throw new Error("Expression has only " + parsed.length + " part" + (parsed.length == 1 ? "" : "s") + ". At least 5 parts are required.");
        }
        else if (parsed.length == 5) {
            parsed.unshift("");
            parsed.push("");
        }
        else if (parsed.length == 6) {
            if (/\d{4}$/.test(parsed[5])) {
                parsed.unshift("");
            }
            else {
                parsed.push("");
            }
        }
        else if (parsed.length > 7) {
            throw new Error("Expression has " + parsed.length + " parts; too many!");
        }
        return parsed;
    };
    CronParser.prototype.normalize = function (expressionParts) {
        var _this = this;
        expressionParts[3] = expressionParts[3].replace("?", "*");
        expressionParts[5] = expressionParts[5].replace("?", "*");
        expressionParts[2] = expressionParts[2].replace("?", "*");
        if (expressionParts[0].indexOf("0/") == 0) {
            expressionParts[0] = expressionParts[0].replace("0/", "*/");
        }
        if (expressionParts[1].indexOf("0/") == 0) {
            expressionParts[1] = expressionParts[1].replace("0/", "*/");
        }
        if (expressionParts[2].indexOf("0/") == 0) {
            expressionParts[2] = expressionParts[2].replace("0/", "*/");
        }
        if (expressionParts[3].indexOf("1/") == 0) {
            expressionParts[3] = expressionParts[3].replace("1/", "*/");
        }
        if (expressionParts[4].indexOf("1/") == 0) {
            expressionParts[4] = expressionParts[4].replace("1/", "*/");
        }
        if (expressionParts[6].indexOf("1/") == 0) {
            expressionParts[6] = expressionParts[6].replace("1/", "*/");
        }
        expressionParts[5] = expressionParts[5].replace(/(^\d)|([^#/\s]\d)/g, function (t) {
            var dowDigits = t.replace(/\D/, "");
            var dowDigitsAdjusted = dowDigits;
            if (_this.dayOfWeekStartIndexZero) {
                if (dowDigits == "7") {
                    dowDigitsAdjusted = "0";
                }
            }
            else {
                dowDigitsAdjusted = (parseInt(dowDigits) - 1).toString();
            }
            return t.replace(dowDigits, dowDigitsAdjusted);
        });
        if (expressionParts[5] == "L") {
            expressionParts[5] = "6";
        }
        if (expressionParts[3] == "?") {
            expressionParts[3] = "*";
        }
        if (expressionParts[3].indexOf("W") > -1 &&
            (expressionParts[3].indexOf(",") > -1 || expressionParts[3].indexOf("-") > -1)) {
            throw new Error("The 'W' character can be specified only when the day-of-month is a single day, not a range or list of days.");
        }
        var days = {
            SUN: 0,
            MON: 1,
            TUE: 2,
            WED: 3,
            THU: 4,
            FRI: 5,
            SAT: 6,
        };
        for (var day in days) {
            expressionParts[5] = expressionParts[5].replace(new RegExp(day, "gi"), days[day].toString());
        }
        var months = {
            JAN: 1,
            FEB: 2,
            MAR: 3,
            APR: 4,
            MAY: 5,
            JUN: 6,
            JUL: 7,
            AUG: 8,
            SEP: 9,
            OCT: 10,
            NOV: 11,
            DEC: 12,
        };
        for (var month in months) {
            expressionParts[4] = expressionParts[4].replace(new RegExp(month, "gi"), months[month].toString());
        }
        if (expressionParts[0] == "0") {
            expressionParts[0] = "";
        }
        if (!/\*|\-|\,|\//.test(expressionParts[2]) &&
            (/\*|\//.test(expressionParts[1]) || /\*|\//.test(expressionParts[0]))) {
            expressionParts[2] += "-" + expressionParts[2];
        }
        for (var i = 0; i < expressionParts.length; i++) {
            if (expressionParts[i] == "*/1") {
                expressionParts[i] = "*";
            }
            if (expressionParts[i].indexOf("/") > -1 && !/^\*|\-|\,/.test(expressionParts[i])) {
                var stepRangeThrough = null;
                switch (i) {
                    case 4:
                        stepRangeThrough = "12";
                        break;
                    case 5:
                        stepRangeThrough = "6";
                        break;
                    case 6:
                        stepRangeThrough = "9999";
                        break;
                    default:
                        stepRangeThrough = null;
                        break;
                }
                if (stepRangeThrough != null) {
                    var parts = expressionParts[i].split("/");
                    expressionParts[i] = parts[0] + "-" + stepRangeThrough + "/" + parts[1];
                }
            }
        }
    };
    CronParser.prototype.validate = function (parsed) {
        this.assertNoInvalidCharacters("DOW", parsed[5]);
        this.assertNoInvalidCharacters("DOM", parsed[3]);
    };
    CronParser.prototype.assertNoInvalidCharacters = function (partDescription, expression) {
        var invalidChars = expression.match(/[A-KM-VX-Z]+/gi);
        if (invalidChars && invalidChars.length) {
            throw new Error(partDescription + " part contains invalid values: '" + invalidChars.toString() + "'");
        }
    };
    return CronParser;
}());
exports.CronParser = CronParser;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.en = void 0;
var en = (function () {
    function en() {
    }
    en.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return null;
    };
    en.prototype.atX0MinutesPastTheHourGt20 = function () {
        return null;
    };
    en.prototype.commaMonthX0ThroughMonthX1 = function () {
        return null;
    };
    en.prototype.commaYearX0ThroughYearX1 = function () {
        return null;
    };
    en.prototype.use24HourTimeFormatByDefault = function () {
        return false;
    };
    en.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "An error occured when generating the expression description.  Check the cron expression syntax.";
    };
    en.prototype.everyMinute = function () {
        return "every minute";
    };
    en.prototype.everyHour = function () {
        return "every hour";
    };
    en.prototype.atSpace = function () {
        return "At ";
    };
    en.prototype.everyMinuteBetweenX0AndX1 = function () {
        return "Every minute between %s and %s";
    };
    en.prototype.at = function () {
        return "At";
    };
    en.prototype.spaceAnd = function () {
        return " and";
    };
    en.prototype.everySecond = function () {
        return "every second";
    };
    en.prototype.everyX0Seconds = function () {
        return "every %s seconds";
    };
    en.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "seconds %s through %s past the minute";
    };
    en.prototype.atX0SecondsPastTheMinute = function () {
        return "at %s seconds past the minute";
    };
    en.prototype.everyX0Minutes = function () {
        return "every %s minutes";
    };
    en.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "minutes %s through %s past the hour";
    };
    en.prototype.atX0MinutesPastTheHour = function () {
        return "at %s minutes past the hour";
    };
    en.prototype.everyX0Hours = function () {
        return "every %s hours";
    };
    en.prototype.betweenX0AndX1 = function () {
        return "between %s and %s";
    };
    en.prototype.atX0 = function () {
        return "at %s";
    };
    en.prototype.commaEveryDay = function () {
        return ", every day";
    };
    en.prototype.commaEveryX0DaysOfTheWeek = function () {
        return ", every %s days of the week";
    };
    en.prototype.commaX0ThroughX1 = function () {
        return ", %s through %s";
    };
    en.prototype.first = function () {
        return "first";
    };
    en.prototype.second = function () {
        return "second";
    };
    en.prototype.third = function () {
        return "third";
    };
    en.prototype.fourth = function () {
        return "fourth";
    };
    en.prototype.fifth = function () {
        return "fifth";
    };
    en.prototype.commaOnThe = function () {
        return ", on the ";
    };
    en.prototype.spaceX0OfTheMonth = function () {
        return " %s of the month";
    };
    en.prototype.lastDay = function () {
        return "the last day";
    };
    en.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", on the last %s of the month";
    };
    en.prototype.commaOnlyOnX0 = function () {
        return ", only on %s";
    };
    en.prototype.commaAndOnX0 = function () {
        return ", and on %s";
    };
    en.prototype.commaEveryX0Months = function () {
        return ", every %s months";
    };
    en.prototype.commaOnlyInX0 = function () {
        return ", only in %s";
    };
    en.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", on the last day of the month";
    };
    en.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", on the last weekday of the month";
    };
    en.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
        return ", %s days before the last day of the month";
    };
    en.prototype.firstWeekday = function () {
        return "first weekday";
    };
    en.prototype.weekdayNearestDayX0 = function () {
        return "weekday nearest day %s";
    };
    en.prototype.commaOnTheX0OfTheMonth = function () {
        return ", on the %s of the month";
    };
    en.prototype.commaEveryX0Days = function () {
        return ", every %s days";
    };
    en.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", between day %s and %s of the month";
    };
    en.prototype.commaOnDayX0OfTheMonth = function () {
        return ", on day %s of the month";
    };
    en.prototype.commaEveryHour = function () {
        return ", every hour";
    };
    en.prototype.commaEveryX0Years = function () {
        return ", every %s years";
    };
    en.prototype.commaStartingX0 = function () {
        return ", starting %s";
    };
    en.prototype.daysOfTheWeek = function () {
        return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    };
    en.prototype.monthsOfTheYear = function () {
        return [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];
    };
    return en;
}());
exports.en = en;


/***/ }),
/* 4 */,
/* 5 */,
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.toString = void 0;
var expressionDescriptor_1 = __webpack_require__(0);
var allLocalesLoader_1 = __webpack_require__(7);
expressionDescriptor_1.ExpressionDescriptor.initialize(new allLocalesLoader_1.allLocalesLoader());
exports.default = expressionDescriptor_1.ExpressionDescriptor;
var toString = expressionDescriptor_1.ExpressionDescriptor.toString;
exports.toString = toString;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.allLocalesLoader = void 0;
var allLocales = __webpack_require__(8);
var allLocalesLoader = (function () {
    function allLocalesLoader() {
    }
    allLocalesLoader.prototype.load = function (availableLocales) {
        for (var property in allLocales) {
            if (allLocales.hasOwnProperty(property)) {
                availableLocales[property] = new allLocales[property]();
            }
        }
    };
    return allLocalesLoader;
}());
exports.allLocalesLoader = allLocalesLoader;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var en_1 = __webpack_require__(3);
Object.defineProperty(exports, "en", { enumerable: true, get: function () { return en_1.en; } });
var da_1 = __webpack_require__(9);
Object.defineProperty(exports, "da", { enumerable: true, get: function () { return da_1.da; } });
var de_1 = __webpack_require__(10);
Object.defineProperty(exports, "de", { enumerable: true, get: function () { return de_1.de; } });
var es_1 = __webpack_require__(11);
Object.defineProperty(exports, "es", { enumerable: true, get: function () { return es_1.es; } });
var fr_1 = __webpack_require__(12);
Object.defineProperty(exports, "fr", { enumerable: true, get: function () { return fr_1.fr; } });
var it_1 = __webpack_require__(13);
Object.defineProperty(exports, "it", { enumerable: true, get: function () { return it_1.it; } });
var ko_1 = __webpack_require__(14);
Object.defineProperty(exports, "ko", { enumerable: true, get: function () { return ko_1.ko; } });
var nl_1 = __webpack_require__(15);
Object.defineProperty(exports, "nl", { enumerable: true, get: function () { return nl_1.nl; } });
var nb_1 = __webpack_require__(16);
Object.defineProperty(exports, "nb", { enumerable: true, get: function () { return nb_1.nb; } });
var sv_1 = __webpack_require__(17);
Object.defineProperty(exports, "sv", { enumerable: true, get: function () { return sv_1.sv; } });
var pl_1 = __webpack_require__(18);
Object.defineProperty(exports, "pl", { enumerable: true, get: function () { return pl_1.pl; } });
var pt_BR_1 = __webpack_require__(19);
Object.defineProperty(exports, "pt_BR", { enumerable: true, get: function () { return pt_BR_1.pt_BR; } });
var ro_1 = __webpack_require__(20);
Object.defineProperty(exports, "ro", { enumerable: true, get: function () { return ro_1.ro; } });
var ru_1 = __webpack_require__(21);
Object.defineProperty(exports, "ru", { enumerable: true, get: function () { return ru_1.ru; } });
var tr_1 = __webpack_require__(22);
Object.defineProperty(exports, "tr", { enumerable: true, get: function () { return tr_1.tr; } });
var uk_1 = __webpack_require__(23);
Object.defineProperty(exports, "uk", { enumerable: true, get: function () { return uk_1.uk; } });
var zh_CN_1 = __webpack_require__(24);
Object.defineProperty(exports, "zh_CN", { enumerable: true, get: function () { return zh_CN_1.zh_CN; } });
var zh_TW_1 = __webpack_require__(25);
Object.defineProperty(exports, "zh_TW", { enumerable: true, get: function () { return zh_TW_1.zh_TW; } });
var ja_1 = __webpack_require__(26);
Object.defineProperty(exports, "ja", { enumerable: true, get: function () { return ja_1.ja; } });
var he_1 = __webpack_require__(27);
Object.defineProperty(exports, "he", { enumerable: true, get: function () { return he_1.he; } });
var cs_1 = __webpack_require__(28);
Object.defineProperty(exports, "cs", { enumerable: true, get: function () { return cs_1.cs; } });
var sk_1 = __webpack_require__(29);
Object.defineProperty(exports, "sk", { enumerable: true, get: function () { return sk_1.sk; } });
var fi_1 = __webpack_require__(30);
Object.defineProperty(exports, "fi", { enumerable: true, get: function () { return fi_1.fi; } });
var sl_1 = __webpack_require__(31);
Object.defineProperty(exports, "sl", { enumerable: true, get: function () { return sl_1.sl; } });
var sw_1 = __webpack_require__(32);
Object.defineProperty(exports, "sw", { enumerable: true, get: function () { return sw_1.sw; } });
var fa_1 = __webpack_require__(33);
Object.defineProperty(exports, "fa", { enumerable: true, get: function () { return fa_1.fa; } });
var ca_1 = __webpack_require__(34);
Object.defineProperty(exports, "ca", { enumerable: true, get: function () { return ca_1.ca; } });


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.da = void 0;
var da = (function () {
    function da() {
    }
    da.prototype.use24HourTimeFormatByDefault = function () {
        return true;
    };
    da.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "Der opstod en fejl ved generering af udtryksbeskrivelsen. Tjek cron-ekspressionssyntaxen.";
    };
    da.prototype.at = function () {
        return "kl";
    };
    da.prototype.atSpace = function () {
        return "kl ";
    };
    da.prototype.atX0 = function () {
        return "kl %s";
    };
    da.prototype.atX0MinutesPastTheHour = function () {
        return "%s minutter efter timeskift";
    };
    da.prototype.atX0SecondsPastTheMinute = function () {
        return "%s sekunder efter minutskift";
    };
    da.prototype.betweenX0AndX1 = function () {
        return "mellem %s og %s";
    };
    da.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", mellem dag %s og %s i måneden";
    };
    da.prototype.commaEveryDay = function () {
        return ", hver dag";
    };
    da.prototype.commaEveryX0Days = function () {
        return ", hver %s. dag";
    };
    da.prototype.commaEveryX0DaysOfTheWeek = function () {
        return ", hver %s. ugedag";
    };
    da.prototype.commaEveryX0Months = function () {
        return ", hver %s. måned";
    };
    da.prototype.commaEveryX0Years = function () {
        return ", hvert %s. år";
    };
    da.prototype.commaOnDayX0OfTheMonth = function () {
        return ", på dag %s i måneden";
    };
    da.prototype.commaOnlyInX0 = function () {
        return ", kun i %s";
    };
    da.prototype.commaOnlyOnX0 = function () {
        return ", kun på %s";
    };
    da.prototype.commaAndOnX0 = function () {
        return ", og på %s";
    };
    da.prototype.commaOnThe = function () {
        return ", på den ";
    };
    da.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", på den sidste dag i måneden";
    };
    da.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", på den sidste hverdag i måneden";
    };
    da.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
        return ", %s dage før den sidste dag i måneden";
    };
    da.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", på den sidste %s i måneden";
    };
    da.prototype.commaOnTheX0OfTheMonth = function () {
        return ", på den %s i måneden";
    };
    da.prototype.commaX0ThroughX1 = function () {
        return ", %s til og med %s";
    };
    da.prototype.everyHour = function () {
        return "hver time";
    };
    da.prototype.everyMinute = function () {
        return "hvert minut";
    };
    da.prototype.everyMinuteBetweenX0AndX1 = function () {
        return "hvert minut mellem %s og %s";
    };
    da.prototype.everySecond = function () {
        return "hvert sekund";
    };
    da.prototype.everyX0Hours = function () {
        return "hver %s. time";
    };
    da.prototype.everyX0Minutes = function () {
        return "hvert %s. minut";
    };
    da.prototype.everyX0Seconds = function () {
        return "hvert %s. sekund";
    };
    da.prototype.fifth = function () {
        return "femte";
    };
    da.prototype.first = function () {
        return "første";
    };
    da.prototype.firstWeekday = function () {
        return "første hverdag";
    };
    da.prototype.fourth = function () {
        return "fjerde";
    };
    da.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "minutterne fra %s til og med %s hver time";
    };
    da.prototype.second = function () {
        return "anden";
    };
    da.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "sekunderne fra %s til og med %s hvert minut";
    };
    da.prototype.spaceAnd = function () {
        return " og";
    };
    da.prototype.spaceX0OfTheMonth = function () {
        return " %s i måneden";
    };
    da.prototype.lastDay = function () {
        return "sidste dag";
    };
    da.prototype.third = function () {
        return "tredje";
    };
    da.prototype.weekdayNearestDayX0 = function () {
        return "hverdag nærmest dag %s";
    };
    da.prototype.commaMonthX0ThroughMonthX1 = function () {
        return null;
    };
    da.prototype.commaYearX0ThroughYearX1 = function () {
        return null;
    };
    da.prototype.atX0MinutesPastTheHourGt20 = function () {
        return null;
    };
    da.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return null;
    };
    da.prototype.commaStartingX0 = function () {
        return ", startende %s";
    };
    da.prototype.daysOfTheWeek = function () {
        return ["søndag", "mandag", "tirsdag", "onsdag", "torsdag", "fredag", "lørdag"];
    };
    da.prototype.monthsOfTheYear = function () {
        return [
            "januar",
            "februar",
            "marts",
            "april",
            "maj",
            "juni",
            "juli",
            "august",
            "september",
            "oktober",
            "november",
            "december",
        ];
    };
    return da;
}());
exports.da = da;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.de = void 0;
var de = (function () {
    function de() {
    }
    de.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return null;
    };
    de.prototype.atX0MinutesPastTheHourGt20 = function () {
        return null;
    };
    de.prototype.commaMonthX0ThroughMonthX1 = function () {
        return null;
    };
    de.prototype.commaYearX0ThroughYearX1 = function () {
        return null;
    };
    de.prototype.use24HourTimeFormatByDefault = function () {
        return true;
    };
    de.prototype.everyMinute = function () {
        return "jede Minute";
    };
    de.prototype.everyHour = function () {
        return "jede Stunde";
    };
    de.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "Beim Generieren der Ausdrucksbeschreibung ist ein Fehler aufgetreten. Überprüfen Sie die Syntax des Cron-Ausdrucks.";
    };
    de.prototype.atSpace = function () {
        return "Um ";
    };
    de.prototype.everyMinuteBetweenX0AndX1 = function () {
        return "Jede Minute zwischen %s und %s";
    };
    de.prototype.at = function () {
        return "Um";
    };
    de.prototype.spaceAnd = function () {
        return " und";
    };
    de.prototype.everySecond = function () {
        return "Jede Sekunde";
    };
    de.prototype.everyX0Seconds = function () {
        return "alle %s Sekunden";
    };
    de.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "Sekunden %s bis %s";
    };
    de.prototype.atX0SecondsPastTheMinute = function () {
        return "bei Sekunde %s";
    };
    de.prototype.everyX0Minutes = function () {
        return "alle %s Minuten";
    };
    de.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "Minuten %s bis %s";
    };
    de.prototype.atX0MinutesPastTheHour = function () {
        return "bei Minute %s";
    };
    de.prototype.everyX0Hours = function () {
        return "alle %s Stunden";
    };
    de.prototype.betweenX0AndX1 = function () {
        return "zwischen %s und %s";
    };
    de.prototype.atX0 = function () {
        return "um %s";
    };
    de.prototype.commaEveryDay = function () {
        return ", jeden Tag";
    };
    de.prototype.commaEveryX0DaysOfTheWeek = function () {
        return ", alle %s Tage der Woche";
    };
    de.prototype.commaX0ThroughX1 = function () {
        return ", %s bis %s";
    };
    de.prototype.first = function () {
        return "ersten";
    };
    de.prototype.second = function () {
        return "zweiten";
    };
    de.prototype.third = function () {
        return "dritten";
    };
    de.prototype.fourth = function () {
        return "vierten";
    };
    de.prototype.fifth = function () {
        return "fünften";
    };
    de.prototype.commaOnThe = function () {
        return ", am ";
    };
    de.prototype.spaceX0OfTheMonth = function () {
        return " %s des Monats";
    };
    de.prototype.lastDay = function () {
        return "der letzte Tag";
    };
    de.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", am letzten %s des Monats";
    };
    de.prototype.commaOnlyOnX0 = function () {
        return ", nur jeden %s";
    };
    de.prototype.commaAndOnX0 = function () {
        return ", und jeden %s";
    };
    de.prototype.commaEveryX0Months = function () {
        return ", alle %s Monate";
    };
    de.prototype.commaOnlyInX0 = function () {
        return ", nur im %s";
    };
    de.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", am letzten Tag des Monats";
    };
    de.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", am letzten Werktag des Monats";
    };
    de.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
        return ", %s tage vor dem letzten Tag des Monats";
    };
    de.prototype.firstWeekday = function () {
        return "ersten Werktag";
    };
    de.prototype.weekdayNearestDayX0 = function () {
        return "Werktag am nächsten zum %s Tag";
    };
    de.prototype.commaOnTheX0OfTheMonth = function () {
        return ", am %s des Monats";
    };
    de.prototype.commaEveryX0Days = function () {
        return ", alle %s Tage";
    };
    de.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", zwischen Tag %s und %s des Monats";
    };
    de.prototype.commaOnDayX0OfTheMonth = function () {
        return ", an Tag %s des Monats";
    };
    de.prototype.commaEveryX0Years = function () {
        return ", alle %s Jahre";
    };
    de.prototype.commaStartingX0 = function () {
        return ", beginnend %s";
    };
    de.prototype.daysOfTheWeek = function () {
        return ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
    };
    de.prototype.monthsOfTheYear = function () {
        return [
            "Januar",
            "Februar",
            "März",
            "April",
            "Mai",
            "Juni",
            "Juli",
            "August",
            "September",
            "Oktober",
            "November",
            "Dezember",
        ];
    };
    return de;
}());
exports.de = de;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.es = void 0;
var es = (function () {
    function es() {
    }
    es.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return null;
    };
    es.prototype.atX0MinutesPastTheHourGt20 = function () {
        return null;
    };
    es.prototype.commaMonthX0ThroughMonthX1 = function () {
        return null;
    };
    es.prototype.commaYearX0ThroughYearX1 = function () {
        return null;
    };
    es.prototype.use24HourTimeFormatByDefault = function () {
        return false;
    };
    es.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "Ocurrió un error mientras se generaba la descripción de la expresión. Revise la sintaxis de la expresión de cron.";
    };
    es.prototype.at = function () {
        return "A las";
    };
    es.prototype.atSpace = function () {
        return "A las ";
    };
    es.prototype.atX0 = function () {
        return "a las %s";
    };
    es.prototype.atX0MinutesPastTheHour = function () {
        return "a los %s minutos de la hora";
    };
    es.prototype.atX0SecondsPastTheMinute = function () {
        return "a los %s segundos del minuto";
    };
    es.prototype.betweenX0AndX1 = function () {
        return "entre las %s y las %s";
    };
    es.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", entre los días %s y %s del mes";
    };
    es.prototype.commaEveryDay = function () {
        return ", cada día";
    };
    es.prototype.commaEveryX0Days = function () {
        return ", cada %s días";
    };
    es.prototype.commaEveryX0DaysOfTheWeek = function () {
        return ", cada %s días de la semana";
    };
    es.prototype.commaEveryX0Months = function () {
        return ", cada %s meses";
    };
    es.prototype.commaOnDayX0OfTheMonth = function () {
        return ", el día %s del mes";
    };
    es.prototype.commaOnlyInX0 = function () {
        return ", sólo en %s";
    };
    es.prototype.commaOnlyOnX0 = function () {
        return ", sólo el %s";
    };
    es.prototype.commaAndOnX0 = function () {
        return ", y el %s";
    };
    es.prototype.commaOnThe = function () {
        return ", en el ";
    };
    es.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", en el último día del mes";
    };
    es.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", en el último día de la semana del mes";
    };
    es.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
        return ", %s días antes del último día del mes";
    };
    es.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", en el último %s del mes";
    };
    es.prototype.commaOnTheX0OfTheMonth = function () {
        return ", en el %s del mes";
    };
    es.prototype.commaX0ThroughX1 = function () {
        return ", de %s a %s";
    };
    es.prototype.everyHour = function () {
        return "cada hora";
    };
    es.prototype.everyMinute = function () {
        return "cada minuto";
    };
    es.prototype.everyMinuteBetweenX0AndX1 = function () {
        return "cada minuto entre las %s y las %s";
    };
    es.prototype.everySecond = function () {
        return "cada segundo";
    };
    es.prototype.everyX0Hours = function () {
        return "cada %s horas";
    };
    es.prototype.everyX0Minutes = function () {
        return "cada %s minutos";
    };
    es.prototype.everyX0Seconds = function () {
        return "cada %s segundos";
    };
    es.prototype.fifth = function () {
        return "quinto";
    };
    es.prototype.first = function () {
        return "primero";
    };
    es.prototype.firstWeekday = function () {
        return "primer día de la semana";
    };
    es.prototype.fourth = function () {
        return "cuarto";
    };
    es.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "del minuto %s al %s pasada la hora";
    };
    es.prototype.second = function () {
        return "segundo";
    };
    es.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "En los segundos %s al %s de cada minuto";
    };
    es.prototype.spaceAnd = function () {
        return " y";
    };
    es.prototype.spaceX0OfTheMonth = function () {
        return " %s del mes";
    };
    es.prototype.lastDay = function () {
        return "el último día";
    };
    es.prototype.third = function () {
        return "tercer";
    };
    es.prototype.weekdayNearestDayX0 = function () {
        return "día de la semana más próximo al %s";
    };
    es.prototype.commaEveryX0Years = function () {
        return ", cada %s años";
    };
    es.prototype.commaStartingX0 = function () {
        return ", comenzando %s";
    };
    es.prototype.daysOfTheWeek = function () {
        return ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
    };
    es.prototype.monthsOfTheYear = function () {
        return [
            "enero",
            "febrero",
            "marzo",
            "abril",
            "mayo",
            "junio",
            "julio",
            "agosto",
            "septiembre",
            "octubre",
            "noviembre",
            "diciembre",
        ];
    };
    return es;
}());
exports.es = es;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.fr = void 0;
var fr = (function () {
    function fr() {
    }
    fr.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return null;
    };
    fr.prototype.atX0MinutesPastTheHourGt20 = function () {
        return null;
    };
    fr.prototype.commaMonthX0ThroughMonthX1 = function () {
        return null;
    };
    fr.prototype.commaYearX0ThroughYearX1 = function () {
        return null;
    };
    fr.prototype.use24HourTimeFormatByDefault = function () {
        return false;
    };
    fr.prototype.everyMinute = function () {
        return "toutes les minutes";
    };
    fr.prototype.everyHour = function () {
        return "toutes les heures";
    };
    fr.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "Une erreur est survenue en générant la description de l'expression cron. Vérifiez sa syntaxe.";
    };
    fr.prototype.atSpace = function () {
        return "À ";
    };
    fr.prototype.everyMinuteBetweenX0AndX1 = function () {
        return "Toutes les minutes entre %s et %s";
    };
    fr.prototype.at = function () {
        return "À";
    };
    fr.prototype.spaceAnd = function () {
        return " et";
    };
    fr.prototype.everySecond = function () {
        return "toutes les secondes";
    };
    fr.prototype.everyX0Seconds = function () {
        return "toutes les %s secondes";
    };
    fr.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "les secondes entre %s et %s après la minute";
    };
    fr.prototype.atX0SecondsPastTheMinute = function () {
        return "%s secondes après la minute";
    };
    fr.prototype.everyX0Minutes = function () {
        return "toutes les %s minutes";
    };
    fr.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "les minutes entre %s et %s après l'heure";
    };
    fr.prototype.atX0MinutesPastTheHour = function () {
        return "%s minutes après l'heure";
    };
    fr.prototype.everyX0Hours = function () {
        return "toutes les %s heures";
    };
    fr.prototype.betweenX0AndX1 = function () {
        return "de %s à %s";
    };
    fr.prototype.atX0 = function () {
        return "à %s";
    };
    fr.prototype.commaEveryDay = function () {
        return ", tous les jours";
    };
    fr.prototype.commaEveryX0DaysOfTheWeek = function () {
        return ", every %s days of the week";
    };
    fr.prototype.commaX0ThroughX1 = function () {
        return ", de %s à %s";
    };
    fr.prototype.first = function () {
        return "premier";
    };
    fr.prototype.second = function () {
        return "second";
    };
    fr.prototype.third = function () {
        return "troisième";
    };
    fr.prototype.fourth = function () {
        return "quatrième";
    };
    fr.prototype.fifth = function () {
        return "cinquième";
    };
    fr.prototype.commaOnThe = function () {
        return ", le ";
    };
    fr.prototype.spaceX0OfTheMonth = function () {
        return " %s du mois";
    };
    fr.prototype.lastDay = function () {
        return "le dernier jour";
    };
    fr.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", le dernier %s du mois";
    };
    fr.prototype.commaOnlyOnX0 = function () {
        return ", uniquement le %s";
    };
    fr.prototype.commaAndOnX0 = function () {
        return ", et %s";
    };
    fr.prototype.commaEveryX0Months = function () {
        return ", tous les %s mois";
    };
    fr.prototype.commaOnlyInX0 = function () {
        return ", uniquement en %s";
    };
    fr.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", le dernier jour du mois";
    };
    fr.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", le dernier jour ouvrable du mois";
    };
    fr.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
        return ", %s jours avant le dernier jour du mois";
    };
    fr.prototype.firstWeekday = function () {
        return "premier jour ouvrable";
    };
    fr.prototype.weekdayNearestDayX0 = function () {
        return "jour ouvrable le plus proche du %s";
    };
    fr.prototype.commaOnTheX0OfTheMonth = function () {
        return ", le %s du mois";
    };
    fr.prototype.commaEveryX0Days = function () {
        return ", tous les %s jours";
    };
    fr.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", du %s au %s du mois";
    };
    fr.prototype.commaOnDayX0OfTheMonth = function () {
        return ", le %s du mois";
    };
    fr.prototype.commaEveryX0Years = function () {
        return ", tous les %s ans";
    };
    fr.prototype.commaDaysX0ThroughX1 = function () {
        return ", du %s au %s";
    };
    fr.prototype.commaStartingX0 = function () {
        return ", départ %s";
    };
    fr.prototype.daysOfTheWeek = function () {
        return ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
    };
    fr.prototype.monthsOfTheYear = function () {
        return [
            "janvier",
            "février",
            "mars",
            "avril",
            "mai",
            "juin",
            "juillet",
            "août",
            "septembre",
            "octobre",
            "novembre",
            "décembre",
        ];
    };
    return fr;
}());
exports.fr = fr;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.it = void 0;
var it = (function () {
    function it() {
    }
    it.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return null;
    };
    it.prototype.atX0MinutesPastTheHourGt20 = function () {
        return null;
    };
    it.prototype.commaMonthX0ThroughMonthX1 = function () {
        return null;
    };
    it.prototype.commaYearX0ThroughYearX1 = function () {
        return null;
    };
    it.prototype.use24HourTimeFormatByDefault = function () {
        return true;
    };
    it.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "È verificato un errore durante la generazione la descrizione espressione. Controllare la sintassi delle espressioni cron.";
    };
    it.prototype.at = function () {
        return "Alle";
    };
    it.prototype.atSpace = function () {
        return "Alle ";
    };
    it.prototype.atX0 = function () {
        return "alle %s";
    };
    it.prototype.atX0MinutesPastTheHour = function () {
        return "al %s minuto passata l'ora";
    };
    it.prototype.atX0SecondsPastTheMinute = function () {
        return "al %s secondo passato il minuto";
    };
    it.prototype.betweenX0AndX1 = function () {
        return "tra le %s e le %s";
    };
    it.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", tra il giorno %s e %s del mese";
    };
    it.prototype.commaEveryDay = function () {
        return ", ogni giorno";
    };
    it.prototype.commaEveryX0Days = function () {
        return ", ogni %s giorni";
    };
    it.prototype.commaEveryX0DaysOfTheWeek = function () {
        return ", ogni %s giorni della settimana";
    };
    it.prototype.commaEveryX0Months = function () {
        return ", ogni %s mesi";
    };
    it.prototype.commaEveryX0Years = function () {
        return ", ogni %s anni";
    };
    it.prototype.commaOnDayX0OfTheMonth = function () {
        return ", il giorno %s del mese";
    };
    it.prototype.commaOnlyInX0 = function () {
        return ", solo in %s";
    };
    it.prototype.commaOnlyOnX0 = function () {
        return ", solo il %s";
    };
    it.prototype.commaAndOnX0 = function () {
        return ", e il %s";
    };
    it.prototype.commaOnThe = function () {
        return ", il ";
    };
    it.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", l'ultimo giorno del mese";
    };
    it.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", nell'ultima settimana del mese";
    };
    it.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
        return ", %s giorni prima dell'ultimo giorno del mese";
    };
    it.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", l'ultimo %s del mese";
    };
    it.prototype.commaOnTheX0OfTheMonth = function () {
        return ", il %s del mese";
    };
    it.prototype.commaX0ThroughX1 = function () {
        return ", %s al %s";
    };
    it.prototype.everyHour = function () {
        return "ogni ora";
    };
    it.prototype.everyMinute = function () {
        return "ogni minuto";
    };
    it.prototype.everyMinuteBetweenX0AndX1 = function () {
        return "Ogni minuto tra le %s e le %s";
    };
    it.prototype.everySecond = function () {
        return "ogni secondo";
    };
    it.prototype.everyX0Hours = function () {
        return "ogni %s ore";
    };
    it.prototype.everyX0Minutes = function () {
        return "ogni %s minuti";
    };
    it.prototype.everyX0Seconds = function () {
        return "ogni %s secondi";
    };
    it.prototype.fifth = function () {
        return "quinto";
    };
    it.prototype.first = function () {
        return "primo";
    };
    it.prototype.firstWeekday = function () {
        return "primo giorno della settimana";
    };
    it.prototype.fourth = function () {
        return "quarto";
    };
    it.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "minuti %s al %s dopo l'ora";
    };
    it.prototype.second = function () {
        return "secondo";
    };
    it.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "secondi %s al %s oltre il minuto";
    };
    it.prototype.spaceAnd = function () {
        return " e";
    };
    it.prototype.spaceX0OfTheMonth = function () {
        return " %s del mese";
    };
    it.prototype.lastDay = function () {
        return "l'ultimo giorno";
    };
    it.prototype.third = function () {
        return "terzo";
    };
    it.prototype.weekdayNearestDayX0 = function () {
        return "giorno della settimana più vicino al %s";
    };
    it.prototype.commaStartingX0 = function () {
        return ", a partire %s";
    };
    it.prototype.daysOfTheWeek = function () {
        return ["domenica", "lunedì", "martedì", "mercoledì", "giovedì", "venerdì", "sabato"];
    };
    it.prototype.monthsOfTheYear = function () {
        return [
            "gennaio",
            "febbraio",
            "marzo",
            "aprile",
            "maggio",
            "giugno",
            "luglio",
            "agosto",
            "settembre",
            "ottobre",
            "novembre",
            "dicembre",
        ];
    };
    return it;
}());
exports.it = it;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.ko = void 0;
var ko = (function () {
    function ko() {
    }
    ko.prototype.setPeriodBeforeTime = function () {
        return true;
    };
    ko.prototype.pm = function () {
        return "오후";
    };
    ko.prototype.am = function () {
        return "오전";
    };
    ko.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return null;
    };
    ko.prototype.atX0MinutesPastTheHourGt20 = function () {
        return null;
    };
    ko.prototype.commaMonthX0ThroughMonthX1 = function () {
        return null;
    };
    ko.prototype.commaYearX0ThroughYearX1 = function () {
        return null;
    };
    ko.prototype.use24HourTimeFormatByDefault = function () {
        return false;
    };
    ko.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "표현식 설명을 생성하는 중 오류가 발생했습니다. cron 표현식 구문을 확인하십시오.";
    };
    ko.prototype.everyMinute = function () {
        return "1분마다";
    };
    ko.prototype.everyHour = function () {
        return "1시간마다";
    };
    ko.prototype.atSpace = function () {
        return "에서 ";
    };
    ko.prototype.everyMinuteBetweenX0AndX1 = function () {
        return "%s 및 %s 사이에 매 분";
    };
    ko.prototype.at = function () {
        return "에서";
    };
    ko.prototype.spaceAnd = function () {
        return " 및";
    };
    ko.prototype.everySecond = function () {
        return "1초마다";
    };
    ko.prototype.everyX0Seconds = function () {
        return "%s초마다";
    };
    ko.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "정분 후 %s초에서 %s초까지";
    };
    ko.prototype.atX0SecondsPastTheMinute = function () {
        return "정분 후 %s초에서";
    };
    ko.prototype.everyX0Minutes = function () {
        return "%s분마다";
    };
    ko.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "정시 후 %s분에서 %s까지";
    };
    ko.prototype.atX0MinutesPastTheHour = function () {
        return "정시 후 %s분에서";
    };
    ko.prototype.everyX0Hours = function () {
        return "%s시간마다";
    };
    ko.prototype.betweenX0AndX1 = function () {
        return "%s에서 %s 사이";
    };
    ko.prototype.atX0 = function () {
        return "%s에서";
    };
    ko.prototype.commaEveryDay = function () {
        return ", 매일";
    };
    ko.prototype.commaEveryX0DaysOfTheWeek = function () {
        return ", 주 중 %s일마다";
    };
    ko.prototype.commaX0ThroughX1 = function () {
        return ", %s에서 %s가지";
    };
    ko.prototype.first = function () {
        return "첫 번째";
    };
    ko.prototype.second = function () {
        return "두 번째";
    };
    ko.prototype.third = function () {
        return "세 번째";
    };
    ko.prototype.fourth = function () {
        return "네 번째";
    };
    ko.prototype.fifth = function () {
        return "다섯 번째";
    };
    ko.prototype.commaOnThe = function () {
        return ", 해당 ";
    };
    ko.prototype.spaceX0OfTheMonth = function () {
        return " 해당 월의 %s";
    };
    ko.prototype.lastDay = function () {
        return "마지막 날";
    };
    ko.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", 해당 월의 마지막 %s";
    };
    ko.prototype.commaOnlyOnX0 = function () {
        return ", %s에만";
    };
    ko.prototype.commaAndOnX0 = function () {
        return ", 및 %s에";
    };
    ko.prototype.commaEveryX0Months = function () {
        return ", %s개월마다";
    };
    ko.prototype.commaOnlyInX0 = function () {
        return ", %s에서만";
    };
    ko.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", 해당 월의 마지막 날에";
    };
    ko.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", 해당 월의 마지막 평일에";
    };
    ko.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
        return ", 해당 월의 마지막 날 %s일 전";
    };
    ko.prototype.firstWeekday = function () {
        return "첫 번째 평일";
    };
    ko.prototype.weekdayNearestDayX0 = function () {
        return "평일 가장 가까운 날 %s";
    };
    ko.prototype.commaOnTheX0OfTheMonth = function () {
        return ", 해당 월의 %s에";
    };
    ko.prototype.commaEveryX0Days = function () {
        return ", %s일마다";
    };
    ko.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", 해당 월의 %s일 및 %s일 사이";
    };
    ko.prototype.commaOnDayX0OfTheMonth = function () {
        return ", 해당 월의 %s일에";
    };
    ko.prototype.commaEveryMinute = function () {
        return ", 1분마다";
    };
    ko.prototype.commaEveryHour = function () {
        return ", 1시간마다";
    };
    ko.prototype.commaEveryX0Years = function () {
        return ", %s년마다";
    };
    ko.prototype.commaStartingX0 = function () {
        return ", %s부터";
    };
    ko.prototype.daysOfTheWeek = function () {
        return ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
    };
    ko.prototype.monthsOfTheYear = function () {
        return ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];
    };
    return ko;
}());
exports.ko = ko;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.nl = void 0;
var nl = (function () {
    function nl() {
    }
    nl.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return null;
    };
    nl.prototype.atX0MinutesPastTheHourGt20 = function () {
        return null;
    };
    nl.prototype.commaMonthX0ThroughMonthX1 = function () {
        return null;
    };
    nl.prototype.commaYearX0ThroughYearX1 = function () {
        return null;
    };
    nl.prototype.use24HourTimeFormatByDefault = function () {
        return false;
    };
    nl.prototype.everyMinute = function () {
        return "elke minuut";
    };
    nl.prototype.everyHour = function () {
        return "elk uur";
    };
    nl.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "Er is een fout opgetreden bij het vertalen van de gegevens. Controleer de gegevens.";
    };
    nl.prototype.atSpace = function () {
        return "Op ";
    };
    nl.prototype.everyMinuteBetweenX0AndX1 = function () {
        return "Elke minuut tussen %s en %s";
    };
    nl.prototype.at = function () {
        return "Op";
    };
    nl.prototype.spaceAnd = function () {
        return " en";
    };
    nl.prototype.everySecond = function () {
        return "elke seconde";
    };
    nl.prototype.everyX0Seconds = function () {
        return "elke %s seconden";
    };
    nl.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "seconden %s t/m %s na de minuut";
    };
    nl.prototype.atX0SecondsPastTheMinute = function () {
        return "op %s seconden na de minuut";
    };
    nl.prototype.everyX0Minutes = function () {
        return "elke %s minuten";
    };
    nl.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "minuut %s t/m %s na het uur";
    };
    nl.prototype.atX0MinutesPastTheHour = function () {
        return "op %s minuten na het uur";
    };
    nl.prototype.everyX0Hours = function () {
        return "elke %s uur";
    };
    nl.prototype.betweenX0AndX1 = function () {
        return "tussen %s en %s";
    };
    nl.prototype.atX0 = function () {
        return "op %s";
    };
    nl.prototype.commaEveryDay = function () {
        return ", elke dag";
    };
    nl.prototype.commaEveryX0DaysOfTheWeek = function () {
        return ", elke %s dagen van de week";
    };
    nl.prototype.commaX0ThroughX1 = function () {
        return ", %s t/m %s";
    };
    nl.prototype.first = function () {
        return "eerste";
    };
    nl.prototype.second = function () {
        return "tweede";
    };
    nl.prototype.third = function () {
        return "derde";
    };
    nl.prototype.fourth = function () {
        return "vierde";
    };
    nl.prototype.fifth = function () {
        return "vijfde";
    };
    nl.prototype.commaOnThe = function () {
        return ", op de ";
    };
    nl.prototype.spaceX0OfTheMonth = function () {
        return " %s van de maand";
    };
    nl.prototype.lastDay = function () {
        return "de laatste dag";
    };
    nl.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", op de laatste %s van de maand";
    };
    nl.prototype.commaOnlyOnX0 = function () {
        return ", alleen op %s";
    };
    nl.prototype.commaAndOnX0 = function () {
        return ", en op %s";
    };
    nl.prototype.commaEveryX0Months = function () {
        return ", elke %s maanden";
    };
    nl.prototype.commaOnlyInX0 = function () {
        return ", alleen in %s";
    };
    nl.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", op de laatste dag van de maand";
    };
    nl.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", op de laatste werkdag van de maand";
    };
    nl.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
        return ", %s dagen vóór de laatste dag van de maand";
    };
    nl.prototype.firstWeekday = function () {
        return "eerste werkdag";
    };
    nl.prototype.weekdayNearestDayX0 = function () {
        return "werkdag dichtst bij dag %s";
    };
    nl.prototype.commaOnTheX0OfTheMonth = function () {
        return ", op de %s van de maand";
    };
    nl.prototype.commaEveryX0Days = function () {
        return ", elke %s dagen";
    };
    nl.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", tussen dag %s en %s van de maand";
    };
    nl.prototype.commaOnDayX0OfTheMonth = function () {
        return ", op dag %s van de maand";
    };
    nl.prototype.commaEveryX0Years = function () {
        return ", elke %s jaren";
    };
    nl.prototype.commaStartingX0 = function () {
        return ", beginnend %s";
    };
    nl.prototype.daysOfTheWeek = function () {
        return ["zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag"];
    };
    nl.prototype.monthsOfTheYear = function () {
        return [
            "januari",
            "februari",
            "maart",
            "april",
            "mei",
            "juni",
            "juli",
            "augustus",
            "september",
            "oktober",
            "november",
            "december",
        ];
    };
    return nl;
}());
exports.nl = nl;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.nb = void 0;
var nb = (function () {
    function nb() {
    }
    nb.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return null;
    };
    nb.prototype.atX0MinutesPastTheHourGt20 = function () {
        return null;
    };
    nb.prototype.commaMonthX0ThroughMonthX1 = function () {
        return null;
    };
    nb.prototype.commaYearX0ThroughYearX1 = function () {
        return null;
    };
    nb.prototype.use24HourTimeFormatByDefault = function () {
        return false;
    };
    nb.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "En feil inntraff ved generering av uttrykksbeskrivelse. Sjekk cron syntaks.";
    };
    nb.prototype.at = function () {
        return "Kl.";
    };
    nb.prototype.atSpace = function () {
        return "Kl.";
    };
    nb.prototype.atX0 = function () {
        return "på %s";
    };
    nb.prototype.atX0MinutesPastTheHour = function () {
        return "på %s minutter etter timen";
    };
    nb.prototype.atX0SecondsPastTheMinute = function () {
        return "på %s sekunder etter minuttet";
    };
    nb.prototype.betweenX0AndX1 = function () {
        return "mellom %s og %s";
    };
    nb.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", mellom dag %s og %s av måneden";
    };
    nb.prototype.commaEveryDay = function () {
        return ", hver dag";
    };
    nb.prototype.commaEveryX0Days = function () {
        return ", hver %s dag";
    };
    nb.prototype.commaEveryX0DaysOfTheWeek = function () {
        return ", hver %s ukedag";
    };
    nb.prototype.commaEveryX0Months = function () {
        return ", hver %s måned";
    };
    nb.prototype.commaEveryX0Years = function () {
        return ", hvert %s år";
    };
    nb.prototype.commaOnDayX0OfTheMonth = function () {
        return ", på dag %s av måneden";
    };
    nb.prototype.commaOnlyInX0 = function () {
        return ", bare i %s";
    };
    nb.prototype.commaOnlyOnX0 = function () {
        return ", på %s";
    };
    nb.prototype.commaAndOnX0 = function () {
        return ", og på %s";
    };
    nb.prototype.commaOnThe = function () {
        return ", på ";
    };
    nb.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", på den siste dagen i måneden";
    };
    nb.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", den siste ukedagen i måneden";
    };
    nb.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
        return ", %s dager før den siste dagen i måneden";
    };
    nb.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", på den siste %s av måneden";
    };
    nb.prototype.commaOnTheX0OfTheMonth = function () {
        return ", på den %s av måneden";
    };
    nb.prototype.commaX0ThroughX1 = function () {
        return ", %s til og med %s";
    };
    nb.prototype.everyHour = function () {
        return "hver time";
    };
    nb.prototype.everyMinute = function () {
        return "hvert minutt";
    };
    nb.prototype.everyMinuteBetweenX0AndX1 = function () {
        return "Hvert minutt mellom %s og %s";
    };
    nb.prototype.everySecond = function () {
        return "hvert sekund";
    };
    nb.prototype.everyX0Hours = function () {
        return "hver %s time";
    };
    nb.prototype.everyX0Minutes = function () {
        return "hvert %s minutt";
    };
    nb.prototype.everyX0Seconds = function () {
        return "hvert %s sekund";
    };
    nb.prototype.fifth = function () {
        return "femte";
    };
    nb.prototype.first = function () {
        return "første";
    };
    nb.prototype.firstWeekday = function () {
        return "første ukedag";
    };
    nb.prototype.fourth = function () {
        return "fjerde";
    };
    nb.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "minuttene fra %s til og med %s etter timen";
    };
    nb.prototype.second = function () {
        return "sekund";
    };
    nb.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "sekundene fra %s til og med %s etter minuttet";
    };
    nb.prototype.spaceAnd = function () {
        return " og";
    };
    nb.prototype.spaceX0OfTheMonth = function () {
        return " %s i måneden";
    };
    nb.prototype.lastDay = function () {
        return "den siste dagen";
    };
    nb.prototype.third = function () {
        return "tredje";
    };
    nb.prototype.weekdayNearestDayX0 = function () {
        return "ukedag nærmest dag %s";
    };
    nb.prototype.commaStartingX0 = function () {
        return ", starter %s";
    };
    nb.prototype.daysOfTheWeek = function () {
        return ["søndag", "mandag", "tirsdag", "onsdag", "torsdag", "fredag", "lørdag"];
    };
    nb.prototype.monthsOfTheYear = function () {
        return [
            "januar",
            "februar",
            "mars",
            "april",
            "mai",
            "juni",
            "juli",
            "august",
            "september",
            "oktober",
            "november",
            "desember",
        ];
    };
    return nb;
}());
exports.nb = nb;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.sv = void 0;
var sv = (function () {
    function sv() {
    }
    sv.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return null;
    };
    sv.prototype.atX0MinutesPastTheHourGt20 = function () {
        return null;
    };
    sv.prototype.commaMonthX0ThroughMonthX1 = function () {
        return null;
    };
    sv.prototype.commaYearX0ThroughYearX1 = function () {
        return null;
    };
    sv.prototype.use24HourTimeFormatByDefault = function () {
        return true;
    };
    sv.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "Ett fel inträffade vid generering av uttryckets beskrivning. Kontrollera cron-uttryckets syntax.";
    };
    sv.prototype.everyMinute = function () {
        return "varje minut";
    };
    sv.prototype.everyHour = function () {
        return "varje timme";
    };
    sv.prototype.atSpace = function () {
        return "Kl ";
    };
    sv.prototype.everyMinuteBetweenX0AndX1 = function () {
        return "Varje minut mellan %s och %s";
    };
    sv.prototype.at = function () {
        return "Kl";
    };
    sv.prototype.spaceAnd = function () {
        return " och";
    };
    sv.prototype.everySecond = function () {
        return "varje sekund";
    };
    sv.prototype.everyX0Seconds = function () {
        return "varje %s sekund";
    };
    sv.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "sekunderna från %s till och med %s efter minuten";
    };
    sv.prototype.atX0SecondsPastTheMinute = function () {
        return "på %s sekunder efter minuten";
    };
    sv.prototype.everyX0Minutes = function () {
        return "var %s minut";
    };
    sv.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "minuterna från %s till och med %s efter timmen";
    };
    sv.prototype.atX0MinutesPastTheHour = function () {
        return "på %s minuten efter timmen";
    };
    sv.prototype.everyX0Hours = function () {
        return "var %s timme";
    };
    sv.prototype.betweenX0AndX1 = function () {
        return "mellan %s och %s";
    };
    sv.prototype.atX0 = function () {
        return "kl %s";
    };
    sv.prototype.commaEveryDay = function () {
        return ", varje dag";
    };
    sv.prototype.commaEveryX0DaysOfTheWeek = function () {
        return ", var %s dag i veckan";
    };
    sv.prototype.commaX0ThroughX1 = function () {
        return ", %s till %s";
    };
    sv.prototype.first = function () {
        return "första";
    };
    sv.prototype.second = function () {
        return "andra";
    };
    sv.prototype.third = function () {
        return "tredje";
    };
    sv.prototype.fourth = function () {
        return "fjärde";
    };
    sv.prototype.fifth = function () {
        return "femte";
    };
    sv.prototype.commaOnThe = function () {
        return ", den ";
    };
    sv.prototype.spaceX0OfTheMonth = function () {
        return " %sen av månaden";
    };
    sv.prototype.lastDay = function () {
        return "den sista dagen";
    };
    sv.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", på sista %s av månaden";
    };
    sv.prototype.commaOnlyOnX0 = function () {
        return ", varje %s";
    };
    sv.prototype.commaAndOnX0 = function () {
        return ", och på %s";
    };
    sv.prototype.commaEveryX0Months = function () {
        return ", var %s månad";
    };
    sv.prototype.commaOnlyInX0 = function () {
        return ", bara på %s";
    };
    sv.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", på sista dagen av månaden";
    };
    sv.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", på sista veckodag av månaden";
    };
    sv.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
        return ", %s dagar före den sista dagen i månaden";
    };
    sv.prototype.firstWeekday = function () {
        return "första veckodag";
    };
    sv.prototype.weekdayNearestDayX0 = function () {
        return "veckodagen närmast dag %s";
    };
    sv.prototype.commaOnTheX0OfTheMonth = function () {
        return ", på den %s av månaden";
    };
    sv.prototype.commaEveryX0Days = function () {
        return ", var %s dag";
    };
    sv.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", mellan dag %s och %s av månaden";
    };
    sv.prototype.commaOnDayX0OfTheMonth = function () {
        return ", på dag %s av månaden";
    };
    sv.prototype.commaEveryX0Years = function () {
        return ", var %s år";
    };
    sv.prototype.commaStartingX0 = function () {
        return ", startar %s";
    };
    sv.prototype.daysOfTheWeek = function () {
        return ["söndag", "måndag", "tisdag", "onsdag", "torsdag", "fredag", "lördag"];
    };
    sv.prototype.monthsOfTheYear = function () {
        return [
            "januari",
            "februari",
            "mars",
            "april",
            "maj",
            "juni",
            "juli",
            "augusti",
            "september",
            "oktober",
            "november",
            "december",
        ];
    };
    return sv;
}());
exports.sv = sv;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.pl = void 0;
var pl = (function () {
    function pl() {
    }
    pl.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return null;
    };
    pl.prototype.atX0MinutesPastTheHourGt20 = function () {
        return null;
    };
    pl.prototype.commaMonthX0ThroughMonthX1 = function () {
        return null;
    };
    pl.prototype.commaYearX0ThroughYearX1 = function () {
        return null;
    };
    pl.prototype.use24HourTimeFormatByDefault = function () {
        return true;
    };
    pl.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "Wystąpił błąd podczas generowania opisu wyrażenia cron. Sprawdź składnię wyrażenia cron.";
    };
    pl.prototype.at = function () {
        return "O";
    };
    pl.prototype.atSpace = function () {
        return "O ";
    };
    pl.prototype.atX0 = function () {
        return "o %s";
    };
    pl.prototype.atX0MinutesPastTheHour = function () {
        return "w %s minucie";
    };
    pl.prototype.atX0SecondsPastTheMinute = function () {
        return "w %s sekundzie";
    };
    pl.prototype.betweenX0AndX1 = function () {
        return "od %s do %s";
    };
    pl.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", od %s-ego do %s-ego dnia miesiąca";
    };
    pl.prototype.commaEveryDay = function () {
        return ", co dzień";
    };
    pl.prototype.commaEveryX0Days = function () {
        return ", co %s dni";
    };
    pl.prototype.commaEveryX0DaysOfTheWeek = function () {
        return ", co %s dni tygodnia";
    };
    pl.prototype.commaEveryX0Months = function () {
        return ", co %s miesięcy";
    };
    pl.prototype.commaEveryX0Years = function () {
        return ", co %s lat";
    };
    pl.prototype.commaOnDayX0OfTheMonth = function () {
        return ", %s-ego dnia miesiąca";
    };
    pl.prototype.commaOnlyInX0 = function () {
        return ", tylko %s";
    };
    pl.prototype.commaOnlyOnX0 = function () {
        return ", tylko %s";
    };
    pl.prototype.commaAndOnX0 = function () {
        return ", i %s";
    };
    pl.prototype.commaOnThe = function () {
        return ", ";
    };
    pl.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", ostatni dzień miesiąca";
    };
    pl.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", ostatni dzień roboczy miesiąca";
    };
    pl.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
        return ", %s dni przed ostatnim dniem miesiąca";
    };
    pl.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", ostatni %s miesiąca";
    };
    pl.prototype.commaOnTheX0OfTheMonth = function () {
        return ", %s miesiąca";
    };
    pl.prototype.commaX0ThroughX1 = function () {
        return ", od %s do %s";
    };
    pl.prototype.everyHour = function () {
        return "co godzinę";
    };
    pl.prototype.everyMinute = function () {
        return "co minutę";
    };
    pl.prototype.everyMinuteBetweenX0AndX1 = function () {
        return "Co minutę od %s do %s";
    };
    pl.prototype.everySecond = function () {
        return "co sekundę";
    };
    pl.prototype.everyX0Hours = function () {
        return "co %s godzin";
    };
    pl.prototype.everyX0Minutes = function () {
        return "co %s minut";
    };
    pl.prototype.everyX0Seconds = function () {
        return "co %s sekund";
    };
    pl.prototype.fifth = function () {
        return "piąty";
    };
    pl.prototype.first = function () {
        return "pierwszy";
    };
    pl.prototype.firstWeekday = function () {
        return "pierwszy dzień roboczy";
    };
    pl.prototype.fourth = function () {
        return "czwarty";
    };
    pl.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "minuty od %s do %s";
    };
    pl.prototype.second = function () {
        return "drugi";
    };
    pl.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "sekundy od %s do %s";
    };
    pl.prototype.spaceAnd = function () {
        return " i";
    };
    pl.prototype.spaceX0OfTheMonth = function () {
        return " %s miesiąca";
    };
    pl.prototype.lastDay = function () {
        return "ostatni dzień";
    };
    pl.prototype.third = function () {
        return "trzeci";
    };
    pl.prototype.weekdayNearestDayX0 = function () {
        return "dzień roboczy najbliższy %s-ego dnia";
    };
    pl.prototype.commaStartingX0 = function () {
        return ", startowy %s";
    };
    pl.prototype.daysOfTheWeek = function () {
        return ["niedziela", "poniedziałek", "wtorek", "środa", "czwartek", "piątek", "sobota"];
    };
    pl.prototype.monthsOfTheYear = function () {
        return [
            "styczeń",
            "luty",
            "marzec",
            "kwiecień",
            "maj",
            "czerwiec",
            "lipiec",
            "sierpień",
            "wrzesień",
            "październik",
            "listopad",
            "grudzień",
        ];
    };
    return pl;
}());
exports.pl = pl;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.pt_BR = void 0;
var pt_BR = (function () {
    function pt_BR() {
    }
    pt_BR.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return null;
    };
    pt_BR.prototype.atX0MinutesPastTheHourGt20 = function () {
        return null;
    };
    pt_BR.prototype.commaMonthX0ThroughMonthX1 = function () {
        return null;
    };
    pt_BR.prototype.commaYearX0ThroughYearX1 = function () {
        return null;
    };
    pt_BR.prototype.use24HourTimeFormatByDefault = function () {
        return false;
    };
    pt_BR.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "Ocorreu um erro ao gerar a descrição da expressão Cron.";
    };
    pt_BR.prototype.at = function () {
        return "às";
    };
    pt_BR.prototype.atSpace = function () {
        return "às ";
    };
    pt_BR.prototype.atX0 = function () {
        return "Às %s";
    };
    pt_BR.prototype.atX0MinutesPastTheHour = function () {
        return "aos %s minutos da hora";
    };
    pt_BR.prototype.atX0SecondsPastTheMinute = function () {
        return "aos %s segundos do minuto";
    };
    pt_BR.prototype.betweenX0AndX1 = function () {
        return "entre %s e %s";
    };
    pt_BR.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", entre os dias %s e %s do mês";
    };
    pt_BR.prototype.commaEveryDay = function () {
        return ", a cada dia";
    };
    pt_BR.prototype.commaEveryX0Days = function () {
        return ", a cada %s dias";
    };
    pt_BR.prototype.commaEveryX0DaysOfTheWeek = function () {
        return ", a cada %s dias de semana";
    };
    pt_BR.prototype.commaEveryX0Months = function () {
        return ", a cada %s meses";
    };
    pt_BR.prototype.commaOnDayX0OfTheMonth = function () {
        return ", no dia %s do mês";
    };
    pt_BR.prototype.commaOnlyInX0 = function () {
        return ", somente em %s";
    };
    pt_BR.prototype.commaOnlyOnX0 = function () {
        return ", somente de %s";
    };
    pt_BR.prototype.commaAndOnX0 = function () {
        return ", e de %s";
    };
    pt_BR.prototype.commaOnThe = function () {
        return ", na ";
    };
    pt_BR.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", no último dia do mês";
    };
    pt_BR.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", no último dia da semana do mês";
    };
    pt_BR.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
        return ", %s dias antes do último dia do mês";
    };
    pt_BR.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", na última %s do mês";
    };
    pt_BR.prototype.commaOnTheX0OfTheMonth = function () {
        return ", no %s do mês";
    };
    pt_BR.prototype.commaX0ThroughX1 = function () {
        return ", de %s a %s";
    };
    pt_BR.prototype.everyHour = function () {
        return "a cada hora";
    };
    pt_BR.prototype.everyMinute = function () {
        return "a cada minuto";
    };
    pt_BR.prototype.everyMinuteBetweenX0AndX1 = function () {
        return "a cada minuto entre %s e %s";
    };
    pt_BR.prototype.everySecond = function () {
        return "a cada segundo";
    };
    pt_BR.prototype.everyX0Hours = function () {
        return "a cada %s horas";
    };
    pt_BR.prototype.everyX0Minutes = function () {
        return "a cada %s minutos";
    };
    pt_BR.prototype.everyX0Seconds = function () {
        return "a cada %s segundos";
    };
    pt_BR.prototype.fifth = function () {
        return "quinta";
    };
    pt_BR.prototype.first = function () {
        return "primeira";
    };
    pt_BR.prototype.firstWeekday = function () {
        return "primeiro dia da semana";
    };
    pt_BR.prototype.fourth = function () {
        return "quarta";
    };
    pt_BR.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "do minuto %s até %s de cada hora";
    };
    pt_BR.prototype.second = function () {
        return "segunda";
    };
    pt_BR.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "No segundo %s até %s de cada minuto";
    };
    pt_BR.prototype.spaceAnd = function () {
        return " e";
    };
    pt_BR.prototype.spaceX0OfTheMonth = function () {
        return " %s do mês";
    };
    pt_BR.prototype.lastDay = function () {
        return "o último dia";
    };
    pt_BR.prototype.third = function () {
        return "terceira";
    };
    pt_BR.prototype.weekdayNearestDayX0 = function () {
        return "dia da semana mais próximo do dia %s";
    };
    pt_BR.prototype.commaEveryX0Years = function () {
        return ", a cada %s anos";
    };
    pt_BR.prototype.commaStartingX0 = function () {
        return ", iniciando %s";
    };
    pt_BR.prototype.daysOfTheWeek = function () {
        return ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"];
    };
    pt_BR.prototype.monthsOfTheYear = function () {
        return [
            "janeiro",
            "fevereiro",
            "março",
            "abril",
            "maio",
            "junho",
            "julho",
            "agosto",
            "setembro",
            "outubro",
            "novembro",
            "dezembro",
        ];
    };
    return pt_BR;
}());
exports.pt_BR = pt_BR;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.ro = void 0;
var ro = (function () {
    function ro() {
    }
    ro.prototype.use24HourTimeFormatByDefault = function () {
        return true;
    };
    ro.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "Eroare la generarea descrierii. Verificați sintaxa.";
    };
    ro.prototype.at = function () {
        return "La";
    };
    ro.prototype.atSpace = function () {
        return "La ";
    };
    ro.prototype.atX0 = function () {
        return "la %s";
    };
    ro.prototype.atX0MinutesPastTheHour = function () {
        return "la și %s minute";
    };
    ro.prototype.atX0SecondsPastTheMinute = function () {
        return "la și %s secunde";
    };
    ro.prototype.betweenX0AndX1 = function () {
        return "între %s și %s";
    };
    ro.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", între zilele %s și %s ale lunii";
    };
    ro.prototype.commaEveryDay = function () {
        return ", în fiecare zi";
    };
    ro.prototype.commaEveryX0Days = function () {
        return ", la fiecare %s zile";
    };
    ro.prototype.commaEveryX0DaysOfTheWeek = function () {
        return ", la fiecare a %s-a zi a săptămânii";
    };
    ro.prototype.commaEveryX0Months = function () {
        return ", la fiecare %s luni";
    };
    ro.prototype.commaEveryX0Years = function () {
        return ", o dată la %s ani";
    };
    ro.prototype.commaOnDayX0OfTheMonth = function () {
        return ", în ziua %s a lunii";
    };
    ro.prototype.commaOnlyInX0 = function () {
        return ", doar în %s";
    };
    ro.prototype.commaOnlyOnX0 = function () {
        return ", doar %s";
    };
    ro.prototype.commaAndOnX0 = function () {
        return ", și %s";
    };
    ro.prototype.commaOnThe = function () {
        return ", în ";
    };
    ro.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", în ultima zi a lunii";
    };
    ro.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", în ultima zi lucrătoare a lunii";
    };
    ro.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
        return ", %s zile înainte de ultima zi a lunii";
    };
    ro.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", în ultima %s a lunii";
    };
    ro.prototype.commaOnTheX0OfTheMonth = function () {
        return ", în %s a lunii";
    };
    ro.prototype.commaX0ThroughX1 = function () {
        return ", de %s până %s";
    };
    ro.prototype.everyHour = function () {
        return "în fiecare oră";
    };
    ro.prototype.everyMinute = function () {
        return "în fiecare minut";
    };
    ro.prototype.everyMinuteBetweenX0AndX1 = function () {
        return "În fiecare minut între %s și %s";
    };
    ro.prototype.everySecond = function () {
        return "în fiecare secundă";
    };
    ro.prototype.everyX0Hours = function () {
        return "la fiecare %s ore";
    };
    ro.prototype.everyX0Minutes = function () {
        return "la fiecare %s minute";
    };
    ro.prototype.everyX0Seconds = function () {
        return "la fiecare %s secunde";
    };
    ro.prototype.fifth = function () {
        return "a cincea";
    };
    ro.prototype.first = function () {
        return "prima";
    };
    ro.prototype.firstWeekday = function () {
        return "prima zi a săptămânii";
    };
    ro.prototype.fourth = function () {
        return "a patra";
    };
    ro.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "între minutele %s și %s";
    };
    ro.prototype.second = function () {
        return "a doua";
    };
    ro.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "între secunda %s și secunda %s";
    };
    ro.prototype.spaceAnd = function () {
        return " și";
    };
    ro.prototype.spaceX0OfTheMonth = function () {
        return " %s a lunii";
    };
    ro.prototype.lastDay = function () {
        return "ultima zi";
    };
    ro.prototype.third = function () {
        return "a treia";
    };
    ro.prototype.weekdayNearestDayX0 = function () {
        return "cea mai apropiată zi a săptămânii de ziua %s";
    };
    ro.prototype.commaMonthX0ThroughMonthX1 = function () {
        return ", din %s până în %s";
    };
    ro.prototype.commaYearX0ThroughYearX1 = function () {
        return ", din %s până în %s";
    };
    ro.prototype.atX0MinutesPastTheHourGt20 = function () {
        return "la și %s de minute";
    };
    ro.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return "la și %s de secunde";
    };
    ro.prototype.commaStartingX0 = function () {
        return ", pornire %s";
    };
    ro.prototype.daysOfTheWeek = function () {
        return ["duminică", "luni", "marți", "miercuri", "joi", "vineri", "sâmbătă"];
    };
    ro.prototype.monthsOfTheYear = function () {
        return [
            "ianuarie",
            "februarie",
            "martie",
            "aprilie",
            "mai",
            "iunie",
            "iulie",
            "august",
            "septembrie",
            "octombrie",
            "noiembrie",
            "decembrie",
        ];
    };
    return ro;
}());
exports.ro = ro;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.ru = void 0;
var ru = (function () {
    function ru() {
    }
    ru.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return null;
    };
    ru.prototype.atX0MinutesPastTheHourGt20 = function () {
        return null;
    };
    ru.prototype.commaMonthX0ThroughMonthX1 = function () {
        return null;
    };
    ru.prototype.commaYearX0ThroughYearX1 = function () {
        return null;
    };
    ru.prototype.use24HourTimeFormatByDefault = function () {
        return true;
    };
    ru.prototype.everyMinute = function () {
        return "каждую минуту";
    };
    ru.prototype.everyHour = function () {
        return "каждый час";
    };
    ru.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "Произошла ошибка во время генерации описания выражения. Проверьте синтаксис крон-выражения.";
    };
    ru.prototype.atSpace = function () {
        return "В ";
    };
    ru.prototype.everyMinuteBetweenX0AndX1 = function () {
        return "Каждую минуту с %s по %s";
    };
    ru.prototype.at = function () {
        return "В";
    };
    ru.prototype.spaceAnd = function () {
        return " и";
    };
    ru.prototype.everySecond = function () {
        return "каждую секунду";
    };
    ru.prototype.everyX0Seconds = function () {
        return "каждые %s секунд";
    };
    ru.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "секунды с %s по %s";
    };
    ru.prototype.atX0SecondsPastTheMinute = function () {
        return "в %s секунд";
    };
    ru.prototype.everyX0Minutes = function () {
        return "каждые %s минут";
    };
    ru.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "минуты с %s по %s";
    };
    ru.prototype.atX0MinutesPastTheHour = function () {
        return "в %s минут";
    };
    ru.prototype.everyX0Hours = function () {
        return "каждые %s часов";
    };
    ru.prototype.betweenX0AndX1 = function () {
        return "с %s по %s";
    };
    ru.prototype.atX0 = function () {
        return "в %s";
    };
    ru.prototype.commaEveryDay = function () {
        return ", каждый день";
    };
    ru.prototype.commaEveryX0DaysOfTheWeek = function () {
        return ", каждые %s дней недели";
    };
    ru.prototype.commaX0ThroughX1 = function () {
        return ", %s по %s";
    };
    ru.prototype.first = function () {
        return "первый";
    };
    ru.prototype.second = function () {
        return "второй";
    };
    ru.prototype.third = function () {
        return "третий";
    };
    ru.prototype.fourth = function () {
        return "четвертый";
    };
    ru.prototype.fifth = function () {
        return "пятый";
    };
    ru.prototype.commaOnThe = function () {
        return ", в ";
    };
    ru.prototype.spaceX0OfTheMonth = function () {
        return " %s месяца";
    };
    ru.prototype.lastDay = function () {
        return "последний день";
    };
    ru.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", в последний %s месяца";
    };
    ru.prototype.commaOnlyOnX0 = function () {
        return ", только в %s";
    };
    ru.prototype.commaAndOnX0 = function () {
        return ", и в %s";
    };
    ru.prototype.commaEveryX0Months = function () {
        return ", каждые %s месяцев";
    };
    ru.prototype.commaOnlyInX0 = function () {
        return ", только в %s";
    };
    ru.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", в последний день месяца";
    };
    ru.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", в последний будний день месяца";
    };
    ru.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
        return ", %s дней до последнего дня месяца";
    };
    ru.prototype.firstWeekday = function () {
        return "первый будний день";
    };
    ru.prototype.weekdayNearestDayX0 = function () {
        return "ближайший будний день к %s";
    };
    ru.prototype.commaOnTheX0OfTheMonth = function () {
        return ", в %s месяца";
    };
    ru.prototype.commaEveryX0Days = function () {
        return ", каждые %s дней";
    };
    ru.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", с %s по %s число месяца";
    };
    ru.prototype.commaOnDayX0OfTheMonth = function () {
        return ", в %s число месяца";
    };
    ru.prototype.commaEveryX0Years = function () {
        return ", каждые %s лет";
    };
    ru.prototype.commaStartingX0 = function () {
        return ", начало %s";
    };
    ru.prototype.daysOfTheWeek = function () {
        return ["воскресенье", "понедельник", "вторник", "среда", "четверг", "пятница", "суббота"];
    };
    ru.prototype.monthsOfTheYear = function () {
        return [
            "январь",
            "февраль",
            "март",
            "апрель",
            "май",
            "июнь",
            "июль",
            "август",
            "сентябрь",
            "октябрь",
            "ноябрь",
            "декабрь",
        ];
    };
    return ru;
}());
exports.ru = ru;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.tr = void 0;
var tr = (function () {
    function tr() {
    }
    tr.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return null;
    };
    tr.prototype.atX0MinutesPastTheHourGt20 = function () {
        return null;
    };
    tr.prototype.commaMonthX0ThroughMonthX1 = function () {
        return null;
    };
    tr.prototype.commaYearX0ThroughYearX1 = function () {
        return null;
    };
    tr.prototype.use24HourTimeFormatByDefault = function () {
        return true;
    };
    tr.prototype.everyMinute = function () {
        return "her dakika";
    };
    tr.prototype.everyHour = function () {
        return "her saat";
    };
    tr.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "İfade açıklamasını oluştururken bir hata oluştu. Cron ifadesini gözden geçirin.";
    };
    tr.prototype.atSpace = function () {
        return "Saat ";
    };
    tr.prototype.everyMinuteBetweenX0AndX1 = function () {
        return "Saat %s ve %s arasındaki her dakika";
    };
    tr.prototype.at = function () {
        return "Saat";
    };
    tr.prototype.spaceAnd = function () {
        return " ve";
    };
    tr.prototype.everySecond = function () {
        return "her saniye";
    };
    tr.prototype.everyX0Seconds = function () {
        return "her %s saniyede bir";
    };
    tr.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "dakikaların %s. ve %s. saniyeleri arası";
    };
    tr.prototype.atX0SecondsPastTheMinute = function () {
        return "dakikaların %s. saniyesinde";
    };
    tr.prototype.everyX0Minutes = function () {
        return "her %s dakikada bir";
    };
    tr.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "saatlerin %s. ve %s. dakikaları arası";
    };
    tr.prototype.atX0MinutesPastTheHour = function () {
        return "saatlerin %s. dakikasında";
    };
    tr.prototype.everyX0Hours = function () {
        return "her %s saatte";
    };
    tr.prototype.betweenX0AndX1 = function () {
        return "%s ile %s arasında";
    };
    tr.prototype.atX0 = function () {
        return "saat %s";
    };
    tr.prototype.commaEveryDay = function () {
        return ", her gün";
    };
    tr.prototype.commaEveryX0DaysOfTheWeek = function () {
        return ", ayın her %s günü";
    };
    tr.prototype.commaX0ThroughX1 = function () {
        return ", %s ile %s arasında";
    };
    tr.prototype.first = function () {
        return "ilk";
    };
    tr.prototype.second = function () {
        return "ikinci";
    };
    tr.prototype.third = function () {
        return "üçüncü";
    };
    tr.prototype.fourth = function () {
        return "dördüncü";
    };
    tr.prototype.fifth = function () {
        return "beşinci";
    };
    tr.prototype.commaOnThe = function () {
        return ", ayın ";
    };
    tr.prototype.spaceX0OfTheMonth = function () {
        return " %s günü";
    };
    tr.prototype.lastDay = function () {
        return "son gün";
    };
    tr.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", ayın son %s günü";
    };
    tr.prototype.commaOnlyOnX0 = function () {
        return ", sadece %s günü";
    };
    tr.prototype.commaAndOnX0 = function () {
        return ", ve %s";
    };
    tr.prototype.commaEveryX0Months = function () {
        return ", %s ayda bir";
    };
    tr.prototype.commaOnlyInX0 = function () {
        return ", sadece %s için";
    };
    tr.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", ayın son günü";
    };
    tr.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", ayın son iş günü";
    };
    tr.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
        return ", %s ayın son gününden önceki günler";
    };
    tr.prototype.firstWeekday = function () {
        return "ilk iş günü";
    };
    tr.prototype.weekdayNearestDayX0 = function () {
        return "%s. günü sonrasındaki ilk iş günü";
    };
    tr.prototype.commaOnTheX0OfTheMonth = function () {
        return ", ayın %s";
    };
    tr.prototype.commaEveryX0Days = function () {
        return ", %s günde bir";
    };
    tr.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", ayın %s. ve %s. günleri arası";
    };
    tr.prototype.commaOnDayX0OfTheMonth = function () {
        return ", ayın %s. günü";
    };
    tr.prototype.commaEveryX0Years = function () {
        return ", %s yılda bir";
    };
    tr.prototype.commaStartingX0 = function () {
        return ", başlangıç %s";
    };
    tr.prototype.daysOfTheWeek = function () {
        return ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];
    };
    tr.prototype.monthsOfTheYear = function () {
        return [
            "Ocak",
            "Şubat",
            "Mart",
            "Nisan",
            "Mayıs",
            "Haziran",
            "Temmuz",
            "Ağustos",
            "Eylül",
            "Ekim",
            "Kasım",
            "Aralık",
        ];
    };
    return tr;
}());
exports.tr = tr;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.uk = void 0;
var uk = (function () {
    function uk() {
    }
    uk.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return null;
    };
    uk.prototype.atX0MinutesPastTheHourGt20 = function () {
        return null;
    };
    uk.prototype.commaMonthX0ThroughMonthX1 = function () {
        return null;
    };
    uk.prototype.commaYearX0ThroughYearX1 = function () {
        return null;
    };
    uk.prototype.use24HourTimeFormatByDefault = function () {
        return true;
    };
    uk.prototype.everyMinute = function () {
        return "щохвилини";
    };
    uk.prototype.everyHour = function () {
        return "щогодини";
    };
    uk.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "ВІдбулася помилка підчас генерації опису. Перевірта правильність написання cron виразу.";
    };
    uk.prototype.atSpace = function () {
        return "О ";
    };
    uk.prototype.everyMinuteBetweenX0AndX1 = function () {
        return "Щохвилини між %s та %s";
    };
    uk.prototype.at = function () {
        return "О";
    };
    uk.prototype.spaceAnd = function () {
        return " та";
    };
    uk.prototype.everySecond = function () {
        return "Щосекунди";
    };
    uk.prototype.everyX0Seconds = function () {
        return "кожні %s секунд";
    };
    uk.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "з %s по %s секунду";
    };
    uk.prototype.atX0SecondsPastTheMinute = function () {
        return "о %s секунді";
    };
    uk.prototype.everyX0Minutes = function () {
        return "кожні %s хвилин";
    };
    uk.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "з %s по %s хвилину";
    };
    uk.prototype.atX0MinutesPastTheHour = function () {
        return "о %s хвилині";
    };
    uk.prototype.everyX0Hours = function () {
        return "кожні %s годин";
    };
    uk.prototype.betweenX0AndX1 = function () {
        return "між %s та %s";
    };
    uk.prototype.atX0 = function () {
        return "о %s";
    };
    uk.prototype.commaEveryDay = function () {
        return ", щоденно";
    };
    uk.prototype.commaEveryX0DaysOfTheWeek = function () {
        return ", кожен %s день тижня";
    };
    uk.prototype.commaX0ThroughX1 = function () {
        return ", %s по %s";
    };
    uk.prototype.first = function () {
        return "перший";
    };
    uk.prototype.second = function () {
        return "другий";
    };
    uk.prototype.third = function () {
        return "третій";
    };
    uk.prototype.fourth = function () {
        return "четвертий";
    };
    uk.prototype.fifth = function () {
        return "п'ятий";
    };
    uk.prototype.commaOnThe = function () {
        return ", в ";
    };
    uk.prototype.spaceX0OfTheMonth = function () {
        return " %s місяця";
    };
    uk.prototype.lastDay = function () {
        return "останній день";
    };
    uk.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", в останній %s місяця";
    };
    uk.prototype.commaOnlyOnX0 = function () {
        return ", тільки в %s";
    };
    uk.prototype.commaAndOnX0 = function () {
        return ", і в %s";
    };
    uk.prototype.commaEveryX0Months = function () {
        return ", кожен %s місяць";
    };
    uk.prototype.commaOnlyInX0 = function () {
        return ", тільки в %s";
    };
    uk.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", в останній день місяця";
    };
    uk.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", в останній будень місяця";
    };
    uk.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
        return ", %s днів до останнього дня місяця";
    };
    uk.prototype.firstWeekday = function () {
        return "перший будень";
    };
    uk.prototype.weekdayNearestDayX0 = function () {
        return "будень найближчий до %s дня";
    };
    uk.prototype.commaOnTheX0OfTheMonth = function () {
        return ", в %s місяця";
    };
    uk.prototype.commaEveryX0Days = function () {
        return ", кожен %s день";
    };
    uk.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", між %s та %s днями місяця";
    };
    uk.prototype.commaOnDayX0OfTheMonth = function () {
        return ", на %s день місяця";
    };
    uk.prototype.commaEveryX0Years = function () {
        return ", кожні %s роки";
    };
    uk.prototype.commaStartingX0 = function () {
        return ", початок %s";
    };
    uk.prototype.daysOfTheWeek = function () {
        return ["неділя", "понеділок", "вівторок", "середа", "четвер", "п'ятниця", "субота"];
    };
    uk.prototype.monthsOfTheYear = function () {
        return [
            "січень",
            "лютий",
            "березень",
            "квітень",
            "травень",
            "червень",
            "липень",
            "серпень",
            "вересень",
            "жовтень",
            "листопад",
            "грудень",
        ];
    };
    return uk;
}());
exports.uk = uk;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.zh_CN = void 0;
var zh_CN = (function () {
    function zh_CN() {
    }
    zh_CN.prototype.setPeriodBeforeTime = function () {
        return true;
    };
    zh_CN.prototype.pm = function () {
        return "下午";
    };
    zh_CN.prototype.am = function () {
        return "上午";
    };
    zh_CN.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return null;
    };
    zh_CN.prototype.atX0MinutesPastTheHourGt20 = function () {
        return null;
    };
    zh_CN.prototype.commaMonthX0ThroughMonthX1 = function () {
        return null;
    };
    zh_CN.prototype.commaYearX0ThroughYearX1 = function () {
        return ", 从%s年至%s年";
    };
    zh_CN.prototype.use24HourTimeFormatByDefault = function () {
        return false;
    };
    zh_CN.prototype.everyMinute = function () {
        return "每分钟";
    };
    zh_CN.prototype.everyHour = function () {
        return "每小时";
    };
    zh_CN.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "生成表达式描述时发生了错误，请检查cron表达式语法。";
    };
    zh_CN.prototype.atSpace = function () {
        return "在";
    };
    zh_CN.prototype.everyMinuteBetweenX0AndX1 = function () {
        return "在 %s 至 %s 之间的每分钟";
    };
    zh_CN.prototype.at = function () {
        return "在";
    };
    zh_CN.prototype.spaceAnd = function () {
        return " 和";
    };
    zh_CN.prototype.everySecond = function () {
        return "每秒";
    };
    zh_CN.prototype.everyX0Seconds = function () {
        return "每隔 %s 秒";
    };
    zh_CN.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "在每分钟的第 %s 到 %s 秒";
    };
    zh_CN.prototype.atX0SecondsPastTheMinute = function () {
        return "在每分钟的第 %s 秒";
    };
    zh_CN.prototype.everyX0Minutes = function () {
        return "每隔 %s 分钟";
    };
    zh_CN.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "在每小时的第 %s 到 %s 分钟";
    };
    zh_CN.prototype.atX0MinutesPastTheHour = function () {
        return "在每小时的第 %s 分钟";
    };
    zh_CN.prototype.everyX0Hours = function () {
        return "每隔 %s 小时";
    };
    zh_CN.prototype.betweenX0AndX1 = function () {
        return "在 %s 和 %s 之间";
    };
    zh_CN.prototype.atX0 = function () {
        return "在%s";
    };
    zh_CN.prototype.commaEveryDay = function () {
        return ", 每天";
    };
    zh_CN.prototype.commaEveryX0DaysOfTheWeek = function () {
        return ", 每周的每 %s 天";
    };
    zh_CN.prototype.commaX0ThroughX1 = function () {
        return ", %s至%s";
    };
    zh_CN.prototype.first = function () {
        return "第一个";
    };
    zh_CN.prototype.second = function () {
        return "第二个";
    };
    zh_CN.prototype.third = function () {
        return "第三个";
    };
    zh_CN.prototype.fourth = function () {
        return "第四个";
    };
    zh_CN.prototype.fifth = function () {
        return "第五个";
    };
    zh_CN.prototype.commaOnThe = function () {
        return ", 限每月的";
    };
    zh_CN.prototype.spaceX0OfTheMonth = function () {
        return "%s";
    };
    zh_CN.prototype.lastDay = function () {
        return "本月最后一天";
    };
    zh_CN.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", 限每月的最后一个%s";
    };
    zh_CN.prototype.commaOnlyOnX0 = function () {
        return ", 仅%s";
    };
    zh_CN.prototype.commaAndOnX0 = function () {
        return ", 并且为%s";
    };
    zh_CN.prototype.commaEveryX0Months = function () {
        return ", 每隔 %s 个月";
    };
    zh_CN.prototype.commaOnlyInX0 = function () {
        return ", 仅限%s";
    };
    zh_CN.prototype.commaOnlyInMonthX0 = function () {
        return ", 仅于%s份";
    };
    zh_CN.prototype.commaOnlyInYearX0 = function () {
        return ", 仅于 %s 年";
    };
    zh_CN.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", 限每月的最后一天";
    };
    zh_CN.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", 限每月的最后一个工作日";
    };
    zh_CN.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
        return ", 限每月最后%s天";
    };
    zh_CN.prototype.firstWeekday = function () {
        return "第一个工作日";
    };
    zh_CN.prototype.weekdayNearestDayX0 = function () {
        return "最接近 %s 号的工作日";
    };
    zh_CN.prototype.commaOnTheX0OfTheMonth = function () {
        return ", 限每月的%s";
    };
    zh_CN.prototype.commaEveryX0Days = function () {
        return ", 每隔 %s 天";
    };
    zh_CN.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", 限每月的 %s 至 %s 之间";
    };
    zh_CN.prototype.commaOnDayX0OfTheMonth = function () {
        return ", 限每月%s";
    };
    zh_CN.prototype.commaEveryX0Years = function () {
        return ", 每隔 %s 年";
    };
    zh_CN.prototype.commaStartingX0 = function () {
        return ", %s开始";
    };
    zh_CN.prototype.dayX0 = function () {
        return " %s 号";
    };
    zh_CN.prototype.daysOfTheWeek = function () {
        return ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    };
    zh_CN.prototype.monthsOfTheYear = function () {
        return ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
    };
    return zh_CN;
}());
exports.zh_CN = zh_CN;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.zh_TW = void 0;
var zh_TW = (function () {
    function zh_TW() {
    }
    zh_TW.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return null;
    };
    zh_TW.prototype.atX0MinutesPastTheHourGt20 = function () {
        return null;
    };
    zh_TW.prototype.commaMonthX0ThroughMonthX1 = function () {
        return null;
    };
    zh_TW.prototype.commaYearX0ThroughYearX1 = function () {
        return ", 从%s年至%s年";
    };
    zh_TW.prototype.use24HourTimeFormatByDefault = function () {
        return false;
    };
    zh_TW.prototype.everyMinute = function () {
        return "每分鐘";
    };
    zh_TW.prototype.everyHour = function () {
        return "每小時";
    };
    zh_TW.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "產生正規表達式描述時發生了錯誤，請檢查 cron 表達式語法。";
    };
    zh_TW.prototype.atSpace = function () {
        return "在 ";
    };
    zh_TW.prototype.everyMinuteBetweenX0AndX1 = function () {
        return "在 %s 和 %s 之間的每分鐘";
    };
    zh_TW.prototype.at = function () {
        return "在";
    };
    zh_TW.prototype.spaceAnd = function () {
        return " 和";
    };
    zh_TW.prototype.everySecond = function () {
        return "每秒";
    };
    zh_TW.prototype.everyX0Seconds = function () {
        return "每 %s 秒";
    };
    zh_TW.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "在每分鐘的 %s 到 %s 秒";
    };
    zh_TW.prototype.atX0SecondsPastTheMinute = function () {
        return "在每分鐘的 %s 秒";
    };
    zh_TW.prototype.everyX0Minutes = function () {
        return "每 %s 分鐘";
    };
    zh_TW.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "在每小時的 %s 到 %s 分鐘";
    };
    zh_TW.prototype.atX0MinutesPastTheHour = function () {
        return "在每小時的 %s 分";
    };
    zh_TW.prototype.everyX0Hours = function () {
        return "每 %s 小時";
    };
    zh_TW.prototype.betweenX0AndX1 = function () {
        return "在 %s 和 %s 之間";
    };
    zh_TW.prototype.atX0 = function () {
        return "在 %s";
    };
    zh_TW.prototype.commaEveryDay = function () {
        return ", 每天";
    };
    zh_TW.prototype.commaEveryX0DaysOfTheWeek = function () {
        return ", 每週的每 %s 天";
    };
    zh_TW.prototype.commaX0ThroughX1 = function () {
        return ", %s 到 %s";
    };
    zh_TW.prototype.first = function () {
        return "第一個";
    };
    zh_TW.prototype.second = function () {
        return "第二個";
    };
    zh_TW.prototype.third = function () {
        return "第三個";
    };
    zh_TW.prototype.fourth = function () {
        return "第四個";
    };
    zh_TW.prototype.fifth = function () {
        return "第五個";
    };
    zh_TW.prototype.commaOnThe = function () {
        return ", 在每月 ";
    };
    zh_TW.prototype.spaceX0OfTheMonth = function () {
        return "%s ";
    };
    zh_TW.prototype.lastDay = function () {
        return "最後一天";
    };
    zh_TW.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", 每月的最後一個 %s ";
    };
    zh_TW.prototype.commaOnlyOnX0 = function () {
        return ", 僅在 %s";
    };
    zh_TW.prototype.commaAndOnX0 = function () {
        return ", 和 %s";
    };
    zh_TW.prototype.commaEveryX0Months = function () {
        return ", 每 %s 月";
    };
    zh_TW.prototype.commaOnlyInX0 = function () {
        return ", 僅在 %s";
    };
    zh_TW.prototype.commaOnlyInMonthX0 = function () {
        return ", 僅在%s";
    };
    zh_TW.prototype.commaOnlyInYearX0 = function () {
        return ", 僅在 %s 年";
    };
    zh_TW.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", 每月的最後一天";
    };
    zh_TW.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", 每月的最後一個工作日";
    };
    zh_TW.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
        return ", %s 這個月的最後一天的前幾天";
    };
    zh_TW.prototype.firstWeekday = function () {
        return "第一個工作日";
    };
    zh_TW.prototype.weekdayNearestDayX0 = function () {
        return "最接近 %s 號的工作日";
    };
    zh_TW.prototype.commaOnTheX0OfTheMonth = function () {
        return ", 每月的 %s ";
    };
    zh_TW.prototype.commaEveryX0Days = function () {
        return ", 每 %s 天";
    };
    zh_TW.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", 在每月的 %s 和 %s 之間";
    };
    zh_TW.prototype.commaOnDayX0OfTheMonth = function () {
        return ", 每月的 %s";
    };
    zh_TW.prototype.commaEveryX0Years = function () {
        return ", 每 %s 年";
    };
    zh_TW.prototype.commaStartingX0 = function () {
        return ", %s 開始";
    };
    zh_TW.prototype.dayX0 = function () {
        return " %s 號";
    };
    zh_TW.prototype.daysOfTheWeek = function () {
        return ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    };
    zh_TW.prototype.monthsOfTheYear = function () {
        return ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
    };
    return zh_TW;
}());
exports.zh_TW = zh_TW;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.ja = void 0;
var ja = (function () {
    function ja() {
    }
    ja.prototype.use24HourTimeFormatByDefault = function () {
        return false;
    };
    ja.prototype.everyMinute = function () {
        return "毎分";
    };
    ja.prototype.everyHour = function () {
        return "毎時";
    };
    ja.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "式の記述を生成する際にエラーが発生しました。Cron 式の構文を確認してください。";
    };
    ja.prototype.atSpace = function () {
        return "次において実施";
    };
    ja.prototype.everyMinuteBetweenX0AndX1 = function () {
        return "%s から %s まで毎分";
    };
    ja.prototype.at = function () {
        return "次において実施";
    };
    ja.prototype.spaceAnd = function () {
        return "と";
    };
    ja.prototype.everySecond = function () {
        return "毎秒";
    };
    ja.prototype.everyX0Seconds = function () {
        return "%s 秒ごと";
    };
    ja.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "毎分 %s 秒から %s 秒まで";
    };
    ja.prototype.atX0SecondsPastTheMinute = function () {
        return "毎分 %s 秒過ぎ";
    };
    ja.prototype.everyX0Minutes = function () {
        return "%s 分ごと";
    };
    ja.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "毎時 %s 分から %s 分まで";
    };
    ja.prototype.atX0MinutesPastTheHour = function () {
        return "毎時 %s 分過ぎ";
    };
    ja.prototype.everyX0Hours = function () {
        return "%s 時間ごと";
    };
    ja.prototype.betweenX0AndX1 = function () {
        return "%s と %s の間";
    };
    ja.prototype.atX0 = function () {
        return "次において実施 %s";
    };
    ja.prototype.commaEveryDay = function () {
        return "、毎日";
    };
    ja.prototype.commaEveryX0DaysOfTheWeek = function () {
        return "、週のうち %s 日ごと";
    };
    ja.prototype.commaX0ThroughX1 = function () {
        return "、%s から %s まで";
    };
    ja.prototype.first = function () {
        return "1 番目";
    };
    ja.prototype.second = function () {
        return "2 番目";
    };
    ja.prototype.third = function () {
        return "3 番目";
    };
    ja.prototype.fourth = function () {
        return "4 番目";
    };
    ja.prototype.fifth = function () {
        return "5 番目";
    };
    ja.prototype.commaOnThe = function () {
        return "次に";
    };
    ja.prototype.spaceX0OfTheMonth = function () {
        return "月のうち %s";
    };
    ja.prototype.commaOnTheLastX0OfTheMonth = function () {
        return "月の最後の %s に";
    };
    ja.prototype.commaOnlyOnX0 = function () {
        return "%s にのみ";
    };
    ja.prototype.commaEveryX0Months = function () {
        return "、%s か月ごと";
    };
    ja.prototype.commaOnlyInX0 = function () {
        return "%s でのみ";
    };
    ja.prototype.commaOnTheLastDayOfTheMonth = function () {
        return "次の最終日に";
    };
    ja.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return "月の最後の平日に";
    };
    ja.prototype.firstWeekday = function () {
        return "最初の平日";
    };
    ja.prototype.weekdayNearestDayX0 = function () {
        return "%s 日の直近の平日";
    };
    ja.prototype.commaOnTheX0OfTheMonth = function () {
        return "月の %s に";
    };
    ja.prototype.commaEveryX0Days = function () {
        return "、%s 日ごと";
    };
    ja.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return "、月の %s 日から %s 日の間";
    };
    ja.prototype.commaOnDayX0OfTheMonth = function () {
        return "、月の %s 日目";
    };
    ja.prototype.spaceAndSpace = function () {
        return "と";
    };
    ja.prototype.commaEveryMinute = function () {
        return "、毎分";
    };
    ja.prototype.commaEveryHour = function () {
        return "、毎時";
    };
    ja.prototype.commaEveryX0Years = function () {
        return "、%s 年ごと";
    };
    ja.prototype.commaStartingX0 = function () {
        return "、%s に開始";
    };
    ja.prototype.aMPeriod = function () {
        return "AM";
    };
    ja.prototype.pMPeriod = function () {
        return "PM";
    };
    ja.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
        return "月の最終日の %s 日前";
    };
    ja.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return null;
    };
    ja.prototype.atX0MinutesPastTheHourGt20 = function () {
        return null;
    };
    ja.prototype.commaMonthX0ThroughMonthX1 = function () {
        return null;
    };
    ja.prototype.commaYearX0ThroughYearX1 = function () {
        return null;
    };
    ja.prototype.lastDay = function () {
        return "最終日";
    };
    ja.prototype.commaAndOnX0 = function () {
        return "、〜と %s";
    };
    ja.prototype.daysOfTheWeek = function () {
        return ["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"];
    };
    ja.prototype.monthsOfTheYear = function () {
        return ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
    };
    return ja;
}());
exports.ja = ja;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.he = void 0;
var he = (function () {
    function he() {
    }
    he.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return null;
    };
    he.prototype.atX0MinutesPastTheHourGt20 = function () {
        return null;
    };
    he.prototype.commaMonthX0ThroughMonthX1 = function () {
        return null;
    };
    he.prototype.commaYearX0ThroughYearX1 = function () {
        return null;
    };
    he.prototype.use24HourTimeFormatByDefault = function () {
        return true;
    };
    he.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "אירעה שגיאה בעת יצירת תיאור הביטוי. בדוק את תחביר הביטוי cron.";
    };
    he.prototype.everyMinute = function () {
        return "כל דקה";
    };
    he.prototype.everyHour = function () {
        return "כל שעה";
    };
    he.prototype.atSpace = function () {
        return "ב ";
    };
    he.prototype.everyMinuteBetweenX0AndX1 = function () {
        return "כל דקה %s עד %s";
    };
    he.prototype.at = function () {
        return "ב";
    };
    he.prototype.spaceAnd = function () {
        return " ו";
    };
    he.prototype.everySecond = function () {
        return "כל שניה";
    };
    he.prototype.everyX0Seconds = function () {
        return "כל %s שניות";
    };
    he.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "%s עד %s שניות של הדקה";
    };
    he.prototype.atX0SecondsPastTheMinute = function () {
        return "ב %s שניות של הדקה";
    };
    he.prototype.everyX0Minutes = function () {
        return "כל %s דקות";
    };
    he.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "%s עד %s דקות של השעה";
    };
    he.prototype.atX0MinutesPastTheHour = function () {
        return "ב %s דקות של השעה";
    };
    he.prototype.everyX0Hours = function () {
        return "כל %s שעות";
    };
    he.prototype.betweenX0AndX1 = function () {
        return "%s עד %s";
    };
    he.prototype.atX0 = function () {
        return "ב %s";
    };
    he.prototype.commaEveryDay = function () {
        return ", כל יום";
    };
    he.prototype.commaEveryX0DaysOfTheWeek = function () {
        return ", כל %s ימים בשבוע";
    };
    he.prototype.commaX0ThroughX1 = function () {
        return ", %s עד %s";
    };
    he.prototype.first = function () {
        return "ראשון";
    };
    he.prototype.second = function () {
        return "שני";
    };
    he.prototype.third = function () {
        return "שלישי";
    };
    he.prototype.fourth = function () {
        return "רביעי";
    };
    he.prototype.fifth = function () {
        return "חמישי";
    };
    he.prototype.commaOnThe = function () {
        return ", ב ";
    };
    he.prototype.spaceX0OfTheMonth = function () {
        return " %s של החודש";
    };
    he.prototype.lastDay = function () {
        return "היום האחרון";
    };
    he.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", רק ב %s של החודש";
    };
    he.prototype.commaOnlyOnX0 = function () {
        return ", רק ב %s";
    };
    he.prototype.commaAndOnX0 = function () {
        return ", וב %s";
    };
    he.prototype.commaEveryX0Months = function () {
        return ", כל %s חודשים";
    };
    he.prototype.commaOnlyInX0 = function () {
        return ", רק ב %s";
    };
    he.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", ביום האחרון של החודש";
    };
    he.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", ביום החול האחרון של החודש";
    };
    he.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
        return ", %s ימים לפני היום האחרון בחודש";
    };
    he.prototype.firstWeekday = function () {
        return "יום החול הראשון";
    };
    he.prototype.weekdayNearestDayX0 = function () {
        return "יום החול הראשון הקרוב אל %s";
    };
    he.prototype.commaOnTheX0OfTheMonth = function () {
        return ", ביום ה%s של החודש";
    };
    he.prototype.commaEveryX0Days = function () {
        return ", כל %s ימים";
    };
    he.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", בין היום ה%s וה%s של החודש";
    };
    he.prototype.commaOnDayX0OfTheMonth = function () {
        return ", ביום ה%s של החודש";
    };
    he.prototype.commaEveryX0Years = function () {
        return ", כל %s שנים";
    };
    he.prototype.commaStartingX0 = function () {
        return ", החל מ %s";
    };
    he.prototype.daysOfTheWeek = function () {
        return ["יום ראשון", "יום שני", "יום שלישי", "יום רביעי", "יום חמישי", "יום שישי", "יום שבת"];
    };
    he.prototype.monthsOfTheYear = function () {
        return ["ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"];
    };
    return he;
}());
exports.he = he;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.cs = void 0;
var cs = (function () {
    function cs() {
    }
    cs.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return null;
    };
    cs.prototype.atX0MinutesPastTheHourGt20 = function () {
        return null;
    };
    cs.prototype.commaMonthX0ThroughMonthX1 = function () {
        return null;
    };
    cs.prototype.commaYearX0ThroughYearX1 = function () {
        return null;
    };
    cs.prototype.use24HourTimeFormatByDefault = function () {
        return true;
    };
    cs.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "Při vytváření popisu došlo k chybě. Zkontrolujte prosím správnost syntaxe cronu.";
    };
    cs.prototype.everyMinute = function () {
        return "každou minutu";
    };
    cs.prototype.everyHour = function () {
        return "každou hodinu";
    };
    cs.prototype.atSpace = function () {
        return "V ";
    };
    cs.prototype.everyMinuteBetweenX0AndX1 = function () {
        return "Každou minutu mezi %s a %s";
    };
    cs.prototype.at = function () {
        return "V";
    };
    cs.prototype.spaceAnd = function () {
        return " a";
    };
    cs.prototype.everySecond = function () {
        return "každou sekundu";
    };
    cs.prototype.everyX0Seconds = function () {
        return "každých %s sekund";
    };
    cs.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "sekundy od %s do %s";
    };
    cs.prototype.atX0SecondsPastTheMinute = function () {
        return "v %s sekund";
    };
    cs.prototype.everyX0Minutes = function () {
        return "každých %s minut";
    };
    cs.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "minuty od %s do %s";
    };
    cs.prototype.atX0MinutesPastTheHour = function () {
        return "v %s minut";
    };
    cs.prototype.everyX0Hours = function () {
        return "každých %s hodin";
    };
    cs.prototype.betweenX0AndX1 = function () {
        return "mezi %s a %s";
    };
    cs.prototype.atX0 = function () {
        return "v %s";
    };
    cs.prototype.commaEveryDay = function () {
        return ", každý den";
    };
    cs.prototype.commaEveryX0DaysOfTheWeek = function () {
        return ", každých %s dní v týdnu";
    };
    cs.prototype.commaX0ThroughX1 = function () {
        return ", od %s do %s";
    };
    cs.prototype.first = function () {
        return "první";
    };
    cs.prototype.second = function () {
        return "druhý";
    };
    cs.prototype.third = function () {
        return "třetí";
    };
    cs.prototype.fourth = function () {
        return "čtvrtý";
    };
    cs.prototype.fifth = function () {
        return "pátý";
    };
    cs.prototype.commaOnThe = function () {
        return ", ";
    };
    cs.prototype.spaceX0OfTheMonth = function () {
        return " %s v měsíci";
    };
    cs.prototype.lastDay = function () {
        return "poslední den";
    };
    cs.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", poslední %s v měsíci";
    };
    cs.prototype.commaOnlyOnX0 = function () {
        return ", pouze v %s";
    };
    cs.prototype.commaAndOnX0 = function () {
        return ", a v %s";
    };
    cs.prototype.commaEveryX0Months = function () {
        return ", každých %s měsíců";
    };
    cs.prototype.commaOnlyInX0 = function () {
        return ", pouze v %s";
    };
    cs.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", poslední den v měsíci";
    };
    cs.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", poslední pracovní den v měsíci";
    };
    cs.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
        return ", %s dní před posledním dnem v měsíci";
    };
    cs.prototype.firstWeekday = function () {
        return "první pracovní den";
    };
    cs.prototype.weekdayNearestDayX0 = function () {
        return "pracovní den nejblíže %s. dni";
    };
    cs.prototype.commaOnTheX0OfTheMonth = function () {
        return ", v %s v měsíci";
    };
    cs.prototype.commaEveryX0Days = function () {
        return ", každých %s dnů";
    };
    cs.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", mezi dny %s a %s v měsíci";
    };
    cs.prototype.commaOnDayX0OfTheMonth = function () {
        return ", %s. den v měsíci";
    };
    cs.prototype.commaEveryX0Years = function () {
        return ", každých %s roků";
    };
    cs.prototype.commaStartingX0 = function () {
        return ", začínající %s";
    };
    cs.prototype.daysOfTheWeek = function () {
        return ["Neděle", "Pondělí", "Úterý", "Středa", "Čtvrtek", "Pátek", "Sobota"];
    };
    cs.prototype.monthsOfTheYear = function () {
        return [
            "Leden",
            "Únor",
            "Březen",
            "Duben",
            "Květen",
            "Červen",
            "Červenec",
            "Srpen",
            "Září",
            "Říjen",
            "Listopad",
            "Prosinec",
        ];
    };
    return cs;
}());
exports.cs = cs;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.sk = void 0;
var sk = (function () {
    function sk() {
    }
    sk.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return null;
    };
    sk.prototype.atX0MinutesPastTheHourGt20 = function () {
        return null;
    };
    sk.prototype.commaMonthX0ThroughMonthX1 = function () {
        return null;
    };
    sk.prototype.commaYearX0ThroughYearX1 = function () {
        return null;
    };
    sk.prototype.use24HourTimeFormatByDefault = function () {
        return true;
    };
    sk.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "Pri vytváraní popisu došlo k chybe. Skontrolujte prosím správnosť syntaxe cronu.";
    };
    sk.prototype.everyMinute = function () {
        return "každú minútu";
    };
    sk.prototype.everyHour = function () {
        return "každú hodinu";
    };
    sk.prototype.atSpace = function () {
        return "V ";
    };
    sk.prototype.everyMinuteBetweenX0AndX1 = function () {
        return "Každú minútu medzi %s a %s";
    };
    sk.prototype.at = function () {
        return "V";
    };
    sk.prototype.spaceAnd = function () {
        return " a";
    };
    sk.prototype.everySecond = function () {
        return "každú sekundu";
    };
    sk.prototype.everyX0Seconds = function () {
        return "každých %s sekúnd";
    };
    sk.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "sekundy od %s do %s";
    };
    sk.prototype.atX0SecondsPastTheMinute = function () {
        return "v %s sekúnd";
    };
    sk.prototype.everyX0Minutes = function () {
        return "každých %s minút";
    };
    sk.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "minúty od %s do %s";
    };
    sk.prototype.atX0MinutesPastTheHour = function () {
        return "v %s minút";
    };
    sk.prototype.everyX0Hours = function () {
        return "každých %s hodín";
    };
    sk.prototype.betweenX0AndX1 = function () {
        return "medzi %s a %s";
    };
    sk.prototype.atX0 = function () {
        return "v %s";
    };
    sk.prototype.commaEveryDay = function () {
        return ", každý deň";
    };
    sk.prototype.commaEveryX0DaysOfTheWeek = function () {
        return ", každých %s dní v týždni";
    };
    sk.prototype.commaX0ThroughX1 = function () {
        return ", od %s do %s";
    };
    sk.prototype.first = function () {
        return "prvý";
    };
    sk.prototype.second = function () {
        return "druhý";
    };
    sk.prototype.third = function () {
        return "tretí";
    };
    sk.prototype.fourth = function () {
        return "štvrtý";
    };
    sk.prototype.fifth = function () {
        return "piaty";
    };
    sk.prototype.commaOnThe = function () {
        return ", ";
    };
    sk.prototype.spaceX0OfTheMonth = function () {
        return " %s v mesiaci";
    };
    sk.prototype.lastDay = function () {
        return "posledný deň";
    };
    sk.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", posledný %s v mesiaci";
    };
    sk.prototype.commaOnlyOnX0 = function () {
        return ", iba v %s";
    };
    sk.prototype.commaAndOnX0 = function () {
        return ", a v %s";
    };
    sk.prototype.commaEveryX0Months = function () {
        return ", každých %s mesiacov";
    };
    sk.prototype.commaOnlyInX0 = function () {
        return ", iba v %s";
    };
    sk.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", posledný deň v mesiaci";
    };
    sk.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", posledný pracovný deň v mesiaci";
    };
    sk.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
        return ", %s dní pred posledným dňom v mesiaci";
    };
    sk.prototype.firstWeekday = function () {
        return "prvý pracovný deň";
    };
    sk.prototype.weekdayNearestDayX0 = function () {
        return "pracovný deň najbližšie %s. dňu";
    };
    sk.prototype.commaOnTheX0OfTheMonth = function () {
        return ", v %s v mesiaci";
    };
    sk.prototype.commaEveryX0Days = function () {
        return ", každých %s dní";
    };
    sk.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", medzi dňami %s a %s v mesiaci";
    };
    sk.prototype.commaOnDayX0OfTheMonth = function () {
        return ", %s. deň v mesiaci";
    };
    sk.prototype.commaEveryX0Years = function () {
        return ", každých %s rokov";
    };
    sk.prototype.commaStartingX0 = function () {
        return ", začínajúcich %s";
    };
    sk.prototype.daysOfTheWeek = function () {
        return ["Nedeľa", "Pondelok", "Utorok", "Streda", "Štvrtok", "Piatok", "Sobota"];
    };
    sk.prototype.monthsOfTheYear = function () {
        return [
            "Január",
            "Február",
            "Marec",
            "Apríl",
            "Máj",
            "Jún",
            "Júl",
            "August",
            "September",
            "Október",
            "November",
            "December",
        ];
    };
    return sk;
}());
exports.sk = sk;


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.fi = void 0;
var fi = (function () {
    function fi() {
    }
    fi.prototype.use24HourTimeFormatByDefault = function () {
        return false;
    };
    fi.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "Virhe kuvauksen generoinnissa. Tarkista cron-syntaksi.";
    };
    fi.prototype.at = function () {
        return "Klo";
    };
    fi.prototype.atSpace = function () {
        return "Klo ";
    };
    fi.prototype.atX0 = function () {
        return "klo %s";
    };
    fi.prototype.atX0MinutesPastTheHour = function () {
        return "%s minuuttia yli";
    };
    fi.prototype.atX0MinutesPastTheHourGt20 = function () {
        return "%s minuuttia yli";
    };
    fi.prototype.atX0SecondsPastTheMinute = function () {
        return "%s sekunnnin jälkeen";
    };
    fi.prototype.betweenX0AndX1 = function () {
        return "%s - %s välillä";
    };
    fi.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", kuukauden päivien %s ja %s välillä";
    };
    fi.prototype.commaEveryDay = function () {
        return ", joka päivä";
    };
    fi.prototype.commaEveryHour = function () {
        return ", joka tunti";
    };
    fi.prototype.commaEveryMinute = function () {
        return ", joka minuutti";
    };
    fi.prototype.commaEveryX0Days = function () {
        return ", joka %s. päivä";
    };
    fi.prototype.commaEveryX0DaysOfTheWeek = function () {
        return ", joka %s. viikonpäivä";
    };
    fi.prototype.commaEveryX0Months = function () {
        return ", joka %s. kuukausi";
    };
    fi.prototype.commaEveryX0Years = function () {
        return ", joka %s. vuosi";
    };
    fi.prototype.commaOnDayX0OfTheMonth = function () {
        return ", kuukauden %s päivä";
    };
    fi.prototype.commaOnlyInX0 = function () {
        return ", vain %s";
    };
    fi.prototype.commaOnlyOnX0 = function () {
        return ", vain %s";
    };
    fi.prototype.commaOnThe = function () {
        return ",";
    };
    fi.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", kuukauden viimeisenä päivänä";
    };
    fi.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", kuukauden viimeisenä viikonpäivänä";
    };
    fi.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", kuukauden viimeinen %s";
    };
    fi.prototype.commaOnTheX0OfTheMonth = function () {
        return ", kuukauden %s";
    };
    fi.prototype.commaX0ThroughX1 = function () {
        return ", %s - %s";
    };
    fi.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
        return ", %s päivää ennen kuukauden viimeistä päivää";
    };
    fi.prototype.commaStartingX0 = function () {
        return ", alkaen %s";
    };
    fi.prototype.everyHour = function () {
        return "joka tunti";
    };
    fi.prototype.everyMinute = function () {
        return "joka minuutti";
    };
    fi.prototype.everyMinuteBetweenX0AndX1 = function () {
        return "joka minuutti %s - %s välillä";
    };
    fi.prototype.everySecond = function () {
        return "joka sekunti";
    };
    fi.prototype.everyX0Hours = function () {
        return "joka %s. tunti";
    };
    fi.prototype.everyX0Minutes = function () {
        return "joka %s. minuutti";
    };
    fi.prototype.everyX0Seconds = function () {
        return "joka %s. sekunti";
    };
    fi.prototype.fifth = function () {
        return "viides";
    };
    fi.prototype.first = function () {
        return "ensimmäinen";
    };
    fi.prototype.firstWeekday = function () {
        return "ensimmäinen viikonpäivä";
    };
    fi.prototype.fourth = function () {
        return "neljäs";
    };
    fi.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "joka tunti minuuttien %s - %s välillä";
    };
    fi.prototype.second = function () {
        return "toinen";
    };
    fi.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "joka minuutti sekunttien %s - %s välillä";
    };
    fi.prototype.spaceAnd = function () {
        return " ja";
    };
    fi.prototype.spaceAndSpace = function () {
        return " ja ";
    };
    fi.prototype.spaceX0OfTheMonth = function () {
        return " %s kuukaudessa";
    };
    fi.prototype.third = function () {
        return "kolmas";
    };
    fi.prototype.weekdayNearestDayX0 = function () {
        return "viikonpäivä lähintä %s päivää";
    };
    fi.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return null;
    };
    fi.prototype.commaMonthX0ThroughMonthX1 = function () {
        return null;
    };
    fi.prototype.commaYearX0ThroughYearX1 = function () {
        return null;
    };
    fi.prototype.lastDay = function () {
        return "viimeinen päivä";
    };
    fi.prototype.commaAndOnX0 = function () {
        return ", ja edelleen %s";
    };
    fi.prototype.daysOfTheWeek = function () {
        return ["sunnuntai", "maanantai", "tiistai", "keskiviikko", "torstai", "perjantai", "lauantai"];
    };
    fi.prototype.monthsOfTheYear = function () {
        return [
            "tammikuu",
            "helmikuu",
            "maaliskuu",
            "huhtikuu",
            "toukokuu",
            "kesäkuu",
            "heinäkuu",
            "elokuu",
            "syyskuu",
            "lokakuu",
            "marraskuu",
            "joulukuu",
        ];
    };
    return fi;
}());
exports.fi = fi;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.sl = void 0;
var sl = (function () {
    function sl() {
    }
    sl.prototype.use24HourTimeFormatByDefault = function () {
        return true;
    };
    sl.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "Pri generiranju opisa izraza je prišlo do napake. Preverite sintakso izraza cron.";
    };
    sl.prototype.at = function () {
        return "Ob";
    };
    sl.prototype.atSpace = function () {
        return "Ob ";
    };
    sl.prototype.atX0 = function () {
        return "ob %s";
    };
    sl.prototype.atX0MinutesPastTheHour = function () {
        return "ob %s.";
    };
    sl.prototype.atX0SecondsPastTheMinute = function () {
        return "ob %s.";
    };
    sl.prototype.betweenX0AndX1 = function () {
        return "od %s do %s";
    };
    sl.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", od %s. do %s. dne v mesecu";
    };
    sl.prototype.commaEveryDay = function () {
        return ", vsak dan";
    };
    sl.prototype.commaEveryX0Days = function () {
        return ", vsakih %s dni";
    };
    sl.prototype.commaEveryX0DaysOfTheWeek = function () {
        return ", vsakih %s dni v tednu";
    };
    sl.prototype.commaEveryX0Months = function () {
        return ", vsakih %s mesecev";
    };
    sl.prototype.commaEveryX0Years = function () {
        return ", vsakih %s let";
    };
    sl.prototype.commaOnDayX0OfTheMonth = function () {
        return ", %s. dan v mesecu";
    };
    sl.prototype.commaOnlyInX0 = function () {
        return ", samo v %s";
    };
    sl.prototype.commaOnlyOnX0 = function () {
        return ", samo v %s";
    };
    sl.prototype.commaAndOnX0 = function () {
        return "in naprej %s";
    };
    sl.prototype.commaOnThe = function () {
        return ", ";
    };
    sl.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", zadnji %s v mesecu";
    };
    sl.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", zadnji delovni dan v mesecu";
    };
    sl.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
        return ", %s dni pred koncem meseca";
    };
    sl.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", zadnji %s v mesecu";
    };
    sl.prototype.commaOnTheX0OfTheMonth = function () {
        return ", %s v mesecu";
    };
    sl.prototype.commaX0ThroughX1 = function () {
        return ", od %s do %s";
    };
    sl.prototype.everyHour = function () {
        return "vsako uro";
    };
    sl.prototype.everyMinute = function () {
        return "vsako minuto";
    };
    sl.prototype.everyMinuteBetweenX0AndX1 = function () {
        return "Vsako minuto od %s do %s";
    };
    sl.prototype.everySecond = function () {
        return "vsako sekundo";
    };
    sl.prototype.everyX0Hours = function () {
        return "vsakih %s ur";
    };
    sl.prototype.everyX0Minutes = function () {
        return "vsakih %s minut";
    };
    sl.prototype.everyX0Seconds = function () {
        return "vsakih %s sekund";
    };
    sl.prototype.fifth = function () {
        return "peti";
    };
    sl.prototype.first = function () {
        return "prvi";
    };
    sl.prototype.firstWeekday = function () {
        return "prvi delovni dan";
    };
    sl.prototype.fourth = function () {
        return "četrti";
    };
    sl.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "minute od %s do %s";
    };
    sl.prototype.second = function () {
        return "drugi";
    };
    sl.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "sekunde od %s do %s";
    };
    sl.prototype.spaceAnd = function () {
        return " in";
    };
    sl.prototype.spaceX0OfTheMonth = function () {
        return " %s v mesecu";
    };
    sl.prototype.lastDay = function () {
        return "zadnjič";
    };
    sl.prototype.third = function () {
        return "tretji";
    };
    sl.prototype.weekdayNearestDayX0 = function () {
        return "delovni dan, najbližji %s. dnevu";
    };
    sl.prototype.commaMonthX0ThroughMonthX1 = function () {
        return null;
    };
    sl.prototype.commaYearX0ThroughYearX1 = function () {
        return null;
    };
    sl.prototype.atX0MinutesPastTheHourGt20 = function () {
        return null;
    };
    sl.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return null;
    };
    sl.prototype.commaStartingX0 = function () {
        return ", začenši %s";
    };
    sl.prototype.daysOfTheWeek = function () {
        return ["Nedelja", "Ponedeljek", "Torek", "Sreda", "Četrtek", "Petek", "Sobota"];
    };
    sl.prototype.monthsOfTheYear = function () {
        return [
            "januar",
            "februar",
            "marec",
            "april",
            "maj",
            "junij",
            "julij",
            "avgust",
            "september",
            "oktober",
            "november",
            "december",
        ];
    };
    return sl;
}());
exports.sl = sl;


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.sw = void 0;
var sw = (function () {
    function sw() {
    }
    sw.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return null;
    };
    sw.prototype.atX0MinutesPastTheHourGt20 = function () {
        return null;
    };
    sw.prototype.commaMonthX0ThroughMonthX1 = function () {
        return null;
    };
    sw.prototype.commaYearX0ThroughYearX1 = function () {
        return null;
    };
    sw.prototype.use24HourTimeFormatByDefault = function () {
        return false;
    };
    sw.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "Kuna tatizo wakati wa kutunga msemo. Angalia cron expression syntax.";
    };
    sw.prototype.everyMinute = function () {
        return "kila dakika";
    };
    sw.prototype.everyHour = function () {
        return "kila saa";
    };
    sw.prototype.atSpace = function () {
        return "Kwa ";
    };
    sw.prototype.everyMinuteBetweenX0AndX1 = function () {
        return "Kila dakika kwanzia %s hadi %s";
    };
    sw.prototype.at = function () {
        return "Kwa";
    };
    sw.prototype.spaceAnd = function () {
        return " na";
    };
    sw.prototype.everySecond = function () {
        return "kila sekunde";
    };
    sw.prototype.everyX0Seconds = function () {
        return "kila sekunde %s";
    };
    sw.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "sekunde ya %s hadi %s baada ya dakika";
    };
    sw.prototype.atX0SecondsPastTheMinute = function () {
        return "at %s seconds past the minute";
    };
    sw.prototype.everyX0Minutes = function () {
        return "kila dakika %s";
    };
    sw.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "minutes %s through %s past the hour";
    };
    sw.prototype.atX0MinutesPastTheHour = function () {
        return "at %s minutes past the hour";
    };
    sw.prototype.everyX0Hours = function () {
        return "every %s hours";
    };
    sw.prototype.betweenX0AndX1 = function () {
        return "kati ya %s na %s";
    };
    sw.prototype.atX0 = function () {
        return "kwenye %s";
    };
    sw.prototype.commaEveryDay = function () {
        return ", kila siku";
    };
    sw.prototype.commaEveryX0DaysOfTheWeek = function () {
        return ", kila siku %s ya wiki";
    };
    sw.prototype.commaX0ThroughX1 = function () {
        return ", %s hadi %s";
    };
    sw.prototype.first = function () {
        return "ya kwanza";
    };
    sw.prototype.second = function () {
        return "ya pili";
    };
    sw.prototype.third = function () {
        return "ya tatu";
    };
    sw.prototype.fourth = function () {
        return "ya nne";
    };
    sw.prototype.fifth = function () {
        return "ya tano";
    };
    sw.prototype.commaOnThe = function () {
        return ", kwenye ";
    };
    sw.prototype.spaceX0OfTheMonth = function () {
        return " siku %s ya mwezi";
    };
    sw.prototype.lastDay = function () {
        return "siku ya mwisho";
    };
    sw.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", siku ya %s ya mwezi";
    };
    sw.prototype.commaOnlyOnX0 = function () {
        return ", kwa %s tu";
    };
    sw.prototype.commaAndOnX0 = function () {
        return ", na pia %s";
    };
    sw.prototype.commaEveryX0Months = function () {
        return ", kila mwezi wa %s";
    };
    sw.prototype.commaOnlyInX0 = function () {
        return ", kwa %s tu";
    };
    sw.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", siku ya mwisho wa mwezi";
    };
    sw.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", wikendi ya mwisho wa mwezi";
    };
    sw.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
        return ", siku ya %s kabla ya siku ya mwisho wa mwezi";
    };
    sw.prototype.firstWeekday = function () {
        return "siku za kazi ya kwanza";
    };
    sw.prototype.weekdayNearestDayX0 = function () {
        return "siku ya kazi karibu na siku ya %s";
    };
    sw.prototype.commaOnTheX0OfTheMonth = function () {
        return ", siku ya %s ya mwezi";
    };
    sw.prototype.commaEveryX0Days = function () {
        return ", kila siku %s";
    };
    sw.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", kati ya siku %s na %s ya mwezi";
    };
    sw.prototype.commaOnDayX0OfTheMonth = function () {
        return ", siku ya %s ya mwezi";
    };
    sw.prototype.commaEveryX0Years = function () {
        return ", kila miaka %s";
    };
    sw.prototype.commaStartingX0 = function () {
        return ", kwanzia %s";
    };
    sw.prototype.daysOfTheWeek = function () {
        return ["Jumapili", "Jumatatu", "Jumanne", "Jumatano", "Alhamisi", "Ijumaa", "Jumamosi"];
    };
    sw.prototype.monthsOfTheYear = function () {
        return [
            "Januari",
            "Februari",
            "Machi",
            "Aprili",
            "Mei",
            "Juni",
            "Julai",
            "Agosti",
            "Septemba",
            "Oktoba",
            "Novemba",
            "Desemba",
        ];
    };
    return sw;
}());
exports.sw = sw;


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.fa = void 0;
var fa = (function () {
    function fa() {
    }
    fa.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return null;
    };
    fa.prototype.atX0MinutesPastTheHourGt20 = function () {
        return null;
    };
    fa.prototype.commaMonthX0ThroughMonthX1 = function () {
        return null;
    };
    fa.prototype.commaYearX0ThroughYearX1 = function () {
        return null;
    };
    fa.prototype.use24HourTimeFormatByDefault = function () {
        return true;
    };
    fa.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "خطایی در نمایش توضیحات این وظیفه رخ داد. لطفا ساختار آن را بررسی کنید.";
    };
    fa.prototype.everyMinute = function () {
        return "هر دقیقه";
    };
    fa.prototype.everyHour = function () {
        return "هر ساعت";
    };
    fa.prototype.atSpace = function () {
        return "در ";
    };
    fa.prototype.everyMinuteBetweenX0AndX1 = function () {
        return "هر دقیقه بین %s و %s";
    };
    fa.prototype.at = function () {
        return "در";
    };
    fa.prototype.spaceAnd = function () {
        return " و";
    };
    fa.prototype.everySecond = function () {
        return "هر ثانیه";
    };
    fa.prototype.everyX0Seconds = function () {
        return "هر %s ثانیه";
    };
    fa.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "ثانیه %s تا %s دقیقه گذشته";
    };
    fa.prototype.atX0SecondsPastTheMinute = function () {
        return "در %s قانیه از دقیقه گذشته";
    };
    fa.prototype.everyX0Minutes = function () {
        return "هر %s دقیقه";
    };
    fa.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "دقیقه %s تا %s ساعت گذشته";
    };
    fa.prototype.atX0MinutesPastTheHour = function () {
        return "در %s دقیقه پس از ساعت";
    };
    fa.prototype.everyX0Hours = function () {
        return "هر %s ساعت";
    };
    fa.prototype.betweenX0AndX1 = function () {
        return "بین %s و %s";
    };
    fa.prototype.atX0 = function () {
        return "در %s";
    };
    fa.prototype.commaEveryDay = function () {
        return ", هر روز";
    };
    fa.prototype.commaEveryX0DaysOfTheWeek = function () {
        return ", هر %s روز از هفته";
    };
    fa.prototype.commaX0ThroughX1 = function () {
        return ", %s تا %s";
    };
    fa.prototype.first = function () {
        return "اول";
    };
    fa.prototype.second = function () {
        return "دوم";
    };
    fa.prototype.third = function () {
        return "سوم";
    };
    fa.prototype.fourth = function () {
        return "چهارم";
    };
    fa.prototype.fifth = function () {
        return "پنجم";
    };
    fa.prototype.commaOnThe = function () {
        return ", در ";
    };
    fa.prototype.spaceX0OfTheMonth = function () {
        return " %s ماه";
    };
    fa.prototype.lastDay = function () {
        return "آخرین روز";
    };
    fa.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", در %s ماه";
    };
    fa.prototype.commaOnlyOnX0 = function () {
        return ", فقط در %s";
    };
    fa.prototype.commaAndOnX0 = function () {
        return ", و در %s";
    };
    fa.prototype.commaEveryX0Months = function () {
        return ", هر %s ماه";
    };
    fa.prototype.commaOnlyInX0 = function () {
        return ", فقط در %s";
    };
    fa.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", در آخرین روز ماه";
    };
    fa.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", در آخرین روز ماه";
    };
    fa.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
        return ", %s روز قبل از آخرین روز ماه";
    };
    fa.prototype.firstWeekday = function () {
        return "اولین روز";
    };
    fa.prototype.weekdayNearestDayX0 = function () {
        return "روز نزدیک به روز %s";
    };
    fa.prototype.commaOnTheX0OfTheMonth = function () {
        return ", در %s ماه";
    };
    fa.prototype.commaEveryX0Days = function () {
        return ", هر %s روز";
    };
    fa.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", بین روز %s و %s ماه";
    };
    fa.prototype.commaOnDayX0OfTheMonth = function () {
        return ", در %s ماه";
    };
    fa.prototype.commaEveryMinute = function () {
        return ", هر minute";
    };
    fa.prototype.commaEveryHour = function () {
        return ", هر ساعت";
    };
    fa.prototype.commaEveryX0Years = function () {
        return ", هر %s سال";
    };
    fa.prototype.commaStartingX0 = function () {
        return ", آغاز %s";
    };
    fa.prototype.daysOfTheWeek = function () {
        return ["یک‌شنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنج‌شنبه", "جمعه", "شنبه"];
    };
    fa.prototype.monthsOfTheYear = function () {
        return ["ژانویه", "فوریه", "مارس", "آپریل", "مه", "ژوئن", "ژوئیه", "آگوست", "سپتامبر", "اکتبر", "نوامبر", "دسامبر"];
    };
    return fa;
}());
exports.fa = fa;


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.ca = void 0;
var ca = (function () {
    function ca() {
    }
    ca.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return null;
    };
    ca.prototype.atX0MinutesPastTheHourGt20 = function () {
        return null;
    };
    ca.prototype.commaMonthX0ThroughMonthX1 = function () {
        return null;
    };
    ca.prototype.commaYearX0ThroughYearX1 = function () {
        return null;
    };
    ca.prototype.use24HourTimeFormatByDefault = function () {
        return false;
    };
    ca.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "S'ha produït un error mentres es generava la descripció de l'expressió. Revisi la sintaxi de la expressió de cron.";
    };
    ca.prototype.at = function () {
        return "A les";
    };
    ca.prototype.atSpace = function () {
        return "A les ";
    };
    ca.prototype.atX0 = function () {
        return "a les %s";
    };
    ca.prototype.atX0MinutesPastTheHour = function () {
        return "als %s minuts de l'hora";
    };
    ca.prototype.atX0SecondsPastTheMinute = function () {
        return "als %s segonds del minut";
    };
    ca.prototype.betweenX0AndX1 = function () {
        return "entre les %s i les %s";
    };
    ca.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", entre els dies %s i %s del mes";
    };
    ca.prototype.commaEveryDay = function () {
        return ", cada dia";
    };
    ca.prototype.commaEveryX0Days = function () {
        return ", cada %s dies";
    };
    ca.prototype.commaEveryX0DaysOfTheWeek = function () {
        return ", cada %s dies de la setmana";
    };
    ca.prototype.commaEveryX0Months = function () {
        return ", cada %s mesos";
    };
    ca.prototype.commaOnDayX0OfTheMonth = function () {
        return ", el dia %s del mes";
    };
    ca.prototype.commaOnlyInX0 = function () {
        return ", sólo en %s";
    };
    ca.prototype.commaOnlyOnX0 = function () {
        return ", només el %s";
    };
    ca.prototype.commaAndOnX0 = function () {
        return ", i el %s";
    };
    ca.prototype.commaOnThe = function () {
        return ", en el ";
    };
    ca.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", en l'últim dia del mes";
    };
    ca.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", en l'últim dia de la setmana del mes";
    };
    ca.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
        return ", %s dies abans de l'últim dia del mes";
    };
    ca.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", en l'últim %s del mes";
    };
    ca.prototype.commaOnTheX0OfTheMonth = function () {
        return ", en el %s del mes";
    };
    ca.prototype.commaX0ThroughX1 = function () {
        return ", de %s a %s";
    };
    ca.prototype.everyHour = function () {
        return "cada hora";
    };
    ca.prototype.everyMinute = function () {
        return "cada minut";
    };
    ca.prototype.everyMinuteBetweenX0AndX1 = function () {
        return "cada minut entre les %s i les %s";
    };
    ca.prototype.everySecond = function () {
        return "cada segon";
    };
    ca.prototype.everyX0Hours = function () {
        return "cada %s hores";
    };
    ca.prototype.everyX0Minutes = function () {
        return "cada %s minuts";
    };
    ca.prototype.everyX0Seconds = function () {
        return "cada %s segons";
    };
    ca.prototype.fifth = function () {
        return "cinquè";
    };
    ca.prototype.first = function () {
        return "primer";
    };
    ca.prototype.firstWeekday = function () {
        return "primer dia de la setmana";
    };
    ca.prototype.fourth = function () {
        return "quart";
    };
    ca.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "del minut %s al %s passada l'hora";
    };
    ca.prototype.second = function () {
        return "segon";
    };
    ca.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "En els segons %s al %s de cada minut";
    };
    ca.prototype.spaceAnd = function () {
        return " i";
    };
    ca.prototype.spaceX0OfTheMonth = function () {
        return " %s del mes";
    };
    ca.prototype.lastDay = function () {
        return "l'últim dia";
    };
    ca.prototype.third = function () {
        return "tercer";
    };
    ca.prototype.weekdayNearestDayX0 = function () {
        return "dia de la setmana més proper al %s";
    };
    ca.prototype.commaEveryX0Years = function () {
        return ", cada %s anys";
    };
    ca.prototype.commaStartingX0 = function () {
        return ", començant %s";
    };
    ca.prototype.daysOfTheWeek = function () {
        return ["diumenge", "dilluns", "dimarts", "dimecres", "dijous", "divendres", "dissabte"];
    };
    ca.prototype.monthsOfTheYear = function () {
        return [
            "gener",
            "febrer",
            "març",
            "abril",
            "maig",
            "juny",
            "juliol",
            "agost",
            "setembre",
            "octubre",
            "novembre",
            "desembre",
        ];
    };
    return ca;
}());
exports.ca = ca;


/***/ })
/******/ ]);
});
}(cronstrueI18n));

// This file allows dist/cronstrue-i18n.js to be required from Node as:
// var cronstrue = require('cronstrue/i18n');

var cronstrueWithLocales = cronstrueI18n.exports;
var i18n = cronstrueWithLocales;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

var freeGlobal$1 = freeGlobal;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal$1 || freeSelf || Function('return this')();

var root$1 = root;

/** Built-in value references. */
var Symbol$1 = root$1.Symbol;

var Symbol$2 = Symbol$1;

/** Used for built-in method references. */
var objectProto$b = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$8 = objectProto$b.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString$1 = objectProto$b.toString;

/** Built-in value references. */
var symToStringTag$1 = Symbol$2 ? Symbol$2.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty$8.call(value, symToStringTag$1),
      tag = value[symToStringTag$1];

  try {
    value[symToStringTag$1] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString$1.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag$1] = tag;
    } else {
      delete value[symToStringTag$1];
    }
  }
  return result;
}

/** Used for built-in method references. */
var objectProto$a = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto$a.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol$2 ? Symbol$2.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

/** `Object#toString` result references. */
var symbolTag$1 = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && baseGetTag(value) == symbolTag$1);
}

/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

var isArray$1 = isArray;

/** Used as references for various `Number` constants. */
var INFINITY$2 = 1 / 0;

/** Used to convert symbols to primitives and strings. */
var symbolProto$1 = Symbol$2 ? Symbol$2.prototype : undefined,
    symbolToString = symbolProto$1 ? symbolProto$1.toString : undefined;

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isArray$1(value)) {
    // Recursively convert values (susceptible to call stack limits).
    return arrayMap(value, baseToString) + '';
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY$2) ? '-0' : result;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag$1 = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag(value);
  return tag == funcTag$1 || tag == genTag || tag == asyncTag || tag == proxyTag;
}

/** Used to detect overreaching core-js shims. */
var coreJsData = root$1['__core-js_shared__'];

var coreJsData$1 = coreJsData;

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData$1 && coreJsData$1.keys && coreJsData$1.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

/** Used for built-in method references. */
var funcProto$1 = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString$1 = funcProto$1.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString$1.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto$9 = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty$7 = objectProto$9.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty$7).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

/* Built-in method references that are verified to be native. */
var WeakMap = getNative(root$1, 'WeakMap');

var WeakMap$1 = WeakMap;

/**
 * This method returns `undefined`.
 *
 * @static
 * @memberOf _
 * @since 2.3.0
 * @category Util
 * @example
 *
 * _.times(2, _.noop);
 * // => [undefined, undefined]
 */
function noop() {
  // No operation performed.
}

/**
 * The base implementation of `_.findIndex` and `_.findLastIndex` without
 * support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} predicate The function invoked per iteration.
 * @param {number} fromIndex The index to search from.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseFindIndex(array, predicate, fromIndex, fromRight) {
  var length = array.length,
      index = fromIndex + (fromRight ? 1 : -1);

  while ((fromRight ? index-- : ++index < length)) {
    if (predicate(array[index], index, array)) {
      return index;
    }
  }
  return -1;
}

/**
 * The base implementation of `_.isNaN` without support for number objects.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
 */
function baseIsNaN(value) {
  return value !== value;
}

/**
 * A specialized version of `_.indexOf` which performs strict equality
 * comparisons of values, i.e. `===`.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function strictIndexOf(array, value, fromIndex) {
  var index = fromIndex - 1,
      length = array.length;

  while (++index < length) {
    if (array[index] === value) {
      return index;
    }
  }
  return -1;
}

/**
 * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseIndexOf(array, value, fromIndex) {
  return value === value
    ? strictIndexOf(array, value, fromIndex)
    : baseFindIndex(array, baseIsNaN, fromIndex);
}

/**
 * A specialized version of `_.includes` for arrays without support for
 * specifying an index to search from.
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */
function arrayIncludes(array, value) {
  var length = array == null ? 0 : array.length;
  return !!length && baseIndexOf(array, value, 0) > -1;
}

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER$1 = 9007199254740991;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER$1 : length;

  return !!length &&
    (type == 'number' ||
      (type != 'symbol' && reIsUint.test(value))) &&
        (value > -1 && value % 1 == 0 && value < length);
}

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/** Used for built-in method references. */
var objectProto$8 = Object.prototype;

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto$8;

  return value === proto;
}

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

/** `Object#toString` result references. */
var argsTag$2 = '[object Arguments]';

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag$2;
}

/** Used for built-in method references. */
var objectProto$7 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$6 = objectProto$7.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable$1 = objectProto$7.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty$6.call(value, 'callee') &&
    !propertyIsEnumerable$1.call(value, 'callee');
};

var isArguments$1 = isArguments;

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

/** Detect free variable `exports`. */
var freeExports$1 = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule$1 = freeExports$1 && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports$1 = freeModule$1 && freeModule$1.exports === freeExports$1;

/** Built-in value references. */
var Buffer = moduleExports$1 ? root$1.Buffer : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse;

var isBuffer$1 = isBuffer;

/** `Object#toString` result references. */
var argsTag$1 = '[object Arguments]',
    arrayTag$1 = '[object Array]',
    boolTag$1 = '[object Boolean]',
    dateTag$1 = '[object Date]',
    errorTag$1 = '[object Error]',
    funcTag = '[object Function]',
    mapTag$2 = '[object Map]',
    numberTag$1 = '[object Number]',
    objectTag$2 = '[object Object]',
    regexpTag$1 = '[object RegExp]',
    setTag$2 = '[object Set]',
    stringTag$1 = '[object String]',
    weakMapTag$1 = '[object WeakMap]';

var arrayBufferTag$1 = '[object ArrayBuffer]',
    dataViewTag$2 = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag$1] = typedArrayTags[arrayTag$1] =
typedArrayTags[arrayBufferTag$1] = typedArrayTags[boolTag$1] =
typedArrayTags[dataViewTag$2] = typedArrayTags[dateTag$1] =
typedArrayTags[errorTag$1] = typedArrayTags[funcTag] =
typedArrayTags[mapTag$2] = typedArrayTags[numberTag$1] =
typedArrayTags[objectTag$2] = typedArrayTags[regexpTag$1] =
typedArrayTags[setTag$2] = typedArrayTags[stringTag$1] =
typedArrayTags[weakMapTag$1] = false;

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && freeGlobal$1.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    // Use `util.types` for Node.js 10+.
    var types = freeModule && freeModule.require && freeModule.require('util').types;

    if (types) {
      return types;
    }

    // Legacy `process.binding('util')` for Node.js < 10.
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}());

var nodeUtil$1 = nodeUtil;

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil$1 && nodeUtil$1.isTypedArray;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

var isTypedArray$1 = isTypedArray;

/** Used for built-in method references. */
var objectProto$6 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$5 = objectProto$6.hasOwnProperty;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  var isArr = isArray$1(value),
      isArg = !isArr && isArguments$1(value),
      isBuff = !isArr && !isArg && isBuffer$1(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray$1(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty$5.call(value, key)) &&
        !(skipIndexes && (
           // Safari 9 has enumerable `arguments.length` in strict mode.
           key == 'length' ||
           // Node.js 0.10 has enumerable non-index properties on buffers.
           (isBuff && (key == 'offset' || key == 'parent')) ||
           // PhantomJS 2 has enumerable non-index properties on typed arrays.
           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
           // Skip index properties.
           isIndex(key, length)
        ))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = overArg(Object.keys, Object);

var nativeKeys$1 = nativeKeys;

/** Used for built-in method references. */
var objectProto$5 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$4 = objectProto$5.hasOwnProperty;

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys$1(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty$4.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/;

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey(value, object) {
  if (isArray$1(value)) {
    return false;
  }
  var type = typeof value;
  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
      value == null || isSymbol(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
    (object != null && value in Object(object));
}

/* Built-in method references that are verified to be native. */
var nativeCreate = getNative(Object, 'create');

var nativeCreate$1 = nativeCreate;

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate$1 ? nativeCreate$1(null) : {};
  this.size = 0;
}

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED$2 = '__lodash_hash_undefined__';

/** Used for built-in method references. */
var objectProto$4 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$3 = objectProto$4.hasOwnProperty;

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate$1) {
    var result = data[key];
    return result === HASH_UNDEFINED$2 ? undefined : result;
  }
  return hasOwnProperty$3.call(data, key) ? data[key] : undefined;
}

/** Used for built-in method references. */
var objectProto$3 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$2 = objectProto$3.hasOwnProperty;

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate$1 ? (data[key] !== undefined) : hasOwnProperty$2.call(data, key);
}

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED$1 = '__lodash_hash_undefined__';

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (nativeCreate$1 && value === undefined) ? HASH_UNDEFINED$1 : value;
  return this;
}

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

/** Used for built-in method references. */
var arrayProto = Array.prototype;

/** Built-in value references. */
var splice = arrayProto.splice;

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

/* Built-in method references that are verified to be native. */
var Map = getNative(root$1, 'Map');

var Map$1 = Map;

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map$1 || ListCache),
    'string': new Hash
  };
}

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  var result = getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  var data = getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `clear`, `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */
function memoize(func, resolver) {
  if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  };
  memoized.cache = new (memoize.Cache || MapCache);
  return memoized;
}

// Expose `MapCache`.
memoize.Cache = MapCache;

/** Used as the maximum memoize cache size. */
var MAX_MEMOIZE_SIZE = 500;

/**
 * A specialized version of `_.memoize` which clears the memoized function's
 * cache when it exceeds `MAX_MEMOIZE_SIZE`.
 *
 * @private
 * @param {Function} func The function to have its output memoized.
 * @returns {Function} Returns the new memoized function.
 */
function memoizeCapped(func) {
  var result = memoize(func, function(key) {
    if (cache.size === MAX_MEMOIZE_SIZE) {
      cache.clear();
    }
    return key;
  });

  var cache = result.cache;
  return result;
}

/** Used to match property names within property paths. */
var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
var stringToPath = memoizeCapped(function(string) {
  var result = [];
  if (string.charCodeAt(0) === 46 /* . */) {
    result.push('');
  }
  string.replace(rePropName, function(match, number, quote, subString) {
    result.push(quote ? subString.replace(reEscapeChar, '$1') : (number || match));
  });
  return result;
});

var stringToPath$1 = stringToPath;

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : baseToString(value);
}

/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @param {Object} [object] The object to query keys on.
 * @returns {Array} Returns the cast property path array.
 */
function castPath(value, object) {
  if (isArray$1(value)) {
    return value;
  }
  return isKey(value, object) ? [value] : stringToPath$1(toString(value));
}

/** Used as references for various `Number` constants. */
var INFINITY$1 = 1 / 0;

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
function toKey(value) {
  if (typeof value == 'string' || isSymbol(value)) {
    return value;
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY$1) ? '-0' : result;
}

/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */
function baseGet(object, path) {
  path = castPath(path, object);

  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[toKey(path[index++])];
  }
  return (index && index == length) ? object : undefined;
}

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.get(object, 'a[0].b.c');
 * // => 3
 *
 * _.get(object, ['a', '0', 'b', 'c']);
 * // => 3
 *
 * _.get(object, 'a.b.c', 'default');
 * // => 'default'
 */
function get(object, path, defaultValue) {
  var result = object == null ? undefined : baseGet(object, path);
  return result === undefined ? defaultValue : result;
}

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new ListCache;
  this.size = 0;
}

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  var data = this.__data__,
      result = data['delete'](key);

  this.size = data.size;
  return result;
}

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE$1 = 200;

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache) {
    var pairs = data.__data__;
    if (!Map$1 || (pairs.length < LARGE_ARRAY_SIZE$1 - 1)) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

/**
 * A specialized version of `_.filter` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function arrayFilter(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}

/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray() {
  return [];
}

/** Used for built-in method references. */
var objectProto$2 = Object.prototype;

/** Built-in value references. */
var propertyIsEnumerable = objectProto$2.propertyIsEnumerable;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols;

/**
 * Creates an array of the own enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return arrayFilter(nativeGetSymbols(object), function(symbol) {
    return propertyIsEnumerable.call(object, symbol);
  });
};

var getSymbols$1 = getSymbols;

/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray$1(object) ? result : arrayPush(result, symbolsFunc(object));
}

/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeys(object) {
  return baseGetAllKeys(object, keys, getSymbols$1);
}

/* Built-in method references that are verified to be native. */
var DataView = getNative(root$1, 'DataView');

var DataView$1 = DataView;

/* Built-in method references that are verified to be native. */
var Promise$1 = getNative(root$1, 'Promise');

var Promise$2 = Promise$1;

/* Built-in method references that are verified to be native. */
var Set = getNative(root$1, 'Set');

var Set$1 = Set;

/** `Object#toString` result references. */
var mapTag$1 = '[object Map]',
    objectTag$1 = '[object Object]',
    promiseTag = '[object Promise]',
    setTag$1 = '[object Set]',
    weakMapTag = '[object WeakMap]';

var dataViewTag$1 = '[object DataView]';

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView$1),
    mapCtorString = toSource(Map$1),
    promiseCtorString = toSource(Promise$2),
    setCtorString = toSource(Set$1),
    weakMapCtorString = toSource(WeakMap$1);

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
if ((DataView$1 && getTag(new DataView$1(new ArrayBuffer(1))) != dataViewTag$1) ||
    (Map$1 && getTag(new Map$1) != mapTag$1) ||
    (Promise$2 && getTag(Promise$2.resolve()) != promiseTag) ||
    (Set$1 && getTag(new Set$1) != setTag$1) ||
    (WeakMap$1 && getTag(new WeakMap$1) != weakMapTag)) {
  getTag = function(value) {
    var result = baseGetTag(value),
        Ctor = result == objectTag$1 ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : '';

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag$1;
        case mapCtorString: return mapTag$1;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag$1;
        case weakMapCtorString: return weakMapTag;
      }
    }
    return result;
  };
}

var getTag$1 = getTag;

/** Built-in value references. */
var Uint8Array = root$1.Uint8Array;

var Uint8Array$1 = Uint8Array;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED);
  return this;
}

/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */
function setCacheHas(value) {
  return this.__data__.has(value);
}

/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */
function SetCache(values) {
  var index = -1,
      length = values == null ? 0 : values.length;

  this.__data__ = new MapCache;
  while (++index < length) {
    this.add(values[index]);
  }
}

// Add methods to `SetCache`.
SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
SetCache.prototype.has = setCacheHas;

/**
 * A specialized version of `_.some` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */
function arraySome(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}

/**
 * Checks if a `cache` value for `key` exists.
 *
 * @private
 * @param {Object} cache The cache to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function cacheHas(cache, key) {
  return cache.has(key);
}

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG$5 = 1,
    COMPARE_UNORDERED_FLAG$3 = 2;

/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `array` and `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG$5,
      arrLength = array.length,
      othLength = other.length;

  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  // Check that cyclic values are equal.
  var arrStacked = stack.get(array);
  var othStacked = stack.get(other);
  if (arrStacked && othStacked) {
    return arrStacked == other && othStacked == array;
  }
  var index = -1,
      result = true,
      seen = (bitmask & COMPARE_UNORDERED_FLAG$3) ? new SetCache : undefined;

  stack.set(array, other);
  stack.set(other, array);

  // Ignore non-index properties.
  while (++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, arrValue, index, other, array, stack)
        : customizer(arrValue, othValue, index, array, other, stack);
    }
    if (compared !== undefined) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    // Recursively compare arrays (susceptible to call stack limits).
    if (seen) {
      if (!arraySome(other, function(othValue, othIndex) {
            if (!cacheHas(seen, othIndex) &&
                (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
              return seen.push(othIndex);
            }
          })) {
        result = false;
        break;
      }
    } else if (!(
          arrValue === othValue ||
            equalFunc(arrValue, othValue, bitmask, customizer, stack)
        )) {
      result = false;
      break;
    }
  }
  stack['delete'](array);
  stack['delete'](other);
  return result;
}

/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
function mapToArray(map) {
  var index = -1,
      result = Array(map.size);

  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}

/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG$4 = 1,
    COMPARE_UNORDERED_FLAG$2 = 2;

/** `Object#toString` result references. */
var boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]';

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol$2 ? Symbol$2.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
  switch (tag) {
    case dataViewTag:
      if ((object.byteLength != other.byteLength) ||
          (object.byteOffset != other.byteOffset)) {
        return false;
      }
      object = object.buffer;
      other = other.buffer;

    case arrayBufferTag:
      if ((object.byteLength != other.byteLength) ||
          !equalFunc(new Uint8Array$1(object), new Uint8Array$1(other))) {
        return false;
      }
      return true;

    case boolTag:
    case dateTag:
    case numberTag:
      // Coerce booleans to `1` or `0` and dates to milliseconds.
      // Invalid dates are coerced to `NaN`.
      return eq(+object, +other);

    case errorTag:
      return object.name == other.name && object.message == other.message;

    case regexpTag:
    case stringTag:
      // Coerce regexes to strings and treat strings, primitives and objects,
      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
      // for more details.
      return object == (other + '');

    case mapTag:
      var convert = mapToArray;

    case setTag:
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG$4;
      convert || (convert = setToArray);

      if (object.size != other.size && !isPartial) {
        return false;
      }
      // Assume cyclic values are equal.
      var stacked = stack.get(object);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= COMPARE_UNORDERED_FLAG$2;

      // Recursively compare objects (susceptible to call stack limits).
      stack.set(object, other);
      var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
      stack['delete'](object);
      return result;

    case symbolTag:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other);
      }
  }
  return false;
}

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG$3 = 1;

/** Used for built-in method references. */
var objectProto$1 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$1 = objectProto$1.hasOwnProperty;

/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG$3,
      objProps = getAllKeys(object),
      objLength = objProps.length,
      othProps = getAllKeys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : hasOwnProperty$1.call(other, key))) {
      return false;
    }
  }
  // Check that cyclic values are equal.
  var objStacked = stack.get(object);
  var othStacked = stack.get(other);
  if (objStacked && othStacked) {
    return objStacked == other && othStacked == object;
  }
  var result = true;
  stack.set(object, other);
  stack.set(other, object);

  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key],
        othValue = other[key];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, objValue, key, other, object, stack)
        : customizer(objValue, othValue, key, object, other, stack);
    }
    // Recursively compare objects (susceptible to call stack limits).
    if (!(compared === undefined
          ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))
          : compared
        )) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == 'constructor');
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor;

    // Non `Object` object instances with different constructors are not equal.
    if (objCtor != othCtor &&
        ('constructor' in object && 'constructor' in other) &&
        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack['delete'](object);
  stack['delete'](other);
  return result;
}

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG$2 = 1;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    objectTag = '[object Object]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
  var objIsArr = isArray$1(object),
      othIsArr = isArray$1(other),
      objTag = objIsArr ? arrayTag : getTag$1(object),
      othTag = othIsArr ? arrayTag : getTag$1(other);

  objTag = objTag == argsTag ? objectTag : objTag;
  othTag = othTag == argsTag ? objectTag : othTag;

  var objIsObj = objTag == objectTag,
      othIsObj = othTag == objectTag,
      isSameTag = objTag == othTag;

  if (isSameTag && isBuffer$1(object)) {
    if (!isBuffer$1(other)) {
      return false;
    }
    objIsArr = true;
    objIsObj = false;
  }
  if (isSameTag && !objIsObj) {
    stack || (stack = new Stack);
    return (objIsArr || isTypedArray$1(object))
      ? equalArrays(object, other, bitmask, customizer, equalFunc, stack)
      : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
  }
  if (!(bitmask & COMPARE_PARTIAL_FLAG$2)) {
    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object,
          othUnwrapped = othIsWrapped ? other.value() : other;

      stack || (stack = new Stack);
      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new Stack);
  return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
}

/**
 * The base implementation of `_.isEqual` which supports partial comparisons
 * and tracks traversed objects.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Unordered comparison
 *  2 - Partial comparison
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual(value, other, bitmask, customizer, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || (!isObjectLike(value) && !isObjectLike(other))) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
}

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG$1 = 1,
    COMPARE_UNORDERED_FLAG$1 = 2;

/**
 * The base implementation of `_.isMatch` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to inspect.
 * @param {Object} source The object of property values to match.
 * @param {Array} matchData The property names, values, and compare flags to match.
 * @param {Function} [customizer] The function to customize comparisons.
 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
 */
function baseIsMatch(object, source, matchData, customizer) {
  var index = matchData.length,
      length = index,
      noCustomizer = !customizer;

  if (object == null) {
    return !length;
  }
  object = Object(object);
  while (index--) {
    var data = matchData[index];
    if ((noCustomizer && data[2])
          ? data[1] !== object[data[0]]
          : !(data[0] in object)
        ) {
      return false;
    }
  }
  while (++index < length) {
    data = matchData[index];
    var key = data[0],
        objValue = object[key],
        srcValue = data[1];

    if (noCustomizer && data[2]) {
      if (objValue === undefined && !(key in object)) {
        return false;
      }
    } else {
      var stack = new Stack;
      if (customizer) {
        var result = customizer(objValue, srcValue, key, object, source, stack);
      }
      if (!(result === undefined
            ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG$1 | COMPARE_UNORDERED_FLAG$1, customizer, stack)
            : result
          )) {
        return false;
      }
    }
  }
  return true;
}

/**
 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` if suitable for strict
 *  equality comparisons, else `false`.
 */
function isStrictComparable(value) {
  return value === value && !isObject(value);
}

/**
 * Gets the property names, values, and compare flags of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the match data of `object`.
 */
function getMatchData(object) {
  var result = keys(object),
      length = result.length;

  while (length--) {
    var key = result[length],
        value = object[key];

    result[length] = [key, value, isStrictComparable(value)];
  }
  return result;
}

/**
 * A specialized version of `matchesProperty` for source values suitable
 * for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
function matchesStrictComparable(key, srcValue) {
  return function(object) {
    if (object == null) {
      return false;
    }
    return object[key] === srcValue &&
      (srcValue !== undefined || (key in Object(object)));
  };
}

/**
 * The base implementation of `_.matches` which doesn't clone `source`.
 *
 * @private
 * @param {Object} source The object of property values to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatches(source) {
  var matchData = getMatchData(source);
  if (matchData.length == 1 && matchData[0][2]) {
    return matchesStrictComparable(matchData[0][0], matchData[0][1]);
  }
  return function(object) {
    return object === source || baseIsMatch(object, source, matchData);
  };
}

/**
 * The base implementation of `_.hasIn` without support for deep paths.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {Array|string} key The key to check.
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 */
function baseHasIn(object, key) {
  return object != null && key in Object(object);
}

/**
 * Checks if `path` exists on `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @param {Function} hasFunc The function to check properties.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 */
function hasPath(object, path, hasFunc) {
  path = castPath(path, object);

  var index = -1,
      length = path.length,
      result = false;

  while (++index < length) {
    var key = toKey(path[index]);
    if (!(result = object != null && hasFunc(object, key))) {
      break;
    }
    object = object[key];
  }
  if (result || ++index != length) {
    return result;
  }
  length = object == null ? 0 : object.length;
  return !!length && isLength(length) && isIndex(key, length) &&
    (isArray$1(object) || isArguments$1(object));
}

/**
 * Checks if `path` is a direct or inherited property of `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 * @example
 *
 * var object = _.create({ 'a': _.create({ 'b': 2 }) });
 *
 * _.hasIn(object, 'a');
 * // => true
 *
 * _.hasIn(object, 'a.b');
 * // => true
 *
 * _.hasIn(object, ['a', 'b']);
 * // => true
 *
 * _.hasIn(object, 'b');
 * // => false
 */
function hasIn(object, path) {
  return object != null && hasPath(object, path, baseHasIn);
}

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/**
 * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
 *
 * @private
 * @param {string} path The path of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatchesProperty(path, srcValue) {
  if (isKey(path) && isStrictComparable(srcValue)) {
    return matchesStrictComparable(toKey(path), srcValue);
  }
  return function(object) {
    var objValue = get(object, path);
    return (objValue === undefined && objValue === srcValue)
      ? hasIn(object, path)
      : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
  };
}

/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

/**
 * A specialized version of `baseProperty` which supports deep paths.
 *
 * @private
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function basePropertyDeep(path) {
  return function(object) {
    return baseGet(object, path);
  };
}

/**
 * Creates a function that returns the value at `path` of a given object.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 * @example
 *
 * var objects = [
 *   { 'a': { 'b': 2 } },
 *   { 'a': { 'b': 1 } }
 * ];
 *
 * _.map(objects, _.property('a.b'));
 * // => [2, 1]
 *
 * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
 * // => [1, 2]
 */
function property(path) {
  return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
}

/**
 * The base implementation of `_.iteratee`.
 *
 * @private
 * @param {*} [value=_.identity] The value to convert to an iteratee.
 * @returns {Function} Returns the iteratee.
 */
function baseIteratee(value) {
  // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
  // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
  if (typeof value == 'function') {
    return value;
  }
  if (value == null) {
    return identity;
  }
  if (typeof value == 'object') {
    return isArray$1(value)
      ? baseMatchesProperty(value[0], value[1])
      : baseMatches(value);
  }
  return property(value);
}

/**
 * This function is like `arrayIncludes` except that it accepts a comparator.
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @param {Function} comparator The comparator invoked per element.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */
function arrayIncludesWith(array, value, comparator) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (comparator(value, array[index])) {
      return true;
    }
  }
  return false;
}

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/**
 * Creates a set object of `values`.
 *
 * @private
 * @param {Array} values The values to add to the set.
 * @returns {Object} Returns the new set.
 */
var createSet = !(Set$1 && (1 / setToArray(new Set$1([,-0]))[1]) == INFINITY) ? noop : function(values) {
  return new Set$1(values);
};

var createSet$1 = createSet;

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * The base implementation of `_.uniqBy` without support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} [iteratee] The iteratee invoked per element.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new duplicate free array.
 */
function baseUniq(array, iteratee, comparator) {
  var index = -1,
      includes = arrayIncludes,
      length = array.length,
      isCommon = true,
      result = [],
      seen = result;

  if (comparator) {
    isCommon = false;
    includes = arrayIncludesWith;
  }
  else if (length >= LARGE_ARRAY_SIZE) {
    var set = iteratee ? null : createSet$1(array);
    if (set) {
      return setToArray(set);
    }
    isCommon = false;
    includes = cacheHas;
    seen = new SetCache;
  }
  else {
    seen = iteratee ? [] : result;
  }
  outer:
  while (++index < length) {
    var value = array[index],
        computed = iteratee ? iteratee(value) : value;

    value = (comparator || value !== 0) ? value : 0;
    if (isCommon && computed === computed) {
      var seenIndex = seen.length;
      while (seenIndex--) {
        if (seen[seenIndex] === computed) {
          continue outer;
        }
      }
      if (iteratee) {
        seen.push(computed);
      }
      result.push(value);
    }
    else if (!includes(seen, computed, comparator)) {
      if (seen !== result) {
        seen.push(computed);
      }
      result.push(value);
    }
  }
  return result;
}

/**
 * This method is like `_.uniq` except that it accepts `iteratee` which is
 * invoked for each element in `array` to generate the criterion by which
 * uniqueness is computed. The order of result values is determined by the
 * order they occur in the array. The iteratee is invoked with one argument:
 * (value).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
 * @returns {Array} Returns the new duplicate free array.
 * @example
 *
 * _.uniqBy([2.1, 1.2, 2.3], Math.floor);
 * // => [2.1, 1.2]
 *
 * // The `_.property` iteratee shorthand.
 * _.uniqBy([{ 'x': 1 }, { 'x': 2 }, { 'x': 1 }], 'x');
 * // => [{ 'x': 1 }, { 'x': 2 }]
 */
function uniqBy(array, iteratee) {
  return (array && array.length) ? baseUniq(array, baseIteratee(iteratee)) : [];
}

const DEFAULT_LOCALE = "en";
const KEY = "history";
const _history = alfy.cache.get(KEY);
const history = _history ? JSON.parse(_history) : [];
if (alfy.input === "h") {
  alfy.output(history);
} else if (alfy.input === "r") {
  alfy.cache.set(KEY, JSON.stringify([]));
  alfy.output([]);
} else {
  const result = i18n.toString(alfy.input, { locale: process.env.locale || DEFAULT_LOCALE });
  const item = {
    title: result,
    subtitle: alfy.input,
    arg: result,
    icon: {
      path: " "
    },
    text: {
      copy: result,
      largetype: result
    }
  };
  alfy.output([item]);
  alfy.cache.set(KEY, JSON.stringify(uniqBy([item].concat(history || []), "arg")));
}
