"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const progressBar_scss_1 = __importDefault(require("./progressBar.scss"));
class ProgressBar extends react_1.default.PureComponent {
    get max() {
        const { max } = this.props;
        if (max < 1) {
            return 1;
        }
        return max;
    }
    get value() {
        const { value } = this.props;
        if (value < 0) {
            return 0;
        }
        if (value > this.max) {
            return this.max;
        }
        return value;
    }
    render() {
        const { skin } = this.props;
        const className = (0, classnames_1.default)(progressBar_scss_1.default.progressBar, progressBar_scss_1.default[skin]);
        return (<progress className={className} max={this.max} value={this.value}>
                {(this.value / this.max) * 100}%
            </progress>);
    }
}
ProgressBar.defaultProps = {
    skin: 'progress',
};
exports.default = ProgressBar;
