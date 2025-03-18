"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const components_1 = require("sulu-admin-bundle/components");
const imageFocusPointCell_scss_1 = __importDefault(require("./imageFocusPointCell.scss"));
const ICON_UP = 'su-angle-up';
class ImageFocusPointCell extends react_1.default.PureComponent {
    constructor() {
        super(...arguments);
        this.handleClick = () => {
            const { value, onClick, } = this.props;
            if (onClick) {
                onClick(value);
            }
        };
    }
    static getDirectionInDegrees(direction) {
        switch (direction) {
            case 'left':
                return -90;
            case 'top-left':
                return -45;
            case 'top':
                return 0;
            case 'top-right':
                return 45;
            case 'right':
                return 90;
            case 'bottom-right':
                return 125;
            case 'bottom':
                return 180;
            case 'bottom-left':
                return 225;
        }
        throw new Error(`Direction with the name "${direction}" is undefined.`);
    }
    render() {
        const { size, active, arrowDirection, } = this.props;
        const buttonStyle = {
            width: `${size}%`,
            height: `${size}%`,
        };
        const focusPointClass = (0, classnames_1.default)(imageFocusPointCell_scss_1.default.imageFocusPointCell, {
            [imageFocusPointCell_scss_1.default.active]: active,
        });
        const iconStyle = arrowDirection
            ? { transform: `rotate(${ImageFocusPointCell.getDirectionInDegrees(arrowDirection)}deg)` }
            : {};
        return (<button className={focusPointClass} disabled={active} onClick={this.handleClick} style={buttonStyle} type="button">
                {!!arrowDirection && !active &&
                <div style={iconStyle}>
                        <components_1.Icon name={ICON_UP}/>
                    </div>}
            </button>);
    }
}
ImageFocusPointCell.defaultProps = {
    active: false,
};
exports.default = ImageFocusPointCell;
