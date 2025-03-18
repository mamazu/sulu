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
const debounce_1 = __importDefault(require("debounce"));
const classnames_1 = __importDefault(require("classnames"));
const components_1 = require("sulu-admin-bundle/components");
const containers_1 = require("sulu-admin-bundle/containers");
const stores_1 = require("sulu-admin-bundle/stores");
const utils_1 = require("sulu-admin-bundle/utils");
const stores_2 = require("sulu-page-bundle/stores");
const preview_scss_1 = __importDefault(require("./preview.scss"));
require("./public-preview.scss");
const PreviewStore_1 = __importDefault(require("./stores/PreviewStore"));
const PreviewLinkPopover_1 = __importDefault(require("./PreviewLinkPopover"));
let Preview = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _instanceExtraInitializers = [];
    let _iframeRef_decorators;
    let _iframeRef_initializers = [];
    let _iframeRef_extraInitializers = [];
    let _started_decorators;
    let _started_initializers = [];
    let _started_extraInitializers = [];
    let _selectedDeviceOption_decorators;
    let _selectedDeviceOption_initializers = [];
    let _selectedDeviceOption_extraInitializers = [];
    let _targetGroupsStore_decorators;
    let _targetGroupsStore_initializers = [];
    let _targetGroupsStore_extraInitializers = [];
    let _previewStore_decorators;
    let _previewStore_initializers = [];
    let _previewStore_extraInitializers = [];
    let _previewWindow_decorators;
    let _previewWindow_initializers = [];
    let _previewWindow_extraInitializers = [];
    let _webspaceOptions_decorators;
    let _webspaceOptions_initializers = [];
    let _webspaceOptions_extraInitializers = [];
    let _reloadCounter_decorators;
    let _reloadCounter_initializers = [];
    let _reloadCounter_extraInitializers = [];
    let _get_webspaceKey_decorators;
    let _get_segments_decorators;
    let _get_shouldUpdateFormStore_decorators;
    let _createPreviewStore_decorators;
    let _createPreviewStore_initializers = [];
    let _createPreviewStore_extraInitializers = [];
    let _setStarted_decorators;
    let _setStarted_initializers = [];
    let _setStarted_extraInitializers = [];
    let _setIframe_decorators;
    let _setIframe_initializers = [];
    let _setIframe_extraInitializers = [];
    let _handleDeviceSelectChange_decorators;
    let _handleDeviceSelectChange_initializers = [];
    let _handleDeviceSelectChange_extraInitializers = [];
    let _handleDateTimeChange_decorators;
    let _handleDateTimeChange_initializers = [];
    let _handleDateTimeChange_extraInitializers = [];
    let _handleWebspaceChange_decorators;
    let _handleWebspaceChange_initializers = [];
    let _handleWebspaceChange_extraInitializers = [];
    let _handleRefreshClick_decorators;
    let _handleRefreshClick_initializers = [];
    let _handleRefreshClick_extraInitializers = [];
    let _handlePreviewWindowClick_decorators;
    let _handlePreviewWindowClick_initializers = [];
    let _handlePreviewWindowClick_extraInitializers = [];
    var Preview = _classThis = class extends _classSuper {
        get webspaceKey() {
            const { router: { attributes: { webspace, }, }, } = this.props;
            if (webspace !== undefined && typeof webspace !== 'string') {
                throw new Error('The "webspace" router attribute must be a string if set!');
            }
            return webspace || this.webspaceOptions[0].value;
        }
        get segments() {
            if (!this.webspaceKey) {
                return [];
            }
            return stores_2.webspaceStore.getWebspace(this.webspaceKey).segments;
        }
        get shouldUpdateFormStore() {
            return this.props.formStore.resourceKey === this.previewStore.resourceKey;
        }
        constructor(props) {
            super(props);
            this.availableDeviceOptions = (__runInitializers(this, _instanceExtraInitializers), [
                { label: (0, utils_1.translate)('sulu_preview.auto'), value: 'auto' },
                { label: (0, utils_1.translate)('sulu_preview.desktop'), value: 'desktop' },
                { label: (0, utils_1.translate)('sulu_preview.tablet'), value: 'tablet' },
                { label: (0, utils_1.translate)('sulu_preview.smartphone'), value: 'smartphone' },
            ]);
            this.iframeRef = __runInitializers(this, _iframeRef_initializers, void 0);
            this.started = (__runInitializers(this, _iframeRef_extraInitializers), __runInitializers(this, _started_initializers, false));
            this.selectedDeviceOption = (__runInitializers(this, _started_extraInitializers), __runInitializers(this, _selectedDeviceOption_initializers, this.availableDeviceOptions[0].value));
            this.targetGroupsStore = (__runInitializers(this, _selectedDeviceOption_extraInitializers), __runInitializers(this, _targetGroupsStore_initializers, void 0));
            this.previewStore = (__runInitializers(this, _targetGroupsStore_extraInitializers), __runInitializers(this, _previewStore_initializers, void 0));
            this.previewWindow = (__runInitializers(this, _previewStore_extraInitializers), __runInitializers(this, _previewWindow_initializers, void 0));
            this.webspaceOptions = (__runInitializers(this, _previewWindow_extraInitializers), __runInitializers(this, _webspaceOptions_initializers, []));
            this.reloadCounter = (__runInitializers(this, _webspaceOptions_extraInitializers), __runInitializers(this, _reloadCounter_initializers, 0));
            this.schemaDisposer = __runInitializers(this, _reloadCounter_extraInitializers);
            this.createPreviewStore = __runInitializers(this, _createPreviewStore_initializers, () => {
                var _a;
                const { formStore: { resourceKey, id, locale, }, router: { route: { options: { previewResourceKey = null, }, }, }, } = this.props;
                this.previewStore = new PreviewStore_1.default(previewResourceKey || resourceKey, id, locale, this.webspaceKey, (_a = this.segments.find((segment) => segment.default === true)) === null || _a === void 0 ? void 0 : _a.key);
            });
            this.setStarted = (__runInitializers(this, _createPreviewStore_extraInitializers), __runInitializers(this, _setStarted_initializers, (started) => {
                this.started = started;
            }));
            this.startPreview = (__runInitializers(this, _setStarted_extraInitializers), () => {
                const { previewStore } = this;
                const { formStore, } = this.props;
                previewStore.start();
                (0, mobx_1.when)(() => !formStore.loading
                    && !previewStore.starting
                    && this.iframeRef !== null
                    && (!this.targetGroupsStore || !this.targetGroupsStore.loading), this.initializeFormStoreReactions);
                this.setStarted(true);
            });
            this.initializeFormStoreReactions = () => {
                const { previewStore } = this;
                const { formStore, } = this.props;
                this.localeDisposer = (0, mobx_1.reaction)(() => (0, mobx_1.toJS)(formStore.locale), (locale) => {
                    this.previewStore.restart(locale);
                });
                if (previewStore.resourceKey !== formStore.resourceKey) {
                    return;
                }
                this.dataDisposer = (0, mobx_1.reaction)(() => (0, mobx_1.toJS)(formStore.data), (data) => {
                    if (this.iframeRef === null && !this.previewWindow) {
                        return;
                    }
                    this.updatePreview(data);
                });
                this.schemaDisposer = (0, mobx_1.reaction)(() => (0, mobx_1.toJS)(formStore.schema), () => {
                    if (formStore.type) {
                        previewStore.updateContext((0, mobx_1.toJS)(formStore.type), (0, mobx_1.toJS)(formStore.data)).then(this.setContent);
                    }
                });
            };
            this.updatePreview = (0, debounce_1.default)((data) => {
                if (this.shouldUpdateFormStore && !!this.previewStore.token) {
                    const { previewStore } = this;
                    previewStore.update(data).then(this.setContent);
                }
            }, Preview.debounceDelay);
            this.setContent = (previewContent) => {
                const previewDocument = this.getPreviewDocument();
                if (!previewDocument) {
                    return;
                }
                const preservedScrollPosition = this.getPreviewScrollPosition();
                previewDocument.open(); // This will lose in Firefox the and safari previewDocument.location
                previewDocument.write(previewContent);
                previewDocument.close();
                if (preservedScrollPosition) {
                    setTimeout(() => this.setPreviewScrollPosition(preservedScrollPosition), 0);
                }
            };
            this.getPreviewDocument = () => {
                if (this.previewWindow) {
                    return this.previewWindow.document;
                }
                if (!(this.iframeRef instanceof HTMLIFrameElement)) {
                    return;
                }
                return this.iframeRef.contentDocument;
            };
            this.getPreviewWindow = () => {
                if (this.previewWindow) {
                    return this.previewWindow;
                }
                if (!(this.iframeRef instanceof HTMLIFrameElement)) {
                    return;
                }
                return this.iframeRef.contentWindow;
            };
            this.getPreviewScrollPosition = () => {
                var _a, _b, _c, _d;
                const previewWindow = this.getPreviewWindow();
                if (previewWindow) {
                    return ((_b = (_a = previewWindow.document) === null || _a === void 0 ? void 0 : _a.documentElement) === null || _b === void 0 ? void 0 : _b.scrollTop)
                        || previewWindow.pageYOffset
                        || ((_d = (_c = previewWindow.document) === null || _c === void 0 ? void 0 : _c.body) === null || _d === void 0 ? void 0 : _d.scrollTop);
                }
            };
            this.setPreviewScrollPosition = (pos) => {
                const previewWindow = this.getPreviewWindow();
                if (previewWindow) {
                    previewWindow.scrollTo({ top: pos });
                }
            };
            this.setIframe = __runInitializers(this, _setIframe_initializers, (iframeRef) => {
                this.iframeRef = iframeRef;
            });
            this.handleToggleSidebarClick = (__runInitializers(this, _setIframe_extraInitializers), () => {
                if (containers_1.sidebarStore.size === 'medium') {
                    return containers_1.sidebarStore.setSize('large');
                }
                containers_1.sidebarStore.setSize('medium');
            });
            this.handleDeviceSelectChange = __runInitializers(this, _handleDeviceSelectChange_initializers, (value) => {
                this.selectedDeviceOption = value;
            });
            this.handleDateTimeChange = (__runInitializers(this, _handleDeviceSelectChange_extraInitializers), __runInitializers(this, _handleDateTimeChange_initializers, (0, debounce_1.default)((value) => {
                const { formStore } = this.props;
                this.previewStore.setDateTime(value || new Date());
                this.updatePreview((0, mobx_1.toJS)(formStore.data));
            }, Preview.debounceDelay)));
            this.handleWebspaceChange = (__runInitializers(this, _handleDateTimeChange_extraInitializers), __runInitializers(this, _handleWebspaceChange_initializers, (webspace) => {
                const { formStore } = this.props;
                this.previewStore.setWebspace(webspace);
                this.updatePreview((0, mobx_1.toJS)(formStore.data));
            }));
            this.handleTargetGroupChange = (__runInitializers(this, _handleWebspaceChange_extraInitializers), (targetGroupId) => {
                const { formStore } = this.props;
                this.previewStore.setTargetGroup(targetGroupId);
                this.updatePreview((0, mobx_1.toJS)(formStore.data));
            });
            this.handleSegmentChange = (segmentKey) => {
                const { formStore } = this.props;
                this.previewStore.setSegment(segmentKey);
                this.updatePreview((0, mobx_1.toJS)(formStore.data));
            };
            this.handleRefreshClick = __runInitializers(this, _handleRefreshClick_initializers, () => {
                // We can not reload the iframe here as safari and firefox
                // resets the location.href to another url on previewDocument.open
                // so instead of this we rerender the whole iframe.
                ++this.reloadCounter;
            });
            this.handleStartClick = (__runInitializers(this, _handleRefreshClick_extraInitializers), () => {
                this.startPreview();
            });
            this.handlePreviewWindowClick = __runInitializers(this, _handlePreviewWindowClick_initializers, () => {
                this.previewWindow = window.open(this.previewStore.renderRoute);
                this.previewWindow.addEventListener('beforeunload', (0, mobx_1.action)(() => {
                    this.previewWindow = undefined;
                }));
            });
            __runInitializers(this, _handlePreviewWindowClick_extraInitializers);
            if (Preview.audienceTargeting) {
                this.targetGroupsStore = new stores_1.ResourceListStore('target_groups');
            }
            this.webspaceOptions = stores_2.webspaceStore.grantedWebspaces.map((webspace) => ({
                label: webspace.name,
                value: webspace.key,
            }));
            this.createPreviewStore();
            if (Preview.mode === 'auto') {
                this.startPreview();
            }
        }
        componentDidUpdate(prevProps) {
            const { formStore, } = this.props;
            if (this.props.formStore !== prevProps.formStore) {
                this.disposeFormStoreReactions();
                this.updatePreview((0, mobx_1.toJS)(formStore.data));
                this.initializeFormStoreReactions();
            }
        }
        componentWillUnmount() {
            this.disposeFormStoreReactions();
            if (!this.started) {
                return;
            }
            this.updatePreview.clear();
            this.previewStore.stop();
        }
        disposeFormStoreReactions() {
            if (this.schemaDisposer) {
                this.schemaDisposer();
            }
            if (this.dataDisposer) {
                this.dataDisposer();
            }
            if (this.localeDisposer) {
                this.localeDisposer();
            }
        }
        render() {
            var _a;
            const { router } = this.props;
            const { previewWebspaceChooser = true } = router.route.options;
            if (this.previewWindow || (this.targetGroupsStore && this.targetGroupsStore.loading)) {
                return null;
            }
            if (Preview.mode !== 'auto' && !this.started) {
                return <button onClick={this.handleStartClick} type="button">Start</button>;
            }
            const containerClass = (0, classnames_1.default)(preview_scss_1.default.container, {
                [preview_scss_1.default[this.selectedDeviceOption]]: this.selectedDeviceOption,
            });
            return (<div className={containerClass}>
                {this.previewStore.starting
                    ? <div className={preview_scss_1.default.loaderContainer}>
                        <components_1.Loader />
                    </div>
                    : <div className={preview_scss_1.default.previewContainer}>
                        <div className={preview_scss_1.default.iframeContainer}>
                            <iframe className={preview_scss_1.default.iframe} key={this.reloadCounter} ref={this.setIframe} src={this.previewStore.renderRoute}/>
                        </div>
                    </div>}
                <components_1.Toolbar skin="dark">
                    <components_1.Toolbar.Controls grow={true}>
                        <components_1.Toolbar.Button icon={containers_1.sidebarStore.size === 'medium' ? 'su-arrow-left' : 'su-arrow-right'} onClick={this.handleToggleSidebarClick}/>
                        <components_1.Toolbar.Items>
                            <components_1.Toolbar.Select icon="su-expand" onChange={this.handleDeviceSelectChange} options={this.availableDeviceOptions} value={this.selectedDeviceOption}/>
                            <components_1.Toolbar.Popover icon="su-calendar" label={(((_a = this.previewStore) === null || _a === void 0 ? void 0 : _a.dateTime) || new Date()).toLocaleString()}>
                                {() => {
                    var _a;
                    return (<div className={preview_scss_1.default.dateTimeForm}>
                                        <components_1.Form skin="dark">
                                            <components_1.Form.Field description={(0, utils_1.translate)('sulu_admin.preview_date_time_description')} label={(0, utils_1.translate)('sulu_admin.preview_date_time')}>
                                                <components_1.DatePicker onChange={this.handleDateTimeChange} options={{ dateFormat: true, timeFormat: true }} value={(_a = this.previewStore) === null || _a === void 0 ? void 0 : _a.dateTime}/>
                                            </components_1.Form.Field>
                                        </components_1.Form>
                                    </div>);
                }}
                            </components_1.Toolbar.Popover>
                            {previewWebspaceChooser &&
                    <components_1.Toolbar.Select icon="su-webspace" onChange={this.handleWebspaceChange} options={this.webspaceOptions} value={this.previewStore.webspace}/>}
                            {!!this.targetGroupsStore &&
                    <components_1.Toolbar.Select icon="su-user" loading={this.targetGroupsStore.loading} onChange={this.handleTargetGroupChange} options={[
                            { label: (0, utils_1.translate)('sulu_audience_targeting.no_target_group'), value: -1 },
                            ...(this.targetGroupsStore
                                ? this.targetGroupsStore.data.map((targetGroup) => ({
                                    label: targetGroup.title,
                                    value: targetGroup.id,
                                }))
                                : []),
                        ]} value={this.previewStore && this.previewStore.targetGroup}/>}
                            {this.segments.length > 0 &&
                    <components_1.Toolbar.Select icon="su-focus" onChange={this.handleSegmentChange} options={this.segments.map(({ title, key }) => ({
                            label: title,
                            value: key,
                        }))} value={this.previewStore && this.previewStore.segment}/>}
                            <components_1.Toolbar.Button icon="su-sync" onClick={this.handleRefreshClick}>
                                {(0, utils_1.translate)('sulu_preview.reload')}
                            </components_1.Toolbar.Button>
                            <components_1.Toolbar.Popover icon="su-share" label={(0, utils_1.translate)('sulu_preview.preview_link')}>
                                {() => (<PreviewLinkPopover_1.default previewStore={this.previewStore}/>)}
                            </components_1.Toolbar.Popover>
                            <components_1.Toolbar.Button icon="su-link" onClick={this.handlePreviewWindowClick}>
                                {(0, utils_1.translate)('sulu_preview.open_in_window')}
                            </components_1.Toolbar.Button>
                        </components_1.Toolbar.Items>
                    </components_1.Toolbar.Controls>
                </components_1.Toolbar>
            </div>);
        }
    };
    __setFunctionName(_classThis, "Preview");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _iframeRef_decorators = [mobx_1.observable];
        _started_decorators = [mobx_1.observable];
        _selectedDeviceOption_decorators = [mobx_1.observable];
        _targetGroupsStore_decorators = [mobx_1.observable];
        _previewStore_decorators = [mobx_1.observable];
        _previewWindow_decorators = [mobx_1.observable];
        _webspaceOptions_decorators = [mobx_1.observable];
        _reloadCounter_decorators = [mobx_1.observable];
        _get_webspaceKey_decorators = [mobx_1.computed];
        _get_segments_decorators = [mobx_1.computed];
        _get_shouldUpdateFormStore_decorators = [mobx_1.computed];
        _createPreviewStore_decorators = [mobx_1.action];
        _setStarted_decorators = [mobx_1.action];
        _setIframe_decorators = [mobx_1.action];
        _handleDeviceSelectChange_decorators = [mobx_1.action];
        _handleDateTimeChange_decorators = [mobx_1.action];
        _handleWebspaceChange_decorators = [mobx_1.action];
        _handleRefreshClick_decorators = [mobx_1.action];
        _handlePreviewWindowClick_decorators = [mobx_1.action];
        __esDecorate(_classThis, null, _get_webspaceKey_decorators, { kind: "getter", name: "webspaceKey", static: false, private: false, access: { has: obj => "webspaceKey" in obj, get: obj => obj.webspaceKey }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_segments_decorators, { kind: "getter", name: "segments", static: false, private: false, access: { has: obj => "segments" in obj, get: obj => obj.segments }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_shouldUpdateFormStore_decorators, { kind: "getter", name: "shouldUpdateFormStore", static: false, private: false, access: { has: obj => "shouldUpdateFormStore" in obj, get: obj => obj.shouldUpdateFormStore }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _iframeRef_decorators, { kind: "field", name: "iframeRef", static: false, private: false, access: { has: obj => "iframeRef" in obj, get: obj => obj.iframeRef, set: (obj, value) => { obj.iframeRef = value; } }, metadata: _metadata }, _iframeRef_initializers, _iframeRef_extraInitializers);
        __esDecorate(null, null, _started_decorators, { kind: "field", name: "started", static: false, private: false, access: { has: obj => "started" in obj, get: obj => obj.started, set: (obj, value) => { obj.started = value; } }, metadata: _metadata }, _started_initializers, _started_extraInitializers);
        __esDecorate(null, null, _selectedDeviceOption_decorators, { kind: "field", name: "selectedDeviceOption", static: false, private: false, access: { has: obj => "selectedDeviceOption" in obj, get: obj => obj.selectedDeviceOption, set: (obj, value) => { obj.selectedDeviceOption = value; } }, metadata: _metadata }, _selectedDeviceOption_initializers, _selectedDeviceOption_extraInitializers);
        __esDecorate(null, null, _targetGroupsStore_decorators, { kind: "field", name: "targetGroupsStore", static: false, private: false, access: { has: obj => "targetGroupsStore" in obj, get: obj => obj.targetGroupsStore, set: (obj, value) => { obj.targetGroupsStore = value; } }, metadata: _metadata }, _targetGroupsStore_initializers, _targetGroupsStore_extraInitializers);
        __esDecorate(null, null, _previewStore_decorators, { kind: "field", name: "previewStore", static: false, private: false, access: { has: obj => "previewStore" in obj, get: obj => obj.previewStore, set: (obj, value) => { obj.previewStore = value; } }, metadata: _metadata }, _previewStore_initializers, _previewStore_extraInitializers);
        __esDecorate(null, null, _previewWindow_decorators, { kind: "field", name: "previewWindow", static: false, private: false, access: { has: obj => "previewWindow" in obj, get: obj => obj.previewWindow, set: (obj, value) => { obj.previewWindow = value; } }, metadata: _metadata }, _previewWindow_initializers, _previewWindow_extraInitializers);
        __esDecorate(null, null, _webspaceOptions_decorators, { kind: "field", name: "webspaceOptions", static: false, private: false, access: { has: obj => "webspaceOptions" in obj, get: obj => obj.webspaceOptions, set: (obj, value) => { obj.webspaceOptions = value; } }, metadata: _metadata }, _webspaceOptions_initializers, _webspaceOptions_extraInitializers);
        __esDecorate(null, null, _reloadCounter_decorators, { kind: "field", name: "reloadCounter", static: false, private: false, access: { has: obj => "reloadCounter" in obj, get: obj => obj.reloadCounter, set: (obj, value) => { obj.reloadCounter = value; } }, metadata: _metadata }, _reloadCounter_initializers, _reloadCounter_extraInitializers);
        __esDecorate(null, null, _createPreviewStore_decorators, { kind: "field", name: "createPreviewStore", static: false, private: false, access: { has: obj => "createPreviewStore" in obj, get: obj => obj.createPreviewStore, set: (obj, value) => { obj.createPreviewStore = value; } }, metadata: _metadata }, _createPreviewStore_initializers, _createPreviewStore_extraInitializers);
        __esDecorate(null, null, _setStarted_decorators, { kind: "field", name: "setStarted", static: false, private: false, access: { has: obj => "setStarted" in obj, get: obj => obj.setStarted, set: (obj, value) => { obj.setStarted = value; } }, metadata: _metadata }, _setStarted_initializers, _setStarted_extraInitializers);
        __esDecorate(null, null, _setIframe_decorators, { kind: "field", name: "setIframe", static: false, private: false, access: { has: obj => "setIframe" in obj, get: obj => obj.setIframe, set: (obj, value) => { obj.setIframe = value; } }, metadata: _metadata }, _setIframe_initializers, _setIframe_extraInitializers);
        __esDecorate(null, null, _handleDeviceSelectChange_decorators, { kind: "field", name: "handleDeviceSelectChange", static: false, private: false, access: { has: obj => "handleDeviceSelectChange" in obj, get: obj => obj.handleDeviceSelectChange, set: (obj, value) => { obj.handleDeviceSelectChange = value; } }, metadata: _metadata }, _handleDeviceSelectChange_initializers, _handleDeviceSelectChange_extraInitializers);
        __esDecorate(null, null, _handleDateTimeChange_decorators, { kind: "field", name: "handleDateTimeChange", static: false, private: false, access: { has: obj => "handleDateTimeChange" in obj, get: obj => obj.handleDateTimeChange, set: (obj, value) => { obj.handleDateTimeChange = value; } }, metadata: _metadata }, _handleDateTimeChange_initializers, _handleDateTimeChange_extraInitializers);
        __esDecorate(null, null, _handleWebspaceChange_decorators, { kind: "field", name: "handleWebspaceChange", static: false, private: false, access: { has: obj => "handleWebspaceChange" in obj, get: obj => obj.handleWebspaceChange, set: (obj, value) => { obj.handleWebspaceChange = value; } }, metadata: _metadata }, _handleWebspaceChange_initializers, _handleWebspaceChange_extraInitializers);
        __esDecorate(null, null, _handleRefreshClick_decorators, { kind: "field", name: "handleRefreshClick", static: false, private: false, access: { has: obj => "handleRefreshClick" in obj, get: obj => obj.handleRefreshClick, set: (obj, value) => { obj.handleRefreshClick = value; } }, metadata: _metadata }, _handleRefreshClick_initializers, _handleRefreshClick_extraInitializers);
        __esDecorate(null, null, _handlePreviewWindowClick_decorators, { kind: "field", name: "handlePreviewWindowClick", static: false, private: false, access: { has: obj => "handlePreviewWindowClick" in obj, get: obj => obj.handlePreviewWindowClick, set: (obj, value) => { obj.handlePreviewWindowClick = value; } }, metadata: _metadata }, _handlePreviewWindowClick_initializers, _handlePreviewWindowClick_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Preview = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    _classThis.debounceDelay = 250;
    _classThis.mode = 'auto';
    _classThis.audienceTargeting = false;
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Preview = _classThis;
})();
exports.default = Preview;
