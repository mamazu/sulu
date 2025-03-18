"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const loglevel_1 = __importDefault(require("loglevel"));
const Input_1 = __importDefault(require("../../../components/Input"));
class Input extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this.handleBlur = () => {
            this.props.onFinish();
        };
        this.handleFocus = (event) => {
            const { onFocus, } = this.props;
            if (onFocus) {
                onFocus(event.target);
            }
        };
    }
    render() {
        const { dataPath, error, disabled, onChange, schemaOptions: { headline: { value: headline, } = {}, max_characters: { value: maxCharacters, } = {}, soft_max_length: { value: softMaxLength, } = {}, max_segments: { value: maxSegments, } = {}, segment_delimiter: { value: segmentDelimiter, } = {}, } = {}, value, } = this.props;
        if (headline !== undefined && typeof headline !== 'boolean') {
            throw new Error('The "headline" schema option must be a boolean!');
        }
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
        const evaluatedSoftMaxLength = softMaxLength || maxCharacters;
        if (maxSegments !== undefined && isNaN(maxSegments)) {
            throw new Error('The "max_segments" schema option must be a number!');
        }
        if (segmentDelimiter !== undefined && typeof segmentDelimiter !== 'string') {
            throw new Error('The "segment_delimiter" schema option must be a string!');
        }
        return (<Input_1.default disabled={!!disabled} headline={headline} id={dataPath} maxCharacters={evaluatedSoftMaxLength
                ? parseInt(evaluatedSoftMaxLength)
                : undefined} maxSegments={maxSegments ? parseInt(maxSegments) : undefined} onBlur={this.handleBlur} onChange={onChange} onFocus={this.handleFocus} segmentDelimiter={segmentDelimiter} valid={!error} value={value}/>);
    }
}
exports.default = Input;
