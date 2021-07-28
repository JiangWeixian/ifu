import alfy from 'alfy';
import { fuzzysearch } from 'fuzzy-emoji';
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
var result = fuzzysearch.search(alfy.input);
var output = result
    .slice(0, 10)
    .map(function (item) { return toItem(item.emoji, { title: item.names[0], subtitle: item.description }); });
alfy.output(output);
