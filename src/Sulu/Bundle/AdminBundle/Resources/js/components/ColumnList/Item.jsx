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
const classnames_1 = __importDefault(require("classnames"));
const Input_1 = __importDefault(require("../Input"));
const CroppedText_1 = __importDefault(require("../CroppedText"));
const Icon_1 = __importDefault(require("../Icon"));
const ItemButton_1 = __importDefault(require("./ItemButton"));
const item_scss_1 = __importDefault(require("./item.scss"));
let Item = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _instanceExtraInitializers = [];
    let _order_decorators;
    let _order_initializers = [];
    let _order_extraInitializers = [];
    let _componentDidUpdate_decorators;
    let _handleOrderChange_decorators;
    let _handleOrderChange_initializers = [];
    let _handleOrderChange_extraInitializers = [];
    var Item = _classThis = class extends _classSuper {
        constructor(props) {
            super(props);
            this.order = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _order_initializers, void 0));
            this.handleClick = (__runInitializers(this, _order_extraInitializers), () => {
                const { onClick, id } = this.props;
                if (onClick) {
                    onClick(id);
                }
            });
            this.handleDoubleClick = () => {
                const { onDoubleClick, id, showOrderField } = this.props;
                if (showOrderField) {
                    return;
                }
                if (onDoubleClick) {
                    onDoubleClick(id);
                }
            };
            this.handleOrderChange = __runInitializers(this, _handleOrderChange_initializers, (order) => {
                if (!order) {
                    this.order = undefined;
                }
                const numericOrder = parseInt(order);
                if (isNaN(numericOrder)) {
                    return;
                }
                this.order = numericOrder;
            });
            this.handleOrderBlur = (__runInitializers(this, _handleOrderChange_extraInitializers), () => {
                const { id, onOrderChange, order } = this.props;
                if (onOrderChange && this.order && order !== this.order) {
                    onOrderChange(id, this.order).then((0, mobx_1.action)((ordered) => {
                        if (!ordered) {
                            this.order = this.props.order;
                        }
                    }));
                }
            });
            this.handleOrderKeyPress = (key, event) => {
                if (key === 'Enter') {
                    event.currentTarget.blur();
                }
            };
            this.renderButtons = () => {
                const { buttons, id } = this.props;
                if (!buttons) {
                    return null;
                }
                return buttons.map((button, index) => {
                    const key = `button-${index}`;
                    return (<ItemButton_1.default {...button} id={id} key={key}/>);
                });
            };
            this.order = this.props.order;
        }
        componentDidUpdate(prevProps) {
            const { order } = this.props;
            if (prevProps.order !== order) {
                this.order = order;
            }
        }
        render() {
            const { active, children, disabled, hasChildren, indicators, showOrderField, selected } = this.props;
            const itemClass = (0, classnames_1.default)(item_scss_1.default.item, {
                [item_scss_1.default.active]: active,
                [item_scss_1.default.disabled]: disabled,
                [item_scss_1.default.selected]: selected,
                [item_scss_1.default.orderFieldShown]: showOrderField,
            });
            return (<div className={itemClass} onClick={this.handleClick} onDoubleClick={this.handleDoubleClick} role="button">
                {!showOrderField &&
                    <span className={item_scss_1.default.buttons}>
                        {this.renderButtons()}
                    </span>}
                {showOrderField &&
                    <div className={item_scss_1.default.orderInput}>
                        <Input_1.default alignment="center" onBlur={this.handleOrderBlur} onChange={this.handleOrderChange} onKeyPress={this.handleOrderKeyPress} value={this.order}/>
                    </div>}
                <span className={item_scss_1.default.text}>
                    <CroppedText_1.default>{children}</CroppedText_1.default>
                </span>
                {indicators && indicators.map((indicator, index) => (<span className={item_scss_1.default.indicator} key={index}>
                        {indicator}
                    </span>))}
                <span className={item_scss_1.default.children}>
                    {hasChildren &&
                    <Icon_1.default name="su-angle-right"/>}
                </span>
            </div>);
        }
    };
    __setFunctionName(_classThis, "Item");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _order_decorators = [mobx_1.observable];
        _componentDidUpdate_decorators = [mobx_1.action];
        _handleOrderChange_decorators = [mobx_1.action];
        __esDecorate(_classThis, null, _componentDidUpdate_decorators, { kind: "method", name: "componentDidUpdate", static: false, private: false, access: { has: obj => "componentDidUpdate" in obj, get: obj => obj.componentDidUpdate }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _order_decorators, { kind: "field", name: "order", static: false, private: false, access: { has: obj => "order" in obj, get: obj => obj.order, set: (obj, value) => { obj.order = value; } }, metadata: _metadata }, _order_initializers, _order_extraInitializers);
        __esDecorate(null, null, _handleOrderChange_decorators, { kind: "field", name: "handleOrderChange", static: false, private: false, access: { has: obj => "handleOrderChange" in obj, get: obj => obj.handleOrderChange, set: (obj, value) => { obj.handleOrderChange = value; } }, metadata: _metadata }, _handleOrderChange_initializers, _handleOrderChange_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Item = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    _classThis.defaultProps = {
        active: false,
        disabled: false,
        hasChildren: false,
        selected: false,
        showOrderField: false,
    };
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Item = _classThis;
})();
exports.default = Item;
