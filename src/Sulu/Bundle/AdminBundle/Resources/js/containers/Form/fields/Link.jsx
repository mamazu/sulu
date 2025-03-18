"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const mobx_1 = require("mobx");
const loglevel_1 = __importDefault(require("loglevel"));
const userStore_1 = __importDefault(require("../../../stores/userStore"));
const Link_1 = __importDefault(require("../../Link/Link"));
class Link extends react_1.default.Component {
    render() {
        const { disabled, formInspector, onChange, onFinish, value, schemaOptions: { enable_anchor: { value: enableAnchor, } = {}, enable_query: { value: enableQuery, } = {}, enable_target: { value: deprecatedEnableTarget, } = {}, enable_title: { value: deprecatedEnableTitle, } = {}, enable_attributes: { value: enableAttributes, } = {}, types: { value: unvalidatedTypes, } = {}, excluded_types: { value: unvalidatedExcludedTypes, } = {}, }, } = this.props;
        if (enableAnchor !== undefined && enableAnchor !== null && typeof enableAnchor !== 'boolean') {
            throw new Error('The "enable_anchor" schema option must be a boolean if given!');
        }
        if (enableQuery !== undefined && enableQuery !== null && typeof enableQuery !== 'boolean') {
            throw new Error('The "enable_query" schema option must be a boolean if given!');
        }
        let enableTarget = false, enableTitle = false, enableRel = false;
        if (enableAttributes !== undefined && enableAttributes !== null) {
            if (typeof enableAttributes !== 'boolean') {
                throw new Error('The "enable_attributes" schema option must be a boolean!');
            }
            enableTarget = enableAttributes;
            enableTitle = enableAttributes;
            enableRel = enableAttributes;
        }
        else {
            if (deprecatedEnableTarget !== undefined && deprecatedEnableTarget !== null) {
                loglevel_1.default.warn('The "enable_target" schema option is deprecated since version 2.5 and will be removed. ' +
                    'Use the "enable_attributes" option instead.');
                if (typeof deprecatedEnableTarget !== 'boolean') {
                    throw new Error('The "enable_target" schema option must be a boolean!');
                }
                enableTarget = deprecatedEnableTarget;
            }
            if (deprecatedEnableTitle !== undefined && deprecatedEnableTitle !== null) {
                loglevel_1.default.warn('The "enable_title" schema option is deprecated since version 2.5 and will be removed. ' +
                    'Use the "enable_attributes" option instead.');
                if (typeof deprecatedEnableTitle !== 'boolean') {
                    throw new Error('The "enable_title" schema option must be a boolean!');
                }
                enableTitle = deprecatedEnableTitle;
            }
        }
        const locale = formInspector.locale ? formInspector.locale : mobx_1.observable.box(userStore_1.default.contentLocale);
        let providerTypes;
        if (unvalidatedTypes) {
            if (!(0, mobx_1.isArrayLike)(unvalidatedTypes)) {
                throw new Error('The "types" schema option must be an array!');
            }
            const types = unvalidatedTypes;
            if (types.length === 0) {
                throw new Error('The "types" schema option must contain some values!');
            }
            providerTypes = types.map((type) => {
                if (typeof type.name !== 'string') {
                    throw new Error('Every type in the "types" schemaOption must contain a string as name');
                }
                return type.name;
            });
        }
        let excludedProviderTypes = [];
        if (unvalidatedExcludedTypes) {
            if (!(0, mobx_1.isArrayLike)(unvalidatedExcludedTypes)) {
                throw new Error('The "excluded_types" schema option must be an array!');
            }
            const excludedTypes = unvalidatedExcludedTypes;
            if (excludedTypes.length === 0) {
                throw new Error('The "excluded_types" schema option must contain some values!');
            }
            excludedProviderTypes = excludedTypes.map((type) => {
                if (typeof type.name !== 'string') {
                    throw new Error('Every type in the "excluded_types" schemaOption must contain a string as name');
                }
                return type.name;
            });
        }
        return (<Link_1.default disabled={!!disabled} enableAnchor={enableAnchor} enableQuery={enableQuery} enableRel={enableRel} enableTarget={enableTarget} enableTitle={enableTitle} excludedTypes={excludedProviderTypes} locale={locale} onChange={onChange} onFinish={onFinish} types={providerTypes} value={value}/>);
    }
}
exports.default = Link;
