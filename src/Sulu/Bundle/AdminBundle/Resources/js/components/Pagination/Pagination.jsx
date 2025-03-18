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
const Button_1 = __importDefault(require("../Button"));
const ButtonGroup_1 = __importDefault(require("../ButtonGroup"));
const Input_1 = __importDefault(require("../Input"));
const Loader_1 = __importDefault(require("../Loader"));
const SingleSelect_1 = __importDefault(require("../SingleSelect"));
const Translator_1 = require("../../utils/Translator");
const pagination_scss_1 = __importDefault(require("./pagination.scss"));
const AVAILABLE_LIMITS = [10, 20, 50, 100];
let Pagination = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _instanceExtraInitializers = [];
    let _currentInputValue_decorators;
    let _currentInputValue_initializers = [];
    let _currentInputValue_extraInitializers = [];
    let _componentDidMount_decorators;
    let _componentDidUpdate_decorators;
    let _handleInputChange_decorators;
    let _handleInputChange_initializers = [];
    let _handleInputChange_extraInitializers = [];
    let _validateAndSubmitInputValue_decorators;
    let _validateAndSubmitInputValue_initializers = [];
    let _validateAndSubmitInputValue_extraInitializers = [];
    var Pagination = _classThis = class extends _classSuper {
        componentDidMount() {
            const { currentPage } = this.props;
            this.currentInputValue = currentPage;
            this.validateAndSubmitInputValue();
        }
        componentDidUpdate(prevProps) {
            const { currentPage, totalPages } = this.props;
            if (prevProps.currentPage !== currentPage) {
                this.currentInputValue = currentPage;
                this.validateAndSubmitInputValue();
            }
            if (prevProps.totalPages !== totalPages) {
                this.validateAndSubmitInputValue();
            }
        }
        render() {
            const { currentInputValue } = this;
            const { children, loading, totalPages, currentLimit } = this.props;
            return (<section>
                {children}
                <nav className={pagination_scss_1.default.pagination}>
                    <span className={pagination_scss_1.default.display}>{(0, Translator_1.translate)('sulu_admin.per_page')}:</span>
                    <span>
                        <SingleSelect_1.default onChange={this.handleLimitChange} skin="dark" value={currentLimit}>
                            {AVAILABLE_LIMITS.map((limit) => (<SingleSelect_1.default.Option key={limit} value={limit}>
                                    {limit}
                                </SingleSelect_1.default.Option>))}
                        </SingleSelect_1.default>
                    </span>

                    <div className={pagination_scss_1.default.loader}>
                        {loading && <Loader_1.default size={24}/>}
                    </div>
                    <span>
                        {(0, Translator_1.translate)('sulu_admin.page')}:
                    </span>
                    <span className={pagination_scss_1.default.inputContainer}>
                        <Input_1.default alignment="center" inputMode="numeric" onBlur={this.handleInputBlur} onChange={this.handleInputChange} onKeyPress={this.handleInputKeyPress} skin="dark" type="text" value={currentInputValue}/>
                    </span>
                    <span className={pagination_scss_1.default.display}>
                        {(0, Translator_1.translate)('sulu_admin.of')} {totalPages}
                    </span>
                    <ButtonGroup_1.default>
                        <Button_1.default disabled={!this.hasPreviousPage()} icon="su-angle-left" onClick={this.handlePreviousClick}/>
                        <Button_1.default disabled={!this.hasNextPage()} icon="su-angle-right" onClick={this.handleNextClick}/>
                    </ButtonGroup_1.default>
                </nav>
            </section>);
        }
        constructor() {
            super(...arguments);
            this.currentInputValue = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _currentInputValue_initializers, 1));
            this.hasNextPage = (__runInitializers(this, _currentInputValue_extraInitializers), () => {
                const { currentPage, totalPages } = this.props;
                if (!currentPage || !totalPages) {
                    return false;
                }
                return currentPage < totalPages;
            });
            this.hasPreviousPage = () => {
                const { currentPage } = this.props;
                if (!currentPage) {
                    return false;
                }
                return currentPage > 1;
            };
            this.handlePreviousClick = () => {
                const { currentPage, onPageChange } = this.props;
                if (!this.hasPreviousPage() || !currentPage) {
                    return;
                }
                onPageChange(currentPage - 1);
            };
            this.handleNextClick = () => {
                const { currentPage, onPageChange } = this.props;
                if (!this.hasNextPage() || !currentPage) {
                    return;
                }
                onPageChange(currentPage + 1);
            };
            this.handleLimitChange = (value) => {
                const { currentLimit, onLimitChange } = this.props;
                const selected = parseInt(value);
                if (selected !== currentLimit) {
                    onLimitChange(selected);
                }
            };
            this.handleInputChange = __runInitializers(this, _handleInputChange_initializers, (value) => {
                if (value === undefined) {
                    this.currentInputValue = undefined;
                    return;
                }
                const page = parseInt(value);
                if (!isNaN(page)) {
                    this.currentInputValue = page;
                }
            });
            this.handleInputBlur = (__runInitializers(this, _handleInputChange_extraInitializers), () => {
                this.validateAndSubmitInputValue();
            });
            this.handleInputKeyPress = (key) => {
                if (key === 'Enter') {
                    this.validateAndSubmitInputValue();
                }
            };
            this.validateAndSubmitInputValue = __runInitializers(this, _validateAndSubmitInputValue_initializers, () => {
                const { currentPage, onPageChange, totalPages } = this.props;
                let page = this.currentInputValue;
                if (!page || !totalPages || page < 1) {
                    page = 1;
                }
                else if (page > totalPages) {
                    page = totalPages;
                }
                if (page !== currentPage) {
                    onPageChange(page);
                }
                this.currentInputValue = currentPage;
            });
            __runInitializers(this, _validateAndSubmitInputValue_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "Pagination");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _currentInputValue_decorators = [mobx_1.observable];
        _componentDidMount_decorators = [mobx_1.action];
        _componentDidUpdate_decorators = [mobx_1.action];
        _handleInputChange_decorators = [mobx_1.action];
        _validateAndSubmitInputValue_decorators = [mobx_1.action];
        __esDecorate(_classThis, null, _componentDidMount_decorators, { kind: "method", name: "componentDidMount", static: false, private: false, access: { has: obj => "componentDidMount" in obj, get: obj => obj.componentDidMount }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _componentDidUpdate_decorators, { kind: "method", name: "componentDidUpdate", static: false, private: false, access: { has: obj => "componentDidUpdate" in obj, get: obj => obj.componentDidUpdate }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _currentInputValue_decorators, { kind: "field", name: "currentInputValue", static: false, private: false, access: { has: obj => "currentInputValue" in obj, get: obj => obj.currentInputValue, set: (obj, value) => { obj.currentInputValue = value; } }, metadata: _metadata }, _currentInputValue_initializers, _currentInputValue_extraInitializers);
        __esDecorate(null, null, _handleInputChange_decorators, { kind: "field", name: "handleInputChange", static: false, private: false, access: { has: obj => "handleInputChange" in obj, get: obj => obj.handleInputChange, set: (obj, value) => { obj.handleInputChange = value; } }, metadata: _metadata }, _handleInputChange_initializers, _handleInputChange_extraInitializers);
        __esDecorate(null, null, _validateAndSubmitInputValue_decorators, { kind: "field", name: "validateAndSubmitInputValue", static: false, private: false, access: { has: obj => "validateAndSubmitInputValue" in obj, get: obj => obj.validateAndSubmitInputValue, set: (obj, value) => { obj.validateAndSubmitInputValue = value; } }, metadata: _metadata }, _validateAndSubmitInputValue_initializers, _validateAndSubmitInputValue_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Pagination = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    _classThis.defaultProps = {
        loading: false,
    };
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Pagination = _classThis;
})();
exports.default = Pagination;
