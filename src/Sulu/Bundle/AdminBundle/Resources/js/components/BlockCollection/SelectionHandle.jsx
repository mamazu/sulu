"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Checkbox_1 = __importDefault(require("../Checkbox"));
const selectionHandle_scss_1 = __importDefault(require("./selectionHandle.scss"));
class SelectionHandle extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this.handleChange = () => {
            const { onChange } = this.props;
            if (onChange) {
                onChange();
            }
        };
        this.handleContainerClick = (event) => {
            event.stopPropagation();
            this.handleChange();
        };
    }
    render() {
        const { checked } = this.props;
        return (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <div className={selectionHandle_scss_1.default.container} onClick={this.handleContainerClick}>
                <Checkbox_1.default checked={checked} onChange={this.handleChange} skin={checked ? 'light' : 'dark'}/>
            </div>);
    }
}
exports.default = SelectionHandle;
