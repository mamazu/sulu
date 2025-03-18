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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const mobx_1 = require("mobx");
const fast_deep_equal_1 = __importDefault(require("fast-deep-equal"));
const userStore_1 = __importDefault(require("../../../stores/userStore"));
const MultiSelectionStore_1 = __importDefault(require("../../../stores/MultiSelectionStore"));
const MultiAutoComplete_1 = __importDefault(require("../../MultiAutoComplete"));
const ResourceCheckboxGroup_1 = __importDefault(require("../../ResourceCheckboxGroup"));
const AbstractFieldFilterType_1 = __importDefault(require("./AbstractFieldFilterType"));
const selectionFieldFilterType_scss_1 = __importDefault(require("./selectionFieldFilterType.scss"));
const TYPE_AUTO_COMPLETE = 'auto_complete';
const TYPE_SELECT = 'select';
let SelectionFieldFilterType = (() => {
    var _a;
    let _classSuper = AbstractFieldFilterType_1.default;
    let _instanceExtraInitializers = [];
    let _selectValue_decorators;
    let _selectValue_initializers = [];
    let _selectValue_extraInitializers = [];
    let _get_type_decorators;
    let _get_resourceKey_decorators;
    let _get_displayProperty_decorators;
    let _setSelectValue_decorators;
    let _setSelectValue_initializers = [];
    let _setSelectValue_extraInitializers = [];
    return _a = class SelectionFieldFilterType extends _classSuper {
            get type() {
                return this.parameters && (this.parameters.type || TYPE_AUTO_COMPLETE);
            }
            constructor(onChange, parameters, value) {
                super(onChange, parameters, value);
                this.selectionStore = __runInitializers(this, _instanceExtraInitializers);
                // Used to buffer the select value, because everytime the value variable changes a request is sent to load data
                this.selectValue = __runInitializers(this, _selectValue_initializers, []);
                this.valueDisposer = __runInitializers(this, _selectValue_extraInitializers);
                this.setSelectValue = __runInitializers(this, _setSelectValue_initializers, (values) => {
                    this.selectValue = values;
                });
                this.handleSelectChange = (__runInitializers(this, _setSelectValue_extraInitializers), (values) => {
                    this.setSelectValue(values);
                });
                this.confirm = () => {
                    this.onChange(this.selectValue);
                };
                this.selectionStore = new MultiSelectionStore_1.default(this.resourceKey, [], mobx_1.observable.box(userStore_1.default.contentLocale));
                this.selectionStoreDisposer = (0, mobx_1.autorun)(() => {
                    const { onChange, selectionStore } = this;
                    if (selectionStore.ids.length === 0) {
                        onChange(undefined);
                        return;
                    }
                    onChange(selectionStore.ids);
                });
                this.valueDisposer = (0, mobx_1.autorun)(() => {
                    const value = (0, mobx_1.toJS)(this.value || []);
                    if (!(0, fast_deep_equal_1.default)(value, (0, mobx_1.untracked)(() => (0, mobx_1.toJS)(this.selectionStore.ids)))) {
                        this.selectionStore.loadItems(value);
                    }
                    if (!(0, fast_deep_equal_1.default)(value, (0, mobx_1.untracked)(() => this.selectValue))) {
                        this.setSelectValue(value);
                    }
                });
            }
            destroy() {
                this.selectionStoreDisposer();
                this.valueDisposer();
            }
            get resourceKey() {
                const { parameters } = this;
                if (!parameters) {
                    throw new Error('The "SelectionFieldFilterType" needs some parameters to work!');
                }
                const { resourceKey } = parameters;
                if (typeof resourceKey !== 'string') {
                    throw new Error('The "resourceKey" parameters must be a string!');
                }
                return resourceKey;
            }
            get displayProperty() {
                const { parameters } = this;
                if (!parameters) {
                    throw new Error('The "SelectionFieldFilterType" needs some parameters to work!');
                }
                const { displayProperty } = parameters;
                if (typeof displayProperty !== 'string') {
                    throw new Error('The "displayProperty" parameter must be a string!');
                }
                return displayProperty;
            }
            setInputRef(ref) {
                if (ref) {
                    ref.focus();
                }
            }
            getFormNode() {
                return (<div className={selectionFieldFilterType_scss_1.default.selectionFieldFilterType}>
                {this.type === TYPE_AUTO_COMPLETE &&
                        <MultiAutoComplete_1.default displayProperty={this.displayProperty} inputRef={this.setInputRef} searchProperties={[this.displayProperty]} selectionStore={this.selectionStore}/>}
                {this.type === TYPE_SELECT &&
                        <ResourceCheckboxGroup_1.default displayProperty={this.displayProperty} onChange={this.handleSelectChange} resourceKey={this.resourceKey} values={this.selectValue}/>}
            </div>);
            }
            getValueNode(value) {
                if (!value) {
                    return Promise.resolve(null);
                }
                return new Promise((resolve) => {
                    (0, mobx_1.when)(() => !this.selectionStore.loading, () => resolve(value.map((id) => {
                        const item = this.selectionStore.getById(id);
                        return item ? item[this.displayProperty] : '';
                    }).join(', ')));
                });
            }
        },
        (() => {
            var _b;
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_b = _classSuper[Symbol.metadata]) !== null && _b !== void 0 ? _b : null) : void 0;
            _selectValue_decorators = [mobx_1.observable];
            _get_type_decorators = [mobx_1.computed];
            _get_resourceKey_decorators = [mobx_1.computed];
            _get_displayProperty_decorators = [mobx_1.computed];
            _setSelectValue_decorators = [mobx_1.action];
            __esDecorate(_a, null, _get_type_decorators, { kind: "getter", name: "type", static: false, private: false, access: { has: obj => "type" in obj, get: obj => obj.type }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_resourceKey_decorators, { kind: "getter", name: "resourceKey", static: false, private: false, access: { has: obj => "resourceKey" in obj, get: obj => obj.resourceKey }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_displayProperty_decorators, { kind: "getter", name: "displayProperty", static: false, private: false, access: { has: obj => "displayProperty" in obj, get: obj => obj.displayProperty }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, null, _selectValue_decorators, { kind: "field", name: "selectValue", static: false, private: false, access: { has: obj => "selectValue" in obj, get: obj => obj.selectValue, set: (obj, value) => { obj.selectValue = value; } }, metadata: _metadata }, _selectValue_initializers, _selectValue_extraInitializers);
            __esDecorate(null, null, _setSelectValue_decorators, { kind: "field", name: "setSelectValue", static: false, private: false, access: { has: obj => "setSelectValue" in obj, get: obj => obj.setSelectValue, set: (obj, value) => { obj.setSelectValue = value; } }, metadata: _metadata }, _setSelectValue_initializers, _setSelectValue_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.default = SelectionFieldFilterType;
