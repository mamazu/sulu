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
const mousetrap_1 = __importDefault(require("mousetrap"));
const react_portal_1 = require("react-portal");
const utils_1 = require("sulu-admin-bundle/utils");
const components_1 = require("sulu-admin-bundle/components");
const dropzoneOverlay_scss_1 = __importDefault(require("./dropzoneOverlay.scss"));
const CLOSE_OVERLAY_KEY = 'esc';
let DropzoneOverlay = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    var DropzoneOverlay = _classThis = class extends _classSuper {
        constructor(props) {
            super(props);
            this.handleClose = () => {
                this.props.onClose();
            };
            this.handleClick = (event) => {
                event.stopPropagation();
                this.props.onClick();
            };
            const { onClose, open } = this.props;
            if (open) {
                mousetrap_1.default.bind(CLOSE_OVERLAY_KEY, onClose);
            }
        }
        componentWillUnmount() {
            if (this.props.open) {
                mousetrap_1.default.unbind(CLOSE_OVERLAY_KEY);
            }
        }
        componentDidUpdate(prevProps) {
            const { onClose, open } = this.props;
            if (prevProps.open !== open) {
                if (this.props.open) {
                    mousetrap_1.default.bind(CLOSE_OVERLAY_KEY, onClose);
                }
                else {
                    mousetrap_1.default.unbind(CLOSE_OVERLAY_KEY);
                }
            }
        }
        render() {
            const { onDragLeave, open, children, } = this.props;
            if (!open) {
                return null;
            }
            return (<react_portal_1.Portal>
                <div className={dropzoneOverlay_scss_1.default.dropzoneOverlay} onClick={this.handleClose} onDragLeave={onDragLeave} role="button">
                    <div className={dropzoneOverlay_scss_1.default.dropArea} onClick={this.handleClick} role="button" tabIndex="0">
                        <div className={dropzoneOverlay_scss_1.default.uploadInfoContainer}>
                            {children &&
                    <div className={dropzoneOverlay_scss_1.default.uploadInfo}>
                                    <components_1.Icon className={dropzoneOverlay_scss_1.default.uploadIcon} name="su-upload"/>
                                    <div className={dropzoneOverlay_scss_1.default.uploadInfoHeadline}>
                                        {(0, utils_1.translate)('sulu_media.drop_files_to_upload')}
                                    </div>
                                    <div className={dropzoneOverlay_scss_1.default.uploadInfoSubline}>
                                        {(0, utils_1.translate)('sulu_media.click_here_to_upload')}
                                    </div>
                                </div>}
                        </div>
                        <ul className={dropzoneOverlay_scss_1.default.mediaItems}>
                            {children && react_1.default.Children.map(children, (mediaItem, index) => (<li key={index}>{mediaItem}</li>))}
                        </ul>
                    </div>
                    <components_1.Icon className={dropzoneOverlay_scss_1.default.closeIcon} name="su-times" onClick={this.handleClose}/>
                </div>
            </react_portal_1.Portal>);
        }
    };
    __setFunctionName(_classThis, "DropzoneOverlay");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DropzoneOverlay = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    _classThis.defaultProps = {
        open: false,
    };
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DropzoneOverlay = _classThis;
})();
exports.default = DropzoneOverlay;
