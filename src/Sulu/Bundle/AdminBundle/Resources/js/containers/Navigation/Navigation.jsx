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
const Navigation_1 = __importDefault(require("../../components/Navigation"));
const userStore_1 = __importDefault(require("../../stores/userStore"));
const navigationRegistry_1 = __importDefault(require("./registries/navigationRegistry"));
const SULU_CHANGELOG_URL = 'https://github.com/sulu/sulu/releases';
let Navigation = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _instanceExtraInitializers = [];
    let _get_username_decorators;
    let _get_userImage_decorators;
    var Navigation = _classThis = class extends _classSuper {
        constructor() {
            super(...arguments);
            this.handleNavigationItemClick = (__runInitializers(this, _instanceExtraInitializers), (value) => {
                const navigationItem = navigationRegistry_1.default.get(value);
                const view = navigationItem.view;
                if (!view) {
                    return;
                }
                this.props.router.navigate(view);
                this.props.onNavigate(view);
            });
            this.handleProfileEditClick = () => {
                this.props.onProfileClick();
            };
            this.handlePinToggle = () => {
                this.props.onPinToggle();
            };
            this.isItemActive = (navigationItem) => {
                const { router } = this.props;
                if (!router.route) {
                    return false;
                }
                return (navigationItem.view && router.route.name === navigationItem.view) ||
                    (navigationItem.childViews && navigationItem.childViews.includes(router.route.name));
            };
        }
        get username() {
            if (!userStore_1.default.loggedIn || !userStore_1.default.contact) {
                return '';
            }
            return userStore_1.default.contact.fullName;
        }
        get userImage() {
            if (!userStore_1.default.loggedIn || !userStore_1.default.contact || !userStore_1.default.contact.avatar) {
                return undefined;
            }
            return userStore_1.default.contact.avatar.thumbnails['sulu-50x50'];
        }
        render() {
            const { appVersion, suluVersion } = this.props;
            const navigationItems = navigationRegistry_1.default.getAll();
            return (<Navigation_1.default appVersion={appVersion} onItemClick={this.handleNavigationItemClick} onLogoutClick={this.props.onLogout} onPinToggle={this.handlePinToggle} onProfileClick={this.handleProfileEditClick} pinned={this.props.pinned} suluVersion={suluVersion} suluVersionLink={SULU_CHANGELOG_URL} title="Sulu" // TODO: Get this dynamically from server
             userImage={this.userImage} username={this.username}>
                {navigationItems.filter((item) => item.visible).map((item) => (<Navigation_1.default.Item active={this.isItemActive(item)} icon={item.icon} key={item.id} title={item.label} value={item.id}>
                        {(0, mobx_1.isArrayLike)(item.items) &&
                        // $FlowFixMe: flow does not recognize that isArrayLike(value) means that value is an array
                        item.items.filter((subItem) => subItem.visible).map((subItem) => (<Navigation_1.default.Item active={this.isItemActive(subItem)} key={subItem.id} title={subItem.label} value={subItem.id}/>))}
                    </Navigation_1.default.Item>))}
            </Navigation_1.default>);
        }
    };
    __setFunctionName(_classThis, "Navigation");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _get_username_decorators = [mobx_1.computed];
        _get_userImage_decorators = [mobx_1.computed];
        __esDecorate(_classThis, null, _get_username_decorators, { kind: "getter", name: "username", static: false, private: false, access: { has: obj => "username" in obj, get: obj => obj.username }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_userImage_decorators, { kind: "getter", name: "userImage", static: false, private: false, access: { has: obj => "userImage" in obj, get: obj => obj.userImage }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Navigation = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Navigation = _classThis;
})();
exports.default = Navigation;
