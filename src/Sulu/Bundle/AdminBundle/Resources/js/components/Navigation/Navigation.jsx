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
const mobx_react_1 = require("mobx-react");
const mobx_1 = require("mobx");
const classnames_1 = __importDefault(require("classnames"));
const Icon_1 = __importDefault(require("../Icon"));
const Item_1 = __importDefault(require("./Item"));
const navigation_scss_1 = __importDefault(require("./navigation.scss"));
const UserSection_1 = __importDefault(require("./UserSection"));
let Navigation = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _instanceExtraInitializers = [];
    let _expandedChild_decorators;
    let _expandedChild_initializers = [];
    let _expandedChild_extraInitializers = [];
    let _setExpandedChild_decorators;
    var Navigation = _classThis = class extends _classSuper {
        setExpandedChild(value) {
            this.expandedChild = value;
        }
        constructor(props) {
            super(props);
            this.expandedChild = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _expandedChild_initializers, null));
            this.findDefaultExpandedChild = (__runInitializers(this, _expandedChild_extraInitializers), (children) => {
                let newExpandedChild = null;
                react_1.default.Children.forEach(children, (child) => {
                    if (child.props.children) {
                        react_1.default.Children.forEach(child.props.children, (subChild) => {
                            if (subChild.props.active) {
                                newExpandedChild = child.props.value;
                            }
                        });
                    }
                });
                this.setExpandedChild(newExpandedChild);
            });
            this.handleItemClick = (value) => {
                if (this.expandedChild === value) {
                    this.setExpandedChild(null);
                    return;
                }
                this.setExpandedChild(value);
                this.props.onItemClick(value);
            };
            this.handlePinToggle = () => {
                const { onPinToggle } = this.props;
                if (onPinToggle) {
                    onPinToggle();
                }
            };
            this.findDefaultExpandedChild(this.props.children);
        }
        componentDidUpdate(prevProps) {
            if (prevProps.children !== this.props.children) {
                this.findDefaultExpandedChild(this.props.children);
            }
        }
        cloneChildren() {
            return react_1.default.Children.map(this.props.children, (child) => {
                return react_1.default.cloneElement(child, {
                    children: child.props.children ? react_1.default.Children.map(child.props.children, (subChild) => {
                        if (!subChild) {
                            return;
                        }
                        return react_1.default.cloneElement(subChild, {
                            onClick: this.handleItemClick,
                        });
                    }) : undefined,
                    expanded: child.props.value === this.expandedChild
                        || (child.props.children
                            && child.props.children.some((child) => child.props.value === this.expandedChild)),
                    onClick: this.handleItemClick,
                });
            });
        }
        render() {
            const { pinned, username, userImage, onLogoutClick, onProfileClick, suluVersion, onPinToggle, } = this.props;
            const pinClass = (0, classnames_1.default)(navigation_scss_1.default.pin, { [navigation_scss_1.default.active]: pinned });
            return (<div className={navigation_scss_1.default.navigation}>
                <div className={navigation_scss_1.default.header}>
                    <span className={navigation_scss_1.default.logo} title={suluVersion}>
                        <Icon_1.default name="su-sulu-logo"/>
                    </span>

                    {onPinToggle &&
                    <button className={pinClass} onClick={this.handlePinToggle} type="button">
                            <Icon_1.default className={navigation_scss_1.default.pinIcon} name="su-stick-right"/>
                        </button>}
                </div>

                <div className={navigation_scss_1.default.items}>
                    {this.cloneChildren()}
                </div>

                <div className={navigation_scss_1.default.footer}>
                    <UserSection_1.default onLogoutClick={onLogoutClick} onProfileClick={onProfileClick} userImage={userImage} username={username}/>
                </div>
            </div>);
        }
    };
    __setFunctionName(_classThis, "Navigation");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _expandedChild_decorators = [mobx_1.observable];
        _setExpandedChild_decorators = [mobx_1.action];
        __esDecorate(_classThis, null, _setExpandedChild_decorators, { kind: "method", name: "setExpandedChild", static: false, private: false, access: { has: obj => "setExpandedChild" in obj, get: obj => obj.setExpandedChild }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _expandedChild_decorators, { kind: "field", name: "expandedChild", static: false, private: false, access: { has: obj => "expandedChild" in obj, get: obj => obj.expandedChild, set: (obj, value) => { obj.expandedChild = value; } }, metadata: _metadata }, _expandedChild_initializers, _expandedChild_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Navigation = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    _classThis.defaultProps = {
        appVersion: undefined,
        pinned: false,
        userImage: undefined,
    };
    _classThis.Item = Item_1.default;
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Navigation = _classThis;
})();
exports.default = Navigation;
