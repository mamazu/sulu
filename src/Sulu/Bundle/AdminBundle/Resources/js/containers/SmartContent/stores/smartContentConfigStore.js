"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SmartContentConfigStore {
    clear() {
        this.config = {};
    }
    setConfig(config) {
        this.config = config;
    }
    getConfig(provider) {
        return this.config[provider];
    }
    getDefaultValue(provider, presentations) {
        const config = this.getConfig(provider);
        return {
            audienceTargeting: config.audienceTargeting ? false : undefined,
            categories: undefined,
            categoryOperator: config.categories ? 'or' : undefined,
            dataSource: undefined,
            includeSubFolders: config.datasourceResourceKey ? false : undefined,
            limitResult: undefined,
            presentAs: presentations.length > 0 ? presentations[0].name : undefined,
            sortBy: config.sorting.length > 0 ? config.sorting[0].name : undefined,
            sortMethod: config.sorting.length > 0 ? 'asc' : undefined,
            tagOperator: config.tags ? 'or' : undefined,
            types: config.types.length > 0 ? config.types.map((type) => type.value) : undefined,
            tags: undefined,
        };
    }
}
exports.default = new SmartContentConfigStore();
