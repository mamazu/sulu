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
const debounce_1 = __importDefault(require("debounce"));
const mobx_react_1 = require("mobx-react");
const Input_1 = __importDefault(require("../Input"));
const Grid_1 = __importDefault(require("../Grid"));
const passwordConfirmation_scss_1 = __importDefault(require("./passwordConfirmation.scss"));
const LOCK_ICON = 'su-lock';
const INPUT_TYPE = 'password';
let PasswordConfirmation = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _instanceExtraInitializers = [];
    let _firstValue_decorators;
    let _firstValue_initializers = [];
    let _firstValue_extraInitializers = [];
    let _secondValue_decorators;
    let _secondValue_initializers = [];
    let _secondValue_extraInitializers = [];
    let _valid_decorators;
    let _valid_initializers = [];
    let _valid_extraInitializers = [];
    let _setValidFlag_decorators;
    let _setValidFlag_initializers = [];
    let _setValidFlag_extraInitializers = [];
    let _get_passwordsMatch_decorators;
    let _handleFirstChange_decorators;
    let _handleFirstChange_initializers = [];
    let _handleFirstChange_extraInitializers = [];
    let _handleSecondChange_decorators;
    let _handleSecondChange_initializers = [];
    let _handleSecondChange_extraInitializers = [];
    var PasswordConfirmation = _classThis = class extends _classSuper {
        constructor() {
            super(...arguments);
            this.firstValue = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _firstValue_initializers, ''));
            this.secondValue = (__runInitializers(this, _firstValue_extraInitializers), __runInitializers(this, _secondValue_initializers, ''));
            this.valid = (__runInitializers(this, _secondValue_extraInitializers), __runInitializers(this, _valid_initializers, true));
            this.disposer = __runInitializers(this, _valid_extraInitializers);
            this.setValidFlag = __runInitializers(this, _setValidFlag_initializers, (valid) => {
                this.valid = valid;
            });
            this.handleFirstChange = (__runInitializers(this, _setValidFlag_extraInitializers), __runInitializers(this, _handleFirstChange_initializers, (value) => {
                this.firstValue = value;
            }));
            this.handleSecondChange = (__runInitializers(this, _handleFirstChange_extraInitializers), __runInitializers(this, _handleSecondChange_initializers, (value) => {
                this.secondValue = value;
            }));
            this.handleChange = (__runInitializers(this, _handleSecondChange_extraInitializers), () => {
                const { firstValue, secondValue, passwordsMatch, props: { valid, }, } = this;
                this.handleChangeDebounced(valid && ((!firstValue || !secondValue) || passwordsMatch));
            });
            this.handleChangeDebounced = (0, debounce_1.default)((valid) => {
                this.setValidFlag(valid);
                if (this.firstValue && this.passwordsMatch) {
                    this.props.onChange(this.firstValue);
                }
            }, 500);
        }
        componentDidMount() {
            this.disposer = (0, mobx_1.autorun)(this.handleChange);
        }
        componentWillUnmount() {
            this.disposer();
        }
        get passwordsMatch() {
            return this.firstValue === this.secondValue;
        }
        render() {
            const { disabled } = this.props;
            return (<Grid_1.default className={passwordConfirmation_scss_1.default.grid}>
                <Grid_1.default.Item colSpan={6}>
                    <Input_1.default autocomplete="new-password" disabled={disabled} icon={LOCK_ICON} onChange={this.handleFirstChange} type={INPUT_TYPE} valid={this.valid} value={this.firstValue}/>
                </Grid_1.default.Item>
                <Grid_1.default.Item className={passwordConfirmation_scss_1.default.item} colSpan={6}>
                    <Input_1.default autocomplete="new-password" disabled={disabled} icon={LOCK_ICON} onChange={this.handleSecondChange} type={INPUT_TYPE} valid={this.valid} value={this.secondValue}/>
                </Grid_1.default.Item>
            </Grid_1.default>);
        }
    };
    __setFunctionName(_classThis, "PasswordConfirmation");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _firstValue_decorators = [mobx_1.observable];
        _secondValue_decorators = [mobx_1.observable];
        _valid_decorators = [mobx_1.observable];
        _setValidFlag_decorators = [mobx_1.action];
        _get_passwordsMatch_decorators = [mobx_1.computed];
        _handleFirstChange_decorators = [mobx_1.action];
        _handleSecondChange_decorators = [mobx_1.action];
        __esDecorate(_classThis, null, _get_passwordsMatch_decorators, { kind: "getter", name: "passwordsMatch", static: false, private: false, access: { has: obj => "passwordsMatch" in obj, get: obj => obj.passwordsMatch }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _firstValue_decorators, { kind: "field", name: "firstValue", static: false, private: false, access: { has: obj => "firstValue" in obj, get: obj => obj.firstValue, set: (obj, value) => { obj.firstValue = value; } }, metadata: _metadata }, _firstValue_initializers, _firstValue_extraInitializers);
        __esDecorate(null, null, _secondValue_decorators, { kind: "field", name: "secondValue", static: false, private: false, access: { has: obj => "secondValue" in obj, get: obj => obj.secondValue, set: (obj, value) => { obj.secondValue = value; } }, metadata: _metadata }, _secondValue_initializers, _secondValue_extraInitializers);
        __esDecorate(null, null, _valid_decorators, { kind: "field", name: "valid", static: false, private: false, access: { has: obj => "valid" in obj, get: obj => obj.valid, set: (obj, value) => { obj.valid = value; } }, metadata: _metadata }, _valid_initializers, _valid_extraInitializers);
        __esDecorate(null, null, _setValidFlag_decorators, { kind: "field", name: "setValidFlag", static: false, private: false, access: { has: obj => "setValidFlag" in obj, get: obj => obj.setValidFlag, set: (obj, value) => { obj.setValidFlag = value; } }, metadata: _metadata }, _setValidFlag_initializers, _setValidFlag_extraInitializers);
        __esDecorate(null, null, _handleFirstChange_decorators, { kind: "field", name: "handleFirstChange", static: false, private: false, access: { has: obj => "handleFirstChange" in obj, get: obj => obj.handleFirstChange, set: (obj, value) => { obj.handleFirstChange = value; } }, metadata: _metadata }, _handleFirstChange_initializers, _handleFirstChange_extraInitializers);
        __esDecorate(null, null, _handleSecondChange_decorators, { kind: "field", name: "handleSecondChange", static: false, private: false, access: { has: obj => "handleSecondChange" in obj, get: obj => obj.handleSecondChange, set: (obj, value) => { obj.handleSecondChange = value; } }, metadata: _metadata }, _handleSecondChange_initializers, _handleSecondChange_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PasswordConfirmation = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    _classThis.defaultProps = {
        disabled: false,
        valid: true,
    };
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PasswordConfirmation = _classThis;
})();
exports.default = PasswordConfirmation;
