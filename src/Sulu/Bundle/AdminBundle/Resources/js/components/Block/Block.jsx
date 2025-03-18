"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const mobx_react_1 = require("mobx-react");
const mobx_1 = require("mobx");
const loglevel_1 = __importDefault(require("loglevel"));
const Icon_1 = __importDefault(require("../Icon"));
const SingleSelect_1 = __importDefault(require("../SingleSelect"));
const utils_1 = require("../../utils");
const block_scss_1 = __importDefault(require("./block.scss"));
const ActionPopover_1 = __importDefault(require("./ActionPopover"));
let Block = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _instanceExtraInitializers = [];
    let _actionsButtonRef_decorators;
    let _actionsButtonRef_initializers = [];
    let _actionsButtonRef_extraInitializers = [];
    let _showActionsPopover_decorators;
    let _showActionsPopover_initializers = [];
    let _showActionsPopover_extraInitializers = [];
    let _get_actions_decorators;
    let _setActionsButtonRef_decorators;
    let _setActionsButtonRef_initializers = [];
    let _setActionsButtonRef_extraInitializers = [];
    let _handleActionsButtonClick_decorators;
    let _handleActionsButtonClick_initializers = [];
    let _handleActionsButtonClick_extraInitializers = [];
    let _handleActionsPopoverClose_decorators;
    let _handleActionsPopoverClose_initializers = [];
    let _handleActionsPopoverClose_extraInitializers = [];
    var Block = _classThis = class extends _classSuper {
        constructor() {
            super(...arguments);
            this.actionsButtonRef = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _actionsButtonRef_initializers, void 0));
            this.showActionsPopover = (__runInitializers(this, _actionsButtonRef_extraInitializers), __runInitializers(this, _showActionsPopover_initializers, false));
            this.setActionsButtonRef = (__runInitializers(this, _showActionsPopover_extraInitializers), __runInitializers(this, _setActionsButtonRef_initializers, (ref) => {
                this.actionsButtonRef = ref;
            }));
            this.handleActionsButtonClick = (__runInitializers(this, _setActionsButtonRef_extraInitializers), __runInitializers(this, _handleActionsButtonClick_initializers, () => {
                this.showActionsPopover = true;
            }));
            this.handleActionsPopoverClose = (__runInitializers(this, _handleActionsButtonClick_extraInitializers), __runInitializers(this, _handleActionsPopoverClose_initializers, () => {
                this.showActionsPopover = false;
            }));
            this.handleCollapse = (__runInitializers(this, _handleActionsPopoverClose_extraInitializers), () => {
                const { expanded, onCollapse } = this.props;
                if (expanded && onCollapse) {
                    onCollapse();
                }
            });
            this.handleExpand = () => {
                const { expanded, onExpand } = this.props;
                if (!expanded && onExpand) {
                    onExpand();
                }
            };
            this.handleTypeChange = (type) => {
                const { onTypeChange } = this.props;
                if (onTypeChange) {
                    onTypeChange(type);
                }
            };
        }
        get actions() {
            const { onRemove, actions } = this.props;
            // @deprecated
            if (onRemove) {
                loglevel_1.default.warn('The "onRemove" prop of the "Block" component is deprecated since 2.5 and will ' +
                    'be removed. Use the "actions" prop with an appropriate callback instead.');
                return [
                    ...actions,
                    {
                        type: 'button',
                        icon: 'su-trash-alt',
                        label: (0, utils_1.translate)('sulu_admin.delete'),
                        onClick: onRemove,
                    },
                ];
            }
            return actions;
        }
        render() {
            const { activeType, children, handle, icons, onCollapse, onExpand, onSettingsClick, selected, types, } = this.props;
            const expanded = this.props.expanded || (!onCollapse && !onExpand);
            const blockClass = (0, classnames_1.default)(block_scss_1.default.block, {
                [block_scss_1.default.expanded]: expanded,
                [block_scss_1.default.selected]: selected,
            });
            return (<section className={blockClass} onClick={this.handleExpand} role="switch">
                {handle &&
                    <div className={block_scss_1.default.handle}>
                        {handle}
                    </div>}
                <div className={block_scss_1.default.content}>
                    <header className={block_scss_1.default.header}>
                        {expanded
                    ? <react_1.Fragment>
                                {types && Object.keys(types).length > 1 &&
                            <div className={block_scss_1.default.types}>
                                        <SingleSelect_1.default onChange={this.handleTypeChange} value={activeType}>
                                            {Object.keys(types).map((key) => (
                                // $FlowFixMe
                                <SingleSelect_1.default.Option key={key} value={key}>
                                                    {types[key]}
                                                </SingleSelect_1.default.Option>))}
                                        </SingleSelect_1.default>
                                    </div>}
                                {icons &&
                            <div className={block_scss_1.default.icons}>
                                        {icons.map((icon) => <Icon_1.default key={icon} name={icon}/>)}
                                    </div>}
                                <div className={block_scss_1.default.iconButtons}>
                                    {this.actions.length > 0 && (<button onClick={this.handleActionsButtonClick} ref={this.setActionsButtonRef} type="button">
                                            <Icon_1.default name="su-more-circle"/>
                                        </button>)}
                                    {onSettingsClick && (<button onClick={onSettingsClick} type="button">
                                            <Icon_1.default name="su-cog"/>
                                        </button>)}
                                    {onCollapse && onExpand && (<button onClick={this.handleCollapse} type="button">
                                            <Icon_1.default name="su-collapse-vertical"/>
                                        </button>)}
                                </div>
                                <ActionPopover_1.default actions={this.actions} anchorElement={this.actionsButtonRef} onClose={this.handleActionsPopoverClose} open={this.showActionsPopover}/>
                            </react_1.Fragment>
                    : <react_1.Fragment>
                                {icons &&
                            <div className={block_scss_1.default.icons}>
                                        {icons.map((icon) => <Icon_1.default key={icon} name={icon}/>)}
                                    </div>}
                                {types && activeType && <div className={block_scss_1.default.type}>{types[activeType]}</div>}
                                {onCollapse && onExpand && <Icon_1.default name="su-expand-vertical"/>}
                            </react_1.Fragment>}
                    </header>
                    <article className={block_scss_1.default.children}>{children}</article>
                </div>
            </section>);
        }
    };
    __setFunctionName(_classThis, "Block");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _actionsButtonRef_decorators = [mobx_1.observable];
        _showActionsPopover_decorators = [mobx_1.observable];
        _get_actions_decorators = [mobx_1.computed];
        _setActionsButtonRef_decorators = [mobx_1.action];
        _handleActionsButtonClick_decorators = [mobx_1.action];
        _handleActionsPopoverClose_decorators = [mobx_1.action];
        __esDecorate(_classThis, null, _get_actions_decorators, { kind: "getter", name: "actions", static: false, private: false, access: { has: obj => "actions" in obj, get: obj => obj.actions }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _actionsButtonRef_decorators, { kind: "field", name: "actionsButtonRef", static: false, private: false, access: { has: obj => "actionsButtonRef" in obj, get: obj => obj.actionsButtonRef, set: (obj, value) => { obj.actionsButtonRef = value; } }, metadata: _metadata }, _actionsButtonRef_initializers, _actionsButtonRef_extraInitializers);
        __esDecorate(null, null, _showActionsPopover_decorators, { kind: "field", name: "showActionsPopover", static: false, private: false, access: { has: obj => "showActionsPopover" in obj, get: obj => obj.showActionsPopover, set: (obj, value) => { obj.showActionsPopover = value; } }, metadata: _metadata }, _showActionsPopover_initializers, _showActionsPopover_extraInitializers);
        __esDecorate(null, null, _setActionsButtonRef_decorators, { kind: "field", name: "setActionsButtonRef", static: false, private: false, access: { has: obj => "setActionsButtonRef" in obj, get: obj => obj.setActionsButtonRef, set: (obj, value) => { obj.setActionsButtonRef = value; } }, metadata: _metadata }, _setActionsButtonRef_initializers, _setActionsButtonRef_extraInitializers);
        __esDecorate(null, null, _handleActionsButtonClick_decorators, { kind: "field", name: "handleActionsButtonClick", static: false, private: false, access: { has: obj => "handleActionsButtonClick" in obj, get: obj => obj.handleActionsButtonClick, set: (obj, value) => { obj.handleActionsButtonClick = value; } }, metadata: _metadata }, _handleActionsButtonClick_initializers, _handleActionsButtonClick_extraInitializers);
        __esDecorate(null, null, _handleActionsPopoverClose_decorators, { kind: "field", name: "handleActionsPopoverClose", static: false, private: false, access: { has: obj => "handleActionsPopoverClose" in obj, get: obj => obj.handleActionsPopoverClose, set: (obj, value) => { obj.handleActionsPopoverClose = value; } }, metadata: _metadata }, _handleActionsPopoverClose_initializers, _handleActionsPopoverClose_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Block = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    _classThis.defaultProps = {
        actions: [],
        expanded: false,
        selected: false,
    };
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Block = _classThis;
})();
exports.default = Block;
