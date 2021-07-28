import alfy from 'alfy';
import { fuzzysearch } from 'fuzzy-emoji';
const toItem = (value, { title, subtitle } = {}) => {
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
const main = async () => {
    const result = fuzzysearch.search(alfy.input);
    const output = result
        .slice(0, 10)
        .map((item) => toItem(item.emoji, { title: item.names[0], subtitle: item.description }));
    alfy.output(output);
};
await main();
