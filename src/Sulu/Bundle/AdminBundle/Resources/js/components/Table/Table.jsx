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
const classnames_1 = __importDefault(require("classnames"));
const Icon_1 = __importDefault(require("../Icon"));
const Header_1 = __importDefault(require("./Header"));
const Body_1 = __importDefault(require("./Body"));
const Row_1 = __importDefault(require("./Row"));
const Cell_1 = __importDefault(require("./Cell"));
const HeaderCell_1 = __importDefault(require("./HeaderCell"));
const table_scss_1 = __importDefault(require("./table.scss"));
const PLACEHOLDER_ICON = 'su-battery-low';
let Table = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    var Table = _classThis = class extends _classSuper {
        constructor() {
            super(...arguments);
            this.cloneHeader = (originalHeader, allSelected) => {
                if (!originalHeader) {
                    return null;
                }
                const { buttons, onAllSelectionChange, selectMode, selectInFirstCell, skin } = this.props;
                return react_1.default.cloneElement(originalHeader, {
                    allSelected,
                    buttons: [...buttons, ...(originalHeader.props.buttons || [])],
                    onAllSelectionChange: onAllSelectionChange ? this.handleAllSelectionChange : undefined,
                    selectMode,
                    selectInFirstCell,
                    skin,
                });
            };
            this.cloneBody = (originalBody) => {
                if (!originalBody) {
                    return null;
                }
                return react_1.default.cloneElement(originalBody, {
                    buttons: this.props.buttons,
                    selectMode: this.props.selectMode,
                    selectInFirstCell: this.props.selectInFirstCell,
                    onRowSelectionChange: this.props.onRowSelectionChange ? this.handleRowSelectionChange : undefined,
                    onRowExpand: this.handleRowExpand,
                    onRowCollapse: this.handleRowCollapse,
                });
            };
            this.checkAllRowsSelected = (body) => {
                const rows = body.props.children;
                if (!rows) {
                    return false;
                }
                const rowSelections = react_1.default.Children.map(rows, (row) => row.props.selected || row.props.disabled);
                return !rowSelections.includes(false);
            };
            this.createTablePlaceholderArea = () => {
                const { placeholderText } = this.props;
                return (<div className={table_scss_1.default.tablePlaceholderArea}>
                <Icon_1.default className={table_scss_1.default.tablePlaceholderIcon} name={PLACEHOLDER_ICON}/>
                {placeholderText &&
                        <div className={table_scss_1.default.tablePlaceholderText}>
                        {placeholderText}
                    </div>}
            </div>);
            };
            this.handleRowExpand = (rowId) => {
                const { onRowExpand } = this.props;
                if (onRowExpand) {
                    onRowExpand(rowId);
                }
            };
            this.handleRowCollapse = (rowId) => {
                const { onRowCollapse } = this.props;
                if (onRowCollapse) {
                    onRowCollapse(rowId);
                }
            };
            this.handleAllSelectionChange = (checked) => {
                const { onAllSelectionChange } = this.props;
                if (onAllSelectionChange) {
                    onAllSelectionChange(checked);
                }
            };
            this.handleRowSelectionChange = (rowId, selected) => {
                const { onRowSelectionChange } = this.props;
                if (onRowSelectionChange) {
                    onRowSelectionChange(rowId, selected);
                }
            };
        }
        render() {
            const { buttons, children, skin } = this.props;
            let body;
            let header;
            react_1.default.Children
                .forEach(children, (child) => {
                if (!child) {
                    return;
                }
                switch (child.type) {
                    case Header_1.default:
                        header = child;
                        break;
                    case Body_1.default:
                        body = child;
                        break;
                    default:
                        throw new Error('The Table component only accepts the following children types: ' +
                            [Header_1.default.name, Body_1.default.name].join(', '));
                }
            });
            const clonedBody = this.cloneBody(body);
            const emptyBody = (clonedBody && react_1.default.Children.count(clonedBody.props.children) === 0);
            const allRowsSelected = (clonedBody && !emptyBody) ? this.checkAllRowsSelected(clonedBody) : false;
            const clonedHeader = this.cloneHeader(header, allRowsSelected);
            const tableClass = (0, classnames_1.default)(table_scss_1.default.tableContainer, table_scss_1.default[skin], {
                [table_scss_1.default.hasButtons]: buttons.length > 0,
            });
            return (<div className={tableClass}>
                <table className={table_scss_1.default.table}>
                    {clonedHeader}
                    {clonedBody}
                </table>
                {emptyBody &&
                    this.createTablePlaceholderArea()}
            </div>);
        }
    };
    __setFunctionName(_classThis, "Table");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Table = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    _classThis.defaultProps = {
        buttons: [],
        selectMode: 'none',
        skin: 'dark',
    };
    _classThis.Header = Header_1.default;
    _classThis.Body = Body_1.default;
    _classThis.Row = Row_1.default;
    _classThis.Cell = Cell_1.default;
    _classThis.HeaderCell = HeaderCell_1.default;
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Table = _classThis;
})();
exports.default = Table;
