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
const mobx_1 = require("mobx");
const mobx_react_1 = require("mobx-react");
const loglevel_1 = __importDefault(require("loglevel"));
const jexl_1 = __importDefault(require("jexl"));
const utils_1 = require("../../utils");
const Form_1 = __importDefault(require("../../components/Form"));
const conditionDataProviderRegistry_1 = __importDefault(require("./registries/conditionDataProviderRegistry"));
const fieldRegistry_1 = __importDefault(require("./registries/fieldRegistry"));
const field_scss_1 = __importDefault(require("./field.scss"));
let Field = (() => {
    var _a;
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _instanceExtraInitializers = [];
    let _get_conditionData_decorators;
    let _get_disabled_decorators;
    let _get_visible_decorators;
    let _get_types_decorators;
    var Field = _classThis = class extends _classSuper {
        constructor() {
            super(...arguments);
            this.handleChange = (__runInitializers(this, _instanceExtraInitializers), (value, context) => {
                const { name, onChange } = this.props;
                if (this.disabled) {
                    return;
                }
                onChange(name, value, context);
            });
            this.handleFinish = (subDataPath, subSchemaPath) => {
                const { dataPath, onFinish, schemaPath } = this.props;
                // if the fields are nested the field on every path should be finished
                if (subDataPath && subSchemaPath) {
                    onFinish(subDataPath, subSchemaPath);
                }
                onFinish(dataPath, schemaPath);
            };
            this.handleFocus = (target) => {
                const { dataPath, schemaPath, schema: schemaEntry, } = this.props;
                const focusEvent = new Event('sulu.focus', { bubbles: true });
                focusEvent.detail = {
                    schemaType: schemaEntry === null || schemaEntry === void 0 ? void 0 : schemaEntry.type,
                    setValue: this.handleChange,
                    getValue: () => this.props.value,
                    dataPath,
                    schemaPath,
                    formInspector: this.props.formInspector,
                };
                target.dispatchEvent(focusEvent);
            };
        }
        get conditionData() {
            const { data, dataPath, formInspector } = this.props;
            return conditionDataProviderRegistry_1.default.getAll().reduce(function (data, conditionDataProvider) {
                return Object.assign(Object.assign({}, data), conditionDataProvider(data, dataPath, formInspector));
            }, Object.assign({}, data));
        }
        get disabled() {
            const { schema } = this.props;
            if (!schema.disabledCondition) {
                return false;
            }
            return jexl_1.default.evalSync(schema.disabledCondition, this.conditionData);
        }
        get visible() {
            const { schema } = this.props;
            if (!schema.visibleCondition) {
                return true;
            }
            return jexl_1.default.evalSync(schema.visibleCondition, this.conditionData);
        }
        findErrorKeyword(error) {
            if (!error) {
                return;
            }
            if ((0, mobx_1.isArrayLike)(error)) {
                // this happens when the error is in a block field type
                // since the error is shown on the child elements of the block we do not have to mark the block separately
                return;
            }
            if (error.keyword === 'const') {
                // the const validation only makes sense in combination with other dependant constraints, since it would
                // not make sense to have a field with a single value with no possibility to change it
                // therefore we are only showing the other errors, since the const error would just confuse users
                return;
            }
            if (typeof error.keyword === 'string') {
                return error.keyword;
            }
            for (const childKey in error) {
                // this happens when it is an error collection and not a single error
                // we will find the first child error with a keyword recursively
                return this.findErrorKeyword(error[childKey]);
            }
        }
        get types() {
            return this.props.schema.types;
        }
        render() {
            if (!this.visible) {
                return null;
            }
            const { data, dataPath, error, formInspector, name, onSuccess, router, schema, schemaPath, showAllErrors, value, } = this.props;
            const { defaultType, description, label, maxOccurs, minOccurs, onInvalid, options: schemaOptions = {}, required, type, } = schema;
            let FieldType;
            try {
                FieldType = fieldRegistry_1.default.get(type);
            }
            catch (e) {
                if (onInvalid === 'ignore') {
                    return null;
                }
                loglevel_1.default.error(e);
                return (<Form_1.default.Field colSpan={schema.colSpan} spaceAfter={schema.spaceAfter}>
                    <div className={field_scss_1.default.fieldContainer}>
                        <div className={field_scss_1.default.field}>
                            <div className={field_scss_1.default.fieldException}>
                                <h4>Error while rendering field!</h4>
                                <p>
                                    <b>Name:</b> {name}<br />
                                    <b>Exception:</b> {e.toString()}
                                </p>
                            </div>
                        </div>
                    </div>
                </Form_1.default.Field>);
            }
            const fieldTypeOptions = fieldRegistry_1.default.getOptions(type);
            const errorKeyword = this.findErrorKeyword(error);
            return (<Form_1.default.Field colSpan={schema.colSpan} description={description} error={errorKeyword ? (0, utils_1.translate)('sulu_admin.error_' + errorKeyword.toLowerCase()) : undefined} id={dataPath} label={label} required={required} spaceAfter={schema.spaceAfter}>
                <div className={field_scss_1.default.fieldContainer}>
                    <div className={field_scss_1.default.field}>
                        <FieldType data={data} dataPath={dataPath} defaultType={defaultType} disabled={this.disabled} error={error} fieldTypeOptions={fieldTypeOptions} formInspector={formInspector} label={label || name} maxOccurs={maxOccurs} minOccurs={minOccurs} onChange={this.handleChange} onFinish={this.handleFinish} onFocus={this.handleFocus} onSuccess={onSuccess} router={router} schemaOptions={schemaOptions} schemaPath={schemaPath} showAllErrors={showAllErrors} types={this.types} value={value}/>
                    </div>
                </div>
            </Form_1.default.Field>);
        }
    };
    __setFunctionName(_classThis, "Field");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _get_conditionData_decorators = [mobx_1.computed];
        _get_disabled_decorators = [mobx_1.computed];
        _get_visible_decorators = [mobx_1.computed];
        _get_types_decorators = [(_a = mobx_1.computed).struct.bind(_a)];
        __esDecorate(_classThis, null, _get_conditionData_decorators, { kind: "getter", name: "conditionData", static: false, private: false, access: { has: obj => "conditionData" in obj, get: obj => obj.conditionData }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_disabled_decorators, { kind: "getter", name: "disabled", static: false, private: false, access: { has: obj => "disabled" in obj, get: obj => obj.disabled }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_visible_decorators, { kind: "getter", name: "visible", static: false, private: false, access: { has: obj => "visible" in obj, get: obj => obj.visible }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_types_decorators, { kind: "getter", name: "types", static: false, private: false, access: { has: obj => "types" in obj, get: obj => obj.types }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Field = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    _classThis.defaultProps = {
        showAllErrors: false,
    };
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Field = _classThis;
})();
exports.default = Field;
