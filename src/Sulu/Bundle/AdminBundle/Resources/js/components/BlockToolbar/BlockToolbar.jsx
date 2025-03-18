"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const Checkbox_1 = __importDefault(require("../Checkbox"));
const utils_1 = require("../../utils");
const Icon_1 = __importDefault(require("../Icon"));
const Tooltip_1 = __importDefault(require("../Tooltip"));
const blockToolbar_scss_1 = __importDefault(require("./blockToolbar.scss"));
class BlockToolbar extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.handleChangeSelectAll = () => {
            const { onSelectAll, onUnselectAll, allSelected } = this.props;
            if (onSelectAll && !allSelected) {
                onSelectAll();
            }
            else if (onUnselectAll && allSelected) {
                onUnselectAll();
            }
        };
        this.handleCancel = () => {
            const { onCancel } = this.props;
            if (onCancel) {
                onCancel();
            }
        };
    }
    render() {
        const { actions, allSelected, selectedCount, mode, } = this.props;
        return (<section className={(0, classnames_1.default)(blockToolbar_scss_1.default.container, blockToolbar_scss_1.default[mode])}>
                <div className={blockToolbar_scss_1.default.divide}>
                    <div className={blockToolbar_scss_1.default.selected}>
                        {(0, utils_1.translate)('sulu_admin.%count%_selected', { count: selectedCount })}
                    </div>

                    <div>
                        <Checkbox_1.default checked={allSelected} onChange={this.handleChangeSelectAll} size="small">
                            {(0, utils_1.translate)('sulu_admin.select_all')}
                        </Checkbox_1.default>
                    </div>
                </div>

                <div className={blockToolbar_scss_1.default.divide}>
                    <div className={blockToolbar_scss_1.default.actionList}>
                        {actions.map((action) => (<Tooltip_1.default key={action.label} label={action.label}>
                                <button aria-label={action.label} className={(0, classnames_1.default)(blockToolbar_scss_1.default.actionButton, {
                    [blockToolbar_scss_1.default.actionButtonDisabled]: selectedCount === 0,
                })} disabled={selectedCount === 0} onClick={action.handleClick} type="button">
                                    <Icon_1.default className={blockToolbar_scss_1.default.actionButtonIcon} name={action.icon}/>
                                </button>
                            </Tooltip_1.default>))}
                    </div>

                    <div>
                        <button className={blockToolbar_scss_1.default.cancelButton} onClick={this.handleCancel} type="button">
                            <Icon_1.default className={blockToolbar_scss_1.default.cancelButtonIcon} name="su-cancel"/>

                            {(0, utils_1.translate)('sulu_admin.cancel')}
                        </button>
                    </div>
                </div>
            </section>);
    }
}
BlockToolbar.defaultProps = {
    actions: [],
    allSelected: false,
    mode: 'static',
    selectedCount: 0,
};
exports.default = BlockToolbar;
