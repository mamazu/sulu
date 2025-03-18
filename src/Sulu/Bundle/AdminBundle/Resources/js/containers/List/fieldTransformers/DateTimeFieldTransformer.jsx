"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const moment_1 = __importDefault(require("moment"));
const loglevel_1 = __importDefault(require("loglevel"));
const classnames_1 = __importDefault(require("classnames"));
const utils_1 = require("../../../utils");
const dateTimeFieldTransformer_scss_1 = __importDefault(require("./dateTimeFieldTransformer.scss"));
class DateTimeFieldTransformer {
    transform(value, parameters) {
        if (!value) {
            return null;
        }
        const momentObject = (0, moment_1.default)(value, moment_1.default.ISO_8601);
        if (!momentObject.isValid()) {
            loglevel_1.default.error('Invalid date given: "' + value + '". Format needs to be in "ISO 8601"');
            return null;
        }
        const { skin = 'default', format = 'default', } = parameters || {};
        if (typeof skin !== 'string') {
            loglevel_1.default.error(`Transformer parameter "skin" needs to be of type string, ${typeof skin} given.`);
            return null;
        }
        let formattedDate;
        switch (format) {
            case 'relative':
                formattedDate = this.getRelativeDateTime(momentObject);
                break;
            default:
                formattedDate = this.getDefaultDateTime(momentObject);
                break;
        }
        const className = (0, classnames_1.default)(dateTimeFieldTransformer_scss_1.default[skin]);
        return (<span className={className}>
                {formattedDate}
            </span>);
    }
    getRelativeDateTime(momentObject) {
        const defaultFct = () => {
            return '[' + this.getDefaultDateTime(momentObject) + ']';
        };
        return momentObject.calendar({
            sameDay: '[' + (0, utils_1.translate)('sulu_admin.sameDay') + '] HH:mm',
            lastDay: '[' + (0, utils_1.translate)('sulu_admin.lastDay') + '] HH:mm',
            nextDay: '[' + (0, utils_1.translate)('sulu_admin.nextDay') + '] HH:mm',
            nextWeek: defaultFct(),
            lastWeek: defaultFct(),
            sameElse: defaultFct(),
        });
    }
    getDefaultDateTime(momentObject) {
        return momentObject.format('LLL');
    }
}
exports.default = DateTimeFieldTransformer;
