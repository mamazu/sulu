"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const tab_scss_1 = __importDefault(require("./tab.scss"));
class Tab extends react_1.default.PureComponent {
    constructor() {
        super(...arguments);
        this.setTabRef = (ref) => {
            const { index, tabRef } = this.props;
            if (tabRef) {
                tabRef(index, ref);
            }
        };
        this.handleClick = () => {
            const { index, onClick } = this.props;
            if (onClick) {
                onClick(index);
            }
        };
    }
    render() {
        const { badges, children, hidden, type, selected, } = this.props;
        const tabClass = (0, classnames_1.default)(tab_scss_1.default.tab, tab_scss_1.default[type], {
            [tab_scss_1.default.hidden]: hidden,
            [tab_scss_1.default.selected]: selected,
        });
        return (<li className={tabClass} ref={this.setTabRef}>
                <button disabled={selected} onClick={this.handleClick} title={children} type="button">
                    {children}
                    {!!badges && !!badges.length &&
                <div className={tab_scss_1.default.badges}>
                            {badges}
                        </div>}
                </button>
            </li>);
    }
}
Tab.defaultProps = {
    badges: [],
    hidden: false,
    selected: false,
};
exports.default = Tab;
