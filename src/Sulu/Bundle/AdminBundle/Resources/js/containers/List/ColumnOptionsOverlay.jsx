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
const mobx_react_1 = require("mobx-react");
const mobx_1 = require("mobx");
const classnames_1 = __importDefault(require("classnames"));
const react_sortable_hoc_1 = require("react-sortable-hoc");
const Overlay_1 = __importDefault(require("../../components/Overlay"));
const utils_1 = require("../../utils");
const ColumnOption_1 = __importDefault(require("./ColumnOption"));
const columnOptions_scss_1 = __importDefault(require("./columnOptions.scss"));
const SortableItem = (0, react_sortable_hoc_1.SortableElement)(ColumnOption_1.default);
const SortableList = (0, react_sortable_hoc_1.SortableContainer)(({ children, className }) => {
    return (<div className={className}>
            {children}
        </div>);
});
let ColumnOptionsOverlay = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _instanceExtraInitializers = [];
    let _columnOptions_decorators;
    let _columnOptions_initializers = [];
    let _columnOptions_extraInitializers = [];
    let _sorting_decorators;
    let _sorting_initializers = [];
    let _sorting_extraInitializers = [];
    let _handleColumnOptionChange_decorators;
    let _handleColumnOptionChange_initializers = [];
    let _handleColumnOptionChange_extraInitializers = [];
    let _setColumnOptions_decorators;
    let _setColumnOptions_initializers = [];
    let _setColumnOptions_extraInitializers = [];
    let _componentDidMount_decorators;
    let _componentDidUpdate_decorators;
    let _handleItemsSortStart_decorators;
    let _handleItemsSortStart_initializers = [];
    let _handleItemsSortStart_extraInitializers = [];
    let _handleItemsSortEnd_decorators;
    let _handleItemsSortEnd_initializers = [];
    let _handleItemsSortEnd_extraInitializers = [];
    var ColumnOptionsOverlay = _classThis = class extends _classSuper {
        componentDidMount() {
            this.setColumnOptions(this.props.schema);
        }
        componentDidUpdate(prevProps) {
            const schema = this.props.schema;
            if (prevProps.schema !== schema) {
                this.setColumnOptions(schema);
            }
        }
        render() {
            const { onClose, open, } = this.props;
            const className = (0, classnames_1.default)(columnOptions_scss_1.default.overlay, {
                // TODO: This could be removed when following issue is fixed:
                // https://github.com/clauderic/react-sortable-hoc/issues/403
                [columnOptions_scss_1.default.sorting]: this.sorting,
            });
            return (<Overlay_1.default confirmText={(0, utils_1.translate)('sulu_admin.confirm')} onClose={onClose} onConfirm={this.handleConfirm} open={open} size="small" title={(0, utils_1.translate)('sulu_admin.column_options')}>
                <SortableList axis="y" className={className} helperClass={columnOptions_scss_1.default.dragging} lockAxis="y" lockToContainerEdges={true} onSortEnd={this.handleItemsSortEnd} onSortStart={this.handleItemsSortStart} useDragHandle={true}>
                    {this.columnOptions.map((columnOption, index) => {
                    if (columnOption.schemaEntry.visibility === 'never') {
                        return null;
                    }
                    return (<SortableItem index={index} key={index} label={columnOption.schemaEntry.label} onChange={this.handleColumnOptionChange} schemaKey={columnOption.schemaKey} visibility={columnOption.schemaEntry.visibility}/>);
                })}
                </SortableList>
            </Overlay_1.default>);
        }
        constructor() {
            super(...arguments);
            this.columnOptions = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _columnOptions_initializers, []));
            this.sorting = (__runInitializers(this, _columnOptions_extraInitializers), __runInitializers(this, _sorting_initializers, false));
            this.handleConfirm = (__runInitializers(this, _sorting_extraInitializers), () => {
                const newSchema = {};
                for (const columnOption of this.columnOptions) {
                    newSchema[columnOption.schemaKey] = columnOption.schemaEntry;
                }
                this.props.onConfirm(newSchema);
            });
            this.handleColumnOptionChange = __runInitializers(this, _handleColumnOptionChange_initializers, (visibility, schemaKey) => {
                for (const columnOption of this.columnOptions) {
                    if (columnOption.schemaKey === schemaKey) {
                        columnOption.schemaEntry.visibility = visibility;
                        return;
                    }
                }
            });
            this.setColumnOptions = (__runInitializers(this, _handleColumnOptionChange_extraInitializers), __runInitializers(this, _setColumnOptions_initializers, (schema) => {
                const columnOptions = [];
                Object.keys(schema).map((schemaKey) => {
                    const schemaEntry = Object.assign({}, schema[schemaKey]);
                    columnOptions.push({
                        schemaKey,
                        schemaEntry,
                    });
                });
                this.columnOptions = columnOptions;
            }));
            this.handleItemsSortStart = (__runInitializers(this, _setColumnOptions_extraInitializers), __runInitializers(this, _handleItemsSortStart_initializers, () => {
                this.sorting = true;
            }));
            this.handleItemsSortEnd = (__runInitializers(this, _handleItemsSortStart_extraInitializers), __runInitializers(this, _handleItemsSortEnd_initializers, ({ newIndex, oldIndex, }) => {
                this.columnOptions = (0, react_sortable_hoc_1.arrayMove)(this.columnOptions, oldIndex, newIndex);
                this.sorting = false;
            }));
            __runInitializers(this, _handleItemsSortEnd_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "ColumnOptionsOverlay");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _columnOptions_decorators = [mobx_1.observable];
        _sorting_decorators = [mobx_1.observable];
        _handleColumnOptionChange_decorators = [mobx_1.action];
        _setColumnOptions_decorators = [mobx_1.action];
        _componentDidMount_decorators = [mobx_1.action];
        _componentDidUpdate_decorators = [mobx_1.action];
        _handleItemsSortStart_decorators = [mobx_1.action];
        _handleItemsSortEnd_decorators = [mobx_1.action];
        __esDecorate(_classThis, null, _componentDidMount_decorators, { kind: "method", name: "componentDidMount", static: false, private: false, access: { has: obj => "componentDidMount" in obj, get: obj => obj.componentDidMount }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _componentDidUpdate_decorators, { kind: "method", name: "componentDidUpdate", static: false, private: false, access: { has: obj => "componentDidUpdate" in obj, get: obj => obj.componentDidUpdate }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _columnOptions_decorators, { kind: "field", name: "columnOptions", static: false, private: false, access: { has: obj => "columnOptions" in obj, get: obj => obj.columnOptions, set: (obj, value) => { obj.columnOptions = value; } }, metadata: _metadata }, _columnOptions_initializers, _columnOptions_extraInitializers);
        __esDecorate(null, null, _sorting_decorators, { kind: "field", name: "sorting", static: false, private: false, access: { has: obj => "sorting" in obj, get: obj => obj.sorting, set: (obj, value) => { obj.sorting = value; } }, metadata: _metadata }, _sorting_initializers, _sorting_extraInitializers);
        __esDecorate(null, null, _handleColumnOptionChange_decorators, { kind: "field", name: "handleColumnOptionChange", static: false, private: false, access: { has: obj => "handleColumnOptionChange" in obj, get: obj => obj.handleColumnOptionChange, set: (obj, value) => { obj.handleColumnOptionChange = value; } }, metadata: _metadata }, _handleColumnOptionChange_initializers, _handleColumnOptionChange_extraInitializers);
        __esDecorate(null, null, _setColumnOptions_decorators, { kind: "field", name: "setColumnOptions", static: false, private: false, access: { has: obj => "setColumnOptions" in obj, get: obj => obj.setColumnOptions, set: (obj, value) => { obj.setColumnOptions = value; } }, metadata: _metadata }, _setColumnOptions_initializers, _setColumnOptions_extraInitializers);
        __esDecorate(null, null, _handleItemsSortStart_decorators, { kind: "field", name: "handleItemsSortStart", static: false, private: false, access: { has: obj => "handleItemsSortStart" in obj, get: obj => obj.handleItemsSortStart, set: (obj, value) => { obj.handleItemsSortStart = value; } }, metadata: _metadata }, _handleItemsSortStart_initializers, _handleItemsSortStart_extraInitializers);
        __esDecorate(null, null, _handleItemsSortEnd_decorators, { kind: "field", name: "handleItemsSortEnd", static: false, private: false, access: { has: obj => "handleItemsSortEnd" in obj, get: obj => obj.handleItemsSortEnd, set: (obj, value) => { obj.handleItemsSortEnd = value; } }, metadata: _metadata }, _handleItemsSortEnd_initializers, _handleItemsSortEnd_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ColumnOptionsOverlay = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ColumnOptionsOverlay = _classThis;
})();
exports.default = ColumnOptionsOverlay;
