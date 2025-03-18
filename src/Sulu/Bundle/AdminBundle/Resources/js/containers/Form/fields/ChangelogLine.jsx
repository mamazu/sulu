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
const react_1 = __importStar(require("react"));
const mobx_1 = require("mobx");
const mobx_react_1 = require("mobx-react");
const Loader_1 = __importDefault(require("../../../components/Loader"));
const ResourceRequester_1 = __importDefault(require("../../../services/ResourceRequester"));
const Translator_1 = require("../../../utils/Translator");
let ChangelogLine = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _instanceExtraInitializers = [];
    let _changer_decorators;
    let _changer_initializers = [];
    let _changer_extraInitializers = [];
    let _creator_decorators;
    let _creator_initializers = [];
    let _creator_extraInitializers = [];
    let _changerLoaded_decorators;
    let _changerLoaded_initializers = [];
    let _changerLoaded_extraInitializers = [];
    let _creatorLoaded_decorators;
    let _creatorLoaded_initializers = [];
    let _creatorLoaded_extraInitializers = [];
    let _setChanger_decorators;
    let _setCreator_decorators;
    let _get_changerId_decorators;
    let _get_creatorId_decorators;
    let _get_changerFullName_decorators;
    let _get_changed_decorators;
    let _get_creatorFullName_decorators;
    let _get_created_decorators;
    var ChangelogLine = _classThis = class extends _classSuper {
        constructor() {
            super(...arguments);
            this.changer = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _changer_initializers, void 0));
            this.creator = (__runInitializers(this, _changer_extraInitializers), __runInitializers(this, _creator_initializers, void 0));
            this.changerLoaded = (__runInitializers(this, _creator_extraInitializers), __runInitializers(this, _changerLoaded_initializers, false));
            this.creatorLoaded = (__runInitializers(this, _changerLoaded_extraInitializers), __runInitializers(this, _creatorLoaded_initializers, false));
            this.changerDisposer = __runInitializers(this, _creatorLoaded_extraInitializers);
            this.loadChanger = () => {
                if (typeof this.changerId !== 'number') {
                    this.setChanger(undefined);
                    return;
                }
                ResourceRequester_1.default.get('users', { id: this.changerId })
                    .then((0, mobx_1.action)((changer) => {
                    this.setChanger(changer);
                }))
                    .catch((0, mobx_1.action)((error) => {
                    if (error.status !== 404) {
                        return Promise.reject(error);
                    }
                    this.setChanger(undefined);
                }));
            };
            this.loadCreator = () => {
                if (typeof this.creatorId !== 'number') {
                    this.setCreator(undefined);
                    return;
                }
                ResourceRequester_1.default.get('users', { id: this.creatorId })
                    .then((0, mobx_1.action)((creator) => {
                    this.setCreator(creator);
                }))
                    .catch((0, mobx_1.action)((error) => {
                    if (error.status !== 404) {
                        return Promise.reject(error);
                    }
                    this.setCreator(undefined);
                }));
            };
        }
        componentDidMount() {
            this.changerDisposer = (0, mobx_1.autorun)(this.loadChanger);
            this.creatorDisposer = (0, mobx_1.autorun)(this.loadCreator);
        }
        componentWillUnmount() {
            this.changerDisposer();
            this.creatorDisposer();
        }
        setChanger(changer) {
            this.changer = changer;
            this.changerLoaded = true;
        }
        setCreator(creator) {
            this.creator = creator;
            this.creatorLoaded = true;
        }
        get changerId() {
            return this.props.formInspector.getValueByPath('/changer');
        }
        get creatorId() {
            return this.props.formInspector.getValueByPath('/creator');
        }
        get changerFullName() {
            return this.changer ? this.changer.fullName : undefined;
        }
        get changed() {
            const { formInspector } = this.props;
            const changed = formInspector.getValueByPath('/changed');
            if (typeof changed !== 'string') {
                return undefined;
            }
            return (new Date(changed)).toLocaleString();
        }
        get creatorFullName() {
            return this.creator ? this.creator.fullName : undefined;
        }
        get created() {
            const { formInspector } = this.props;
            const created = formInspector.getValueByPath('/created');
            if (typeof created !== 'string') {
                return undefined;
            }
            return (new Date(created)).toLocaleString();
        }
        render() {
            if (!this.changerLoaded || !this.creatorLoaded) {
                return (<Loader_1.default />);
            }
            return (<react_1.Fragment>
                <p>
                    {(0, Translator_1.translate)('sulu_admin.changelog_line_changer', { changer: String(this.changerFullName), changed: this.changed })}
                </p>
                <p>
                    {(0, Translator_1.translate)('sulu_admin.changelog_line_creator', { creator: String(this.creatorFullName), created: this.created })}
                </p>
            </react_1.Fragment>);
        }
    };
    __setFunctionName(_classThis, "ChangelogLine");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _changer_decorators = [mobx_1.observable];
        _creator_decorators = [mobx_1.observable];
        _changerLoaded_decorators = [mobx_1.observable];
        _creatorLoaded_decorators = [mobx_1.observable];
        _setChanger_decorators = [mobx_1.action];
        _setCreator_decorators = [mobx_1.action];
        _get_changerId_decorators = [mobx_1.computed];
        _get_creatorId_decorators = [mobx_1.computed];
        _get_changerFullName_decorators = [mobx_1.computed];
        _get_changed_decorators = [mobx_1.computed];
        _get_creatorFullName_decorators = [mobx_1.computed];
        _get_created_decorators = [mobx_1.computed];
        __esDecorate(_classThis, null, _setChanger_decorators, { kind: "method", name: "setChanger", static: false, private: false, access: { has: obj => "setChanger" in obj, get: obj => obj.setChanger }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _setCreator_decorators, { kind: "method", name: "setCreator", static: false, private: false, access: { has: obj => "setCreator" in obj, get: obj => obj.setCreator }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_changerId_decorators, { kind: "getter", name: "changerId", static: false, private: false, access: { has: obj => "changerId" in obj, get: obj => obj.changerId }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_creatorId_decorators, { kind: "getter", name: "creatorId", static: false, private: false, access: { has: obj => "creatorId" in obj, get: obj => obj.creatorId }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_changerFullName_decorators, { kind: "getter", name: "changerFullName", static: false, private: false, access: { has: obj => "changerFullName" in obj, get: obj => obj.changerFullName }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_changed_decorators, { kind: "getter", name: "changed", static: false, private: false, access: { has: obj => "changed" in obj, get: obj => obj.changed }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_creatorFullName_decorators, { kind: "getter", name: "creatorFullName", static: false, private: false, access: { has: obj => "creatorFullName" in obj, get: obj => obj.creatorFullName }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_created_decorators, { kind: "getter", name: "created", static: false, private: false, access: { has: obj => "created" in obj, get: obj => obj.created }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _changer_decorators, { kind: "field", name: "changer", static: false, private: false, access: { has: obj => "changer" in obj, get: obj => obj.changer, set: (obj, value) => { obj.changer = value; } }, metadata: _metadata }, _changer_initializers, _changer_extraInitializers);
        __esDecorate(null, null, _creator_decorators, { kind: "field", name: "creator", static: false, private: false, access: { has: obj => "creator" in obj, get: obj => obj.creator, set: (obj, value) => { obj.creator = value; } }, metadata: _metadata }, _creator_initializers, _creator_extraInitializers);
        __esDecorate(null, null, _changerLoaded_decorators, { kind: "field", name: "changerLoaded", static: false, private: false, access: { has: obj => "changerLoaded" in obj, get: obj => obj.changerLoaded, set: (obj, value) => { obj.changerLoaded = value; } }, metadata: _metadata }, _changerLoaded_initializers, _changerLoaded_extraInitializers);
        __esDecorate(null, null, _creatorLoaded_decorators, { kind: "field", name: "creatorLoaded", static: false, private: false, access: { has: obj => "creatorLoaded" in obj, get: obj => obj.creatorLoaded, set: (obj, value) => { obj.creatorLoaded = value; } }, metadata: _metadata }, _creatorLoaded_initializers, _creatorLoaded_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ChangelogLine = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ChangelogLine = _classThis;
})();
exports.default = ChangelogLine;
