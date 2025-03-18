"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const croppedText_scss_1 = __importDefault(require("./croppedText.scss"));
class CroppedText extends react_1.default.PureComponent {
    render() {
        let { children } = this.props;
        if (!children) {
            return null;
        }
        children = children.toString();
        const index = Math.ceil(children.length / 2);
        const frontText = children.substr(0, index);
        const backText = children.substr(index);
        return (<div aria-label={children} className={croppedText_scss_1.default.croppedText} title={children}>
                <div aria-hidden={true} className={croppedText_scss_1.default.front}>{frontText}</div>
                <div aria-hidden={true} className={croppedText_scss_1.default.back}><span>{backText}</span></div>
                <div className={croppedText_scss_1.default.whole}>{children}</div>
            </div>);
    }
}
exports.default = CroppedText;
