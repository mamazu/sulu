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
Object.defineProperty(exports, "__esModule", { value: true });
const sidebarStore_1 = __importStar(require("../../stores/sidebarStore"));
beforeEach(() => {
    sidebarStore_1.default.clearConfig();
});
test('Set sidebar config and let mobx react', () => {
    const config = {
        view: 'preview',
        props: {
            id: 1,
        },
    };
    sidebarStore_1.default.setConfig(config);
    expect(sidebarStore_1.default.enabled).toEqual(true);
    expect(sidebarStore_1.default.view).toEqual(config.view);
    expect(sidebarStore_1.default.props).toEqual(config.props);
    expect(sidebarStore_1.default.size).toEqual('medium');
});
test('Default size of sidebar should be small', () => {
    sidebarStore_1.default.setConfig({
        view: 'preview',
    });
    expect(sidebarStore_1.default.view).toEqual('preview');
    expect(sidebarStore_1.default.size).toEqual(sidebarStore_1.DEFAULT_SIZE);
});
test('Set sidebar size', () => {
    expect(sidebarStore_1.default.size).toEqual(null);
    sidebarStore_1.default.setSize('large');
    expect(sidebarStore_1.default.size).toEqual('large');
});
test('Clear sidebar config', () => {
    sidebarStore_1.default.setConfig({
        view: 'preview',
    });
    expect(sidebarStore_1.default.view).toEqual('preview');
    sidebarStore_1.default.clearConfig();
    expect(sidebarStore_1.default.view).toEqual(undefined);
});
test('Use default size if current size not supported', () => {
    sidebarStore_1.default.size = 'large';
    sidebarStore_1.default.setConfig({
        view: 'preview',
        sizes: ['small'],
        defaultSize: 'small',
    });
    expect(sidebarStore_1.default.size).toEqual('small');
});
test('Use default size if current size not set', () => {
    sidebarStore_1.default.clearConfig();
    sidebarStore_1.default.setConfig({
        view: 'preview',
        sizes: ['small'],
        defaultSize: 'small',
    });
    expect(sidebarStore_1.default.size).toEqual('small');
});
test('Throw error when size is not supported', () => {
    sidebarStore_1.default.setConfig({
        view: 'preview',
        sizes: ['small'],
        defaultSize: 'small',
    });
    expect(() => {
        sidebarStore_1.default.setSize('medium');
    }).toThrow(new Error('Size "medium" is not supported by view. Supported: ["small"]'));
});
