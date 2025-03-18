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
const Form_1 = require("../../../containers/Form");
let AbstractFormToolbarAction = (() => {
    var _a;
    let _instanceExtraInitializers = [];
    let _get_conditionData_decorators;
    return _a = class AbstractFormToolbarAction {
            get conditionData() {
                const data = this.resourceFormStore.data;
                const formInspector = this.formInspector;
                return Form_1.conditionDataProviderRegistry.getAll().reduce(function (data, conditionDataProvider) {
                    return Object.assign(Object.assign({}, data), conditionDataProvider(data, undefined, formInspector));
                }, Object.assign({}, (0, mobx_1.toJS)(data)));
            }
            constructor(resourceFormStore, form, router, locales, options, parentResourceStore) {
                this.resourceFormStore = __runInitializers(this, _instanceExtraInitializers);
                this.resourceFormStore = resourceFormStore;
                this.formInspector = new Form_1.FormInspector(this.resourceFormStore);
                this.form = form;
                this.router = router;
                this.locales = locales;
                this.options = options;
                this.parentResourceStore = parentResourceStore;
            }
            setLocales(locales) {
                this.locales = locales;
            }
            // eslint-disable-next-line no-unused-vars
            getNode(index) {
                return null;
            }
            getToolbarItemConfig() {
                throw new Error('The getToolbarItemConfig method must be implemented by the sub class!');
            }
            destroy() {
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _get_conditionData_decorators = [mobx_1.computed];
            __esDecorate(_a, null, _get_conditionData_decorators, { kind: "getter", name: "conditionData", static: false, private: false, access: { has: obj => "conditionData" in obj, get: obj => obj.conditionData }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.default = AbstractFormToolbarAction;
