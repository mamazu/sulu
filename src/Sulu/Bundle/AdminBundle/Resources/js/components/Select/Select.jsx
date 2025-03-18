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
const debounce_1 = __importDefault(require("debounce"));
const Translator_1 = require("../../utils/Translator");
const Popover_1 = __importDefault(require("../Popover"));
const Menu_1 = __importDefault(require("../Menu"));
const Action_1 = __importDefault(require("./Action"));
const Option_1 = __importDefault(require("./Option"));
const DisplayValue_1 = __importDefault(require("./DisplayValue"));
const select_scss_1 = __importDefault(require("./select.scss"));
const HORIZONTAL_OFFSET = -20;
const VERTICAL_OFFSET = 2;
let Select = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _instanceExtraInitializers = [];
    let _displayValueRef_decorators;
    let _displayValueRef_initializers = [];
    let _displayValueRef_extraInitializers = [];
    let _selectedOptionRef_decorators;
    let _selectedOptionRef_initializers = [];
    let _selectedOptionRef_extraInitializers = [];
    let _buttonRefsByIndex_decorators;
    let _buttonRefsByIndex_initializers = [];
    let _buttonRefsByIndex_extraInitializers = [];
    let _searchText_decorators;
    let _searchText_initializers = [];
    let _searchText_extraInitializers = [];
    let _focusedElementIndex_decorators;
    let _focusedElementIndex_initializers = [];
    let _focusedElementIndex_extraInitializers = [];
    let _open_decorators;
    let _open_initializers = [];
    let _open_extraInitializers = [];
    let _get_buttonTextsByIndex_decorators;
    let _get_availableButtonIndices_decorators;
    let _get_firstSelectedIndex_decorators;
    let _setDisplayValueRef_decorators;
    let _setDisplayValueRef_initializers = [];
    let _setDisplayValueRef_extraInitializers = [];
    let _setSelectedOptionRef_decorators;
    let _setSelectedOptionRef_initializers = [];
    let _setSelectedOptionRef_extraInitializers = [];
    let _openOptionList_decorators;
    let _openOptionList_initializers = [];
    let _openOptionList_extraInitializers = [];
    let _closeOptionList_decorators;
    let _closeOptionList_initializers = [];
    let _closeOptionList_extraInitializers = [];
    let _clearSearchText_decorators;
    let _clearSearchText_initializers = [];
    let _clearSearchText_extraInitializers = [];
    let _appendSearchText_decorators;
    let _appendSearchText_initializers = [];
    let _appendSearchText_extraInitializers = [];
    let _requestFocus_decorators;
    let _requestFocus_initializers = [];
    let _requestFocus_extraInitializers = [];
    var Select = _classThis = class extends _classSuper {
        constructor() {
            super(...arguments);
            this.displayValueRef = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _displayValueRef_initializers, void 0));
            this.selectedOptionRef = (__runInitializers(this, _displayValueRef_extraInitializers), __runInitializers(this, _selectedOptionRef_initializers, void 0));
            this.buttonRefsByIndex = (__runInitializers(this, _selectedOptionRef_extraInitializers), __runInitializers(this, _buttonRefsByIndex_initializers, new Map()));
            this.searchText = (__runInitializers(this, _buttonRefsByIndex_extraInitializers), __runInitializers(this, _searchText_initializers, ''));
            this.focusedElementIndex = (__runInitializers(this, _searchText_extraInitializers), __runInitializers(this, _focusedElementIndex_initializers, -1));
            this.open = (__runInitializers(this, _focusedElementIndex_extraInitializers), __runInitializers(this, _open_initializers, false));
            this.setDisplayValueRef = (__runInitializers(this, _open_extraInitializers), __runInitializers(this, _setDisplayValueRef_initializers, (ref) => {
                if (ref) {
                    this.displayValueRef = ref;
                }
            }));
            this.setSelectedOptionRef = (__runInitializers(this, _setDisplayValueRef_extraInitializers), __runInitializers(this, _setSelectedOptionRef_initializers, (ref, selected) => {
                if (!this.selectedOptionRef || (ref && selected)) {
                    this.selectedOptionRef = ref;
                }
            }));
            this.setButtonRef = (__runInitializers(this, _setSelectedOptionRef_extraInitializers), (index) => (0, mobx_1.action)((ref) => {
                if (ref) {
                    this.buttonRefsByIndex.set(index, ref);
                    if (index === this.focusedElementIndex) {
                        ref.focus();
                    }
                }
                else if (this.buttonRefsByIndex.has(index)) {
                    this.buttonRefsByIndex.delete(index);
                }
            }));
            this.openOptionList = __runInitializers(this, _openOptionList_initializers, () => {
                this.open = true;
                this.clearSearchText();
                this.focusedElementIndex = this.firstSelectedIndex;
            });
            this.closeOptionList = (__runInitializers(this, _openOptionList_extraInitializers), __runInitializers(this, _closeOptionList_initializers, () => {
                const { onClose } = this.props;
                if (!this.open) {
                    return;
                }
                if (onClose) {
                    onClose();
                }
                this.open = false;
                if (this.displayValueRef) {
                    this.displayValueRef.focus();
                }
            }));
            this.clearSearchText = (__runInitializers(this, _closeOptionList_extraInitializers), __runInitializers(this, _clearSearchText_initializers, () => {
                this.searchText = '';
            }));
            this.debouncedClearSearchText = (__runInitializers(this, _clearSearchText_extraInitializers), (0, debounce_1.default)(this.clearSearchText, 500));
            this.appendSearchText = __runInitializers(this, _appendSearchText_initializers, (searchText) => {
                this.searchText += searchText;
                const entries = Array.from(this.buttonTextsByIndex.entries());
                const hit = entries.find(([, text]) => text.toLowerCase().startsWith(this.searchText.toLowerCase()));
                if (hit) {
                    this.requestFocus(hit[0]);
                }
                this.debouncedClearSearchText();
            });
            this.requestFocus = (__runInitializers(this, _appendSearchText_extraInitializers), __runInitializers(this, _requestFocus_initializers, (elementIndex) => {
                if (!this.buttonRefsByIndex.has(elementIndex)) {
                    return;
                }
                this.focusedElementIndex = elementIndex;
                const ref = this.buttonRefsByIndex.get(elementIndex);
                if (ref) {
                    ref.focus();
                }
            }));
            this.handleOptionClick = (__runInitializers(this, _requestFocus_extraInitializers), (value) => {
                this.props.onSelect(value);
                if (this.props.closeOnSelect) {
                    this.closeOptionList();
                }
            });
            this.handleDisplayValueClick = this.openOptionList;
            this.handleOptionListClose = this.closeOptionList;
            this.handleRequestFocus = (elementIndex) => () => {
                this.requestFocus(elementIndex);
            };
            this.handleKeyDown = (event) => {
                if (['Enter', 'ArrowUp', 'ArrowDown'].includes(event.key)) {
                    if (!this.open) {
                        event.preventDefault();
                        this.openOptionList();
                        return;
                    }
                }
                if (event.key === 'Escape') {
                    if (this.open) {
                        event.preventDefault();
                        this.closeOptionList();
                        return;
                    }
                }
                if (event.key === 'ArrowUp') {
                    if (this.open) {
                        event.preventDefault();
                        this.clearSearchText();
                        this.requestFocus(Math.max(...this.availableButtonIndices.filter((i) => i < this.focusedElementIndex)));
                        return;
                    }
                }
                if (event.key === 'ArrowDown') {
                    if (this.open) {
                        event.preventDefault();
                        this.clearSearchText();
                        this.requestFocus(Math.min(...this.availableButtonIndices.filter((i) => i > this.focusedElementIndex)));
                        return;
                    }
                }
            };
            this.handleKeyPress = (event) => {
                if (!this.open) {
                    return;
                }
                event.preventDefault();
                this.appendSearchText(event.key);
            };
        }
        get buttonTextsByIndex() {
            return Array.from(this.buttonRefsByIndex.entries())
                .reduce((buttonTextsByIndex, [index, ref]) => {
                buttonTextsByIndex.set(index, ref.textContent);
                return buttonTextsByIndex;
            }, new Map());
        }
        get availableButtonIndices() {
            return Array.from(this.buttonRefsByIndex.keys());
        }
        get firstSelectedIndex() {
            let firstSelectedIndex = -1;
            react_1.default.Children.forEach(this.props.children, (child, index) => {
                if (!child || child.type !== Option_1.default || firstSelectedIndex !== -1 || !this.props.isOptionSelected(child)) {
                    return;
                }
                firstSelectedIndex = index;
            });
            return firstSelectedIndex;
        }
        cloneOption(originalOption, index) {
            const anchorWidth = this.displayValueRef ? this.displayValueRef.getBoundingClientRect().width : 0;
            return react_1.default.cloneElement(originalOption, {
                anchorWidth,
                onClick: this.handleOptionClick,
                selected: this.props.isOptionSelected(originalOption),
                selectedVisualization: this.props.selectedVisualization,
                requestFocus: this.handleRequestFocus(index),
                optionRef: this.setSelectedOptionRef,
                buttonRef: this.setButtonRef(index),
            });
        }
        cloneAction(originalAction, index) {
            return react_1.default.cloneElement(originalAction, {
                afterAction: this.closeOptionList,
                buttonRef: this.setButtonRef(index),
                requestFocus: this.handleRequestFocus(index),
            });
        }
        cloneChildren() {
            return react_1.default.Children.map(this.props.children, (child, index) => {
                if (!child) {
                    return child;
                }
                switch (child.type) {
                    case Option_1.default:
                        return this.cloneOption(child, index);
                    case Action_1.default:
                        return this.cloneAction(child, index);
                    default:
                        return child;
                }
            });
        }
        render() {
            const { icon, disabled, displayValue, skin, } = this.props;
            const clonedChildren = this.cloneChildren();
            return (<div className={select_scss_1.default.select} onKeyDown={this.handleKeyDown} onKeyPress={this.handleKeyPress} role="none">
                <DisplayValue_1.default disabled={disabled} displayValueRef={this.setDisplayValueRef} icon={icon} onClick={this.handleDisplayValueClick} skin={skin}>
                    {displayValue}
                </DisplayValue_1.default>
                <Popover_1.default anchorElement={this.displayValueRef} centerChildElement={this.selectedOptionRef} horizontalOffset={HORIZONTAL_OFFSET} onClose={this.handleOptionListClose} open={this.open} verticalOffset={VERTICAL_OFFSET}>
                    {(setPopoverElementRef, popoverStyle) => (<Menu_1.default menuRef={setPopoverElementRef} style={popoverStyle}>
                                {react_1.default.Children.count(clonedChildren) > 0 ? clonedChildren : (<Option_1.default disabled={true} value={null}>
                                        {(0, Translator_1.translate)('sulu_admin.no_options_available')}
                                    </Option_1.default>)}
                            </Menu_1.default>)}
                </Popover_1.default>
            </div>);
        }
    };
    __setFunctionName(_classThis, "Select");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _displayValueRef_decorators = [mobx_1.observable];
        _selectedOptionRef_decorators = [mobx_1.observable];
        _buttonRefsByIndex_decorators = [mobx_1.observable];
        _searchText_decorators = [mobx_1.observable];
        _focusedElementIndex_decorators = [mobx_1.observable];
        _open_decorators = [mobx_1.observable];
        _get_buttonTextsByIndex_decorators = [mobx_1.computed];
        _get_availableButtonIndices_decorators = [mobx_1.computed];
        _get_firstSelectedIndex_decorators = [mobx_1.computed];
        _setDisplayValueRef_decorators = [mobx_1.action];
        _setSelectedOptionRef_decorators = [mobx_1.action];
        _openOptionList_decorators = [mobx_1.action];
        _closeOptionList_decorators = [mobx_1.action];
        _clearSearchText_decorators = [mobx_1.action];
        _appendSearchText_decorators = [mobx_1.action];
        _requestFocus_decorators = [mobx_1.action];
        __esDecorate(_classThis, null, _get_buttonTextsByIndex_decorators, { kind: "getter", name: "buttonTextsByIndex", static: false, private: false, access: { has: obj => "buttonTextsByIndex" in obj, get: obj => obj.buttonTextsByIndex }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_availableButtonIndices_decorators, { kind: "getter", name: "availableButtonIndices", static: false, private: false, access: { has: obj => "availableButtonIndices" in obj, get: obj => obj.availableButtonIndices }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_firstSelectedIndex_decorators, { kind: "getter", name: "firstSelectedIndex", static: false, private: false, access: { has: obj => "firstSelectedIndex" in obj, get: obj => obj.firstSelectedIndex }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _displayValueRef_decorators, { kind: "field", name: "displayValueRef", static: false, private: false, access: { has: obj => "displayValueRef" in obj, get: obj => obj.displayValueRef, set: (obj, value) => { obj.displayValueRef = value; } }, metadata: _metadata }, _displayValueRef_initializers, _displayValueRef_extraInitializers);
        __esDecorate(null, null, _selectedOptionRef_decorators, { kind: "field", name: "selectedOptionRef", static: false, private: false, access: { has: obj => "selectedOptionRef" in obj, get: obj => obj.selectedOptionRef, set: (obj, value) => { obj.selectedOptionRef = value; } }, metadata: _metadata }, _selectedOptionRef_initializers, _selectedOptionRef_extraInitializers);
        __esDecorate(null, null, _buttonRefsByIndex_decorators, { kind: "field", name: "buttonRefsByIndex", static: false, private: false, access: { has: obj => "buttonRefsByIndex" in obj, get: obj => obj.buttonRefsByIndex, set: (obj, value) => { obj.buttonRefsByIndex = value; } }, metadata: _metadata }, _buttonRefsByIndex_initializers, _buttonRefsByIndex_extraInitializers);
        __esDecorate(null, null, _searchText_decorators, { kind: "field", name: "searchText", static: false, private: false, access: { has: obj => "searchText" in obj, get: obj => obj.searchText, set: (obj, value) => { obj.searchText = value; } }, metadata: _metadata }, _searchText_initializers, _searchText_extraInitializers);
        __esDecorate(null, null, _focusedElementIndex_decorators, { kind: "field", name: "focusedElementIndex", static: false, private: false, access: { has: obj => "focusedElementIndex" in obj, get: obj => obj.focusedElementIndex, set: (obj, value) => { obj.focusedElementIndex = value; } }, metadata: _metadata }, _focusedElementIndex_initializers, _focusedElementIndex_extraInitializers);
        __esDecorate(null, null, _open_decorators, { kind: "field", name: "open", static: false, private: false, access: { has: obj => "open" in obj, get: obj => obj.open, set: (obj, value) => { obj.open = value; } }, metadata: _metadata }, _open_initializers, _open_extraInitializers);
        __esDecorate(null, null, _setDisplayValueRef_decorators, { kind: "field", name: "setDisplayValueRef", static: false, private: false, access: { has: obj => "setDisplayValueRef" in obj, get: obj => obj.setDisplayValueRef, set: (obj, value) => { obj.setDisplayValueRef = value; } }, metadata: _metadata }, _setDisplayValueRef_initializers, _setDisplayValueRef_extraInitializers);
        __esDecorate(null, null, _setSelectedOptionRef_decorators, { kind: "field", name: "setSelectedOptionRef", static: false, private: false, access: { has: obj => "setSelectedOptionRef" in obj, get: obj => obj.setSelectedOptionRef, set: (obj, value) => { obj.setSelectedOptionRef = value; } }, metadata: _metadata }, _setSelectedOptionRef_initializers, _setSelectedOptionRef_extraInitializers);
        __esDecorate(null, null, _openOptionList_decorators, { kind: "field", name: "openOptionList", static: false, private: false, access: { has: obj => "openOptionList" in obj, get: obj => obj.openOptionList, set: (obj, value) => { obj.openOptionList = value; } }, metadata: _metadata }, _openOptionList_initializers, _openOptionList_extraInitializers);
        __esDecorate(null, null, _closeOptionList_decorators, { kind: "field", name: "closeOptionList", static: false, private: false, access: { has: obj => "closeOptionList" in obj, get: obj => obj.closeOptionList, set: (obj, value) => { obj.closeOptionList = value; } }, metadata: _metadata }, _closeOptionList_initializers, _closeOptionList_extraInitializers);
        __esDecorate(null, null, _clearSearchText_decorators, { kind: "field", name: "clearSearchText", static: false, private: false, access: { has: obj => "clearSearchText" in obj, get: obj => obj.clearSearchText, set: (obj, value) => { obj.clearSearchText = value; } }, metadata: _metadata }, _clearSearchText_initializers, _clearSearchText_extraInitializers);
        __esDecorate(null, null, _appendSearchText_decorators, { kind: "field", name: "appendSearchText", static: false, private: false, access: { has: obj => "appendSearchText" in obj, get: obj => obj.appendSearchText, set: (obj, value) => { obj.appendSearchText = value; } }, metadata: _metadata }, _appendSearchText_initializers, _appendSearchText_extraInitializers);
        __esDecorate(null, null, _requestFocus_decorators, { kind: "field", name: "requestFocus", static: false, private: false, access: { has: obj => "requestFocus" in obj, get: obj => obj.requestFocus, set: (obj, value) => { obj.requestFocus = value; } }, metadata: _metadata }, _requestFocus_initializers, _requestFocus_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Select = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    _classThis.defaultProps = {
        closeOnSelect: true,
        disabled: false,
        skin: 'default',
    };
    _classThis.Action = Action_1.default;
    _classThis.Option = Option_1.default;
    _classThis.Divider = Menu_1.default.Divider;
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Select = _classThis;
})();
exports.default = Select;
