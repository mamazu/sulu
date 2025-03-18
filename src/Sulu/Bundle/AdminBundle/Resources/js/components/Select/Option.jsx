"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const Icon_1 = __importDefault(require("../Icon"));
const Checkbox_1 = __importDefault(require("../Checkbox"));
const option_scss_1 = __importDefault(require("./option.scss"));
const ANCHOR_WIDTH_DIFFERENCE = 10;
class Option extends react_1.default.PureComponent {
    constructor() {
        super(...arguments);
        this.triggerButton = () => {
            if (this.props.onClick) {
                this.props.onClick(this.props.value);
            }
        };
        this.handleButtonClick = () => {
            this.triggerButton();
        };
        this.handleButtonKeyDown = (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                event.stopPropagation();
                this.triggerButton();
            }
        };
        this.setItemRef = (ref) => {
            const { optionRef, selected, } = this.props;
            if (optionRef && ref) {
                optionRef(ref, selected);
            }
        };
        this.setButtonRef = (ref) => {
            const { buttonRef } = this.props;
            if (buttonRef) {
                buttonRef(ref);
            }
        };
        this.handleMouseMove = () => {
            if (this.props.requestFocus) {
                this.props.requestFocus();
            }
        };
    }
    renderSelectedVisualization() {
        if (this.props.selectedVisualization === 'icon') {
            return this.props.selected ? <Icon_1.default className={option_scss_1.default.icon} name="su-check"/> : null;
        }
        return (<Checkbox_1.default checked={this.props.selected} className={option_scss_1.default.input} onChange={this.handleButtonClick} tabIndex={-1}/>);
    }
    render() {
        const { anchorWidth, selected, children, disabled, selectedVisualization, } = this.props;
        const optionClass = (0, classnames_1.default)(option_scss_1.default.option, option_scss_1.default[selectedVisualization], {
            [option_scss_1.default.selected]: selected,
        });
        return (<li onMouseMove={this.handleMouseMove} ref={this.setItemRef}>
                <button className={optionClass} disabled={disabled} onClick={this.handleButtonClick} onKeyDown={this.handleButtonKeyDown} ref={this.setButtonRef} style={{ minWidth: anchorWidth + ANCHOR_WIDTH_DIFFERENCE }} type="button">
                    {this.renderSelectedVisualization()}
                    {children}
                </button>
            </li>);
    }
}
Option.defaultProps = {
    anchorWidth: 0,
    disabled: false,
    selected: false,
    selectedVisualization: 'icon',
};
exports.default = Option;
