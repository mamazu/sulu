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
const mobx_react_1 = require("mobx-react");
const react_sortable_hoc_1 = require("react-sortable-hoc");
const classnames_1 = __importDefault(require("classnames"));
const loglevel_1 = __importDefault(require("loglevel"));
const mobx_1 = require("mobx");
const utils_1 = require("../../utils");
const SortableBlock_1 = __importDefault(require("./SortableBlock"));
const sortableBlockList_scss_1 = __importDefault(require("./sortableBlockList.scss"));
let SortableBlockList = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _instanceExtraInitializers = [];
    let _get_blockActions_decorators;
    var SortableBlockList = _classThis = class extends _classSuper {
        constructor(props) {
            super(props);
            this.handleExpand = (__runInitializers(this, _instanceExtraInitializers), (index) => {
                const { onExpand } = this.props;
                if (onExpand) {
                    onExpand(index);
                }
            });
            this.handleSelect = (index) => {
                const { onSelect } = this.props;
                if (onSelect) {
                    onSelect(index);
                }
            };
            this.handleUnselect = (index) => {
                const { onUnselect } = this.props;
                if (onUnselect) {
                    onUnselect(index);
                }
            };
            this.handleCollapse = (index) => {
                const { onCollapse } = this.props;
                if (onCollapse) {
                    onCollapse(index);
                }
            };
            this.handleSettingsClick = (index) => {
                const { onSettingsClick } = this.props;
                if (onSettingsClick) {
                    onSettingsClick(index);
                }
            };
            this.handleTypeChange = (type, index) => {
                const { onTypeChange } = this.props;
                if (onTypeChange) {
                    onTypeChange(type, index);
                }
            };
            if (props.movable === false) {
                loglevel_1.default.warn('The "movable" prop of the "SortableBlockList" component is deprecated since 2.5 and will ' +
                    'be removed. Use the "mode" prop with "static" or "sortable" instead.');
            }
        }
        get blockActions() {
            const { onRemove, blockActions } = this.props;
            // @deprecated
            if (onRemove) {
                loglevel_1.default.warn('The "onRemove" prop of the "SortableBlockList" component is deprecated since 2.5 and will ' +
                    'be removed. Use the "blockActions" prop with an appropriate callback instead.');
                return [
                    ...blockActions,
                    {
                        type: 'button',
                        icon: 'su-trash-alt',
                        label: (0, utils_1.translate)('sulu_admin.delete'),
                        // $FlowFixMe
                        onClick: onRemove,
                    },
                ];
            }
            return blockActions;
        }
        render() {
            const { disabled, expandedBlocks, generatedBlockIds, icons, mode, movable, onCollapse, onExpand, onSelect, onSettingsClick, onUnselect, renderBlockContent, renderDivider, selectedBlocks, types, value, } = this.props;
            const sortableBlockListClass = (0, classnames_1.default)(sortableBlockList_scss_1.default.sortableBlockList, {
                [sortableBlockList_scss_1.default.disabled]: disabled,
            });
            return (<div className={sortableBlockListClass}>
                {value && value.map((block, index) => (<react_1.Fragment key={index}>
                        <SortableBlock_1.default actions={this.blockActions} activeType={block.type} expanded={!disabled && expandedBlocks[index]} icons={icons && icons[index]} index={index} key={generatedBlockIds[index]} mode={(mode === 'sortable' && movable !== false) ? 'sortable' : mode} onCollapse={onCollapse ? this.handleCollapse : undefined} onExpand={onExpand ? this.handleExpand : undefined} onSelect={onSelect ? this.handleSelect : undefined} onSettingsClick={onSettingsClick ? this.handleSettingsClick : undefined} onTypeChange={this.handleTypeChange} onUnselect={onUnselect ? this.handleUnselect : undefined} renderBlockContent={renderBlockContent} selected={selectedBlocks[index]} sortIndex={index} types={types} value={block}/>
                        {renderDivider && index < value.length - 1 && (renderDivider(index))}
                    </react_1.Fragment>))}
            </div>);
        }
    };
    __setFunctionName(_classThis, "SortableBlockList");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _get_blockActions_decorators = [mobx_1.computed];
        __esDecorate(_classThis, null, _get_blockActions_decorators, { kind: "getter", name: "blockActions", static: false, private: false, access: { has: obj => "blockActions" in obj, get: obj => obj.blockActions }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SortableBlockList = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    _classThis.defaultProps = {
        blockActions: [],
        disabled: false,
        mode: 'sortable',
        movable: null,
    };
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SortableBlockList = _classThis;
})();
exports.default = (0, react_sortable_hoc_1.SortableContainer)(SortableBlockList);
