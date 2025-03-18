"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_STORE_KEY = void 0;
const ToolbarStore_1 = __importDefault(require("./ToolbarStore"));
exports.DEFAULT_STORE_KEY = 'default';
class ToolbarStorePool {
    constructor() {
        this.stores = {};
        this.createStore = (key) => {
            if (this.hasStore(key)) {
                throw new Error('The store with the key "' + key + '" already exists.');
            }
            const toolbarStore = new ToolbarStore_1.default();
            this.stores[key] = toolbarStore;
            return toolbarStore;
        };
        this.destroyStore = (key) => {
            if (!this.hasStore(key)) {
                throw new Error('The store you want to destroy with the key "' + key + '" does not exist!');
            }
            this.stores[key].destroy();
            this.stores[key] = null;
        };
        this.hasStore = (key) => {
            return !!this.stores[key];
        };
        this.getStore = (key) => {
            if (!this.hasStore(key)) {
                throw new Error('Store with the key "' + key + '" not found! Calling "withToolbar" before ' +
                    'initializing the "Toolbar" component can be a cause for this error.');
            }
            return this.stores[key];
        };
        this.setToolbarConfig = (key, config) => {
            const toolbar = this.getStore(key);
            toolbar.setConfig(config);
        };
    }
}
exports.default = new ToolbarStorePool();
