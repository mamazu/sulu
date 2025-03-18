"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Button_1 = __importDefault(require("../../components/Button"));
const Input_1 = __importDefault(require("../../components/Input"));
const editLine_scss_1 = __importDefault(require("./editLine.scss"));
class EditLine extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this.handleChange = (value) => {
            const { id, onChange } = this.props;
            onChange(id, value);
        };
        this.handleRemove = () => {
            const { id, onRemove } = this.props;
            onRemove(id);
        };
    }
    render() {
        const { inputRef, value } = this.props;
        return (<div className={editLine_scss_1.default.editLine}>
                <Input_1.default inputRef={inputRef} onChange={this.handleChange} value={value}/>
                <Button_1.default className={editLine_scss_1.default.icon} icon="su-trash-alt" onClick={this.handleRemove} skin="icon"/>
            </div>);
    }
}
exports.default = EditLine;
