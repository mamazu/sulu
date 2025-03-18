"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const collapsedTab_scss_1 = __importDefault(require("./collapsedTab.scss"));
class CollapsedTab extends react_1.default.PureComponent {
    constructor() {
        super(...arguments);
        this.handleClick = () => {
            const { index, onClick, } = this.props;
            onClick(index);
        };
    }
    render() {
        const { children, } = this.props;
        return (<li className={collapsedTab_scss_1.default.collapsedTab}>
                <button onClick={this.handleClick} title={children} type="button">
                    {children}
                </button>
            </li>);
    }
}
exports.default = CollapsedTab;
