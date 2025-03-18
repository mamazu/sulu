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
const fast_deep_equal_1 = __importDefault(require("fast-deep-equal"));
const mobx_react_1 = require("mobx-react");
const mobx_1 = require("mobx");
const debounce_1 = __importDefault(require("debounce"));
const Input_1 = __importDefault(require("../Input"));
const AutoCompletePopover_1 = __importDefault(require("../AutoCompletePopover"));
const singleAutoComplete_scss_1 = __importDefault(require("./singleAutoComplete.scss"));
const LENS_ICON = 'su-search';
const DEBOUNCE_TIME = 300;
let SingleAutoComplete = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _instanceExtraInitializers = [];
    let _inputContainerRef_decorators;
    let _inputContainerRef_initializers = [];
    let _inputContainerRef_extraInitializers = [];
    let _displaySuggestions_decorators;
    let _displaySuggestions_initializers = [];
    let _displaySuggestions_extraInitializers = [];
    let _inputValue_decorators;
    let _inputValue_initializers = [];
    let _inputValue_extraInitializers = [];
    let _setInputValue_decorators;
    let _setInputContainerRef_decorators;
    let _setInputContainerRef_initializers = [];
    let _setInputContainerRef_extraInitializers = [];
    let _get_popoverMinWidth_decorators;
    let _search_decorators;
    let _search_initializers = [];
    let _search_extraInitializers = [];
    let _handleInputFocus_decorators;
    let _handleInputFocus_initializers = [];
    let _handleInputFocus_extraInitializers = [];
    let _handlePopoverClose_decorators;
    let _handlePopoverClose_initializers = [];
    let _handlePopoverClose_extraInitializers = [];
    var SingleAutoComplete = _classThis = class extends _classSuper {
        componentDidUpdate(prevProps) {
            const { displayProperty, value, } = this.props;
            if (!(0, fast_deep_equal_1.default)((0, mobx_1.toJS)(prevProps.value), (0, mobx_1.toJS)(value))) {
                this.setInputValue(value ? value[displayProperty] : undefined);
            }
        }
        componentWillUnmount() {
            this.debouncedSearch.clear();
        }
        setInputValue(value) {
            this.inputValue = value;
        }
        get popoverMinWidth() {
            return this.inputContainerRef ? this.inputContainerRef.scrollWidth - 10 : 0;
        }
        render() {
            const { disabled, id, loading, onFinish, placeholder, searchProperties, suggestions, } = this.props;
            const { inputValue } = this;
            // The mousetrap class is required to allow mousetrap catch key bindings for up and down keys
            return (<div className={singleAutoComplete_scss_1.default.singleAutoComplete}>
                <Input_1.default autocomplete="off" disabled={disabled} icon={LENS_ICON} id={id} inputClass="mousetrap" inputContainerRef={this.setInputContainerRef} loading={loading} onBlur={onFinish} onChange={this.handleInputChange} onFocus={this.handleInputFocus} placeholder={placeholder} value={inputValue}/>
                <AutoCompletePopover_1.default anchorElement={this.inputContainerRef} minWidth={this.popoverMinWidth} onClose={this.handlePopoverClose} onSelect={this.handlePopoverSelect} open={!disabled && this.displaySuggestions && suggestions.length > 0} query={inputValue} searchProperties={searchProperties} suggestions={suggestions}/>
            </div>);
        }
        constructor() {
            super(...arguments);
            this.inputContainerRef = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _inputContainerRef_initializers, void 0));
            this.displaySuggestions = (__runInitializers(this, _inputContainerRef_extraInitializers), __runInitializers(this, _displaySuggestions_initializers, false));
            this.inputValue = (__runInitializers(this, _displaySuggestions_extraInitializers), __runInitializers(this, _inputValue_initializers, this.props.value ? this.props.value[this.props.displayProperty] : undefined));
            this.overrideValue = (__runInitializers(this, _inputValue_extraInitializers), false);
            this.setInputContainerRef = __runInitializers(this, _setInputContainerRef_initializers, (inputContainerRef) => {
                if (inputContainerRef) {
                    this.inputContainerRef = inputContainerRef;
                }
            });
            this.search = (__runInitializers(this, _setInputContainerRef_extraInitializers), __runInitializers(this, _search_initializers, (query) => {
                this.props.onSearch(query);
                this.displaySuggestions = true;
            }));
            this.debouncedSearch = (__runInitializers(this, _search_extraInitializers), (0, debounce_1.default)(this.search, DEBOUNCE_TIME));
            this.handlePopoverSelect = (value) => {
                const { displayProperty, onChange, } = this.props;
                this.setInputValue(value ? value[displayProperty] : undefined);
                onChange(value);
            };
            this.handleInputChange = (value) => {
                if (!value) {
                    this.props.onChange(undefined);
                }
                this.setInputValue(value);
                this.debouncedSearch(this.inputValue);
            };
            this.handleInputFocus = __runInitializers(this, _handleInputFocus_initializers, () => {
                this.search(this.inputValue || '');
            });
            this.handlePopoverClose = (__runInitializers(this, _handleInputFocus_extraInitializers), __runInitializers(this, _handlePopoverClose_initializers, () => {
                this.displaySuggestions = false;
            }));
            __runInitializers(this, _handlePopoverClose_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "SingleAutoComplete");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _inputContainerRef_decorators = [mobx_1.observable];
        _displaySuggestions_decorators = [mobx_1.observable];
        _inputValue_decorators = [mobx_1.observable];
        _setInputValue_decorators = [mobx_1.action];
        _setInputContainerRef_decorators = [mobx_1.action];
        _get_popoverMinWidth_decorators = [mobx_1.computed];
        _search_decorators = [mobx_1.action];
        _handleInputFocus_decorators = [mobx_1.action];
        _handlePopoverClose_decorators = [mobx_1.action];
        __esDecorate(_classThis, null, _setInputValue_decorators, { kind: "method", name: "setInputValue", static: false, private: false, access: { has: obj => "setInputValue" in obj, get: obj => obj.setInputValue }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_popoverMinWidth_decorators, { kind: "getter", name: "popoverMinWidth", static: false, private: false, access: { has: obj => "popoverMinWidth" in obj, get: obj => obj.popoverMinWidth }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _inputContainerRef_decorators, { kind: "field", name: "inputContainerRef", static: false, private: false, access: { has: obj => "inputContainerRef" in obj, get: obj => obj.inputContainerRef, set: (obj, value) => { obj.inputContainerRef = value; } }, metadata: _metadata }, _inputContainerRef_initializers, _inputContainerRef_extraInitializers);
        __esDecorate(null, null, _displaySuggestions_decorators, { kind: "field", name: "displaySuggestions", static: false, private: false, access: { has: obj => "displaySuggestions" in obj, get: obj => obj.displaySuggestions, set: (obj, value) => { obj.displaySuggestions = value; } }, metadata: _metadata }, _displaySuggestions_initializers, _displaySuggestions_extraInitializers);
        __esDecorate(null, null, _inputValue_decorators, { kind: "field", name: "inputValue", static: false, private: false, access: { has: obj => "inputValue" in obj, get: obj => obj.inputValue, set: (obj, value) => { obj.inputValue = value; } }, metadata: _metadata }, _inputValue_initializers, _inputValue_extraInitializers);
        __esDecorate(null, null, _setInputContainerRef_decorators, { kind: "field", name: "setInputContainerRef", static: false, private: false, access: { has: obj => "setInputContainerRef" in obj, get: obj => obj.setInputContainerRef, set: (obj, value) => { obj.setInputContainerRef = value; } }, metadata: _metadata }, _setInputContainerRef_initializers, _setInputContainerRef_extraInitializers);
        __esDecorate(null, null, _search_decorators, { kind: "field", name: "search", static: false, private: false, access: { has: obj => "search" in obj, get: obj => obj.search, set: (obj, value) => { obj.search = value; } }, metadata: _metadata }, _search_initializers, _search_extraInitializers);
        __esDecorate(null, null, _handleInputFocus_decorators, { kind: "field", name: "handleInputFocus", static: false, private: false, access: { has: obj => "handleInputFocus" in obj, get: obj => obj.handleInputFocus, set: (obj, value) => { obj.handleInputFocus = value; } }, metadata: _metadata }, _handleInputFocus_initializers, _handleInputFocus_extraInitializers);
        __esDecorate(null, null, _handlePopoverClose_decorators, { kind: "field", name: "handlePopoverClose", static: false, private: false, access: { has: obj => "handlePopoverClose" in obj, get: obj => obj.handlePopoverClose, set: (obj, value) => { obj.handlePopoverClose = value; } }, metadata: _metadata }, _handlePopoverClose_initializers, _handlePopoverClose_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SingleAutoComplete = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    _classThis.defaultProps = {
        disabled: false,
    };
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SingleAutoComplete = _classThis;
})();
exports.default = SingleAutoComplete;
