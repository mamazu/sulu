import log from 'loglevel';
import IntlMessageFormat from 'intl-messageformat';
import type {TranslationMap} from './types';

let translationMap;

function setTranslations(translations: TranslationMap, locale: string) {
    translationMap = Object.keys(translations).reduce<Record<string, any>>((messages, translationKey) => {
        // TODO add locale for correct translation of numbers, dates, ...
        try {
            messages[translationKey] = new IntlMessageFormat(translations[translationKey], locale);
        } catch (e: any) {
            log.error(
                'The translation key ' + translationKey + ' could not be translated. ' +
                'It is translated to "' + translations[translationKey] + '" which is an invalid IntlMessageFormat: ' +
                e.toString()
            );
        }

        return messages;
    }, {});
}

function clearTranslations() {
    translationMap = null;
}

function translate(key: string, parameters?: any | null) {
    if (!translationMap || !(key in translationMap)) {
        log.warn('The translation key "' + key + '" has not been translated. The key itself will be returned instead.');
        return key;
    }

    return translationMap[key].format(parameters);
}

export {
    clearTranslations,
    setTranslations,
    translate,
};
