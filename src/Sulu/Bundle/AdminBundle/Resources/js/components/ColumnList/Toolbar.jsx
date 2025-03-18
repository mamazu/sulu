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
const mobx_1 = require("mobx");
const mobx_react_1 = require("mobx-react");
const ToolbarDropdown_1 = __importDefault(require("./ToolbarDropdown"));
const ToolbarButton_1 = __importDefault(require("./ToolbarButton"));
const toolbar_scss_1 = __importDefault(require("./toolbar.scss"));
let Toolbar = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _toolbar_decorators;
    let _toolbar_initializers = [];
    let _toolbar_extraInitializers = [];
    let _setToolbarRef_decorators;
    let _setToolbarRef_initializers = [];
    let _setToolbarRef_extraInitializers = [];
    var Toolbar = _classThis = class extends _classSuper {
        constructor() {
            super(...arguments);
            this.toolbar = __runInitializers(this, _toolbar_initializers, void 0);
            this.setToolbarRef = (__runInitializers(this, _toolbar_extraInitializers), __runInitializers(this, _setToolbarRef_initializers, (ref) => {
                const { toolbarRef } = this.props;
                if (toolbarRef) {
                    toolbarRef(ref);
                }
            }));
            this.renderToolbarItems = (__runInitializers(this, _setToolbarRef_extraInitializers), (toolbarItems) => {
                return toolbarItems.map((toolbarItemConfig, index) => {
                    switch (toolbarItemConfig.type) {
                        case 'dropdown':
                            return <ToolbarDropdown_1.default {...toolbarItemConfig} key={index}/>;
                        case 'button':
                            return <ToolbarButton_1.default {...toolbarItemConfig} key={index}/>;
                        default:
                            throw new Error('Unknown toolbar item type given: "' + toolbarItemConfig.type + '"');
                    }
                });
            });
        }
        render() {
            const { toolbarItems } = this.props;
            return (<div className={toolbar_scss_1.default.toolbar} ref={this.setToolbarRef}>
                {this.renderToolbarItems(toolbarItems)}
            </div>);
        }
    };
    __setFunctionName(_classThis, "Toolbar");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _toolbar_decorators = [mobx_1.observable];
        _setToolbarRef_decorators = [mobx_1.action];
        __esDecorate(null, null, _toolbar_decorators, { kind: "field", name: "toolbar", static: false, private: false, access: { has: obj => "toolbar" in obj, get: obj => obj.toolbar, set: (obj, value) => { obj.toolbar = value; } }, metadata: _metadata }, _toolbar_initializers, _toolbar_extraInitializers);
        __esDecorate(null, null, _setToolbarRef_decorators, { kind: "field", name: "setToolbarRef", static: false, private: false, access: { has: obj => "setToolbarRef" in obj, get: obj => obj.setToolbarRef, set: (obj, value) => { obj.setToolbarRef = value; } }, metadata: _metadata }, _setToolbarRef_initializers, _setToolbarRef_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Toolbar = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    _classThis.defaultProps = {
        toolbarItems: [],
    };
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Toolbar = _classThis;
})();
exports.default = Toolbar;
