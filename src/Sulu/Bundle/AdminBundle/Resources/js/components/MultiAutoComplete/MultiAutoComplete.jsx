"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const mobx_1 = require("mobx");
const mobx_react_1 = require("mobx-react");
const debounce_1 = __importDefault(require("debounce"));
const mousetrap_1 = __importDefault(require("mousetrap"));
const classnames_1 = __importDefault(require("classnames"));
const Icon_1 = __importDefault(require("../Icon"));
const Loader_1 = __importDefault(require("../Loader"));
const AutoCompletePopover_1 = __importDefault(require("../AutoCompletePopover"));
const Chip_1 = __importDefault(require("../Chip"));
const multiAutoComplete_scss_1 = __importDefault(require("./multiAutoComplete.scss"));
const DEBOUNCE_TIME = 300;
let MultiAutoComplete = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _instanceExtraInitializers = [];
    let _inputContainerRef_decorators;
    let _inputContainerRef_initializers = [];
    let _inputContainerRef_extraInitializers = [];
    let _inputRef_decorators;
    let _inputRef_initializers = [];
    let _inputRef_extraInitializers = [];
    let _displaySuggestions_decorators;
    let _displaySuggestions_initializers = [];
    let _displaySuggestions_extraInitializers = [];
    let _inputValue_decorators;
    let _inputValue_initializers = [];
    let _inputValue_extraInitializers = [];
    let _setInputContainerRef_decorators;
    let _setInputContainerRef_initializers = [];
    let _setInputContainerRef_extraInitializers = [];
    let _setInputRef_decorators;
    let _setInputRef_initializers = [];
    let _setInputRef_extraInitializers = [];
    let _get_popoverMinWidth_decorators;
    let _handleInputChange_decorators;
    let _handleInputChange_initializers = [];
    let _handleInputChange_extraInitializers = [];
    let _handleSelect_decorators;
    let _handleSelect_initializers = [];
    let _handleSelect_extraInitializers = [];
    let _handlePopoverClose_decorators;
    let _handlePopoverClose_initializers = [];
    let _handlePopoverClose_extraInitializers = [];
    let _search_decorators;
    let _search_initializers = [];
    let _search_extraInitializers = [];
    var MultiAutoComplete = _classThis = class extends _classSuper {
        constructor() {
            super(...arguments);
            this.inputContainerRef = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _inputContainerRef_initializers, void 0));
            this.inputRef = (__runInitializers(this, _inputContainerRef_extraInitializers), __runInitializers(this, _inputRef_initializers, void 0));
            this.displaySuggestions = (__runInitializers(this, _inputRef_extraInitializers), __runInitializers(this, _displaySuggestions_initializers, false));
            this.inputValue = (__runInitializers(this, _displaySuggestions_extraInitializers), __runInitializers(this, _inputValue_initializers, ''));
            this.setInputContainerRef = (__runInitializers(this, _inputValue_extraInitializers), __runInitializers(this, _setInputContainerRef_initializers, (inputContainerRef) => {
                if (inputContainerRef) {
                    this.inputContainerRef = inputContainerRef;
                }
            }));
            this.setInputRef = (__runInitializers(this, _setInputContainerRef_extraInitializers), __runInitializers(this, _setInputRef_initializers, (ref) => {
                const { inputRef } = this.props;
                if (inputRef) {
                    inputRef(ref);
                }
                if (ref) {
                    this.inputRef = ref;
                }
            }));
            this.handleDelete = (__runInitializers(this, _setInputRef_extraInitializers), (newValue) => {
                const { onChange, onFinish, value } = this.props;
                onChange(value.filter((item) => item != newValue));
                // reload suggestion list as deleted item should not be excluded from suggestions anymore
                this.debouncedSearch(this.inputValue);
                if (onFinish) {
                    onFinish();
                }
            });
            this.handleInputChange = __runInitializers(this, _handleInputChange_initializers, (event) => {
                this.inputValue = event.currentTarget.value;
                this.debouncedSearch(this.inputValue);
            });
            this.handleInputFocus = (__runInitializers(this, _handleInputChange_extraInitializers), () => {
                mousetrap_1.default.bind('enter', this.handleEnterAndComma);
                mousetrap_1.default.bind(',', this.handleEnterAndComma);
                mousetrap_1.default.bind('backspace', this.handleBackspace);
                this.search(this.inputValue);
            });
            this.handleInputBlur = () => {
                mousetrap_1.default.unbind('enter');
                mousetrap_1.default.unbind(',');
                mousetrap_1.default.unbind('backspace');
            };
            this.handleEnterAndComma = () => {
                const { allowAdd, displayProperty, idProperty, suggestions, value, } = this.props;
                if (this.inputValue.length === 0) {
                    return false;
                }
                const suggestion = suggestions.find((suggestion) => suggestion[displayProperty] === this.inputValue);
                if (suggestion) {
                    this.handleSelect(suggestion);
                    return false;
                }
                const item = value.find((item) => item[displayProperty].toLowerCase() === this.inputValue.toLowerCase());
                if (allowAdd && !item) {
                    this.handleSelect({ [idProperty]: this.inputValue });
                    return false;
                }
                return false;
            };
            this.handleBackspace = () => {
                const { value } = this.props;
                if (this.inputValue.length > 0) {
                    return true;
                }
                if (value.length === 0) {
                    return false;
                }
                this.handleDelete(value[value.length - 1]);
            };
            this.handleSelect = __runInitializers(this, _handleSelect_initializers, (newValue) => {
                const { onChange, onFinish, value, } = this.props;
                onChange([...value, newValue]);
                this.inputValue = '';
                this.inputRef.focus();
                if (onFinish) {
                    onFinish();
                }
            });
            this.handlePopoverClose = (__runInitializers(this, _handleSelect_extraInitializers), __runInitializers(this, _handlePopoverClose_initializers, () => {
                this.displaySuggestions = false;
            }));
            this.search = (__runInitializers(this, _handlePopoverClose_extraInitializers), __runInitializers(this, _search_initializers, (query) => {
                this.props.onSearch(query);
                this.displaySuggestions = true;
            }));
            this.debouncedSearch = (__runInitializers(this, _search_extraInitializers), (0, debounce_1.default)(this.search, DEBOUNCE_TIME));
        }
        componentWillUnmount() {
            this.debouncedSearch.clear();
        }
        get popoverMinWidth() {
            return this.inputContainerRef ? this.inputContainerRef.scrollWidth - 10 : 0;
        }
        render() {
            const { disabled, displayProperty, id, idProperty, loading, searchProperties, suggestions, value, } = this.props;
            const multiAutoCompleteClass = (0, classnames_1.default)(multiAutoComplete_scss_1.default.multiAutoComplete, {
                [multiAutoComplete_scss_1.default.disabled]: disabled,
            });
            const inputClass = (0, classnames_1.default)(multiAutoComplete_scss_1.default.input, 'mousetrap' // required to allow mousetrap to catch key binding within input
            );
            return (<react_1.Fragment>
                <div className={multiAutoCompleteClass} ref={this.setInputContainerRef}>
                    <div className={multiAutoComplete_scss_1.default.icon}>
                        {loading
                    ? <Loader_1.default size={16}/>
                    : <Icon_1.default name="su-search"/>}
                    </div>
                    <div className={multiAutoComplete_scss_1.default.items}>
                        {value.map((item) => (<span className={multiAutoComplete_scss_1.default.chip} key={item[idProperty]}>
                                <Chip_1.default disabled={disabled} onDelete={this.handleDelete} value={item}>
                                    {item[displayProperty]}
                                </Chip_1.default>
                            </span>))}
                        <input className={inputClass} disabled={disabled} id={id} onBlur={this.handleInputBlur} onChange={this.handleInputChange} onFocus={this.handleInputFocus} ref={this.setInputRef} value={this.inputValue}/>
                    </div>
                </div>
                <AutoCompletePopover_1.default anchorElement={this.inputContainerRef} idProperty={idProperty} minWidth={this.popoverMinWidth} onClose={this.handlePopoverClose} onSelect={this.handleSelect} open={!disabled && this.displaySuggestions && suggestions.length > 0} query={this.inputValue} searchProperties={searchProperties} suggestions={suggestions}/>
            </react_1.Fragment>);
        }
    };
    __setFunctionName(_classThis, "MultiAutoComplete");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _inputContainerRef_decorators = [mobx_1.observable];
        _inputRef_decorators = [mobx_1.observable];
        _displaySuggestions_decorators = [mobx_1.observable];
        _inputValue_decorators = [mobx_1.observable];
        _setInputContainerRef_decorators = [mobx_1.action];
        _setInputRef_decorators = [mobx_1.action];
        _get_popoverMinWidth_decorators = [mobx_1.computed];
        _handleInputChange_decorators = [mobx_1.action];
        _handleSelect_decorators = [mobx_1.action];
        _handlePopoverClose_decorators = [mobx_1.action];
        _search_decorators = [mobx_1.action];
        __esDecorate(_classThis, null, _get_popoverMinWidth_decorators, { kind: "getter", name: "popoverMinWidth", static: false, private: false, access: { has: obj => "popoverMinWidth" in obj, get: obj => obj.popoverMinWidth }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _inputContainerRef_decorators, { kind: "field", name: "inputContainerRef", static: false, private: false, access: { has: obj => "inputContainerRef" in obj, get: obj => obj.inputContainerRef, set: (obj, value) => { obj.inputContainerRef = value; } }, metadata: _metadata }, _inputContainerRef_initializers, _inputContainerRef_extraInitializers);
        __esDecorate(null, null, _inputRef_decorators, { kind: "field", name: "inputRef", static: false, private: false, access: { has: obj => "inputRef" in obj, get: obj => obj.inputRef, set: (obj, value) => { obj.inputRef = value; } }, metadata: _metadata }, _inputRef_initializers, _inputRef_extraInitializers);
        __esDecorate(null, null, _displaySuggestions_decorators, { kind: "field", name: "displaySuggestions", static: false, private: false, access: { has: obj => "displaySuggestions" in obj, get: obj => obj.displaySuggestions, set: (obj, value) => { obj.displaySuggestions = value; } }, metadata: _metadata }, _displaySuggestions_initializers, _displaySuggestions_extraInitializers);
        __esDecorate(null, null, _inputValue_decorators, { kind: "field", name: "inputValue", static: false, private: false, access: { has: obj => "inputValue" in obj, get: obj => obj.inputValue, set: (obj, value) => { obj.inputValue = value; } }, metadata: _metadata }, _inputValue_initializers, _inputValue_extraInitializers);
        __esDecorate(null, null, _setInputContainerRef_decorators, { kind: "field", name: "setInputContainerRef", static: false, private: false, access: { has: obj => "setInputContainerRef" in obj, get: obj => obj.setInputContainerRef, set: (obj, value) => { obj.setInputContainerRef = value; } }, metadata: _metadata }, _setInputContainerRef_initializers, _setInputContainerRef_extraInitializers);
        __esDecorate(null, null, _setInputRef_decorators, { kind: "field", name: "setInputRef", static: false, private: false, access: { has: obj => "setInputRef" in obj, get: obj => obj.setInputRef, set: (obj, value) => { obj.setInputRef = value; } }, metadata: _metadata }, _setInputRef_initializers, _setInputRef_extraInitializers);
        __esDecorate(null, null, _handleInputChange_decorators, { kind: "field", name: "handleInputChange", static: false, private: false, access: { has: obj => "handleInputChange" in obj, get: obj => obj.handleInputChange, set: (obj, value) => { obj.handleInputChange = value; } }, metadata: _metadata }, _handleInputChange_initializers, _handleInputChange_extraInitializers);
        __esDecorate(null, null, _handleSelect_decorators, { kind: "field", name: "handleSelect", static: false, private: false, access: { has: obj => "handleSelect" in obj, get: obj => obj.handleSelect, set: (obj, value) => { obj.handleSelect = value; } }, metadata: _metadata }, _handleSelect_initializers, _handleSelect_extraInitializers);
        __esDecorate(null, null, _handlePopoverClose_decorators, { kind: "field", name: "handlePopoverClose", static: false, private: false, access: { has: obj => "handlePopoverClose" in obj, get: obj => obj.handlePopoverClose, set: (obj, value) => { obj.handlePopoverClose = value; } }, metadata: _metadata }, _handlePopoverClose_initializers, _handlePopoverClose_extraInitializers);
        __esDecorate(null, null, _search_decorators, { kind: "field", name: "search", static: false, private: false, access: { has: obj => "search" in obj, get: obj => obj.search, set: (obj, value) => { obj.search = value; } }, metadata: _metadata }, _search_initializers, _search_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MultiAutoComplete = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    _classThis.defaultProps = {
        allowAdd: false,
        disabled: false,
        idProperty: 'id',
        loading: false,
    };
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MultiAutoComplete = _classThis;
})();
exports.default = MultiAutoComplete;
