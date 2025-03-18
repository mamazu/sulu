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
const copy_to_clipboard_1 = __importDefault(require("copy-to-clipboard"));
const components_1 = require("sulu-admin-bundle/components");
const containers_1 = require("sulu-admin-bundle/containers");
const utils_1 = require("sulu-admin-bundle/utils");
const formatStore_1 = __importDefault(require("../../stores/formatStore"));
const mediaFormats_scss_1 = __importDefault(require("./mediaFormats.scss"));
const COLLECTION_ROUTE = 'sulu_media.overview';
let MediaFormats = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _instanceExtraInitializers = [];
    let _copySuccessThumbnailKey_decorators;
    let _copySuccessThumbnailKey_initializers = [];
    let _copySuccessThumbnailKey_extraInitializers = [];
    let _formats_decorators;
    let _formats_initializers = [];
    let _formats_extraInitializers = [];
    let _get_thumbnails_decorators;
    let _handleCopyClick_decorators;
    let _handleCopyClick_initializers = [];
    let _handleCopyClick_extraInitializers = [];
    var MediaFormats = _classThis = class extends _classSuper {
        constructor(props) {
            super(props);
            this.copySuccessThumbnailKey = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _copySuccessThumbnailKey_initializers, void 0));
            this.formats = (__runInitializers(this, _copySuccessThumbnailKey_extraInitializers), __runInitializers(this, _formats_initializers, void 0));
            this.handleDownloadClick = (__runInitializers(this, _formats_extraInitializers), (id) => {
                window.open(this.thumbnails[id] + '&inline=1');
            });
            this.handleCopyClick = __runInitializers(this, _handleCopyClick_initializers, (id) => {
                (0, copy_to_clipboard_1.default)(window.location.origin + this.thumbnails[id]);
                this.copySuccessThumbnailKey = id;
                setTimeout((0, mobx_1.action)(() => this.copySuccessThumbnailKey = undefined), 500);
            });
            __runInitializers(this, _handleCopyClick_extraInitializers);
            const { router, resourceStore, } = this.props;
            const locale = resourceStore.locale;
            if (!locale) {
                throw new Error('The resourceStore for the MediaFormats must have a locale');
            }
            router.bind('locale', locale);
        }
        componentDidMount() {
            formatStore_1.default.loadFormats().then((0, mobx_1.action)((formats) => {
                this.formats = formats;
            }));
        }
        get thumbnails() {
            return this.props.resourceStore.data.thumbnails;
        }
        render() {
            const { formats } = this;
            const { resourceStore, title } = this.props;
            const buttons = [
                {
                    icon: 'su-eye',
                    onClick: this.handleDownloadClick,
                },
                {
                    icon: 'su-copy',
                    onClick: this.handleCopyClick,
                },
            ];
            return (<div className={mediaFormats_scss_1.default.mediaFormats}>
                {title && <h1>{title}</h1>}
                {resourceStore.loading || !formats
                    ? <components_1.Loader />
                    : <components_1.Table buttons={buttons}>
                        <components_1.Table.Header>
                            <components_1.Table.HeaderCell>{(0, utils_1.translate)('sulu_admin.title')}</components_1.Table.HeaderCell>
                            <components_1.Table.HeaderCell>{(0, utils_1.translate)('sulu_admin.key')}</components_1.Table.HeaderCell>
                        </components_1.Table.Header>
                        <components_1.Table.Body>
                            {formats
                            .filter((format) => !format.internal)
                            .map((format) => (<components_1.Table.Row buttons={this.copySuccessThumbnailKey === format.key
                                ? [buttons[0], { icon: 'su-check', onClick: undefined }]
                                : buttons} id={format.key} key={format.key}>
                                        <components_1.Table.Cell>{format.title}</components_1.Table.Cell>
                                        <components_1.Table.Cell>{format.key}</components_1.Table.Cell>
                                    </components_1.Table.Row>))}
                        </components_1.Table.Body>
                    </components_1.Table>}
            </div>);
        }
    };
    __setFunctionName(_classThis, "MediaFormats");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _copySuccessThumbnailKey_decorators = [mobx_1.observable];
        _formats_decorators = [mobx_1.observable];
        _get_thumbnails_decorators = [mobx_1.computed];
        _handleCopyClick_decorators = [mobx_1.action];
        __esDecorate(_classThis, null, _get_thumbnails_decorators, { kind: "getter", name: "thumbnails", static: false, private: false, access: { has: obj => "thumbnails" in obj, get: obj => obj.thumbnails }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _copySuccessThumbnailKey_decorators, { kind: "field", name: "copySuccessThumbnailKey", static: false, private: false, access: { has: obj => "copySuccessThumbnailKey" in obj, get: obj => obj.copySuccessThumbnailKey, set: (obj, value) => { obj.copySuccessThumbnailKey = value; } }, metadata: _metadata }, _copySuccessThumbnailKey_initializers, _copySuccessThumbnailKey_extraInitializers);
        __esDecorate(null, null, _formats_decorators, { kind: "field", name: "formats", static: false, private: false, access: { has: obj => "formats" in obj, get: obj => obj.formats, set: (obj, value) => { obj.formats = value; } }, metadata: _metadata }, _formats_initializers, _formats_extraInitializers);
        __esDecorate(null, null, _handleCopyClick_decorators, { kind: "field", name: "handleCopyClick", static: false, private: false, access: { has: obj => "handleCopyClick" in obj, get: obj => obj.handleCopyClick, set: (obj, value) => { obj.handleCopyClick = value; } }, metadata: _metadata }, _handleCopyClick_initializers, _handleCopyClick_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MediaFormats = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MediaFormats = _classThis;
})();
exports.default = (0, containers_1.withToolbar)(MediaFormats, function () {
    const { resourceStore, router } = this.props;
    const { locales } = router.route.options;
    const locale = locales
        ? {
            value: resourceStore.locale.get(),
            onChange: (locale) => {
                router.navigate(router.route.name, Object.assign(Object.assign({}, router.attributes), { locale }));
            },
            options: locales.map((locale) => ({
                value: locale,
                label: locale,
            })),
        }
        : undefined;
    return {
        locale,
        backButton: {
            onClick: () => {
                router.restore(COLLECTION_ROUTE, { locale: resourceStore.locale.get() });
            },
        },
    };
});
