"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Divider_1 = __importDefault(require("./Divider"));
const menu_scss_1 = __importDefault(require("./menu.scss"));
class Menu extends react_1.default.PureComponent {
    constructor() {
        super(...arguments);
        this.setRef = (ref) => {
            const { menuRef } = this.props;
            if (menuRef && ref) {
                menuRef(ref);
            }
        };
    }
    render() {
        const { style, children, } = this.props;
        return (<ul className={menu_scss_1.default.menu} ref={this.setRef} style={style}>
                {children}
            </ul>);
    }
}
Menu.Divider = Divider_1.default;
exports.default = Menu;
