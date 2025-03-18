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
const Input_1 = __importDefault(require("../Input"));
const resourceLocator_scss_1 = __importDefault(require("./resourceLocator.scss"));
const replacerMap = new Map([
    // remove dash before slash
    [/[-]+\//g, '/'],
    // remove dash after slash
    [/\/[-]+/g, '/'],
    // delete dash at the beginning
    [/^([-])/g, ''],
    // replace multiple slashes
    [/([/]+)/g, '/'],
    // replace spaces with dashes
    [/ /g, '-'],
    // replace multiple dash with one
    [/([-]+)/g, '-'],
    // remove special characters
    [/[^a-z0-9-_/]/g, ''],
]);
let ResourceLocator = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _instanceExtraInitializers = [];
    let _fixed_decorators;
    let _fixed_initializers = [];
    let _fixed_extraInitializers = [];
    let _componentDidUpdate_decorators;
    let _get_changeableValue_decorators;
    var ResourceLocator = _classThis = class extends _classSuper {
        constructor(props) {
            super(props);
            this.fixed = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _fixed_initializers, '/'));
            this.handleChange = (__runInitializers(this, _fixed_extraInitializers), (value) => {
                const { mode, onChange, locale } = this.props;
                if (value) {
                    try {
                        value = value.toLocaleLowerCase(locale.get());
                    }
                    catch (e) {
                        // fallback to toLowerCase if toLocaleLowerCase fails because given locale is not a valid BCP 47 code
                        value = value.toLowerCase();
                    }
                    if (mode === 'leaf') {
                        value = value.replace(/\//g, '-');
                    }
                    replacerMap.forEach((replaceValue, key) => {
                        if (value) {
                            value = value.replace(key, replaceValue);
                        }
                    });
                }
                onChange(value ? this.fixed + value : undefined);
            });
            this.handleBlur = () => {
                const { onBlur, onChange, value } = this.props;
                if (value) {
                    const newValue = value.replace(/([-])$/g, '');
                    onChange(newValue);
                }
                if (onBlur) {
                    onBlur();
                }
            };
            this.splitLeafValue();
        }
        componentDidUpdate(prevProps) {
            if (this.props.value !== prevProps.value) {
                this.splitLeafValue();
            }
        }
        splitLeafValue() {
            const { value, mode } = this.props;
            if (mode === 'leaf' && value) {
                const parts = value.split('/');
                parts.pop();
                this.fixed = parts.join('/') + '/';
            }
        }
        get changeableValue() {
            const { value } = this.props;
            if (!value) {
                return undefined;
            }
            return value.substring(this.fixed.length);
        }
        render() {
            const { disabled, id } = this.props;
            return (<div className={resourceLocator_scss_1.default.resourceLocator}>
                <span className={resourceLocator_scss_1.default.fixed}>{this.fixed}</span>
                <Input_1.default disabled={disabled} id={id} onBlur={this.handleBlur} onChange={this.handleChange} value={this.changeableValue}/>
            </div>);
        }
    };
    __setFunctionName(_classThis, "ResourceLocator");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _fixed_decorators = [mobx_1.observable];
        _componentDidUpdate_decorators = [mobx_1.action];
        _get_changeableValue_decorators = [mobx_1.computed];
        __esDecorate(_classThis, null, _componentDidUpdate_decorators, { kind: "method", name: "componentDidUpdate", static: false, private: false, access: { has: obj => "componentDidUpdate" in obj, get: obj => obj.componentDidUpdate }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_changeableValue_decorators, { kind: "getter", name: "changeableValue", static: false, private: false, access: { has: obj => "changeableValue" in obj, get: obj => obj.changeableValue }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _fixed_decorators, { kind: "field", name: "fixed", static: false, private: false, access: { has: obj => "fixed" in obj, get: obj => obj.fixed, set: (obj, value) => { obj.fixed = value; } }, metadata: _metadata }, _fixed_initializers, _fixed_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ResourceLocator = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    _classThis.defaultProps = {
        disabled: false,
    };
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ResourceLocator = _classThis;
})();
exports.default = ResourceLocator;
