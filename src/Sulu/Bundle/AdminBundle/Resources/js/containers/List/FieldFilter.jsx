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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const mobx_1 = require("mobx");
const mobx_react_1 = require("mobx-react");
const ArrowMenu_1 = __importDefault(require("../../components/ArrowMenu"));
const Button_1 = __importDefault(require("../../components/Button"));
const FieldFilterItem_1 = __importDefault(require("./FieldFilterItem"));
const fieldFilter_scss_1 = __importDefault(require("./fieldFilter.scss"));
let FieldFilter = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _instanceExtraInitializers = [];
    let _filterMenuOpen_decorators;
    let _filterMenuOpen_initializers = [];
    let _filterMenuOpen_extraInitializers = [];
    let _filterChipOpen_decorators;
    let _filterChipOpen_initializers = [];
    let _filterChipOpen_extraInitializers = [];
    let _get_filteredFields_decorators;
    let _handleFilterMenuButtonClick_decorators;
    let _handleFilterMenuButtonClick_initializers = [];
    let _handleFilterMenuButtonClick_extraInitializers = [];
    let _handleFilterMenuClose_decorators;
    let _handleFilterMenuClose_initializers = [];
    let _handleFilterMenuClose_extraInitializers = [];
    let _openFilterItem_decorators;
    let _openFilterItem_initializers = [];
    let _openFilterItem_extraInitializers = [];
    let _closeFilterItem_decorators;
    let _closeFilterItem_initializers = [];
    let _closeFilterItem_extraInitializers = [];
    let _handleFilterItemDelete_decorators;
    let _handleFilterItemDelete_initializers = [];
    let _handleFilterItemDelete_extraInitializers = [];
    var FieldFilter = _classThis = class extends _classSuper {
        get filteredFields() {
            return Object.keys(this.props.value);
        }
        render() {
            const { fields, value } = this.props;
            return (<div className={fieldFilter_scss_1.default.fieldFilter}>
                {Object.keys(fields).length > 0 &&
                    <ArrowMenu_1.default anchorElement={<div className={fieldFilter_scss_1.default.filterButton}>
                                <Button_1.default icon="su-filter" onClick={this.handleFilterMenuButtonClick} showDropdownIcon={true} skin="icon"/>
                            </div>} onClose={this.handleFilterMenuClose} open={this.filterMenuOpen}>
                        <ArrowMenu_1.default.Section>
                            {Object.keys(fields).map((column) => (<ArrowMenu_1.default.Action disabled={this.filteredFields.includes(column)} key={column} onClick={this.handleFilterMenuActionClick} value={column}>
                                    {fields[column].label}
                                </ArrowMenu_1.default.Action>))}
                        </ArrowMenu_1.default.Section>
                    </ArrowMenu_1.default>}
                {this.filteredFields.map((column) => (<FieldFilterItem_1.default column={column} filterType={fields[column].filterType} filterTypeParameters={fields[column].filterTypeParameters} key={column} label={fields[column].label} onChange={this.handleFilterItemChange} onClick={this.handleFilterItemClick} onClose={this.handleFilterItemClose} onDelete={this.handleFilterItemDelete} open={this.filterChipOpen === column} value={value[column]}/>))}
            </div>);
        }
        constructor() {
            super(...arguments);
            this.filterMenuOpen = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _filterMenuOpen_initializers, false));
            this.filterChipOpen = (__runInitializers(this, _filterMenuOpen_extraInitializers), __runInitializers(this, _filterChipOpen_initializers, undefined));
            this.handleFilterMenuButtonClick = (__runInitializers(this, _filterChipOpen_extraInitializers), __runInitializers(this, _handleFilterMenuButtonClick_initializers, () => {
                this.filterMenuOpen = true;
            }));
            this.handleFilterMenuClose = (__runInitializers(this, _handleFilterMenuButtonClick_extraInitializers), __runInitializers(this, _handleFilterMenuClose_initializers, () => {
                this.filterMenuOpen = false;
            }));
            this.openFilterItem = (__runInitializers(this, _handleFilterMenuClose_extraInitializers), __runInitializers(this, _openFilterItem_initializers, (column) => {
                this.filterChipOpen = column;
            }));
            this.closeFilterItem = (__runInitializers(this, _openFilterItem_extraInitializers), __runInitializers(this, _closeFilterItem_initializers, () => {
                this.filterChipOpen = undefined;
            }));
            this.handleFilterMenuActionClick = (__runInitializers(this, _closeFilterItem_extraInitializers), (column) => {
                const { onChange, value } = this.props;
                onChange(Object.assign(Object.assign({}, value), { [column]: undefined }));
                this.openFilterItem(column);
            });
            this.handleFilterItemClick = (column) => {
                this.openFilterItem(column);
            };
            this.handleFilterItemClose = () => {
                this.closeFilterItem();
            };
            this.handleFilterItemChange = (column, columnValue) => {
                const { onChange, value } = this.props;
                onChange(Object.assign(Object.assign({}, value), { [column]: columnValue }));
                this.closeFilterItem();
            };
            this.handleFilterItemDelete = __runInitializers(this, _handleFilterItemDelete_initializers, (column) => {
                const { onChange, value } = this.props;
                const _a = value, _b = column, deletedFilter = _a[_b], newValue = __rest(_a, [typeof _b === "symbol" ? _b : _b + ""]);
                onChange(newValue);
            });
            __runInitializers(this, _handleFilterItemDelete_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "FieldFilter");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _filterMenuOpen_decorators = [mobx_1.observable];
        _filterChipOpen_decorators = [mobx_1.observable];
        _get_filteredFields_decorators = [mobx_1.computed];
        _handleFilterMenuButtonClick_decorators = [mobx_1.action];
        _handleFilterMenuClose_decorators = [mobx_1.action];
        _openFilterItem_decorators = [mobx_1.action];
        _closeFilterItem_decorators = [mobx_1.action];
        _handleFilterItemDelete_decorators = [mobx_1.action];
        __esDecorate(_classThis, null, _get_filteredFields_decorators, { kind: "getter", name: "filteredFields", static: false, private: false, access: { has: obj => "filteredFields" in obj, get: obj => obj.filteredFields }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _filterMenuOpen_decorators, { kind: "field", name: "filterMenuOpen", static: false, private: false, access: { has: obj => "filterMenuOpen" in obj, get: obj => obj.filterMenuOpen, set: (obj, value) => { obj.filterMenuOpen = value; } }, metadata: _metadata }, _filterMenuOpen_initializers, _filterMenuOpen_extraInitializers);
        __esDecorate(null, null, _filterChipOpen_decorators, { kind: "field", name: "filterChipOpen", static: false, private: false, access: { has: obj => "filterChipOpen" in obj, get: obj => obj.filterChipOpen, set: (obj, value) => { obj.filterChipOpen = value; } }, metadata: _metadata }, _filterChipOpen_initializers, _filterChipOpen_extraInitializers);
        __esDecorate(null, null, _handleFilterMenuButtonClick_decorators, { kind: "field", name: "handleFilterMenuButtonClick", static: false, private: false, access: { has: obj => "handleFilterMenuButtonClick" in obj, get: obj => obj.handleFilterMenuButtonClick, set: (obj, value) => { obj.handleFilterMenuButtonClick = value; } }, metadata: _metadata }, _handleFilterMenuButtonClick_initializers, _handleFilterMenuButtonClick_extraInitializers);
        __esDecorate(null, null, _handleFilterMenuClose_decorators, { kind: "field", name: "handleFilterMenuClose", static: false, private: false, access: { has: obj => "handleFilterMenuClose" in obj, get: obj => obj.handleFilterMenuClose, set: (obj, value) => { obj.handleFilterMenuClose = value; } }, metadata: _metadata }, _handleFilterMenuClose_initializers, _handleFilterMenuClose_extraInitializers);
        __esDecorate(null, null, _openFilterItem_decorators, { kind: "field", name: "openFilterItem", static: false, private: false, access: { has: obj => "openFilterItem" in obj, get: obj => obj.openFilterItem, set: (obj, value) => { obj.openFilterItem = value; } }, metadata: _metadata }, _openFilterItem_initializers, _openFilterItem_extraInitializers);
        __esDecorate(null, null, _closeFilterItem_decorators, { kind: "field", name: "closeFilterItem", static: false, private: false, access: { has: obj => "closeFilterItem" in obj, get: obj => obj.closeFilterItem, set: (obj, value) => { obj.closeFilterItem = value; } }, metadata: _metadata }, _closeFilterItem_initializers, _closeFilterItem_extraInitializers);
        __esDecorate(null, null, _handleFilterItemDelete_decorators, { kind: "field", name: "handleFilterItemDelete", static: false, private: false, access: { has: obj => "handleFilterItemDelete" in obj, get: obj => obj.handleFilterItemDelete, set: (obj, value) => { obj.handleFilterItemDelete = value; } }, metadata: _metadata }, _handleFilterItemDelete_initializers, _handleFilterItemDelete_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        FieldFilter = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return FieldFilter = _classThis;
})();
exports.default = FieldFilter;
