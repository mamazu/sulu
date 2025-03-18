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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const mobx_1 = require("mobx");
const formToolbarActionRegistry_1 = __importDefault(require("../registries/formToolbarActionRegistry"));
const AbstractFormToolbarAction_1 = __importDefault(require("./AbstractFormToolbarAction"));
class DropdownToolbarAction extends AbstractFormToolbarAction_1.default {
    constructor(resourceFormStore, form, router, locales, options, parentResourceStore) {
        super(resourceFormStore, form, router, locales, options, parentResourceStore);
        this.toolbarActions = [];
        const { toolbarActions } = this.options;
        if (!(0, mobx_1.isArrayLike)(toolbarActions)) {
            throw new Error('The passed "toolbarActions" option must be of type object or array');
        }
        this.toolbarActions = toolbarActions.map((action) => {
            if (action === null || typeof action !== 'object') {
                throw new Error('The passed entries in the "actions" option must be objects');
            }
            const { type, options } = action;
            if (typeof type !== 'string') {
                throw new Error('The "type" of each entry in the "actions" options must be a string');
            }
            if (options === null || typeof options !== 'object') {
                throw new Error('The "options" of each entry in the "actions" options must be a string');
            }
            return new (formToolbarActionRegistry_1.default.get(type))(this.resourceFormStore, this.form, router, this.locales, options, parentResourceStore);
        });
    }
    getNode(index) {
        return (<react_1.Fragment key={'sulu_admin.dropdown' + (index || '')}>
                {this.toolbarActions.map((toolbarAction, index) => toolbarAction.getNode(index))}
            </react_1.Fragment>);
    }
    getToolbarItemConfig() {
        const { icon, label } = this.options;
        if (typeof label !== 'string') {
            throw new Error('The "label" option must be a string!');
        }
        if (typeof icon !== 'string') {
            throw new Error('The "icon" option must be a string!');
        }
        // use "Boolean" to filter undefined: https://github.com/facebook/flow/issues/1414#issuecomment-251422935
        const childToolbarItemConfigs = this.toolbarActions
            .map((toolbarAction) => toolbarAction.getToolbarItemConfig())
            .filter(Boolean);
        if (childToolbarItemConfigs.length === 0) {
            return undefined;
        }
        const options = childToolbarItemConfigs.map((toolbarItemConfig) => {
            if (toolbarItemConfig.options) {
                throw new Error('This ToolbarAction only supports child ToolbarActions not being a dropdown');
            }
            const { disabled, label, onClick } = toolbarItemConfig;
            if (!label) {
                throw new Error('Child ToolbarActions must return a "label"');
            }
            if (!onClick) {
                throw new Error('Child ToolbarActions must return a "onClick" handler');
            }
            return { disabled, label, onClick };
        });
        const loading = childToolbarItemConfigs.some((toolbarItemConfig) => toolbarItemConfig.loading);
        return {
            type: 'dropdown',
            label,
            icon,
            loading,
            options,
        };
    }
}
exports.default = DropdownToolbarAction;
