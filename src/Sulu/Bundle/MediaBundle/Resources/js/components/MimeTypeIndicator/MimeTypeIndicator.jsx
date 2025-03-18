"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const components_1 = require("sulu-admin-bundle/components");
const MimeTypeMapper_1 = __importDefault(require("./MimeTypeMapper"));
const mimeTypeIndicator_scss_1 = __importDefault(require("./mimeTypeIndicator.scss"));
class MimeTypeIndicator extends react_1.default.PureComponent {
    render() {
        const { width, height, iconSize, mimeType, } = this.props;
        const { icon, backgroundColor, } = MimeTypeMapper_1.default.get(mimeType);
        const mimeTypeStyles = {};
        mimeTypeStyles.color = '#fff';
        mimeTypeStyles.fontSize = iconSize;
        mimeTypeStyles.backgroundColor = backgroundColor;
        if (width) {
            mimeTypeStyles.width = width;
        }
        if (height) {
            mimeTypeStyles.height = height;
        }
        return (<div className={mimeTypeIndicator_scss_1.default.mimeTypeIndicator} style={mimeTypeStyles}>
                <components_1.Icon name={icon}/>
            </div>);
    }
}
MimeTypeIndicator.defaultProps = {
    iconSize: 52,
};
exports.default = MimeTypeIndicator;
