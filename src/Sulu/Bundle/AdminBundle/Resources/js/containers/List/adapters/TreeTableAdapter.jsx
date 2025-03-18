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
const mobx_1 = require("mobx");
const mobx_react_1 = require("mobx-react");
const react_1 = __importDefault(require("react"));
const Table_1 = __importDefault(require("../../../components/Table"));
const Loader_1 = __importDefault(require("../../../components/Loader"));
const TreeStructureStrategy_1 = __importDefault(require("../structureStrategies/TreeStructureStrategy"));
const DefaultLoadingStrategy_1 = __importDefault(require("../loadingStrategies/DefaultLoadingStrategy"));
const Pagination_1 = __importDefault(require("../../../components/Pagination"));
const AbstractTableAdapter_1 = __importDefault(require("./AbstractTableAdapter"));
let TreeTableAdapter = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = AbstractTableAdapter_1.default;
    let _handleRowCollapse_decorators;
    let _handleRowCollapse_initializers = [];
    let _handleRowCollapse_extraInitializers = [];
    let _handleRowExpand_decorators;
    let _handleRowExpand_initializers = [];
    let _handleRowExpand_extraInitializers = [];
    var TreeTableAdapter = _classThis = class extends _classSuper {
        constructor() {
            super(...arguments);
            this.handleRowCollapse = __runInitializers(this, _handleRowCollapse_initializers, (rowId) => {
                this.props.onItemDeactivate(rowId);
            });
            this.handleRowExpand = (__runInitializers(this, _handleRowCollapse_extraInitializers), __runInitializers(this, _handleRowExpand_initializers, (rowId) => {
                this.props.onItemActivate(rowId);
            }));
            this.getButtons = (__runInitializers(this, _handleRowExpand_extraInitializers), (item) => {
                const { itemActionsProvider, onItemClick, onItemAdd, } = this.props;
                const { data: { _permissions: { add: addPermission = true, edit: editPermission = true, view: viewPermission = true, } = {}, } = {}, } = item || {};
                const buttons = [];
                if (onItemClick) {
                    buttons.push({
                        disabled: !viewPermission,
                        icon: editPermission ? 'su-pen' : 'su-eye',
                        onClick: onItemClick,
                    });
                }
                if (onItemAdd) {
                    buttons.push({
                        disabled: !addPermission,
                        icon: 'su-plus-circle',
                        onClick: onItemAdd,
                    });
                }
                if (itemActionsProvider) {
                    buttons.push(...itemActionsProvider(item === null || item === void 0 ? void 0 : item.data));
                }
                return buttons;
            });
            this.handlePageChange = (page) => {
                const { onPageChange, onItemActivate, } = this.props;
                onItemActivate(undefined);
                onPageChange(page);
            };
        }
        renderRows(items, depth = 0) {
            const rows = [];
            const { disabledIds, selections, } = this.props;
            for (const item of items) {
                const { data, hasChildren } = item;
                rows.push(<Table_1.default.Row buttons={this.getButtons(item)} depth={depth} disabled={disabledIds.includes(data.id)} expanded={item.children.length > 0} hasChildren={hasChildren} id={data.id} isLoading={this.props.active === data.id && this.props.loading} key={data.id} selected={selections.includes(data.id)}>
                    {this.renderCells(data)}
                </Table_1.default.Row>);
                rows.push(...this.renderRows(item.children, depth + 1));
            }
            return rows;
        }
        render() {
            const { active, data, limit, loading, onAllSelectionChange, onItemSelectionChange, onLimitChange, adapterOptions: { show_header: showHeaderAdapterOption = true, skin = 'dark', } = {}, options: { showHeader: showHeaderOption = true, }, page, pageCount, paginated, } = this.props;
            if (!active && loading) {
                return <Loader_1.default />;
            }
            const table = (<Table_1.default buttons={this.getButtons()} onAllSelectionChange={onAllSelectionChange} onRowCollapse={this.handleRowCollapse} onRowExpand={this.handleRowExpand} onRowSelectionChange={onItemSelectionChange} selectInFirstCell={true} selectMode="multiple" skin={skin}>
                {showHeaderAdapterOption && showHeaderOption ?
                    <Table_1.default.Header>
                        {this.renderHeaderCells()}
                    </Table_1.default.Header>
                    : null}
                <Table_1.default.Body>
                    {this.renderRows(data)}
                </Table_1.default.Body>
            </Table_1.default>);
            if (!paginated || (page === 1 && data.length === 0)) {
                return table;
            }
            if (pageCount === undefined) {
                return table;
            }
            return (<Pagination_1.default currentLimit={limit} currentPage={page} loading={loading} onLimitChange={onLimitChange} onPageChange={this.handlePageChange} totalPages={pageCount}>
                {table}
            </Pagination_1.default>);
        }
    };
    __setFunctionName(_classThis, "TreeTableAdapter");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _handleRowCollapse_decorators = [mobx_1.action];
        _handleRowExpand_decorators = [mobx_1.action];
        __esDecorate(null, null, _handleRowCollapse_decorators, { kind: "field", name: "handleRowCollapse", static: false, private: false, access: { has: obj => "handleRowCollapse" in obj, get: obj => obj.handleRowCollapse, set: (obj, value) => { obj.handleRowCollapse = value; } }, metadata: _metadata }, _handleRowCollapse_initializers, _handleRowCollapse_extraInitializers);
        __esDecorate(null, null, _handleRowExpand_decorators, { kind: "field", name: "handleRowExpand", static: false, private: false, access: { has: obj => "handleRowExpand" in obj, get: obj => obj.handleRowExpand, set: (obj, value) => { obj.handleRowExpand = value; } }, metadata: _metadata }, _handleRowExpand_initializers, _handleRowExpand_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TreeTableAdapter = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    _classThis.LoadingStrategy = DefaultLoadingStrategy_1.default;
    _classThis.StructureStrategy = TreeStructureStrategy_1.default;
    _classThis.icon = 'su-tree-list';
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TreeTableAdapter = _classThis;
})();
exports.default = TreeTableAdapter;
