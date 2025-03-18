"use strict";
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
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mobx_react_1 = require("mobx-react");
const react_1 = __importDefault(require("react"));
const Pagination_1 = __importDefault(require("../../../components/Pagination"));
const Table_1 = __importDefault(require("../../../components/Table"));
const FlatStructureStrategy_1 = __importDefault(require("../structureStrategies/FlatStructureStrategy"));
const DefaultLoadingStrategy_1 = __importDefault(require("../loadingStrategies/DefaultLoadingStrategy"));
const AbstractTableAdapter_1 = __importDefault(require("./AbstractTableAdapter"));
let TableAdapter = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = AbstractTableAdapter_1.default;
    var TableAdapter = _classThis = class extends _classSuper {
        constructor() {
            super(...arguments);
            this.getButtons = (item) => {
                const { itemActionsProvider, onItemClick, } = this.props;
                const { _permissions: { edit: editPermission = true, view: viewPermission = true, } = {}, } = item || {};
                const buttons = [];
                if (onItemClick) {
                    buttons.push({
                        disabled: !viewPermission,
                        icon: editPermission ? 'su-pen' : 'su-eye',
                        onClick: onItemClick,
                    });
                }
                if (itemActionsProvider) {
                    buttons.push(...itemActionsProvider(item));
                }
                return buttons;
            };
        }
        renderRows() {
            const { data, disabledIds, selections } = this.props;
            return data.map((item) => {
                return (<Table_1.default.Row buttons={this.getButtons(item)} disabled={disabledIds.includes(item.id)} id={item.id} key={item.id} selected={selections.includes(item.id)}>
                    {this.renderCells(item)}
                </Table_1.default.Row>);
            });
        }
        render() {
            const { data, limit, loading, onAllSelectionChange, onItemSelectionChange, onLimitChange, onPageChange, paginated, adapterOptions: { show_header = true, skin = 'dark', } = {}, page, pageCount, } = this.props;
            const table = (<Table_1.default buttons={this.getButtons()} onAllSelectionChange={onAllSelectionChange} onRowSelectionChange={onItemSelectionChange} selectMode={onItemSelectionChange ? 'multiple' : undefined} skin={skin}>
                {!show_header ? null
                    : <Table_1.default.Header>
                            {this.renderHeaderCells()}
                        </Table_1.default.Header>}
                <Table_1.default.Body>
                    {this.renderRows()}
                </Table_1.default.Body>
            </Table_1.default>);
            if (!paginated || (page === 1 && data.length === 0)) {
                return table;
            }
            if (pageCount === undefined) {
                return table;
            }
            return (<Pagination_1.default currentLimit={limit} currentPage={page} loading={loading} onLimitChange={onLimitChange} onPageChange={onPageChange} totalPages={pageCount}>
                {table}
            </Pagination_1.default>);
        }
    };
    __setFunctionName(_classThis, "TableAdapter");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TableAdapter = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    _classThis.LoadingStrategy = DefaultLoadingStrategy_1.default;
    _classThis.StructureStrategy = FlatStructureStrategy_1.default;
    _classThis.icon = 'su-align-justify';
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TableAdapter = _classThis;
})();
exports.default = TableAdapter;
