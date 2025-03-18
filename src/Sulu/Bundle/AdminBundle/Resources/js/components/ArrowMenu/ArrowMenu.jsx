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
const react_1 = __importStar(require("react"));
const mobx_1 = require("mobx");
const mobx_react_1 = require("mobx-react");
const classnames_1 = __importDefault(require("classnames"));
const Popover_1 = __importDefault(require("../Popover"));
const SingleItemSection_1 = __importDefault(require("./SingleItemSection"));
const Section_1 = __importDefault(require("./Section"));
const Item_1 = __importDefault(require("./Item"));
const Action_1 = __importDefault(require("./Action"));
const arrowMenu_scss_1 = __importDefault(require("./arrowMenu.scss"));
const VERTICAL_OFFSET = 20;
let ArrowMenu = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _displayValueRef_decorators;
    let _displayValueRef_initializers = [];
    let _displayValueRef_extraInitializers = [];
    let _setDisplayValueRef_decorators;
    let _setDisplayValueRef_initializers = [];
    let _setDisplayValueRef_extraInitializers = [];
    var ArrowMenu = _classThis = class extends _classSuper {
        constructor() {
            super(...arguments);
            this.displayValueRef = __runInitializers(this, _displayValueRef_initializers, void 0);
            this.setDisplayValueRef = (__runInitializers(this, _displayValueRef_extraInitializers), __runInitializers(this, _setDisplayValueRef_initializers, (ref) => {
                this.displayValueRef = ref;
            }));
            this.cloneAnchorElement = (__runInitializers(this, _setDisplayValueRef_extraInitializers), (anchorElement) => {
                return react_1.default.cloneElement(anchorElement, {
                    [this.props.refProp]: this.setDisplayValueRef,
                });
            });
        }
        cloneChildren(children) {
            return react_1.default.Children.map(children, (child) => {
                if (!child) {
                    return null;
                }
                if (child.type === Section_1.default) {
                    return react_1.default.cloneElement(child, {
                        children: this.cloneSection(child),
                    });
                }
                else {
                    return child;
                }
            });
        }
        cloneSection(section) {
            if (!section) {
                return null;
            }
            if (section.props.children) {
                return react_1.default.Children.map(section.props.children, (child) => {
                    if (!child) {
                        return null;
                    }
                    if (child.type === Action_1.default) {
                        return this.cloneAction(child);
                    }
                    return child;
                });
            }
            return section;
        }
        cloneAction(originalAction) {
            const { onClose } = this.props;
            return react_1.default.cloneElement(originalAction, {
                onAfterAction: onClose,
            });
        }
        render() {
            const { anchorElement, open, onClose, } = this.props;
            const clonedAnchorElement = this.cloneAnchorElement(anchorElement);
            return (<react_1.Fragment>
                {clonedAnchorElement}
                <Popover_1.default anchorElement={this.displayValueRef} onClose={onClose} open={open} verticalOffset={VERTICAL_OFFSET}>
                    {(setPopoverElementRef, popoverStyle, verticalPosition, horizontalPosition) => {
                    const arrowVerticalPosition = verticalPosition === 'top' ? 'bottom' : 'top';
                    return this.renderMenu(setPopoverElementRef, popoverStyle, arrowVerticalPosition, horizontalPosition);
                }}
                </Popover_1.default>
            </react_1.Fragment>);
        }
        renderMenu(setPopoverElementRef, popoverStyle, arrowVerticalPosition = 'top', arrowHorizontalPosition = 'left') {
            const { children, } = this.props;
            const clonedChildren = this.cloneChildren(children);
            const arrowClass = (0, classnames_1.default)(arrowMenu_scss_1.default.arrow, {
                [arrowMenu_scss_1.default.top]: arrowVerticalPosition === 'top',
                [arrowMenu_scss_1.default.bottom]: arrowVerticalPosition === 'bottom',
                [arrowMenu_scss_1.default.left]: arrowHorizontalPosition === 'left',
                [arrowMenu_scss_1.default.right]: arrowHorizontalPosition === 'right',
            });
            return (<div className={arrowMenu_scss_1.default.arrowMenuContainer} ref={setPopoverElementRef} style={popoverStyle}>
                <div className={arrowClass}/>
                <div className={arrowMenu_scss_1.default.arrowMenu}>
                    {clonedChildren}
                </div>
            </div>);
        }
    };
    __setFunctionName(_classThis, "ArrowMenu");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _displayValueRef_decorators = [mobx_1.observable];
        _setDisplayValueRef_decorators = [mobx_1.action];
        __esDecorate(null, null, _displayValueRef_decorators, { kind: "field", name: "displayValueRef", static: false, private: false, access: { has: obj => "displayValueRef" in obj, get: obj => obj.displayValueRef, set: (obj, value) => { obj.displayValueRef = value; } }, metadata: _metadata }, _displayValueRef_initializers, _displayValueRef_extraInitializers);
        __esDecorate(null, null, _setDisplayValueRef_decorators, { kind: "field", name: "setDisplayValueRef", static: false, private: false, access: { has: obj => "setDisplayValueRef" in obj, get: obj => obj.setDisplayValueRef, set: (obj, value) => { obj.setDisplayValueRef = value; } }, metadata: _metadata }, _setDisplayValueRef_initializers, _setDisplayValueRef_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ArrowMenu = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    _classThis.defaultProps = {
        refProp: 'ref',
    };
    _classThis.Section = Section_1.default;
    _classThis.SingleItemSection = SingleItemSection_1.default;
    _classThis.Item = Item_1.default;
    _classThis.Action = Action_1.default;
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ArrowMenu = _classThis;
})();
exports.default = ArrowMenu;
