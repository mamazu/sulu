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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const mobx_1 = require("mobx");
const components_1 = require("sulu-admin-bundle/components");
const containers_1 = require("sulu-admin-bundle/containers");
const services_1 = require("sulu-admin-bundle/services");
const utils_1 = require("sulu-admin-bundle/utils");
const views_1 = require("sulu-admin-bundle/views");
const SingleSelectionStore_1 = __importDefault(require("sulu-admin-bundle/stores/SingleSelectionStore"));
const addContactToolbarAction_scss_1 = __importDefault(require("./addContactToolbarAction.scss"));
let AddContactToolbarAction = (() => {
    var _a;
    let _classSuper = views_1.AbstractListToolbarAction;
    let _showOverlay_decorators;
    let _showOverlay_initializers = [];
    let _showOverlay_extraInitializers = [];
    let _saving_decorators;
    let _saving_initializers = [];
    let _saving_extraInitializers = [];
    let _position_decorators;
    let _position_initializers = [];
    let _position_extraInitializers = [];
    let _handlePositionChange_decorators;
    let _handlePositionChange_initializers = [];
    let _handlePositionChange_extraInitializers = [];
    let _handleConfirm_decorators;
    let _handleConfirm_initializers = [];
    let _handleConfirm_extraInitializers = [];
    let _handleClose_decorators;
    let _handleClose_initializers = [];
    let _handleClose_extraInitializers = [];
    let _resetFields_decorators;
    let _resetFields_initializers = [];
    let _resetFields_extraInitializers = [];
    return _a = class AddContactToolbarAction extends _classSuper {
            constructor(listStore, list, router, locales, resourceStore, options) {
                super(listStore, list, router, locales, resourceStore, options);
                this.showOverlay = __runInitializers(this, _showOverlay_initializers, false);
                this.saving = (__runInitializers(this, _showOverlay_extraInitializers), __runInitializers(this, _saving_initializers, false));
                this.position = (__runInitializers(this, _saving_extraInitializers), __runInitializers(this, _position_initializers, undefined));
                this.contactSelectionStore = __runInitializers(this, _position_extraInitializers);
                this.handlePositionChange = __runInitializers(this, _handlePositionChange_initializers, (position) => {
                    this.position = position;
                });
                this.handleConfirm = (__runInitializers(this, _handlePositionChange_extraInitializers), __runInitializers(this, _handleConfirm_initializers, () => {
                    if (!this.contactSelectionStore.item) {
                        throw new Error('The contact must be selected in order to confirm the dialog!');
                    }
                    this.saving = true;
                    services_1.ResourceRequester.put('account_contacts', {
                        position: this.position,
                    }, { accountId: this.listStore.options.accountId, id: this.contactSelectionStore.item.id }).then((0, mobx_1.action)(() => {
                        this.saving = false;
                        this.showOverlay = false;
                        this.resetFields();
                        this.listStore.reload();
                    }));
                }));
                this.handleClose = (__runInitializers(this, _handleConfirm_extraInitializers), __runInitializers(this, _handleClose_initializers, () => {
                    this.showOverlay = false;
                    this.resetFields();
                }));
                this.resetFields = (__runInitializers(this, _handleClose_extraInitializers), __runInitializers(this, _resetFields_initializers, () => {
                    this.contactSelectionStore.loadItem(undefined);
                    this.position = undefined;
                }));
                __runInitializers(this, _resetFields_extraInitializers);
                this.contactSelectionStore = new SingleSelectionStore_1.default('contacts');
            }
            getNode() {
                return (<components_1.Overlay confirmDisabled={!this.contactSelectionStore.item} confirmLoading={this.saving} confirmText={(0, utils_1.translate)('sulu_admin.add')} key="sulu_contact.add_media" onClose={this.handleClose} onConfirm={this.handleConfirm} open={this.showOverlay} size="small" title={(0, utils_1.translate)('sulu_contact.add_contact_to_organization')}>
                <div className={addContactToolbarAction_scss_1.default.overlay}>
                    <components_1.Form>
                        <components_1.Form.Field label={(0, utils_1.translate)('sulu_contact.people')}>
                            <containers_1.SingleAutoComplete displayProperty="fullName" options={{ excludedAccountId: this.listStore.options.accountId, flat: false }} searchProperties={['fullName']} selectionStore={this.contactSelectionStore}/>
                        </components_1.Form.Field>
                        <components_1.Form.Field label={(0, utils_1.translate)('sulu_contact.position')}>
                            <containers_1.ResourceSingleSelect displayProperty="position" editable={true} idProperty="id" onChange={this.handlePositionChange} resourceKey="contact_positions" value={this.position}/>
                        </components_1.Form.Field>
                    </components_1.Form>
                </div>
            </components_1.Overlay>);
            }
            getToolbarItemConfig() {
                return {
                    icon: 'su-plus-circle',
                    label: (0, utils_1.translate)('sulu_admin.add'),
                    onClick: (0, mobx_1.action)(() => {
                        this.showOverlay = true;
                    }),
                    type: 'button',
                };
            }
        },
        (() => {
            var _b;
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_b = _classSuper[Symbol.metadata]) !== null && _b !== void 0 ? _b : null) : void 0;
            _showOverlay_decorators = [mobx_1.observable];
            _saving_decorators = [mobx_1.observable];
            _position_decorators = [mobx_1.observable];
            _handlePositionChange_decorators = [mobx_1.action];
            _handleConfirm_decorators = [mobx_1.action];
            _handleClose_decorators = [mobx_1.action];
            _resetFields_decorators = [mobx_1.action];
            __esDecorate(null, null, _showOverlay_decorators, { kind: "field", name: "showOverlay", static: false, private: false, access: { has: obj => "showOverlay" in obj, get: obj => obj.showOverlay, set: (obj, value) => { obj.showOverlay = value; } }, metadata: _metadata }, _showOverlay_initializers, _showOverlay_extraInitializers);
            __esDecorate(null, null, _saving_decorators, { kind: "field", name: "saving", static: false, private: false, access: { has: obj => "saving" in obj, get: obj => obj.saving, set: (obj, value) => { obj.saving = value; } }, metadata: _metadata }, _saving_initializers, _saving_extraInitializers);
            __esDecorate(null, null, _position_decorators, { kind: "field", name: "position", static: false, private: false, access: { has: obj => "position" in obj, get: obj => obj.position, set: (obj, value) => { obj.position = value; } }, metadata: _metadata }, _position_initializers, _position_extraInitializers);
            __esDecorate(null, null, _handlePositionChange_decorators, { kind: "field", name: "handlePositionChange", static: false, private: false, access: { has: obj => "handlePositionChange" in obj, get: obj => obj.handlePositionChange, set: (obj, value) => { obj.handlePositionChange = value; } }, metadata: _metadata }, _handlePositionChange_initializers, _handlePositionChange_extraInitializers);
            __esDecorate(null, null, _handleConfirm_decorators, { kind: "field", name: "handleConfirm", static: false, private: false, access: { has: obj => "handleConfirm" in obj, get: obj => obj.handleConfirm, set: (obj, value) => { obj.handleConfirm = value; } }, metadata: _metadata }, _handleConfirm_initializers, _handleConfirm_extraInitializers);
            __esDecorate(null, null, _handleClose_decorators, { kind: "field", name: "handleClose", static: false, private: false, access: { has: obj => "handleClose" in obj, get: obj => obj.handleClose, set: (obj, value) => { obj.handleClose = value; } }, metadata: _metadata }, _handleClose_initializers, _handleClose_extraInitializers);
            __esDecorate(null, null, _resetFields_decorators, { kind: "field", name: "resetFields", static: false, private: false, access: { has: obj => "resetFields" in obj, get: obj => obj.resetFields, set: (obj, value) => { obj.resetFields = value; } }, metadata: _metadata }, _resetFields_initializers, _resetFields_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.default = AddContactToolbarAction;
