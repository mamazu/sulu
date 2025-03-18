"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FORM_TYPE = void 0;
const mobx_1 = require("mobx");
const metadataStore_1 = __importDefault(require("../../../stores/metadataStore"));
exports.FORM_TYPE = 'form';
class MetadataStore {
    getSchemaTypes(formKey, metadataOptions) {
        return metadataStore_1.default.loadMetadata(exports.FORM_TYPE, formKey, metadataOptions)
            .then((configuration) => {
            const { defaultType, types } = configuration;
            if (!types) {
                return null;
            }
            return {
                defaultType,
                types: Object.keys(types).reduce((transformedTypes, key) => {
                    transformedTypes[key] = {
                        key,
                        title: types[key].title || key,
                    };
                    return transformedTypes;
                }, {}),
            };
        });
    }
    getSchema(formKey, type, metadataOptions) {
        return metadataStore_1.default.loadMetadata(exports.FORM_TYPE, formKey, metadataOptions)
            .then((configuration) => {
            const typeConfiguration = this.getTypeConfiguration(configuration, type, formKey);
            if (!typeConfiguration && type) {
                throw new Error('Type "' + type + '" not found for the formKey "' + formKey + '"');
            }
            if (!('form' in typeConfiguration)) {
                let errorMessage = 'There is no form schema for the formKey "' + formKey + '"';
                if (type) {
                    errorMessage += ' for the type "' + type + '"';
                }
                throw new Error(errorMessage);
            }
            if (!this.hasGlobalBlock(typeConfiguration)) {
                return {
                    typeConfiguration,
                    blockSchema: null,
                };
            }
            return metadataStore_1.default.loadMetadata(exports.FORM_TYPE, 'block', {}).then((blockSchema) => {
                return {
                    typeConfiguration,
                    blockSchema,
                };
            });
        }).then(({ typeConfiguration, blockSchema }) => {
            if (!blockSchema) {
                return typeConfiguration.form;
            }
            return this.enhanceBlockForm(typeConfiguration.form, blockSchema);
        });
    }
    enhanceBlockForm(form, blockSchema) {
        Object.keys(form).forEach((schemaFieldKey) => {
            if (form[schemaFieldKey].type === 'section') {
                form[schemaFieldKey].items = this.enhanceBlockForm(form[schemaFieldKey].items, blockSchema);
                return;
            }
            if (!form[schemaFieldKey].types) {
                return;
            }
            Object.keys(form[schemaFieldKey].types).forEach((key) => {
                if (!form[schemaFieldKey].types
                    || Object.keys((0, mobx_1.toJS)(form[schemaFieldKey].types[key].form)).length > 0) {
                    form[schemaFieldKey].types[key].form = this.enhanceBlockForm(form[schemaFieldKey].types[key].form, blockSchema);
                    return;
                }
                if (form[schemaFieldKey].types && blockSchema.types[key]) {
                    form[schemaFieldKey].types[key].form = this.enhanceBlockForm(blockSchema.types[key].form, blockSchema);
                }
            });
        });
        return form;
    }
    hasGlobalBlock(typeConfiguration) {
        return undefined !== Object.keys(typeConfiguration.form).find((schemaFieldKey) => {
            if (typeConfiguration.form[schemaFieldKey].type === 'section') {
                return this.hasGlobalBlock({ form: typeConfiguration.form[schemaFieldKey].items });
            }
            if (!typeConfiguration.form[schemaFieldKey].types) {
                return false;
            }
            return undefined !== Object.keys(typeConfiguration.form[schemaFieldKey].types).find((key) => {
                if (!typeConfiguration.form[schemaFieldKey].types
                    || (0, mobx_1.toJS)(typeConfiguration.form[schemaFieldKey].types[key].form).length > 0) {
                    return false;
                }
                return !!typeConfiguration.form[schemaFieldKey].types;
            });
        });
    }
    getJsonSchema(formKey, type, metadataOptions) {
        return metadataStore_1.default.loadMetadata(exports.FORM_TYPE, formKey, metadataOptions)
            .then((configuration) => {
            const typeConfiguration = this.getTypeConfiguration(configuration, type, formKey);
            if (!('schema' in typeConfiguration)) {
                let errorMessage = 'There is no json schema for the formKey "' + formKey + '"';
                if (type) {
                    errorMessage += ' for the type "' + type + '"';
                }
                throw new Error(errorMessage);
            }
            return typeConfiguration.schema;
        });
    }
    getTypeConfiguration(configuration, type, formKey) {
        if (configuration.types && !type) {
            throw new Error('The "' + formKey + '" configuration requires a type for loading the form schema');
        }
        if (!configuration.types && type) {
            throw new Error('The "' + formKey + '" configuration does not support types,'
                + ' but a type of "' + type + '" was given');
        }
        return configuration.types ? configuration.types[type] : configuration;
    }
}
exports.default = new MetadataStore();
