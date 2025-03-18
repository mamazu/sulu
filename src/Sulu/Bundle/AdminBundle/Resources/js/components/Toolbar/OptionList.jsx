"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const classnames_1 = __importDefault(require("classnames"));
const react_1 = __importDefault(require("react"));
const Option_1 = __importDefault(require("./Option"));
const optionList_scss_1 = __importDefault(require("./optionList.scss"));
class OptionList extends react_1.default.PureComponent {
    constructor() {
        super(...arguments);
        this.handleOptionClick = (option) => {
            const { onClose, onOptionClick } = this.props;
            if (onOptionClick) {
                onOptionClick(option);
            }
            if (onClose) {
                onClose();
            }
        };
    }
    render() {
        const { size, value, options, skin, } = this.props;
        const optionListClass = (0, classnames_1.default)(optionList_scss_1.default.optionList, optionList_scss_1.default[skin], {
            [optionList_scss_1.default[size]]: size,
        });
        return (<ul className={optionListClass}>
                {options.map((option, index) => {
                const selected = option.value ? option.value === value : false;
                return (<Option_1.default disabled={option.disabled} key={index} label={option.label} onClick={this.handleOptionClick} selected={selected} size={size} skin={skin} value={option}/>);
            })}
            </ul>);
    }
}
exports.default = OptionList;
