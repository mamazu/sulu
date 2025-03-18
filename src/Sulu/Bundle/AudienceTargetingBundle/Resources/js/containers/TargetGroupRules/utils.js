"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFrequencyTranslation = getFrequencyTranslation;
const utils_1 = require("sulu-admin-bundle/utils");
function getFrequencyTranslation(frequency) {
    if (frequency === 1) {
        return (0, utils_1.translate)('sulu_audience_targeting.each_page_visit');
    }
    if (frequency === 2) {
        return (0, utils_1.translate)('sulu_audience_targeting.each_session');
    }
    if (frequency === 3) {
        return (0, utils_1.translate)('sulu_audience_targeting.first_visit');
    }
}
