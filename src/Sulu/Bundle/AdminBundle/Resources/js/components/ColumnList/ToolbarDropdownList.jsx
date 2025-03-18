"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const ToolbarDropdownListOption_1 = __importDefault(require("./ToolbarDropdownListOption"));
const toolbarDropdown_scss_1 = __importDefault(require("./toolbarDropdown.scss"));
class ToolbarDropdownList extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this.renderOptions = () => {
            const { options } = this.props;
            return options.map((dropdownOptionConfig, columnIndex) => {
                const key = `option-${columnIndex}`;
                const { disabled, onClick, label } = dropdownOptionConfig;
                return (<ToolbarDropdownListOption_1.default disabled={disabled} key={key} onClick={onClick}>
                    {label}
                </ToolbarDropdownListOption_1.default>);
            });
        };
    }
    render() {
        const { onClick, skin } = this.props;
        const className = (0, classnames_1.default)(toolbarDropdown_scss_1.default.list, toolbarDropdown_scss_1.default[skin]);
        return (<button className={toolbarDropdown_scss_1.default.listContainer} onClick={onClick} type="button">
                <ul className={className}>
                    {this.renderOptions()}
                </ul>
            </button>);
    }
}
ToolbarDropdownList.defaultProps = {
    skin: 'primary',
};
exports.default = ToolbarDropdownList;
