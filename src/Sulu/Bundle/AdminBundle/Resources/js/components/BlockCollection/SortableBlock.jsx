"use strict";
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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_sortable_hoc_1 = require("react-sortable-hoc");
const loglevel_1 = __importDefault(require("loglevel"));
const mobx_1 = require("mobx");
const mobx_react_1 = require("mobx-react");
const Block_1 = __importDefault(require("../Block"));
const utils_1 = require("../../utils");
const SortableHandle_1 = __importDefault(require("./SortableHandle"));
const SelectionHandle_1 = __importDefault(require("./SelectionHandle"));
let SortableBlock = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _instanceExtraInitializers = [];
    let _get_actions_decorators;
    var SortableBlock = _classThis = class extends _classSuper {
        constructor(props) {
            super(props);
            this.handleCollapse = (__runInitializers(this, _instanceExtraInitializers), () => {
                const { sortIndex, onCollapse } = this.props;
                if (onCollapse) {
                    onCollapse(sortIndex);
                }
            });
            this.handleExpand = () => {
                const { sortIndex, onExpand } = this.props;
                if (onExpand) {
                    onExpand(sortIndex);
                }
            };
            this.handleSelectionChanged = () => {
                const { sortIndex, onSelect, onUnselect, selected } = this.props;
                if (selected && onUnselect) {
                    onUnselect(sortIndex);
                }
                if (!selected && onSelect) {
                    onSelect(sortIndex);
                }
            };
            this.handleSettingsClick = () => {
                const { sortIndex, onSettingsClick } = this.props;
                if (onSettingsClick) {
                    onSettingsClick(sortIndex);
                }
            };
            this.handleTypeChange = (type) => {
                const { sortIndex, onTypeChange } = this.props;
                if (onTypeChange) {
                    onTypeChange(type, sortIndex);
                }
            };
            this.renderHandle = () => {
                const { mode, movable, selected } = this.props;
                if (mode === 'sortable' && movable !== false) {
                    return <SortableHandle_1.default />;
                }
                if (mode === 'selectable') {
                    return <SelectionHandle_1.default checked={selected} onChange={this.handleSelectionChanged}/>;
                }
                return null;
            };
            if (props.movable === false) {
                loglevel_1.default.warn('The "movable" prop of the "SortableBlock" component is deprecated since 2.5 and will ' +
                    'be removed. Use the "mode" prop with "static" or "sortable" instead.');
            }
        }
        get actions() {
            const { onRemove, actions, sortIndex } = this.props;
            const wrappedActions = actions.map((action) => {
                if (action.type !== 'divider') {
                    return Object.assign(Object.assign({}, action), { onClick: () => action.onClick(sortIndex) });
                }
                return action;
            });
            // @deprecated
            if (onRemove) {
                loglevel_1.default.warn('The "onRemove" prop of the "SortableBlock" component is deprecated since 2.5 and will ' +
                    'be removed. Use the "actions" prop with an appropriate callback instead.');
                return [
                    ...wrappedActions,
                    {
                        type: 'button',
                        icon: 'su-trash-alt',
                        label: (0, utils_1.translate)('sulu_admin.delete'),
                        onClick: () => onRemove(sortIndex),
                    },
                ];
            }
            return wrappedActions;
        }
        render() {
            const { activeType, expanded, icons, onCollapse, onExpand, onSettingsClick, renderBlockContent, selected, sortIndex, types, value, } = this.props;
            return (<Block_1.default actions={this.actions} activeType={activeType} expanded={expanded} handle={this.renderHandle()} icons={icons} onCollapse={onCollapse ? this.handleCollapse : undefined} onExpand={onExpand ? this.handleExpand : undefined} onSettingsClick={onSettingsClick && this.handleSettingsClick} onTypeChange={this.handleTypeChange} selected={selected} types={types}>
                {renderBlockContent(value, activeType, sortIndex, expanded)}
            </Block_1.default>);
        }
    };
    __setFunctionName(_classThis, "SortableBlock");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _get_actions_decorators = [mobx_1.computed];
        __esDecorate(_classThis, null, _get_actions_decorators, { kind: "getter", name: "actions", static: false, private: false, access: { has: obj => "actions" in obj, get: obj => obj.actions }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SortableBlock = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    _classThis.defaultProps = {
        actions: [],
        mode: 'sortable',
        movable: true,
        selected: false,
    };
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SortableBlock = _classThis;
})();
const SortableElementBlock = (0, react_sortable_hoc_1.SortableElement)(SortableBlock);
exports.default = SortableElementBlock;
