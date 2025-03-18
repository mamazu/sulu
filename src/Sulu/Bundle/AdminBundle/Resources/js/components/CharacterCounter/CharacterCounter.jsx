"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const Translator_1 = require("../../utils/Translator");
const characterCounter_scss_1 = __importDefault(require("./characterCounter.scss"));
class CharacterCounter extends react_1.default.Component {
    render() {
        const { max, value } = this.props;
        const charactersLeft = max - (value ? value.toString().length : 0);
        const charactersLeftLabelClass = (0, classnames_1.default)(characterCounter_scss_1.default.characterCounter, {
            [characterCounter_scss_1.default.exceeded]: charactersLeft && charactersLeft < 0,
        });
        return (<label className={charactersLeftLabelClass}>
                {charactersLeft + ' ' + (0, Translator_1.translate)('sulu_admin.characters_left')}
            </label>);
    }
}
exports.default = CharacterCounter;
