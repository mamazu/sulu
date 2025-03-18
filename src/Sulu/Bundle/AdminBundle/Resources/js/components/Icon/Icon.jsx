"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("@fortawesome/fontawesome-free/css/all.css");
require("@fortawesome/fontawesome-free/css/v4-shims.css");
require("./sulu-icon.css");
const react_1 = __importDefault(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const loglevel_1 = __importDefault(require("loglevel"));
const icon_scss_1 = __importDefault(require("./icon.scss"));
function logInvalidIconWarning(name) {
    loglevel_1.default.warn('Invalid icon given: "' + name + '"');
}
class Icon extends react_1.default.PureComponent {
    constructor() {
        super(...arguments);
        this.handleClick = (event) => {
            const { onClick } = this.props;
            if (!onClick) {
                return;
            }
            event.stopPropagation();
            onClick();
        };
        this.handleKeypress = (event) => {
            const { onClick } = this.props;
            if (!onClick) {
                return;
            }
            if (event.key === 'Enter' || event.key === ' ') {
                event.stopPropagation();
                onClick();
            }
        };
    }
    render() {
        const { className, name, onClick, iconRef, style } = this.props;
        let fontClass = '';
        if (!name || name.length <= 0) {
            logInvalidIconWarning(name);
            return null;
        }
        switch (name.substr(0, 3)) {
            case 'su-':
                fontClass = null;
                break;
            case 'fa-':
                fontClass = 'fa';
                break;
            case 'fas':
            case 'fab':
                fontClass = null;
                break;
            default:
                logInvalidIconWarning(name);
                return null;
        }
        const iconClass = (0, classnames_1.default)(fontClass ? fontClass : undefined, name, {
            [icon_scss_1.default.clickable]: onClick,
        }, className);
        const onClickProperties = onClick
            ? {
                onClick: this.handleClick,
                onKeyPress: this.handleKeypress,
                role: 'button',
                tabIndex: 0,
            }
            : {};
        return (<span aria-label={name} className={iconClass} ref={iconRef} style={style} {...onClickProperties}/>);
    }
}
exports.default = Icon;
