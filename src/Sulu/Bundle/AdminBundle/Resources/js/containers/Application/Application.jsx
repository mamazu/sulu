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
const mobx_react_1 = require("mobx-react");
const mobx_1 = require("mobx");
const classnames_1 = __importDefault(require("classnames"));
const react_1 = __importStar(require("react"));
const loglevel_1 = __importDefault(require("loglevel"));
const Navigation_1 = __importDefault(require("../Navigation"));
const Backdrop_1 = __importDefault(require("../../components/Backdrop"));
const Loader_1 = __importDefault(require("../../components/Loader"));
const initializer_1 = __importDefault(require("../../services/initializer"));
const userStore_1 = __importDefault(require("../../stores/userStore"));
const Login_1 = __importDefault(require("../Login"));
const ProfileFormOverlay_1 = __importDefault(require("../ProfileFormOverlay"));
const Sidebar_1 = __importStar(require("../Sidebar"));
const Toolbar_1 = __importDefault(require("../Toolbar"));
const ViewRenderer_1 = __importDefault(require("../ViewRenderer"));
require("./global.scss");
const SnackbarContainer_1 = __importDefault(require("../../components/SnackbarContainer"));
const snackbarStore_1 = __importDefault(require("../../stores/snackbarStore"));
const Snackbar_1 = __importDefault(require("../../components/Snackbar"));
const application_scss_1 = __importDefault(require("./application.scss"));
const NAVIGATION_PINNED_SETTING_KEY = 'sulu_admin.application.navigation_pinned';
let Application = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _instanceExtraInitializers = [];
    let _openedProfileFormOverlay_decorators;
    let _openedProfileFormOverlay_initializers = [];
    let _openedProfileFormOverlay_extraInitializers = [];
    let _openProfileFormOverlay_decorators;
    let _closeProfileFormOverlay_decorators;
    let _navigationState_decorators;
    let _navigationState_initializers = [];
    let _navigationState_extraInitializers = [];
    let _get_navigationPinned_decorators;
    let _get_navigationVisible_decorators;
    let _setNavigationState_decorators;
    var Application = _classThis = class extends _classSuper {
        openProfileFormOverlay() {
            this.openedProfileFormOverlay = true;
        }
        closeProfileFormOverlay() {
            this.openedProfileFormOverlay = false;
        }
        get navigationPinned() {
            return this.navigationState === 'pinned';
        }
        get navigationVisible() {
            return this.navigationPinned || this.navigationState === 'visible';
        }
        setNavigationState(state) {
            this.navigationState = state;
        }
        set navigationPinned(value) {
            this.setNavigationState(value ? 'pinned' : 'hidden');
        }
        set navigationVisible(value) {
            if (this.navigationPinned) {
                loglevel_1.default.warn('Changing the visibility of the navigation is not allowed while navigation is pinned!');
                return;
            }
            this.setNavigationState(value ? 'visible' : 'hidden');
        }
        constructor(props) {
            super(props);
            this.openedProfileFormOverlay = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _openedProfileFormOverlay_initializers, false));
            this.navigationState = (__runInitializers(this, _openedProfileFormOverlay_extraInitializers), __runInitializers(this, _navigationState_initializers, void 0));
            this.navigationPinnedDisposer = __runInitializers(this, _navigationState_extraInitializers);
            this.handleNavigationButtonClick = () => {
                this.toggleNavigation();
            };
            this.handlePinToggle = () => {
                this.toggleNavigationPinned();
            };
            this.handleNavigate = () => {
                if (!this.navigationPinned) {
                    this.toggleNavigation();
                }
            };
            this.handleLoginSuccess = () => {
                this.props.router.reload();
            };
            this.handleLogout = () => {
                userStore_1.default.logout().then(() => {
                    if (this.navigationVisible && !this.navigationPinned) {
                        this.toggleNavigation();
                    }
                });
            };
            this.handleProfileOverlayClose = () => {
                this.closeProfileFormOverlay();
            };
            this.handleProfileEditClick = () => {
                this.openProfileFormOverlay();
            };
            this.navigationPinnedDisposer = (0, mobx_1.autorun)(() => this.navigationPinned = userStore_1.default.getPersistentSetting(NAVIGATION_PINNED_SETTING_KEY));
        }
        componentWillUnmount() {
            this.navigationPinnedDisposer();
        }
        toggleNavigation() {
            this.navigationVisible = !this.navigationVisible;
        }
        toggleNavigationPinned() {
            this.navigationPinned = !this.navigationPinned;
            userStore_1.default.setPersistentSetting(NAVIGATION_PINNED_SETTING_KEY, this.navigationPinned);
        }
        render() {
            const { appVersion, router, suluVersion } = this.props;
            const { loggedIn } = userStore_1.default;
            const rootClass = (0, classnames_1.default)(application_scss_1.default.root, {
                [application_scss_1.default.visible]: loggedIn,
                [application_scss_1.default.navigationVisible]: this.navigationVisible,
                [application_scss_1.default.navigationPinned]: this.navigationPinned,
            });
            const sidebarClass = (0, classnames_1.default)(application_scss_1.default.sidebar, {
                [application_scss_1.default[Sidebar_1.sidebarStore.size]]: Sidebar_1.sidebarStore.size,
            });
            const snackbarClass = (0, classnames_1.default)(application_scss_1.default.snackbar, {
                [application_scss_1.default.isNavigationVisible]: this.navigationVisible,
                [application_scss_1.default.isNavigationPinned]: this.navigationPinned,
                [application_scss_1.default[Sidebar_1.sidebarStore.size]]: Sidebar_1.sidebarStore.size,
            });
            const contentClass = (0, classnames_1.default)(application_scss_1.default.content, {
                [application_scss_1.default.withSidebar]: Sidebar_1.sidebarStore.view,
                [application_scss_1.default.withPinnedNavigation]: this.navigationPinned,
            });
            return (<react_1.Fragment>
                {!loggedIn &&
                    <Login_1.default backLink="/" // TODO: Get the correct link here from the backend
                     initialized={!initializer_1.default.loading && !!initializer_1.default.initializedTranslationsLocale} onLoginSuccess={this.handleLoginSuccess} router={router}/>}
                {initializer_1.default.initialized && initializer_1.default.initializedTranslationsLocale
                    ? <react_1.Fragment>
                        <div className={rootClass}>
                            <nav className={application_scss_1.default.navigation}>
                                <Navigation_1.default appVersion={appVersion} onLogout={this.handleLogout} onNavigate={this.handleNavigate} onPinToggle={this.handlePinToggle} onProfileClick={this.handleProfileEditClick} pinned={this.navigationPinned} router={router} suluVersion={suluVersion}/>
                            </nav>
                            <div className={contentClass}>
                                <main className={application_scss_1.default.main}>
                                    <div className={application_scss_1.default.viewContainer}>
                                        {router.route &&
                            <ViewRenderer_1.default router={router}/>}
                                    </div>
                                    <header>
                                        <Toolbar_1.default navigationOpen={this.navigationVisible} onNavigationButtonClick={this.navigationPinned
                            ? undefined
                            : this.handleNavigationButtonClick}/>
                                    </header>
                                </main>
                                <Sidebar_1.default className={sidebarClass}/>
                                {this.navigationVisible && !this.navigationPinned &&
                            <Backdrop_1.default fixed={false} onClick={this.handleNavigationButtonClick} visible={false}/>}
                            </div>
                        </div>
                        <ProfileFormOverlay_1.default onClose={this.handleProfileOverlayClose} open={this.openedProfileFormOverlay}/>
                        {snackbarStore_1.default.messages.length
                            ? <SnackbarContainer_1.default className={snackbarClass}>
                                    {snackbarStore_1.default.messages.map((message, index) => {
                                    return (<Snackbar_1.default icon={message.icon} key={index} message={message.text} skin="floating" type={message.type}/>);
                                })}
                                </SnackbarContainer_1.default>
                            : null}
                    </react_1.Fragment>
                    : <div className={application_scss_1.default.loader}>
                        <Loader_1.default />
                    </div>}
            </react_1.Fragment>);
        }
    };
    __setFunctionName(_classThis, "Application");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _openedProfileFormOverlay_decorators = [mobx_1.observable];
        _openProfileFormOverlay_decorators = [mobx_1.action];
        _closeProfileFormOverlay_decorators = [mobx_1.action];
        _navigationState_decorators = [mobx_1.observable];
        _get_navigationPinned_decorators = [mobx_1.computed];
        _get_navigationVisible_decorators = [mobx_1.computed];
        _setNavigationState_decorators = [mobx_1.action];
        __esDecorate(_classThis, null, _openProfileFormOverlay_decorators, { kind: "method", name: "openProfileFormOverlay", static: false, private: false, access: { has: obj => "openProfileFormOverlay" in obj, get: obj => obj.openProfileFormOverlay }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _closeProfileFormOverlay_decorators, { kind: "method", name: "closeProfileFormOverlay", static: false, private: false, access: { has: obj => "closeProfileFormOverlay" in obj, get: obj => obj.closeProfileFormOverlay }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_navigationPinned_decorators, { kind: "getter", name: "navigationPinned", static: false, private: false, access: { has: obj => "navigationPinned" in obj, get: obj => obj.navigationPinned }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_navigationVisible_decorators, { kind: "getter", name: "navigationVisible", static: false, private: false, access: { has: obj => "navigationVisible" in obj, get: obj => obj.navigationVisible }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _setNavigationState_decorators, { kind: "method", name: "setNavigationState", static: false, private: false, access: { has: obj => "setNavigationState" in obj, get: obj => obj.setNavigationState }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _openedProfileFormOverlay_decorators, { kind: "field", name: "openedProfileFormOverlay", static: false, private: false, access: { has: obj => "openedProfileFormOverlay" in obj, get: obj => obj.openedProfileFormOverlay, set: (obj, value) => { obj.openedProfileFormOverlay = value; } }, metadata: _metadata }, _openedProfileFormOverlay_initializers, _openedProfileFormOverlay_extraInitializers);
        __esDecorate(null, null, _navigationState_decorators, { kind: "field", name: "navigationState", static: false, private: false, access: { has: obj => "navigationState" in obj, get: obj => obj.navigationState, set: (obj, value) => { obj.navigationState = value; } }, metadata: _metadata }, _navigationState_initializers, _navigationState_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Application = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Application = _classThis;
})();
exports.default = Application;
