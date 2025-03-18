"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Icon_1 = __importDefault(require("../Icon"));
const folder_scss_1 = __importDefault(require("./folder.scss"));
const FOLDER_ICON = 'su-folder';
const FOLDER_PERMISSION_ICON = 'su-folder-permission';
class Folder extends react_1.default.PureComponent {
    constructor() {
        super(...arguments);
        this.handleClick = () => {
            if (this.props.onClick) {
                this.props.onClick(this.props.id);
            }
        };
        this.handleKeypress = (event) => {
            const { onClick, id } = this.props;
            if (!onClick) {
                return;
            }
            if (event.key === 'Enter' || event.key === ' ') {
                event.stopPropagation();
                onClick(id);
            }
        };
    }
    render() {
        const { hasPermissions, info, title, } = this.props;
        return (<div className={folder_scss_1.default.folder} onClick={this.handleClick} onKeyPress={this.handleKeypress} role="button" tabIndex="0">
                <div className={folder_scss_1.default.iconContainer}>
                    <Icon_1.default name={hasPermissions ? FOLDER_PERMISSION_ICON : FOLDER_ICON}/>
                </div>
                <div className={folder_scss_1.default.description}>
                    <h5 className={folder_scss_1.default.title}>
                        {title}
                    </h5>
                    <div className={folder_scss_1.default.info}>
                        {info}
                    </div>
                </div>
            </div>);
    }
}
exports.default = Folder;
