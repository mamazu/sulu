"use strict";
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
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
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
const Button_1 = __importDefault(require("../Button"));
const utils_1 = require("../../utils");
const userSection_scss_1 = __importDefault(require("./userSection.scss"));
let UserSection = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _open_decorators;
    let _open_initializers = [];
    let _open_extraInitializers = [];
    let _handleButtonClick_decorators;
    let _handleButtonClick_initializers = [];
    let _handleButtonClick_extraInitializers = [];
    let _close_decorators;
    let _close_initializers = [];
    let _close_extraInitializers = [];
    var UserSection = _classThis = class extends _classSuper {
        constructor() {
            super(...arguments);
            this.open = __runInitializers(this, _open_initializers, false);
            this.handleButtonClick = (__runInitializers(this, _open_extraInitializers), __runInitializers(this, _handleButtonClick_initializers, () => {
                this.open = !this.open;
            }));
            this.close = (__runInitializers(this, _handleButtonClick_extraInitializers), __runInitializers(this, _close_initializers, () => {
                this.open = false;
            }));
            this.handleProfileClick = (__runInitializers(this, _close_extraInitializers), () => {
                const { onProfileClick } = this.props;
                this.close();
                onProfileClick();
            });
            this.handleLogoutClick = () => {
                const { onLogoutClick } = this.props;
                this.close();
                onLogoutClick();
            };
        }
        render() {
            const { username, userImage } = this.props;
            const menuClass = (0, classnames_1.default)(userSection_scss_1.default.menu, this.open && userSection_scss_1.default.open);
            const buttonClass = (0, classnames_1.default)(userSection_scss_1.default.button, this.open && userSection_scss_1.default.active);
            return (<div className={userSection_scss_1.default.userSection}>
                <button className={buttonClass} onClick={this.handleButtonClick} type="button">
                    <div className={userSection_scss_1.default.userImage}>
                        {userImage && (<img alt={username} className={userSection_scss_1.default.image} src={userImage} title={username}/>)}

                        {!userImage && <Icon_1.default className={userSection_scss_1.default.placeholder} name="su-user"/>}
                    </div>

                    <span className={userSection_scss_1.default.username}>
                        {username}
                    </span>

                    <Icon_1.default name={this.open ? 'su-angle-down' : 'su-angle-up'}/>
                </button>

                <div className={menuClass} hidden={!this.open}>
                    <Button_1.default className={userSection_scss_1.default.menuButton} icon="su-user" onClick={this.handleProfileClick} size="large" skin="text">
                        {(0, utils_1.translate)('sulu_admin.edit_profile')}
                    </Button_1.default>

                    <Button_1.default className={userSection_scss_1.default.menuButton} icon="su-sign-out-alt" onClick={this.handleLogoutClick} size="large" skin="text">
                        {(0, utils_1.translate)('sulu_admin.logout')}
                    </Button_1.default>
                </div>
            </div>);
        }
    };
    __setFunctionName(_classThis, "UserSection");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _open_decorators = [mobx_1.observable];
        _handleButtonClick_decorators = [mobx_1.action];
        _close_decorators = [mobx_1.action];
        __esDecorate(null, null, _open_decorators, { kind: "field", name: "open", static: false, private: false, access: { has: obj => "open" in obj, get: obj => obj.open, set: (obj, value) => { obj.open = value; } }, metadata: _metadata }, _open_initializers, _open_extraInitializers);
        __esDecorate(null, null, _handleButtonClick_decorators, { kind: "field", name: "handleButtonClick", static: false, private: false, access: { has: obj => "handleButtonClick" in obj, get: obj => obj.handleButtonClick, set: (obj, value) => { obj.handleButtonClick = value; } }, metadata: _metadata }, _handleButtonClick_initializers, _handleButtonClick_extraInitializers);
        __esDecorate(null, null, _close_decorators, { kind: "field", name: "close", static: false, private: false, access: { has: obj => "close" in obj, get: obj => obj.close, set: (obj, value) => { obj.close = value; } }, metadata: _metadata }, _close_initializers, _close_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        UserSection = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return UserSection = _classThis;
})();
exports.default = UserSection;
