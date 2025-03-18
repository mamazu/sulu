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
const mousetrap_1 = __importDefault(require("mousetrap"));
const ArrowMenu_1 = __importDefault(require("../../components/ArrowMenu"));
const Button_1 = __importDefault(require("../../components/Button"));
const Chip_1 = __importDefault(require("../../components/Chip"));
const Loader_1 = __importDefault(require("../../components/Loader"));
const Translator_1 = require("../../utils/Translator");
const listFieldFilterTypeRegistry_1 = __importDefault(require("./registries/listFieldFilterTypeRegistry"));
const fieldFilterItem_scss_1 = __importDefault(require("./fieldFilterItem.scss"));
const CLOSE_KEY = 'esc';
const CONFIRM_KEY = 'enter';
let FieldFilterItem = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _instanceExtraInitializers = [];
    let _value_decorators;
    let _value_initializers = [];
    let _value_extraInitializers = [];
    let _valueNodeLoading_decorators;
    let _valueNodeLoading_initializers = [];
    let _valueNodeLoading_extraInitializers = [];
    let _valueNode_decorators;
    let _valueNode_initializers = [];
    let _valueNode_extraInitializers = [];
    let _get_propValue_decorators;
    let _componentDidUpdate_decorators;
    let _setValueNodeLoading_decorators;
    let _setValueNode_decorators;
    let _handleFieldFilterTypeChange_decorators;
    let _handleFieldFilterTypeChange_initializers = [];
    let _handleFieldFilterTypeChange_extraInitializers = [];
    var FieldFilterItem = _classThis = class extends _classSuper {
        constructor(props) {
            super(props);
            this.value = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _value_initializers, void 0));
            this.fieldFilterType = __runInitializers(this, _value_extraInitializers);
            this.valueNodeLoading = __runInitializers(this, _valueNodeLoading_initializers, false);
            this.valueNode = (__runInitializers(this, _valueNodeLoading_extraInitializers), __runInitializers(this, _valueNode_initializers, void 0));
            this.handleFieldFilterTypeChange = (__runInitializers(this, _valueNode_extraInitializers), __runInitializers(this, _handleFieldFilterTypeChange_initializers, (value) => {
                this.value = value;
            }));
            this.handleButtonClick = (__runInitializers(this, _handleFieldFilterTypeChange_extraInitializers), () => {
                this.fieldFilterType.confirm();
                const { column, onChange } = this.props;
                onChange(column, this.value);
            });
            const { filterType, filterTypeParameters, onClose, open, value } = this.props;
            this.value = value;
            if (!filterType) {
                throw new Error('The field does not have a "filterType". This should not happen and is likely a bug.');
            }
            this.fieldFilterType = new (listFieldFilterTypeRegistry_1.default.get(filterType))(this.handleFieldFilterTypeChange, filterTypeParameters, value, listFieldFilterTypeRegistry_1.default.getOptions(filterType));
            this.valueDisposer = (0, mobx_1.autorun)(() => {
                this.fieldFilterType.setValue(this.value);
            });
            this.valueNodeDisposer = (0, mobx_1.autorun)(() => {
                const valueNodePromise = this.fieldFilterType.getValueNode(this.propValue);
                if (valueNodePromise) {
                    this.setValueNodeLoading(true);
                    valueNodePromise.then((0, mobx_1.action)((valueNode) => {
                        this.setValueNodeLoading(false);
                        this.setValueNode(valueNode);
                    }));
                }
            });
            if (open) {
                mousetrap_1.default.bind(CLOSE_KEY, onClose);
                mousetrap_1.default.bind(CONFIRM_KEY, this.handleButtonClick);
            }
        }
        get propValue() {
            return this.props.value;
        }
        componentDidUpdate(prevProps) {
            const { onClose, open, value } = this.props;
            if (prevProps.open === false && open === true) {
                this.value = value;
            }
            if (prevProps.open !== open) {
                if (open) {
                    mousetrap_1.default.bind(CLOSE_KEY, onClose);
                    mousetrap_1.default.bind(CONFIRM_KEY, this.handleButtonClick);
                }
                else {
                    mousetrap_1.default.unbind(CLOSE_KEY);
                    mousetrap_1.default.unbind(CONFIRM_KEY);
                }
            }
        }
        componentWillUnmount() {
            this.valueDisposer();
            this.valueNodeDisposer();
            this.fieldFilterType.destroy();
            if (this.props.open) {
                mousetrap_1.default.unbind(CLOSE_KEY);
                mousetrap_1.default.unbind(CONFIRM_KEY);
            }
        }
        setValueNodeLoading(valueNodeLoading) {
            this.valueNodeLoading = valueNodeLoading;
        }
        setValueNode(valueNode) {
            this.valueNode = valueNode;
        }
        render() {
            const { column, label, onClick, onClose, onDelete, open } = this.props;
            return (<ArrowMenu_1.default anchorElement={<span className={fieldFilterItem_scss_1.default.fieldFilterItem}>
                        <Chip_1.default onClick={onClick} onDelete={onDelete} size="medium" skin="primary" value={column}>
                            {label}: {this.valueNodeLoading
                        ? <Loader_1.default size={10}/>
                        : this.valueNode}
                        </Chip_1.default>
                    </span>} onClose={onClose} open={open}>
                <ArrowMenu_1.default.Section>
                    {this.fieldFilterType.getFormNode()}
                    <div className={fieldFilterItem_scss_1.default.buttonContainer}>
                        <Button_1.default onClick={this.handleButtonClick} skin="link">{(0, Translator_1.translate)('sulu_admin.ok')}</Button_1.default>
                    </div>
                </ArrowMenu_1.default.Section>
            </ArrowMenu_1.default>);
        }
    };
    __setFunctionName(_classThis, "FieldFilterItem");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _value_decorators = [mobx_1.observable];
        _valueNodeLoading_decorators = [mobx_1.observable];
        _valueNode_decorators = [mobx_1.observable];
        _get_propValue_decorators = [mobx_1.computed];
        _componentDidUpdate_decorators = [mobx_1.action];
        _setValueNodeLoading_decorators = [mobx_1.action];
        _setValueNode_decorators = [mobx_1.action];
        _handleFieldFilterTypeChange_decorators = [mobx_1.action];
        __esDecorate(_classThis, null, _get_propValue_decorators, { kind: "getter", name: "propValue", static: false, private: false, access: { has: obj => "propValue" in obj, get: obj => obj.propValue }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _componentDidUpdate_decorators, { kind: "method", name: "componentDidUpdate", static: false, private: false, access: { has: obj => "componentDidUpdate" in obj, get: obj => obj.componentDidUpdate }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _setValueNodeLoading_decorators, { kind: "method", name: "setValueNodeLoading", static: false, private: false, access: { has: obj => "setValueNodeLoading" in obj, get: obj => obj.setValueNodeLoading }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _setValueNode_decorators, { kind: "method", name: "setValueNode", static: false, private: false, access: { has: obj => "setValueNode" in obj, get: obj => obj.setValueNode }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _value_decorators, { kind: "field", name: "value", static: false, private: false, access: { has: obj => "value" in obj, get: obj => obj.value, set: (obj, value) => { obj.value = value; } }, metadata: _metadata }, _value_initializers, _value_extraInitializers);
        __esDecorate(null, null, _valueNodeLoading_decorators, { kind: "field", name: "valueNodeLoading", static: false, private: false, access: { has: obj => "valueNodeLoading" in obj, get: obj => obj.valueNodeLoading, set: (obj, value) => { obj.valueNodeLoading = value; } }, metadata: _metadata }, _valueNodeLoading_initializers, _valueNodeLoading_extraInitializers);
        __esDecorate(null, null, _valueNode_decorators, { kind: "field", name: "valueNode", static: false, private: false, access: { has: obj => "valueNode" in obj, get: obj => obj.valueNode, set: (obj, value) => { obj.valueNode = value; } }, metadata: _metadata }, _valueNode_initializers, _valueNode_extraInitializers);
        __esDecorate(null, null, _handleFieldFilterTypeChange_decorators, { kind: "field", name: "handleFieldFilterTypeChange", static: false, private: false, access: { has: obj => "handleFieldFilterTypeChange" in obj, get: obj => obj.handleFieldFilterTypeChange, set: (obj, value) => { obj.handleFieldFilterTypeChange = value; } }, metadata: _metadata }, _handleFieldFilterTypeChange_initializers, _handleFieldFilterTypeChange_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        FieldFilterItem = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return FieldFilterItem = _classThis;
})();
exports.default = FieldFilterItem;
