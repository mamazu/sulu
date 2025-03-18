"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Icon_1 = __importDefault(require("../Icon"));
const suggestion_scss_1 = __importDefault(require("./suggestion.scss"));
class Suggestion extends react_1.default.PureComponent {
    constructor() {
        super(...arguments);
        this.highlightMatchingTextPart = (text) => {
            if (!text) {
                return null;
            }
            if (!this.props.query) {
                return text;
            }
            let matcher;
            let splittedText;
            let highlightedWords = [];
            try {
                // try to match all highlighted parts using case insensitive regular expression
                matcher = new RegExp(this.props.query, 'gi');
                splittedText = text.split(matcher);
                highlightedWords = text.match(matcher);
            }
            catch (e) {
                // fallback to highlight first exact match if given query is an invalid regular expression like "*"
                splittedText = text.split(this.props.query);
                highlightedWords = [];
                for (let i = 0; i < splittedText.length - 1; i++) {
                    highlightedWords.push(this.props.query);
                }
            }
            return (<span>
                {splittedText.map((splitText, index) => {
                    return (<>
                            {splitText}
                            {highlightedWords && highlightedWords[index]
                            ? <strong>{highlightedWords[index]}</strong>
                            : null}
                        </>);
                })}
            </span>);
        };
        this.handleClick = () => {
            const { value, onSelect, } = this.props;
            if (onSelect) {
                onSelect(value);
            }
        };
    }
    render() {
        const { minWidth, icon, children, } = this.props;
        return (<li className={suggestion_scss_1.default.suggestionItem} style={{ minWidth: minWidth + 'px' }}>
                <button className={suggestion_scss_1.default.suggestion} onClick={this.handleClick} type="button">
                    {icon &&
                <Icon_1.default className={suggestion_scss_1.default.icon} name={icon}/>}
                    {typeof children === 'string' &&
                this.highlightMatchingTextPart(children)}
                    {typeof children === 'function' &&
                children(this.highlightMatchingTextPart)}
                </button>
            </li>);
    }
}
Suggestion.defaultProps = {
    minWidth: 0,
    query: '',
};
exports.default = Suggestion;
