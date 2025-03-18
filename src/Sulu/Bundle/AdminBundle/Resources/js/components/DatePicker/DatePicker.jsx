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
const react_dom_1 = __importDefault(require("react-dom"));
const react_datetime_1 = __importDefault(require("react-datetime"));
const mobx_react_1 = require("mobx-react");
const mobx_1 = require("mobx");
require("react-datetime/css/react-datetime.css");
const moment_1 = __importDefault(require("moment"));
const Input_1 = __importDefault(require("../Input"));
const Popover_1 = __importDefault(require("../Popover"));
require("./datePicker.scss");
let DatePicker = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _instanceExtraInitializers = [];
    let _open_decorators;
    let _open_initializers = [];
    let _open_extraInitializers = [];
    let _showError_decorators;
    let _showError_initializers = [];
    let _showError_extraInitializers = [];
    let _value_decorators;
    let _value_initializers = [];
    let _value_extraInitializers = [];
    let _inputRef_decorators;
    let _inputRef_initializers = [];
    let _inputRef_extraInitializers = [];
    let _setOpen_decorators;
    let _setValue_decorators;
    let _setShowError_decorators;
    let _setInputRef_decorators;
    let _setInputRef_initializers = [];
    let _setInputRef_extraInitializers = [];
    var DatePicker = _classThis = class extends _classSuper {
        setOpen(open) {
            this.open = open;
        }
        setValue(value) {
            this.value = value;
        }
        setShowError(showError) {
            this.showError = showError;
        }
        constructor(props) {
            super(props);
            this.inputChanged = (__runInitializers(this, _instanceExtraInitializers), false);
            this.open = __runInitializers(this, _open_initializers, false);
            this.showError = (__runInitializers(this, _open_extraInitializers), __runInitializers(this, _showError_initializers, false));
            this.value = (__runInitializers(this, _showError_extraInitializers), __runInitializers(this, _value_initializers, null));
            this.inputRef = (__runInitializers(this, _value_extraInitializers), __runInitializers(this, _inputRef_initializers, void 0));
            this.setInputRef = (__runInitializers(this, _inputRef_extraInitializers), __runInitializers(this, _setInputRef_initializers, (ref) => {
                this.inputRef = ref;
            }));
            this.handleChange = (__runInitializers(this, _setInputRef_extraInitializers), (date) => {
                this.inputChanged = false;
                this.props.onChange(date);
                this.setShowError(!!this.value && !date);
                // can be removed when is fixed the following is fixed:
                // https://github.com/arqex/react-datetime/pull/741
                const currentValue = typeof this.value === 'string' ? (0, moment_1.default)(this.value, this.getFormat()) : (0, moment_1.default)(this.value);
                if ((!this.value && date) || (this.value && !date) || !currentValue.isSame((0, moment_1.default)(date), 'day')) {
                    this.setOpen(false);
                }
            });
            this.handleDatepickerChange = (date) => {
                if (!date) {
                    this.setValue(undefined);
                    this.handleChange(undefined);
                    return;
                }
                if (typeof date === 'string') {
                    this.setValue(date);
                    return;
                }
                if (!date.isValid()) {
                    this.handleChange(undefined);
                    return;
                }
                this.handleChange(date.toDate());
            };
            this.handleInputBlur = () => {
                if (this.inputChanged && typeof this.value === 'string') {
                    const newMoment = (0, moment_1.default)(this.value, this.getFormat());
                    this.handleChange(newMoment.isValid() ? newMoment.toDate() : undefined);
                }
            };
            this.handleOpenOverlay = () => {
                this.setOpen(true);
            };
            this.handleCloseOverlay = () => {
                this.setOpen(false);
            };
            this.getInputChange = (props) => {
                return (value, event) => {
                    this.inputChanged = true;
                    this.setValue(value);
                    props.onChange(event);
                };
            };
            this.getDateFormat = () => {
                const dateFormat = this.props.options.dateFormat;
                if ((!dateFormat && dateFormat !== false) || dateFormat === true || (!dateFormat && !this.getTimeFormat())) {
                    return moment_1.default.localeData().longDateFormat('L') || '';
                }
                return dateFormat || '';
            };
            this.getTimeFormat = () => {
                const timeFormat = this.props.options.timeFormat;
                if (timeFormat === true) {
                    return moment_1.default.localeData().longDateFormat('LT') || '';
                }
                return timeFormat || '';
            };
            this.getFormat = () => {
                return [
                    this.getDateFormat(),
                    this.getTimeFormat(),
                ].filter((format) => !!format).join(' ');
            };
            this.renderInput = (props) => {
                const handleInputChange = this.getInputChange(props);
                if (!this.inputRef) {
                    return null;
                }
                return react_dom_1.default.createPortal(<Input_1.default {...props} id={this.props.id} inputRef={this.props.inputRef} onBlur={this.handleInputBlur} onChange={handleInputChange} onIconClick={!props.disabled ? this.handleOpenOverlay : undefined}/>, this.inputRef);
            };
            this.setValue(this.props.value);
        }
        componentDidUpdate() {
            if (this.value && !this.props.value) {
                return;
            }
            this.setValue(this.props.value);
        }
        render() {
            const { className, disabled, options, placeholder, valid } = this.props;
            const fieldOptions = Object.assign(Object.assign({}, options), { dateFormat: this.getDateFormat() || false, timeFormat: this.getTimeFormat() || false });
            const inputProps = {
                placeholder: placeholder ? placeholder : this.getFormat(),
                valid: valid && !this.showError,
                disabled,
                icon: fieldOptions.dateFormat ? 'su-calendar' : 'su-clock',
            };
            return (<div className={className}>
                <div ref={this.setInputRef}/>
                <Popover_1.default anchorElement={this.inputRef} backdrop={this.open} horizontalOffset={34} onClose={this.handleCloseOverlay} open={true} verticalOffset={-31}>
                    {(setPopoverRef, styles) => (<div ref={setPopoverRef} style={styles}>
                                <react_datetime_1.default {...fieldOptions} inputProps={inputProps} onChange={this.handleDatepickerChange} onClose={this.handleCloseOverlay} open={this.open} renderInput={this.renderInput} value={this.value}/>
                            </div>)}
                </Popover_1.default>
            </div>);
        }
    };
    __setFunctionName(_classThis, "DatePicker");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _open_decorators = [mobx_1.observable];
        _showError_decorators = [mobx_1.observable];
        _value_decorators = [mobx_1.observable];
        _inputRef_decorators = [mobx_1.observable];
        _setOpen_decorators = [mobx_1.action];
        _setValue_decorators = [mobx_1.action];
        _setShowError_decorators = [mobx_1.action];
        _setInputRef_decorators = [mobx_1.action];
        __esDecorate(_classThis, null, _setOpen_decorators, { kind: "method", name: "setOpen", static: false, private: false, access: { has: obj => "setOpen" in obj, get: obj => obj.setOpen }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _setValue_decorators, { kind: "method", name: "setValue", static: false, private: false, access: { has: obj => "setValue" in obj, get: obj => obj.setValue }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _setShowError_decorators, { kind: "method", name: "setShowError", static: false, private: false, access: { has: obj => "setShowError" in obj, get: obj => obj.setShowError }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _open_decorators, { kind: "field", name: "open", static: false, private: false, access: { has: obj => "open" in obj, get: obj => obj.open, set: (obj, value) => { obj.open = value; } }, metadata: _metadata }, _open_initializers, _open_extraInitializers);
        __esDecorate(null, null, _showError_decorators, { kind: "field", name: "showError", static: false, private: false, access: { has: obj => "showError" in obj, get: obj => obj.showError, set: (obj, value) => { obj.showError = value; } }, metadata: _metadata }, _showError_initializers, _showError_extraInitializers);
        __esDecorate(null, null, _value_decorators, { kind: "field", name: "value", static: false, private: false, access: { has: obj => "value" in obj, get: obj => obj.value, set: (obj, value) => { obj.value = value; } }, metadata: _metadata }, _value_initializers, _value_extraInitializers);
        __esDecorate(null, null, _inputRef_decorators, { kind: "field", name: "inputRef", static: false, private: false, access: { has: obj => "inputRef" in obj, get: obj => obj.inputRef, set: (obj, value) => { obj.inputRef = value; } }, metadata: _metadata }, _inputRef_initializers, _inputRef_extraInitializers);
        __esDecorate(null, null, _setInputRef_decorators, { kind: "field", name: "setInputRef", static: false, private: false, access: { has: obj => "setInputRef" in obj, get: obj => obj.setInputRef, set: (obj, value) => { obj.setInputRef = value; } }, metadata: _metadata }, _setInputRef_initializers, _setInputRef_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DatePicker = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    _classThis.defaultProps = {
        disabled: false,
        options: {
            dateFormat: undefined,
            timeFormat: undefined,
        },
        valid: true,
    };
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DatePicker = _classThis;
})();
exports.default = DatePicker;
