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
const mobx_react_1 = require("mobx-react");
const mobx_1 = require("mobx");
const react_1 = __importDefault(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const Column_1 = __importDefault(require("./Column"));
const Item_1 = __importDefault(require("./Item"));
const Toolbar_1 = __importDefault(require("./Toolbar"));
const columnList_scss_1 = __importDefault(require("./columnList.scss"));
let ColumnList = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _instanceExtraInitializers = [];
    let _activeColumnIndex_decorators;
    let _activeColumnIndex_initializers = [];
    let _activeColumnIndex_extraInitializers = [];
    let _scrollPosition_decorators;
    let _scrollPosition_initializers = [];
    let _scrollPosition_extraInitializers = [];
    let _componentDidUpdate_decorators;
    let _handleScroll_decorators;
    let _handleScroll_initializers = [];
    let _handleScroll_extraInitializers = [];
    let _handleActive_decorators;
    let _handleActive_initializers = [];
    let _handleActive_extraInitializers = [];
    var ColumnList = _classThis = class extends _classSuper {
        constructor() {
            super(...arguments);
            this.activeColumnIndex = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _activeColumnIndex_initializers, 0));
            this.scrollPosition = (__runInitializers(this, _activeColumnIndex_extraInitializers), __runInitializers(this, _scrollPosition_initializers, 0));
            this.container = __runInitializers(this, _scrollPosition_extraInitializers);
            this.setContainerRef = (ref) => {
                if (!ref) {
                    return;
                }
                this.container = ref;
            };
            this.setToolbarRef = (ref) => {
                if (!ref) {
                    return;
                }
                this.toolbar = ref;
            };
            this.handleScroll = __runInitializers(this, _handleScroll_initializers, () => {
                this.scrollPosition = this.container.scrollLeft;
            });
            this.handleActive = (__runInitializers(this, _handleScroll_extraInitializers), __runInitializers(this, _handleActive_initializers, (index) => {
                if (index === undefined) {
                    return;
                }
                this.activeColumnIndex = index;
            }));
            this.cloneColumns = (__runInitializers(this, _handleActive_extraInitializers), (originalColumns) => {
                const { onItemClick, onItemDoubleClick } = this.props;
                const scrolling = this.containerScrolling;
                return react_1.default.Children.map(originalColumns, (column, index) => {
                    return react_1.default.cloneElement(column, {
                        index,
                        onActive: this.handleActive,
                        onItemClick,
                        onItemDoubleClick,
                        scrolling,
                    });
                });
            });
        }
        componentDidMount() {
            this.container.addEventListener('scroll', this.handleScroll);
        }
        componentWillUnmount() {
            this.container.removeEventListener('scroll', this.handleScroll);
        }
        componentDidUpdate(prevProps) {
            const { children } = this.props;
            if (this.activeColumnIndex >= react_1.default.Children.count(children)) {
                this.activeColumnIndex = 0;
            }
            if (this.container && this.props.children !== prevProps.children) {
                this.container.scrollLeft = this.columnWidth * (react_1.default.Children.count(children) - 1);
            }
        }
        get columnWidth() {
            const columnWidth = parseInt(columnList_scss_1.default.columnWidth);
            if (isNaN(columnWidth)) {
                return 0;
            }
            return columnWidth;
        }
        get containerWidth() {
            if (!this.container) {
                return 0;
            }
            return this.container.clientWidth;
        }
        get containerScrollWidth() {
            if (!this.container) {
                return 0;
            }
            return this.container.scrollWidth;
        }
        get containerScrolling() {
            return this.containerWidth < this.containerScrollWidth;
        }
        render() {
            const { children } = this.props;
            const toolbarPosition = -this.scrollPosition + this.activeColumnIndex * this.columnWidth;
            const columnListContainerClass = (0, classnames_1.default)(columnList_scss_1.default.columnListContainer, {
                [columnList_scss_1.default.firstVisibleColumnActive]: toolbarPosition <= 0,
                [columnList_scss_1.default.lastVisibleColumnActive]: toolbarPosition >= this.containerWidth - this.columnWidth,
            });
            const toolbarItems = this.props.toolbarItemsProvider(this.activeColumnIndex);
            return (<div className={columnList_scss_1.default.columnListToolbarContainer}>
                {!!toolbarItems &&
                    <div className={columnList_scss_1.default.toolbarContainer} style={{ marginLeft: toolbarPosition }}>
                        {!!toolbarItems.length &&
                            <Toolbar_1.default toolbarItems={toolbarItems} toolbarRef={this.setToolbarRef}/>}
                    </div>}
                <div className={columnListContainerClass} ref={this.setContainerRef}>
                    <div className={columnList_scss_1.default.columnList}>
                        {this.cloneColumns(children)}
                    </div>
                </div>
            </div>);
        }
    };
    __setFunctionName(_classThis, "ColumnList");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _activeColumnIndex_decorators = [mobx_1.observable];
        _scrollPosition_decorators = [mobx_1.observable];
        _componentDidUpdate_decorators = [mobx_1.action];
        _handleScroll_decorators = [mobx_1.action];
        _handleActive_decorators = [mobx_1.action];
        __esDecorate(_classThis, null, _componentDidUpdate_decorators, { kind: "method", name: "componentDidUpdate", static: false, private: false, access: { has: obj => "componentDidUpdate" in obj, get: obj => obj.componentDidUpdate }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _activeColumnIndex_decorators, { kind: "field", name: "activeColumnIndex", static: false, private: false, access: { has: obj => "activeColumnIndex" in obj, get: obj => obj.activeColumnIndex, set: (obj, value) => { obj.activeColumnIndex = value; } }, metadata: _metadata }, _activeColumnIndex_initializers, _activeColumnIndex_extraInitializers);
        __esDecorate(null, null, _scrollPosition_decorators, { kind: "field", name: "scrollPosition", static: false, private: false, access: { has: obj => "scrollPosition" in obj, get: obj => obj.scrollPosition, set: (obj, value) => { obj.scrollPosition = value; } }, metadata: _metadata }, _scrollPosition_initializers, _scrollPosition_extraInitializers);
        __esDecorate(null, null, _handleScroll_decorators, { kind: "field", name: "handleScroll", static: false, private: false, access: { has: obj => "handleScroll" in obj, get: obj => obj.handleScroll, set: (obj, value) => { obj.handleScroll = value; } }, metadata: _metadata }, _handleScroll_initializers, _handleScroll_extraInitializers);
        __esDecorate(null, null, _handleActive_decorators, { kind: "field", name: "handleActive", static: false, private: false, access: { has: obj => "handleActive" in obj, get: obj => obj.handleActive, set: (obj, value) => { obj.handleActive = value; } }, metadata: _metadata }, _handleActive_initializers, _handleActive_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ColumnList = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    _classThis.Column = Column_1.default;
    _classThis.Item = Item_1.default;
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ColumnList = _classThis;
})();
exports.default = ColumnList;
