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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mobx_1 = require("mobx");
const react_1 = __importDefault(require("react"));
const GhostIndicator_1 = __importDefault(require("../../../components/GhostIndicator"));
const PublishIndicator_1 = __importDefault(require("../../../components/PublishIndicator"));
const Table_1 = __importDefault(require("../../../components/Table"));
const listFieldTransformerRegistry_1 = __importDefault(require("../registries/listFieldTransformerRegistry"));
const AbstractAdapter_1 = __importDefault(require("./AbstractAdapter"));
const abstractTableAdapter_scss_1 = __importDefault(require("./abstractTableAdapter.scss"));
let AbstractTableAdapter = (() => {
    var _a;
    let _classSuper = AbstractAdapter_1.default;
    let _instanceExtraInitializers = [];
    let _get_schema_decorators;
    return _a = class AbstractTableAdapter extends _classSuper {
            get schema() {
                const { schema } = this.props;
                const newSchema = {};
                for (const key of Object.keys(schema)) {
                    if (schema[key].visibility === 'never' || schema[key].visibility === 'no') {
                        continue;
                    }
                    newSchema[key] = schema[key];
                }
                return newSchema;
            }
            renderCells(item) {
                const schemaKeys = Object.keys(this.schema);
                return schemaKeys.map((schemaKey, index) => {
                    const transformer = listFieldTransformerRegistry_1.default.get(this.schema[schemaKey].type);
                    const value = transformer.transform(item[schemaKey], this.schema[schemaKey].transformerTypeParameters, item);
                    const indicators = [];
                    if (index === 0) {
                        if (item.ghostLocale) {
                            indicators.push(<GhostIndicator_1.default className={abstractTableAdapter_scss_1.default.ghostIndicator} key="ghost" locale={item.ghostLocale}/>);
                        }
                        else {
                            if (item.publishedState !== undefined || item.published !== undefined) {
                                const draft = !item.publishedState;
                                const published = !!item.published;
                                if (draft || !published) {
                                    indicators.push(<PublishIndicator_1.default className={abstractTableAdapter_scss_1.default.publishIndicator} draft={draft} key="publish" published={published}/>);
                                }
                            }
                        }
                    }
                    return (<Table_1.default.Cell key={item.id + schemaKey} width={this.schema[schemaKey].width}>
                    {indicators}
                    {value}
                </Table_1.default.Cell>);
                });
            }
            renderHeaderCells() {
                const { onSort, sortColumn, sortOrder } = this.props;
                const schemaKeys = Object.keys(this.schema);
                return schemaKeys.map((schemaKey) => {
                    const columnSchema = this.schema[schemaKey];
                    const label = columnSchema.label ? columnSchema.label : schemaKey;
                    return (<Table_1.default.HeaderCell key={schemaKey} name={schemaKey} onClick={columnSchema.sortable ? onSort : undefined} sortOrder={sortColumn === schemaKey ? sortOrder : undefined} width={this.schema[schemaKey].width}>
                    {label}
                </Table_1.default.HeaderCell>);
                });
            }
            constructor() {
                super(...arguments);
                __runInitializers(this, _instanceExtraInitializers);
            }
        },
        (() => {
            var _b;
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_b = _classSuper[Symbol.metadata]) !== null && _b !== void 0 ? _b : null) : void 0;
            _get_schema_decorators = [mobx_1.computed];
            __esDecorate(_a, null, _get_schema_decorators, { kind: "getter", name: "schema", static: false, private: false, access: { has: obj => "schema" in obj, get: obj => obj.schema }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a.hasColumnOptions = true,
        _a.defaultProps = {
            data: [],
        },
        _a;
})();
exports.default = AbstractTableAdapter;
