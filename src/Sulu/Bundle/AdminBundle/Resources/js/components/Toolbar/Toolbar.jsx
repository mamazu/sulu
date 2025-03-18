"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const Button_1 = __importDefault(require("./Button"));
const Controls_1 = __importDefault(require("./Controls"));
const Dropdown_1 = __importDefault(require("./Dropdown"));
const Items_1 = __importDefault(require("./Items"));
const Icons_1 = __importDefault(require("./Icons"));
const Popover_1 = __importDefault(require("./Popover"));
const Toggler_1 = __importDefault(require("./Toggler"));
const Select_1 = __importDefault(require("./Select"));
const toolbar_scss_1 = __importDefault(require("./toolbar.scss"));
class Toolbar extends react_1.default.PureComponent {
    static createChildren(children, skin) {
        return react_1.default.Children.map(children, (child) => {
            if (!child) {
                return null;
            }
            return react_1.default.cloneElement(child, Object.assign(Object.assign({}, child.props), { skin }));
        });
    }
    render() {
        const { children, skin, } = this.props;
        const toolbarClass = (0, classnames_1.default)(toolbar_scss_1.default.toolbar, toolbar_scss_1.default[skin]);
        return (<nav className={toolbarClass}>
                {Toolbar.createChildren(children, skin)}
            </nav>);
    }
}
Toolbar.defaultProps = {
    skin: 'light',
};
Toolbar.Button = Button_1.default;
Toolbar.Controls = Controls_1.default;
Toolbar.Dropdown = Dropdown_1.default;
Toolbar.Icons = Icons_1.default;
Toolbar.Items = Items_1.default;
Toolbar.Popover = Popover_1.default;
Toolbar.Select = Select_1.default;
Toolbar.Toggler = Toggler_1.default;
exports.default = Toolbar;
