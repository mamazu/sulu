"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const Loader_1 = __importDefault(require("../Loader"));
const Button_1 = __importDefault(require("./Button"));
const header_scss_1 = __importDefault(require("./header.scss"));
const LOADER_SIZE = 24;
class Header extends react_1.default.PureComponent {
    render() {
        const { disabled, label, loading, emptyList, leftButton, rightButton, } = this.props;
        const headerClass = (0, classnames_1.default)(header_scss_1.default.header, {
            [header_scss_1.default.disabled]: disabled,
            [header_scss_1.default.emptyList]: emptyList,
        });
        return (<div className={headerClass}>
                {leftButton &&
                <Button_1.default {...leftButton} location="left"/>}
                <div className={header_scss_1.default.label}>
                    {loading &&
                <div className={header_scss_1.default.loader}>
                            <Loader_1.default size={LOADER_SIZE}/>
                        </div>}
                    {!loading &&
                label}
                </div>
                {rightButton &&
                <Button_1.default {...rightButton} location="right"/>}
            </div>);
    }
}
Header.defaultProps = {
    disabled: false,
    emptyList: true,
};
exports.default = Header;
