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
const ArrowMenu_1 = __importDefault(require("../ArrowMenu"));
const Grid_1 = __importDefault(require("../Grid"));
const Icon_1 = __importDefault(require("../Icon"));
const field_scss_1 = __importDefault(require("./field.scss"));
const grid_scss_1 = __importDefault(require("./grid.scss"));
let Field = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _instanceExtraInitializers = [];
    let _open_decorators;
    let _open_initializers = [];
    let _open_extraInitializers = [];
    let _get_selectedType_decorators;
    let _handleArrowMenuOpen_decorators;
    let _handleArrowMenuOpen_initializers = [];
    let _handleArrowMenuOpen_extraInitializers = [];
    let _handleArrowMenuClose_decorators;
    let _handleArrowMenuClose_initializers = [];
    let _handleArrowMenuClose_extraInitializers = [];
    let _handleTypeChange_decorators;
    let _handleTypeChange_initializers = [];
    let _handleTypeChange_extraInitializers = [];
    var Field = _classThis = class extends _classSuper {
        get selectedType() {
            const { type, types } = this.props;
            if (!types) {
                return undefined;
            }
            return types.find((currentType) => currentType.value === type);
        }
        renderType() {
            const { selectedType } = this;
            if (!selectedType) {
                return <span />;
            }
            return (<button className={field_scss_1.default.type} onClick={this.handleArrowMenuOpen} type="button">
                <span className={field_scss_1.default.typeDelimiter}>•</span>
                {selectedType.label}<Icon_1.default className={field_scss_1.default.typeIcon} name="su-angle-down"/>
            </button>);
        }
        render() {
            const { children, colSpan, description, error, id, label, required, skin, spaceAfter, types, } = this.props;
            const { selectedType } = this;
            const fieldClass = (0, classnames_1.default)(field_scss_1.default.field, {
                [field_scss_1.default[skin]]: !!skin,
                [field_scss_1.default.error]: !!error,
            });
            return (<Grid_1.default.Item className={grid_scss_1.default.gridItem} colSpan={colSpan} spaceAfter={spaceAfter}>
                <div className={fieldClass}>
                    {label &&
                    <label className={field_scss_1.default.label} htmlFor={id}>
                            {label}
                            {selectedType && types &&
                            <ArrowMenu_1.default anchorElement={this.renderType()} onClose={this.handleArrowMenuClose} open={this.open}>
                                    <ArrowMenu_1.default.SingleItemSection onChange={this.handleTypeChange} value={selectedType.value}>
                                        {types.map((type) => (<ArrowMenu_1.default.Item key={type.value} value={type.value}>
                                                {type.label}
                                            </ArrowMenu_1.default.Item>))}
                                    </ArrowMenu_1.default.SingleItemSection>
                                </ArrowMenu_1.default>}
                            {required && ' *'}
                        </label>}
                    {children}
                    {description &&
                    <div className={field_scss_1.default.descriptionLabel}>
                            {description}
                        </div>}
                    <div className={field_scss_1.default.errorLabel}>
                        {error}
                    </div>
                </div>
            </Grid_1.default.Item>);
        }
        constructor() {
            super(...arguments);
            this.open = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _open_initializers, false));
            this.handleArrowMenuOpen = (__runInitializers(this, _open_extraInitializers), __runInitializers(this, _handleArrowMenuOpen_initializers, () => {
                this.open = true;
            }));
            this.handleArrowMenuClose = (__runInitializers(this, _handleArrowMenuOpen_extraInitializers), __runInitializers(this, _handleArrowMenuClose_initializers, () => {
                this.open = false;
            }));
            this.handleTypeChange = (__runInitializers(this, _handleArrowMenuClose_extraInitializers), __runInitializers(this, _handleTypeChange_initializers, (type) => {
                const { onTypeChange } = this.props;
                if (!onTypeChange) {
                    return;
                }
                this.open = false;
                onTypeChange(type);
            }));
            __runInitializers(this, _handleTypeChange_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "Field");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _open_decorators = [mobx_1.observable];
        _get_selectedType_decorators = [mobx_1.computed];
        _handleArrowMenuOpen_decorators = [mobx_1.action];
        _handleArrowMenuClose_decorators = [mobx_1.action];
        _handleTypeChange_decorators = [mobx_1.action];
        __esDecorate(_classThis, null, _get_selectedType_decorators, { kind: "getter", name: "selectedType", static: false, private: false, access: { has: obj => "selectedType" in obj, get: obj => obj.selectedType }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _open_decorators, { kind: "field", name: "open", static: false, private: false, access: { has: obj => "open" in obj, get: obj => obj.open, set: (obj, value) => { obj.open = value; } }, metadata: _metadata }, _open_initializers, _open_extraInitializers);
        __esDecorate(null, null, _handleArrowMenuOpen_decorators, { kind: "field", name: "handleArrowMenuOpen", static: false, private: false, access: { has: obj => "handleArrowMenuOpen" in obj, get: obj => obj.handleArrowMenuOpen, set: (obj, value) => { obj.handleArrowMenuOpen = value; } }, metadata: _metadata }, _handleArrowMenuOpen_initializers, _handleArrowMenuOpen_extraInitializers);
        __esDecorate(null, null, _handleArrowMenuClose_decorators, { kind: "field", name: "handleArrowMenuClose", static: false, private: false, access: { has: obj => "handleArrowMenuClose" in obj, get: obj => obj.handleArrowMenuClose, set: (obj, value) => { obj.handleArrowMenuClose = value; } }, metadata: _metadata }, _handleArrowMenuClose_initializers, _handleArrowMenuClose_extraInitializers);
        __esDecorate(null, null, _handleTypeChange_decorators, { kind: "field", name: "handleTypeChange", static: false, private: false, access: { has: obj => "handleTypeChange" in obj, get: obj => obj.handleTypeChange, set: (obj, value) => { obj.handleTypeChange = value; } }, metadata: _metadata }, _handleTypeChange_initializers, _handleTypeChange_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Field = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    _classThis.defaultProps = {
        colSpan: 12,
        required: false,
        spaceAfter: 0,
    };
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Field = _classThis;
})();
exports.default = Field;
