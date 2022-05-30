import cronstrue from 'cronstrue/i18n.js';

var DEFAULT_LOCALE = 'en';
var popcron = {
    parse: function (input) {
        return cronstrue.toString(input, { locale: process.env.locale || DEFAULT_LOCALE });
    },
};

export { popcron };
