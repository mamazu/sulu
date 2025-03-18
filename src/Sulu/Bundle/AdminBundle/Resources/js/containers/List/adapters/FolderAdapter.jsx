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
const mobx_react_1 = require("mobx-react");
const react_1 = __importDefault(require("react"));
const FolderList_1 = __importDefault(require("../../../components/FolderList"));
const Pagination_1 = __importDefault(require("../../../components/Pagination"));
const Translator_1 = require("../../../utils/Translator");
const FlatStructureStrategy_1 = __importDefault(require("../structureStrategies/FlatStructureStrategy"));
const DefaultLoadingStrategy_1 = __importDefault(require("../loadingStrategies/DefaultLoadingStrategy"));
const AbstractAdapter_1 = __importDefault(require("./AbstractAdapter"));
let FolderAdapter = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = AbstractAdapter_1.default;
    var FolderAdapter = _classThis = class extends _classSuper {
        static getInfoText(item) {
            const label = (item.objectCount === 1)
                ? (0, Translator_1.translate)('sulu_admin.object')
                : (0, Translator_1.translate)('sulu_admin.objects');
            return `${item.objectCount} ${label}`;
        }
        render() {
            const { data, limit, loading, onItemClick, onLimitChange, onPageChange, page, paginated, pageCount, } = this.props;
            const folderList = (<FolderList_1.default onFolderClick={onItemClick}>
                {data.map((item) => (
                // TODO: Don't access properties like "title" directly.
                <FolderList_1.default.Folder hasPermissions={item._hasPermissions} id={item.id} info={FolderAdapter.getInfoText(item)} key={item.id} title={item.title}/>))}
            </FolderList_1.default>);
            if (!paginated || (page === 1 && data.length === 0)) {
                return folderList;
            }
            if (pageCount === undefined) {
                return folderList;
            }
            return (<Pagination_1.default currentLimit={limit} currentPage={page} loading={loading} onLimitChange={onLimitChange} onPageChange={onPageChange} totalPages={pageCount}>
                {folderList}
            </Pagination_1.default>);
        }
    };
    __setFunctionName(_classThis, "FolderAdapter");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        FolderAdapter = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    _classThis.LoadingStrategy = DefaultLoadingStrategy_1.default;
    _classThis.StructureStrategy = FlatStructureStrategy_1.default;
    _classThis.icon = 'su-folder';
    _classThis.defaultProps = {
        data: [],
    };
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return FolderAdapter = _classThis;
})();
exports.default = FolderAdapter;
