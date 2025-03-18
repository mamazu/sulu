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
Object.defineProperty(exports, "__esModule", { value: true });
const mobx_1 = require("mobx");
const services_1 = require("sulu-admin-bundle/services");
let SnippetAreaStore = (() => {
    var _a;
    let _instanceExtraInitializers = [];
    let _snippetAreas_decorators;
    let _snippetAreas_initializers = [];
    let _snippetAreas_extraInitializers = [];
    let _loading_decorators;
    let _loading_initializers = [];
    let _loading_extraInitializers = [];
    let _saving_decorators;
    let _saving_initializers = [];
    let _saving_extraInitializers = [];
    let _deleting_decorators;
    let _deleting_initializers = [];
    let _deleting_extraInitializers = [];
    let _save_decorators;
    let _delete_decorators;
    return _a = class SnippetAreaStore {
            constructor(webspaceKey) {
                this.snippetAreas = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _snippetAreas_initializers, {}));
                this.loading = (__runInitializers(this, _snippetAreas_extraInitializers), __runInitializers(this, _loading_initializers, true));
                this.saving = (__runInitializers(this, _loading_extraInitializers), __runInitializers(this, _saving_initializers, false));
                this.deleting = (__runInitializers(this, _saving_extraInitializers), __runInitializers(this, _deleting_initializers, false));
                this.webspaceKey = __runInitializers(this, _deleting_extraInitializers);
                this.webspaceKey = webspaceKey;
                services_1.ResourceRequester.getList('snippet_areas', { webspace: webspaceKey }).then((0, mobx_1.action)((response) => {
                    this.snippetAreas = response._embedded.areas.reduce((snippetAreas, snippetArea) => {
                        snippetAreas[snippetArea.key] = snippetArea;
                        return snippetAreas;
                    }, {});
                    this.loading = false;
                }));
            }
            save(areaKey, defaultUuid) {
                this.saving = true;
                return services_1.ResourceRequester.put('snippet_areas', { defaultUuid }, { key: areaKey, webspace: this.webspaceKey })
                    .then((0, mobx_1.action)((response) => {
                    this.snippetAreas[areaKey] = response;
                    this.saving = false;
                }));
            }
            delete(areaKey) {
                this.deleting = true;
                return services_1.ResourceRequester.delete('snippet_areas', { key: areaKey, webspace: this.webspaceKey })
                    .then((0, mobx_1.action)((response) => {
                    this.snippetAreas[areaKey] = response;
                    this.deleting = false;
                }));
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _snippetAreas_decorators = [mobx_1.observable];
            _loading_decorators = [mobx_1.observable];
            _saving_decorators = [mobx_1.observable];
            _deleting_decorators = [mobx_1.observable];
            _save_decorators = [mobx_1.action];
            _delete_decorators = [mobx_1.action];
            __esDecorate(_a, null, _save_decorators, { kind: "method", name: "save", static: false, private: false, access: { has: obj => "save" in obj, get: obj => obj.save }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _delete_decorators, { kind: "method", name: "delete", static: false, private: false, access: { has: obj => "delete" in obj, get: obj => obj.delete }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, null, _snippetAreas_decorators, { kind: "field", name: "snippetAreas", static: false, private: false, access: { has: obj => "snippetAreas" in obj, get: obj => obj.snippetAreas, set: (obj, value) => { obj.snippetAreas = value; } }, metadata: _metadata }, _snippetAreas_initializers, _snippetAreas_extraInitializers);
            __esDecorate(null, null, _loading_decorators, { kind: "field", name: "loading", static: false, private: false, access: { has: obj => "loading" in obj, get: obj => obj.loading, set: (obj, value) => { obj.loading = value; } }, metadata: _metadata }, _loading_initializers, _loading_extraInitializers);
            __esDecorate(null, null, _saving_decorators, { kind: "field", name: "saving", static: false, private: false, access: { has: obj => "saving" in obj, get: obj => obj.saving, set: (obj, value) => { obj.saving = value; } }, metadata: _metadata }, _saving_initializers, _saving_extraInitializers);
            __esDecorate(null, null, _deleting_decorators, { kind: "field", name: "deleting", static: false, private: false, access: { has: obj => "deleting" in obj, get: obj => obj.deleting, set: (obj, value) => { obj.deleting = value; } }, metadata: _metadata }, _deleting_initializers, _deleting_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.default = SnippetAreaStore;
