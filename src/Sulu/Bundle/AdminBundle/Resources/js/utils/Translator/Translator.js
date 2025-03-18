"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearTranslations = clearTranslations;
exports.setTranslations = setTranslations;
exports.translate = translate;
const loglevel_1 = __importDefault(require("loglevel"));
const intl_messageformat_1 = __importDefault(require("intl-messageformat"));
let translationMap;
function setTranslations(translations, locale) {
    translationMap = Object.keys(translations).reduce((messages, translationKey) => {
        // TODO add locale for correct translation of numbers, dates, ...
        try {
            messages[translationKey] = new intl_messageformat_1.default(translations[translationKey], locale);
        }
        catch (e) {
            loglevel_1.default.error('The translation key ' + translationKey + ' could not be translated. ' +
                'It is translated to "' + translations[translationKey] + '" which is an invalid IntlMessageFormat: ' +
                e.toString());
        }
        return messages;
    }, {});
}
function clearTranslations() {
    translationMap = null;
}
function translate(key, parameters) {
    if (!translationMap || !(key in translationMap)) {
        loglevel_1.default.warn('The translation key "' + key + '" has not been translated. The key itself will be returned instead.');
        return key;
    }
    return translationMap[key].format(parameters);
}
