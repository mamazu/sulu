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
const react_1 = __importDefault(require("react"));
const mobx_1 = require("mobx");
const enzyme_1 = require("enzyme");
const toolbarStorePool_1 = __importStar(require("../stores/toolbarStorePool"));
const withToolbar_1 = __importDefault(require("../withToolbar"));
jest.mock('../stores/toolbarStorePool', () => ({
    setToolbarConfig: jest.fn(),
}));
test('Pass props to rendered component', () => {
    const Component = class Component extends react_1.default.Component {
        render() {
            return <h1>{this.props.title}</h1>;
        }
    };
    const ComponentWithToolbar = (0, withToolbar_1.default)(Component, () => ({}));
    expect((0, enzyme_1.render)(<ComponentWithToolbar title="Test"/>)).toMatchSnapshot();
});
test('Bind toolbar method to component instance', () => {
    const storeKey = 'testKey';
    const clickSpy = jest.fn();
    const Component = class Component extends react_1.default.Component {
        constructor() {
            super(...arguments);
            this.test = true;
        }
        render() {
            return <h1>Test</h1>;
        }
    };
    const ComponentWithToolbar = (0, withToolbar_1.default)(Component, function () {
        return {
            items: [
                {
                    disabled: this.test,
                    icon: 'su-save',
                    label: 'Save',
                    onClick: clickSpy,
                    type: 'button',
                },
            ],
        };
    }, storeKey);
    const router = {
        addUpdateRouteHook: jest.fn(),
    };
    (0, enzyme_1.mount)(<ComponentWithToolbar router={router}/>);
    expect(toolbarStorePool_1.default.setToolbarConfig).toBeCalledWith(storeKey, {
        items: [
            {
                label: 'Save',
                icon: 'su-save',
                disabled: true,
                onClick: clickSpy,
                type: 'button',
            },
        ],
    });
});
test('Call life-cycle events of rendered component', () => {
    const Component = class Component extends react_1.default.Component {
        constructor() {
            super(...arguments);
            this.componentWillUnmount = jest.fn();
            this.render = jest.fn();
        }
    };
    const ComponentWithToolbar = (0, withToolbar_1.default)(Component, () => ({}));
    const updateRouteHookDisposer = jest.fn();
    const router = {
        addUpdateRouteHook: jest.fn().mockReturnValue(updateRouteHookDisposer),
    };
    const component = (0, enzyme_1.mount)(<ComponentWithToolbar router={router}/>);
    expect(component.instance().render).toBeCalled();
    const componentWillUnmount = component.instance().componentWillUnmount;
    component.unmount();
    expect(componentWillUnmount).toBeCalled();
});
test('Reset config of toolbarStore when component is unmounted', () => {
    const Component = class Component extends react_1.default.Component {
        constructor() {
            super(...arguments);
            this.render = jest.fn();
        }
    };
    const config = {
        items: [],
    };
    const ComponentWithToolbar = (0, withToolbar_1.default)(Component, () => config, 'default');
    const updateRouteHookDisposer = jest.fn();
    const router = {
        addUpdateRouteHook: jest.fn().mockReturnValue(updateRouteHookDisposer),
    };
    const component = (0, enzyme_1.mount)(<ComponentWithToolbar router={router}/>);
    expect(toolbarStorePool_1.default.setToolbarConfig).toBeCalledWith('default', config);
    component.unmount();
    expect(updateRouteHookDisposer).toBeCalledWith();
    expect(toolbarStorePool_1.default.setToolbarConfig).toHaveBeenLastCalledWith('default', {});
});
test('Dispose toolbar when a new view is rendered', () => {
    const Component = class Component extends react_1.default.Component {
        constructor() {
            super(...arguments);
            this.render = jest.fn();
        }
    };
    const config = {};
    (0, mobx_1.extendObservable)(config, { items: [] });
    const ComponentWithToolbar = (0, withToolbar_1.default)(Component, () => ({ items: config.items.toJS() }), 'default');
    const router = {
        addUpdateRouteHook: jest.fn(),
        route: {
            name: 'route1',
        },
    };
    (0, enzyme_1.mount)(<ComponentWithToolbar router={router}/>);
    expect(toolbarStorePool_1.default.setToolbarConfig).toHaveBeenLastCalledWith('default', { items: [] });
    config.items.push({});
    expect(toolbarStorePool_1.default.setToolbarConfig).toHaveBeenLastCalledWith('default', { items: [{}] });
    router.addUpdateRouteHook.mock.calls[0][0]();
    config.items.push({});
    expect(toolbarStorePool_1.default.setToolbarConfig).toHaveBeenLastCalledWith('default', { items: [{}] });
});
test('Recall toolbar-function when changing observable', () => {
    const Component = (() => {
        var _a;
        let _classSuper = react_1.default.Component;
        let _test_decorators;
        let _test_initializers = [];
        let _test_extraInitializers = [];
        return _a = class Component extends _classSuper {
                render() {
                    return <h1>Test</h1>;
                }
                constructor() {
                    super(...arguments);
                    this.test = __runInitializers(this, _test_initializers, true);
                    __runInitializers(this, _test_extraInitializers);
                }
            },
            (() => {
                var _b;
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_b = _classSuper[Symbol.metadata]) !== null && _b !== void 0 ? _b : null) : void 0;
                _test_decorators = [mobx_1.observable];
                __esDecorate(null, null, _test_decorators, { kind: "field", name: "test", static: false, private: false, access: { has: obj => "test" in obj, get: obj => obj.test, set: (obj, value) => { obj.test = value; } }, metadata: _metadata }, _test_initializers, _test_extraInitializers);
                if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            })(),
            _a;
    })();
    const ComponentWithToolbar = (0, withToolbar_1.default)(Component, function () {
        return { disableAll: this.test };
    });
    const router = {
        addUpdateRouteHook: jest.fn(),
    };
    const component = (0, enzyme_1.mount)(<ComponentWithToolbar router={router}/>);
    expect(toolbarStorePool_1.default.setToolbarConfig).toBeCalledWith(toolbarStorePool_1.DEFAULT_STORE_KEY, {
        disableAll: true,
    });
    component.instance().test = false;
    expect(toolbarStorePool_1.default.setToolbarConfig).toBeCalledWith(toolbarStorePool_1.DEFAULT_STORE_KEY, {
        disableAll: false,
    });
});
