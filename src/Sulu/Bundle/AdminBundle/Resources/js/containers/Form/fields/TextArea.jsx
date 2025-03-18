"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const loglevel_1 = __importDefault(require("loglevel"));
const TextArea_1 = __importDefault(require("../../../components/TextArea"));
class TextArea extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this.handleFocus = (event) => {
            const { onFocus, } = this.props;
            if (onFocus) {
                onFocus(event.target);
            }
        };
    }
    render() {
        const { dataPath, error, onChange, onFinish, disabled, schemaOptions: { max_characters: { value: maxCharacters, } = {}, soft_max_length: { value: softMaxLength, } = {}, rows: { value: rows, } = {}, } = {}, value, } = this.props;
        if (maxCharacters !== undefined) {
            loglevel_1.default.warn('The "max_characters" schema option is deprecated since version 2.3 and will be removed. ' +
                'Use the "soft_max_length" option instead.');
        }
        if (maxCharacters !== undefined && isNaN(maxCharacters)) {
            throw new Error('The "max_characters" schema option must be a number!');
        }
        if (softMaxLength !== undefined && isNaN(softMaxLength)) {
            throw new Error('The "soft_max_length" schema option must be a number!');
        }
        if (rows !== undefined && isNaN(rows)) {
            throw new Error('The "rows" schema option must be a number!');
        }
        const evaluatedSoftMaxLength = softMaxLength || maxCharacters;
        return (<TextArea_1.default disabled={!!disabled} id={dataPath} maxCharacters={evaluatedSoftMaxLength ? parseInt(evaluatedSoftMaxLength) : undefined} onBlur={onFinish} onChange={onChange} onFocus={this.handleFocus} rows={rows ? parseInt(rows) : undefined} valid={!error} value={value}/>);
    }
}
exports.default = TextArea;
