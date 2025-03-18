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
const mousetrap_1 = __importDefault(require("mousetrap"));
const mobx_1 = require("mobx");
const Menu_1 = __importDefault(require("../Menu"));
const Popover_1 = __importDefault(require("../Popover"));
const Suggestion_1 = __importDefault(require("./Suggestion"));
const autoCompletePopover_scss_1 = __importDefault(require("./autoCompletePopover.scss"));
let AutoCompletePopover = (() => {
    var _a;
    let _classSuper = react_1.default.Component;
    let _instanceExtraInitializers = [];
    let _suggestionsRef_decorators;
    let _suggestionsRef_initializers = [];
    let _suggestionsRef_extraInitializers = [];
    let _get_buttons_decorators;
    let _get_activeButtonIndex_decorators;
    return _a = class AutoCompletePopover extends _classSuper {
            constructor() {
                super(...arguments);
                this.suggestionsRef = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _suggestionsRef_initializers, void 0));
                this.setSuggestionsRef = (__runInitializers(this, _suggestionsRef_extraInitializers), (suggestionsRef) => {
                    this.suggestionsRef = suggestionsRef;
                });
                this.handlePopoverClose = () => {
                    if (this.props.onClose) {
                        this.props.onClose();
                    }
                };
                this.handleUp = () => {
                    const previousButton = this.buttons[this.activeButtonIndex - 1];
                    if (previousButton) {
                        previousButton.focus();
                    }
                };
                this.handleDown = () => {
                    const nextButton = this.buttons[this.activeButtonIndex + 1];
                    if (nextButton) {
                        nextButton.focus();
                    }
                };
            }
            get buttons() {
                if (!this.suggestionsRef) {
                    return [];
                }
                return Array.from(this.suggestionsRef.getElementsByTagName('button'));
            }
            get activeButtonIndex() {
                return this.buttons.findIndex((button) => button === document.activeElement);
            }
            componentDidMount() {
                if (this.props.open === true) {
                    mousetrap_1.default.bind('up', this.handleUp);
                    mousetrap_1.default.bind('down', this.handleDown);
                }
            }
            componentDidUpdate(prevProps) {
                if (this.props.open === true && prevProps.open === false) {
                    mousetrap_1.default.bind('up', this.handleUp);
                    mousetrap_1.default.bind('down', this.handleDown);
                }
                if (this.props.open === false && prevProps.open === true) {
                    mousetrap_1.default.unbind('up');
                    mousetrap_1.default.unbind('down');
                }
            }
            render() {
                const { anchorElement, idProperty, minWidth, onSelect, open, query, searchProperties, suggestions, } = this.props;
                return (<Popover_1.default anchorElement={anchorElement} horizontalOffset={5} onClose={this.handlePopoverClose} open={open} popoverChildRef={this.setSuggestionsRef} verticalOffset={-2}>
                {(setPopoverElementRef, popoverStyle) => (<Menu_1.default menuRef={setPopoverElementRef} style={popoverStyle}>
                            {suggestions.map((searchResult) => (<Suggestion_1.default key={searchResult[idProperty]} minWidth={minWidth} onSelect={onSelect} query={query} value={searchResult}>
                                    {(highlight) => searchProperties.map((field) => (<span className={autoCompletePopover_scss_1.default.column} key={field}>
                                            {highlight(searchResult[field])}
                                        </span>))}
                                </Suggestion_1.default>))}
                        </Menu_1.default>)}
            </Popover_1.default>);
            }
        },
        (() => {
            var _b;
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_b = _classSuper[Symbol.metadata]) !== null && _b !== void 0 ? _b : null) : void 0;
            _suggestionsRef_decorators = [mobx_1.observable];
            _get_buttons_decorators = [mobx_1.computed];
            _get_activeButtonIndex_decorators = [mobx_1.computed];
            __esDecorate(_a, null, _get_buttons_decorators, { kind: "getter", name: "buttons", static: false, private: false, access: { has: obj => "buttons" in obj, get: obj => obj.buttons }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_activeButtonIndex_decorators, { kind: "getter", name: "activeButtonIndex", static: false, private: false, access: { has: obj => "activeButtonIndex" in obj, get: obj => obj.activeButtonIndex }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, null, _suggestionsRef_decorators, { kind: "field", name: "suggestionsRef", static: false, private: false, access: { has: obj => "suggestionsRef" in obj, get: obj => obj.suggestionsRef, set: (obj, value) => { obj.suggestionsRef = value; } }, metadata: _metadata }, _suggestionsRef_initializers, _suggestionsRef_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a.defaultProps = {
            idProperty: 'id',
            minWidth: 0,
        },
        _a;
})();
exports.default = AutoCompletePopover;
