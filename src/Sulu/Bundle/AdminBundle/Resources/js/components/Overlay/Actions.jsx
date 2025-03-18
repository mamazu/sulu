"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Button_1 = __importDefault(require("../Button"));
const actions_scss_1 = __importDefault(require("./actions.scss"));
class Actions extends react_1.default.PureComponent {
    render() {
        const { actions } = this.props;
        if (!actions.length) {
            return null;
        }
        return (<div className={actions_scss_1.default.actions}>
                {actions.map((action, index) => {
                const handleButtonClick = action.onClick;
                return (<Button_1.default key={index} onClick={handleButtonClick} skin="link">
                            {action.title}
                        </Button_1.default>);
            })}
            </div>);
    }
}
exports.default = Actions;
