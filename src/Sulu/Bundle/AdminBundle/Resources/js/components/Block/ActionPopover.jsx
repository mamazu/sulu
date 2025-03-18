"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const __1 = require("..");
const ActionPopoverItem_1 = __importDefault(require("./ActionPopoverItem"));
class ActionPopover extends react_1.default.PureComponent {
    constructor() {
        super(...arguments);
        this.handleActionClick = (index) => {
            const { actions, onClose } = this.props;
            const action = actions[index];
            if (action.type === 'divider') {
                throw new Error('Divider actions cannot be clicked! This should not happen and is likely a bug.');
            }
            action.onClick();
            onClose();
        };
    }
    render() {
        const { open, onClose, anchorElement, } = this.props;
        return (<__1.Popover anchorElement={anchorElement} onClose={onClose} open={open} verticalOffset={5}>
                {(setPopoverRef, popoverStyle) => (<__1.Menu menuRef={setPopoverRef} style={popoverStyle}>
                        {this.props.actions.map((action, index) => {
                    if (action.type === 'divider') {
                        return <__1.Menu.Divider key={index}/>;
                    }
                    return (<ActionPopoverItem_1.default icon={action.icon} index={index} key={index} label={action.label} onClick={this.handleActionClick}/>);
                })}
                    </__1.Menu>)}
            </__1.Popover>);
    }
}
exports.default = ActionPopover;
