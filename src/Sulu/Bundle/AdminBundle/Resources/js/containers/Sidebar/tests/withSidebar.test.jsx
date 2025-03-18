"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const mobx_1 = require("mobx");
const enzyme_1 = require("enzyme");
const sidebarStore_1 = __importDefault(require("../stores/sidebarStore"));
const withSidebar_1 = __importDefault(require("../withSidebar"));
jest.mock('../stores/sidebarStore', () => ({
    setConfig: jest.fn(),
    clearConfig: jest.fn(),
}));
test('Pass props to rendered component', () => {
    const Component = class Component extends react_1.default.Component {
        render() {
            return <h1>{this.props.title}</h1>;
        }
    };
    const ComponentWithSidebar = (0, withSidebar_1.default)(Component, () => {
        return null;
    });
    expect((0, enzyme_1.render)(<ComponentWithSidebar title="Test"/>)).toMatchSnapshot();
});
test('Bind sidebar method to component instance', () => {
    const Component = class Component extends react_1.default.Component {
        constructor() {
            super(...arguments);
            this.sidebarView = 'preview';
        }
        render() {
            return <h1>Test</h1>;
        }
    };
    const ComponentWithSidebar = (0, withSidebar_1.default)(Component, function () {
        return {
            view: this.sidebarView,
        };
    });
    const router = {
        addUpdateRouteHook: jest.fn(),
    };
    (0, enzyme_1.mount)(<ComponentWithSidebar router={router}/>);
    expect(sidebarStore_1.default.setConfig).toBeCalledWith({
        view: 'preview',
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
    const ComponentWithSidebar = (0, withSidebar_1.default)(Component, () => {
        return null;
    });
    const router = {
        addUpdateRouteHook: jest.fn(),
    };
    const component = (0, enzyme_1.mount)(<ComponentWithSidebar router={router}/>);
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
    const ComponentWithToolbar = (0, withSidebar_1.default)(Component, () => ({ view: 'test1' }));
    const updateRouteHookDisposer = jest.fn();
    const router = {
        addUpdateRouteHook: jest.fn().mockReturnValue(updateRouteHookDisposer),
    };
    const component = (0, enzyme_1.mount)(<ComponentWithToolbar router={router}/>);
    expect(sidebarStore_1.default.setConfig).toBeCalledWith({ view: 'test1' });
    component.unmount();
    expect(updateRouteHookDisposer).toBeCalledWith();
    expect(sidebarStore_1.default.clearConfig).toBeCalledWith();
});
test('Dispose toolbar when a new view is rendered', () => {
    const Component = class Component extends react_1.default.Component {
        constructor() {
            super(...arguments);
            this.render = jest.fn();
        }
    };
    const config = {};
    (0, mobx_1.extendObservable)(config, { view: 'test1' });
    const ComponentWithSidebar = (0, withSidebar_1.default)(Component, () => ({ view: config.view }));
    const router = {
        addUpdateRouteHook: jest.fn(),
        route: {
            name: 'route1',
        },
    };
    (0, enzyme_1.mount)(<ComponentWithSidebar router={router}/>);
    expect(sidebarStore_1.default.setConfig).toHaveBeenLastCalledWith({ view: 'test1' });
    config.view = 'test2';
    expect(sidebarStore_1.default.setConfig).toHaveBeenLastCalledWith({ view: 'test2' });
    router.addUpdateRouteHook.mock.calls[0][0]();
    config.view = 'test3';
    expect(sidebarStore_1.default.setConfig).toHaveBeenLastCalledWith({ view: 'test2' });
});
test('Recall sidebar-function when changing observable', () => {
    const Component = (() => {
        var _a;
        let _classSuper = react_1.default.Component;
        let _sidebarView_decorators;
        let _sidebarView_initializers = [];
        let _sidebarView_extraInitializers = [];
        return _a = class Component extends _classSuper {
                render() {
                    return <h1>Test</h1>;
                }
                constructor() {
                    super(...arguments);
                    this.sidebarView = __runInitializers(this, _sidebarView_initializers, 'preview');
                    __runInitializers(this, _sidebarView_extraInitializers);
                }
            },
            (() => {
                var _b;
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_b = _classSuper[Symbol.metadata]) !== null && _b !== void 0 ? _b : null) : void 0;
                _sidebarView_decorators = [mobx_1.observable];
                __esDecorate(null, null, _sidebarView_decorators, { kind: "field", name: "sidebarView", static: false, private: false, access: { has: obj => "sidebarView" in obj, get: obj => obj.sidebarView, set: (obj, value) => { obj.sidebarView = value; } }, metadata: _metadata }, _sidebarView_initializers, _sidebarView_extraInitializers);
                if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            })(),
            _a;
    })();
    const ComponentWithSidebar = (0, withSidebar_1.default)(Component, function () {
        return { view: this.sidebarView };
    });
    const router = {
        addUpdateRouteHook: jest.fn(),
    };
    const component = (0, enzyme_1.mount)(<ComponentWithSidebar router={router}/>);
    expect(sidebarStore_1.default.setConfig).toBeCalledWith({
        view: 'preview',
    });
    component.instance().sidebarView = 'test';
    expect(sidebarStore_1.default.setConfig).toBeCalledWith({
        view: 'test',
    });
});
