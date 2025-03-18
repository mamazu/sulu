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
const components_1 = require("sulu-admin-bundle/components");
const containers_1 = require("sulu-admin-bundle/containers");
const utils_1 = require("sulu-admin-bundle/utils");
const containers_2 = require("sulu-website-bundle/containers");
const SnippetAreaStore_1 = __importDefault(require("./stores/SnippetAreaStore"));
const snippetAreas_scss_1 = __importDefault(require("./snippetAreas.scss"));
let SnippetAreas = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _openedAreaKey_decorators;
    let _openedAreaKey_initializers = [];
    let _openedAreaKey_extraInitializers = [];
    let _deleteAreaKey_decorators;
    let _deleteAreaKey_initializers = [];
    let _deleteAreaKey_extraInitializers = [];
    let _handleSnippetClick_decorators;
    let _handleSnippetClick_initializers = [];
    let _handleSnippetClick_extraInitializers = [];
    let _handleAddClick_decorators;
    let _handleAddClick_initializers = [];
    let _handleAddClick_extraInitializers = [];
    let _handleListOverlayClose_decorators;
    let _handleListOverlayClose_initializers = [];
    let _handleListOverlayClose_extraInitializers = [];
    let _handleListOverlayConfirm_decorators;
    let _handleListOverlayConfirm_initializers = [];
    let _handleListOverlayConfirm_extraInitializers = [];
    let _handleDeleteClick_decorators;
    let _handleDeleteClick_initializers = [];
    let _handleDeleteClick_extraInitializers = [];
    let _handleDeleteDialogCancel_decorators;
    let _handleDeleteDialogCancel_initializers = [];
    let _handleDeleteDialogCancel_extraInitializers = [];
    var SnippetAreas = _classThis = class extends _classSuper {
        constructor(props) {
            super(props);
            this.openedAreaKey = __runInitializers(this, _openedAreaKey_initializers, undefined);
            this.snippetAreaStore = __runInitializers(this, _openedAreaKey_extraInitializers);
            this.deleteAreaKey = __runInitializers(this, _deleteAreaKey_initializers, undefined);
            this.cacheClearToolbarAction = __runInitializers(this, _deleteAreaKey_extraInitializers);
            this.handleSnippetClick = __runInitializers(this, _handleSnippetClick_initializers, (snippetUuid) => {
                const { router, route } = this.props;
                const { snippetEditView } = route.options;
                router.navigate(snippetEditView, { id: snippetUuid });
            });
            this.handleAddClick = (__runInitializers(this, _handleSnippetClick_extraInitializers), __runInitializers(this, _handleAddClick_initializers, (areaKey) => {
                this.openedAreaKey = areaKey;
            }));
            this.handleListOverlayClose = (__runInitializers(this, _handleAddClick_extraInitializers), __runInitializers(this, _handleListOverlayClose_initializers, () => {
                this.openedAreaKey = undefined;
            }));
            this.handleListOverlayConfirm = (__runInitializers(this, _handleListOverlayClose_extraInitializers), __runInitializers(this, _handleListOverlayConfirm_initializers, (snippet) => {
                if (!this.openedAreaKey) {
                    throw new Error('The snippet area for saving has not been defined! This should not happen and is likely a bug.');
                }
                this.snippetAreaStore.save(this.openedAreaKey, snippet.id).then((0, mobx_1.action)(() => {
                    this.openedAreaKey = undefined;
                }));
            }));
            this.handleDeleteClick = (__runInitializers(this, _handleListOverlayConfirm_extraInitializers), __runInitializers(this, _handleDeleteClick_initializers, (areaKey) => {
                this.deleteAreaKey = areaKey;
            }));
            this.handleDeleteDialogConfirm = (__runInitializers(this, _handleDeleteClick_extraInitializers), () => {
                if (!this.deleteAreaKey) {
                    throw new Error('The area to delete has not been set! This should not happen and is likely a bug.');
                }
                this.snippetAreaStore.delete(this.deleteAreaKey).then((0, mobx_1.action)(() => {
                    this.deleteAreaKey = undefined;
                }));
            });
            this.handleDeleteDialogCancel = __runInitializers(this, _handleDeleteDialogCancel_initializers, () => {
                this.deleteAreaKey = undefined;
            });
            __runInitializers(this, _handleDeleteDialogCancel_extraInitializers);
            const { router } = this.props;
            const { attributes: { webspace, }, } = router;
            if (typeof webspace !== 'string') {
                throw new Error('The "webspace" router attribute must be a string!');
            }
            this.snippetAreaStore = new SnippetAreaStore_1.default(webspace);
            this.cacheClearToolbarAction = new containers_2.CacheClearToolbarAction(webspace);
        }
        render() {
            if (this.snippetAreaStore.loading) {
                return <components_1.Loader />;
            }
            return (<react_1.Fragment>
                <components_1.Table skin="light">
                    <components_1.Table.Header>
                        <components_1.Table.HeaderCell>{(0, utils_1.translate)('sulu_snippet.snippet_area')}</components_1.Table.HeaderCell>
                        <components_1.Table.HeaderCell>{(0, utils_1.translate)('sulu_snippet.snippet')}</components_1.Table.HeaderCell>
                    </components_1.Table.Header>
                    <components_1.Table.Body>
                        {Object.keys(this.snippetAreaStore.snippetAreas).map((areaKey) => {
                    const { defaultTitle, defaultUuid, key, title } = this.snippetAreaStore.snippetAreas[areaKey];
                    return (<components_1.Table.Row key={key}>
                                    <components_1.Table.Cell>
                                        {title}
                                    </components_1.Table.Cell>
                                    <components_1.Table.Cell>
                                        {defaultUuid
                            ? <react_1.Fragment>
                                                <components_1.Button className={snippetAreas_scss_1.default.titleButton} onClick={this.handleSnippetClick} skin="text" value={defaultUuid}>
                                                    {defaultTitle}
                                                </components_1.Button>
                                                <components_1.Button className={snippetAreas_scss_1.default.deleteButton} icon="su-trash-alt" onClick={this.handleDeleteClick} skin="link" value={key}/>
                                            </react_1.Fragment>
                            : <components_1.Button className={snippetAreas_scss_1.default.addButton} icon="su-plus-circle" onClick={this.handleAddClick} skin="link" value={key}/>}
                                    </components_1.Table.Cell>
                                </components_1.Table.Row>);
                })}
                    </components_1.Table.Body>
                </components_1.Table>
                <containers_1.SingleListOverlay adapter="table" confirmLoading={this.snippetAreaStore.saving} key={this.openedAreaKey} listKey="snippets" onClose={this.handleListOverlayClose} onConfirm={this.handleListOverlayConfirm} open={!!this.openedAreaKey} options={{ areas: this.openedAreaKey }} resourceKey="snippets" title={(0, utils_1.translate)('sulu_snippet.selection_overlay_title')}/>
                <components_1.Dialog cancelText={(0, utils_1.translate)('sulu_admin.cancel')} confirmLoading={this.snippetAreaStore.deleting} confirmText={(0, utils_1.translate)('sulu_admin.ok')} onCancel={this.handleDeleteDialogCancel} onConfirm={this.handleDeleteDialogConfirm} open={!!this.deleteAreaKey} title={(0, utils_1.translate)('sulu_admin.delete_warning_title')}>
                    {(0, utils_1.translate)('sulu_admin.delete_warning_text')}
                </components_1.Dialog>
                {this.cacheClearToolbarAction.getNode()}
            </react_1.Fragment>);
        }
    };
    __setFunctionName(_classThis, "SnippetAreas");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _openedAreaKey_decorators = [mobx_1.observable];
        _deleteAreaKey_decorators = [mobx_1.observable];
        _handleSnippetClick_decorators = [mobx_1.action];
        _handleAddClick_decorators = [mobx_1.action];
        _handleListOverlayClose_decorators = [mobx_1.action];
        _handleListOverlayConfirm_decorators = [mobx_1.action];
        _handleDeleteClick_decorators = [mobx_1.action];
        _handleDeleteDialogCancel_decorators = [mobx_1.action];
        __esDecorate(null, null, _openedAreaKey_decorators, { kind: "field", name: "openedAreaKey", static: false, private: false, access: { has: obj => "openedAreaKey" in obj, get: obj => obj.openedAreaKey, set: (obj, value) => { obj.openedAreaKey = value; } }, metadata: _metadata }, _openedAreaKey_initializers, _openedAreaKey_extraInitializers);
        __esDecorate(null, null, _deleteAreaKey_decorators, { kind: "field", name: "deleteAreaKey", static: false, private: false, access: { has: obj => "deleteAreaKey" in obj, get: obj => obj.deleteAreaKey, set: (obj, value) => { obj.deleteAreaKey = value; } }, metadata: _metadata }, _deleteAreaKey_initializers, _deleteAreaKey_extraInitializers);
        __esDecorate(null, null, _handleSnippetClick_decorators, { kind: "field", name: "handleSnippetClick", static: false, private: false, access: { has: obj => "handleSnippetClick" in obj, get: obj => obj.handleSnippetClick, set: (obj, value) => { obj.handleSnippetClick = value; } }, metadata: _metadata }, _handleSnippetClick_initializers, _handleSnippetClick_extraInitializers);
        __esDecorate(null, null, _handleAddClick_decorators, { kind: "field", name: "handleAddClick", static: false, private: false, access: { has: obj => "handleAddClick" in obj, get: obj => obj.handleAddClick, set: (obj, value) => { obj.handleAddClick = value; } }, metadata: _metadata }, _handleAddClick_initializers, _handleAddClick_extraInitializers);
        __esDecorate(null, null, _handleListOverlayClose_decorators, { kind: "field", name: "handleListOverlayClose", static: false, private: false, access: { has: obj => "handleListOverlayClose" in obj, get: obj => obj.handleListOverlayClose, set: (obj, value) => { obj.handleListOverlayClose = value; } }, metadata: _metadata }, _handleListOverlayClose_initializers, _handleListOverlayClose_extraInitializers);
        __esDecorate(null, null, _handleListOverlayConfirm_decorators, { kind: "field", name: "handleListOverlayConfirm", static: false, private: false, access: { has: obj => "handleListOverlayConfirm" in obj, get: obj => obj.handleListOverlayConfirm, set: (obj, value) => { obj.handleListOverlayConfirm = value; } }, metadata: _metadata }, _handleListOverlayConfirm_initializers, _handleListOverlayConfirm_extraInitializers);
        __esDecorate(null, null, _handleDeleteClick_decorators, { kind: "field", name: "handleDeleteClick", static: false, private: false, access: { has: obj => "handleDeleteClick" in obj, get: obj => obj.handleDeleteClick, set: (obj, value) => { obj.handleDeleteClick = value; } }, metadata: _metadata }, _handleDeleteClick_initializers, _handleDeleteClick_extraInitializers);
        __esDecorate(null, null, _handleDeleteDialogCancel_decorators, { kind: "field", name: "handleDeleteDialogCancel", static: false, private: false, access: { has: obj => "handleDeleteDialogCancel" in obj, get: obj => obj.handleDeleteDialogCancel, set: (obj, value) => { obj.handleDeleteDialogCancel = value; } }, metadata: _metadata }, _handleDeleteDialogCancel_initializers, _handleDeleteDialogCancel_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SnippetAreas = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SnippetAreas = _classThis;
})();
exports.default = (0, containers_1.withToolbar)(SnippetAreas, function () {
    return {
        items: [
            this.cacheClearToolbarAction.getToolbarItemConfig(),
        ],
    };
});
