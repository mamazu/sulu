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
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const Router_1 = __importStar(require("../../../services/Router"));
const Tabs_1 = __importDefault(require("../Tabs"));
const Requester_1 = __importDefault(require("../../../services/Requester"));
jest.mock('../../../services/Requester', () => ({
    get: jest.fn(),
}));
Requester_1.default.handleResponseHooks = [];
jest.mock('debounce', () => jest.fn((callback) => callback));
window.ResizeObserver = jest.fn(function () {
    this.observe = jest.fn();
    this.disconnect = jest.fn();
});
jest.mock('../../../services/Router/Router', () => jest.fn());
jest.mock('../../../utils/Translator', () => ({
    translate: jest.fn((key) => key),
}));
test('Should render the children after the tabs', () => {
    const childRoute1 = new Router_1.Route({
        name: 'route1',
        options: {
            tabTitle: 'tabTitle1',
        },
        path: '/route1',
        type: 'route1',
    });
    const childRoute2 = new Router_1.Route({
        name: 'route2',
        options: {
            tabTitle: 'tabTitle2',
        },
        path: '/route2',
        type: 'route1',
    });
    const route = new Router_1.Route({
        name: 'parent',
        options: {
            resourceKey: 'test',
        },
        path: '/parent',
        type: 'route1',
    });
    route.children.push(childRoute1);
    route.children.push(childRoute2);
    const attributes = {
        id: 1,
    };
    Router_1.default.mockImplementation(function () {
        this.attributes = attributes;
        this.redirect = jest.fn();
        this.route = route;
    });
    const router = new Router_1.default({});
    const Child = () => (<h1>Child</h1>);
    expect((0, enzyme_1.render)(<Tabs_1.default isRootView={true} route={route} router={router}>{() => (<Child />)}</Tabs_1.default>)).toMatchSnapshot();
});
test('Should render the tab badges', () => {
    const promise = Promise.resolve({ count: 2 });
    Requester_1.default.get.mockReturnValue(promise);
    Requester_1.default.handleResponseHooks = [];
    const childRoute1 = new Router_1.Route({
        name: 'route1',
        options: {
            tabTitle: 'tabTitle1',
            tabBadges: [
                {
                    dataPath: '/count',
                    requestParameters: {
                        foo: 'bar',
                        bar: 'baz',
                    },
                    routeName: 'app.notification_count',
                    routerAttributesToRequest: {
                        locale: 'locale',
                        id: 'entityId',
                    },
                    visibleCondition: 'value != 0',
                },
            ],
        },
        path: '/route1',
        type: 'route1',
    });
    const route = new Router_1.Route({
        name: 'parent',
        options: {
            resourceKey: 'test',
        },
        path: '/parent',
        type: 'route1',
    });
    route.children.push(childRoute1);
    const attributes = {
        id: 1,
    };
    Router_1.default.mockImplementation(function () {
        this.attributes = attributes;
        this.redirect = jest.fn();
        this.route = route;
    });
    const router = new Router_1.default({});
    const Child = () => (<h1>Child</h1>);
    const tabs = (0, enzyme_1.mount)(<Tabs_1.default isRootView={true} route={route} router={router}>{() => (<Child />)}</Tabs_1.default>);
    return promise.then(() => {
        tabs.update();
        const badgeContainer = tabs.children().find('Badge');
        expect(badgeContainer.children().find('Badge').length).toBe(1);
        expect(badgeContainer.children().find('Badge').text()).toBe('2');
    });
});
test('Should render the header between children and tabs', () => {
    const childRoute1 = new Router_1.Route({
        name: 'route1',
        options: {
            tabTitle: 'tabTitle1',
        },
        path: '/route1',
        type: 'route1',
    });
    const route = new Router_1.Route({
        name: 'parent',
        options: {
            resourceKey: 'test',
        },
        path: '/parent',
        type: 'route1',
    });
    route.children.push(childRoute1);
    const attributes = {
        id: 1,
    };
    Router_1.default.mockImplementation(function () {
        this.attributes = attributes;
        this.redirect = jest.fn();
        this.route = route;
    });
    const router = new Router_1.default({});
    const Child = () => (<h2>Child</h2>);
    expect((0, enzyme_1.render)(<Tabs_1.default header={<h1>Header</h1>} isRootView={true} route={route} router={router}>
            {() => (<Child />)}
        </Tabs_1.default>)).toMatchSnapshot();
});
test('Should render the children with the passed props', () => {
    const childRoute1 = new Router_1.Route({
        name: 'route1',
        options: {
            tabTitle: 'tabTitle1',
        },
        path: '/route1',
        type: 'route1',
    });
    const route = new Router_1.Route({
        name: 'parent',
        options: {
            resourceKey: 'test',
        },
        path: '/parent',
        type: 'route1',
    });
    route.children.push(childRoute1);
    const attributes = {
        id: 1,
    };
    Router_1.default.mockImplementation(function () {
        this.attributes = attributes;
        this.redirect = jest.fn();
        this.route = route;
    });
    const router = new Router_1.default({});
    const Child = ({ test, }) => (<h2>{test}</h2>);
    expect((0, enzyme_1.render)(<Tabs_1.default childrenProps={{ test: 'Value' }} isRootView={true} route={route} router={router}>
            {(props) => (<Child {...props}/>)}
        </Tabs_1.default>)).toMatchSnapshot();
});
test('Should render the active child with disabledTabGap option', () => {
    const childRoute1 = new Router_1.Route({
        name: 'route1',
        options: {
            tabTitle: 'tabTitle1',
            disableTabGap: true,
        },
        path: '/route1',
        type: 'route1',
    });
    const childRoute2 = new Router_1.Route({
        name: 'route2',
        options: {
            tabTitle: 'tabTitle2',
        },
        path: '/route2',
        type: 'route1',
    });
    const route = new Router_1.Route({
        name: 'parent',
        options: {
            resourceKey: 'test',
        },
        path: '/parent',
        type: 'route1',
    });
    route.children.push(childRoute1);
    route.children.push(childRoute2);
    const attributes = {
        id: 1,
    };
    const activeRoute = route.children[1];
    Router_1.default.mockImplementation(function () {
        this.attributes = attributes;
        this.redirect = jest.fn();
        this.route = activeRoute;
    });
    const router = new Router_1.default({});
    const Child = () => (<h1>Child</h1>);
    expect((0, enzyme_1.render)(<Tabs_1.default route={route} router={router} selectedIndex={0}>
            {() => (<Child route={activeRoute}/>)}
        </Tabs_1.default>)).toMatchSnapshot();
});
test('Should consider the tabOrder when rendering the tabs', () => {
    const childRoute1 = new Router_1.Route({
        name: 'route1',
        options: {
            tabOrder: 40,
            tabTitle: 'tabTitle1',
        },
        path: '/route1',
        type: 'route1',
    });
    const childRoute2 = new Router_1.Route({
        name: 'route2',
        options: {
            tabOrder: 30,
            tabTitle: 'tabTitle2',
        },
        path: '/route2',
        type: 'route2',
    });
    const childRoute3 = new Router_1.Route({
        name: 'route3',
        options: {
            tabOrder: 50,
            tabTitle: 'tabTitle3',
        },
        path: '/route3',
        type: 'route3',
    });
    const route = new Router_1.Route({
        name: 'parent',
        options: {
            resourceKey: 'test',
        },
        path: '/parent',
        type: 'route1',
    });
    route.children.push(childRoute1);
    route.children.push(childRoute2);
    route.children.push(childRoute3);
    const attributes = {
        id: 1,
    };
    Router_1.default.mockImplementation(function () {
        this.attributes = attributes;
        this.redirect = jest.fn();
        this.route = route;
    });
    const router = new Router_1.default({});
    const Child = () => (<h1>Child</h1>);
    const tabs = (0, enzyme_1.mount)(<Tabs_1.default route={route} router={router}>{() => (<Child />)}</Tabs_1.default>);
    expect(tabs.find('Tab').at(0).text()).toEqual('tabTitle2');
    expect(tabs.find('Tab').at(1).text()).toEqual('tabTitle1');
    expect(tabs.find('Tab').at(2).text()).toEqual('tabTitle3');
});
test('Should mark currently active tab as selected according to prop', (done) => {
    const childRoute1 = new Router_1.Route({
        name: 'route1',
        options: {
            tabTitle: 'tabTitle1',
        },
        path: '/route1',
        type: 'route1',
    });
    const childRoute2 = new Router_1.Route({
        name: 'route2',
        options: {
            tabTitle: 'tabTitle2',
        },
        path: '/route2',
        type: 'route1',
    });
    const route = new Router_1.Route({
        name: 'parent',
        options: {
            resourceKey: 'test',
        },
        path: '/parent',
        type: 'route1',
    });
    route.children.push(childRoute1);
    route.children.push(childRoute2);
    const attributes = {
        id: 1,
    };
    const activeRoute = route.children[1];
    Router_1.default.mockImplementation(function () {
        this.attributes = attributes;
        this.redirect = jest.fn();
        this.route = activeRoute;
    });
    const router = new Router_1.default({});
    const Child = () => (<h1>Child</h1>);
    const tabs = (0, enzyme_1.mount)(<Tabs_1.default route={route} router={router} selectedIndex={0}>{() => (<Child route={activeRoute}/>)}</Tabs_1.default>);
    setTimeout(() => {
        expect(router.redirect).not.toBeCalled();
        expect(tabs.find('Tab').at(0).prop('selected')).toEqual(true);
        expect(tabs.find('Tab').at(1).prop('selected')).toEqual(false);
        done();
    });
});
test('Should mark currently active tab as selected', (done) => {
    const childRoute1 = new Router_1.Route({
        name: 'route1',
        options: {
            tabTitle: 'tabTitle1',
        },
        path: '/route1',
        type: 'route1',
    });
    const childRoute2 = new Router_1.Route({
        name: 'route2',
        options: {
            tabTitle: 'tabTitle2',
        },
        path: '/route2',
        type: 'route1',
    });
    const route = new Router_1.Route({
        name: 'parent',
        options: {
            resourceKey: 'test',
        },
        path: '/parent',
        type: 'route1',
    });
    route.children.push(childRoute1);
    route.children.push(childRoute2);
    const attributes = {
        id: 1,
    };
    const activeRoute = route.children[1];
    Router_1.default.mockImplementation(function () {
        this.attributes = attributes;
        this.redirect = jest.fn();
        this.route = activeRoute;
    });
    const router = new Router_1.default({});
    const Child = () => (<h1>Child</h1>);
    const tabs = (0, enzyme_1.mount)(<Tabs_1.default route={route} router={router}>{() => (<Child route={activeRoute}/>)}</Tabs_1.default>);
    setTimeout(() => {
        expect(router.redirect).not.toBeCalled();
        expect(tabs.find('Tab').at(0).prop('selected')).toEqual(false);
        expect(tabs.find('Tab').at(1).prop('selected')).toEqual(true);
        done();
    });
});
test('Should redirect to child route with highest priority if no tab is active by default', (done) => {
    const childRoute1 = new Router_1.Route({
        name: 'route1',
        options: {
            tabTitle: 'tabTitle1',
        },
        path: '/route1',
        type: 'route1',
    });
    const childRoute2 = new Router_1.Route({
        name: 'route2',
        options: {
            tabPriority: 100,
            tabTitle: 'tabTitle2',
        },
        path: '/route2',
        type: 'route1',
    });
    const route = new Router_1.Route({
        name: 'parent',
        options: {
            resourceKey: 'test',
        },
        path: '/parent',
        type: 'route1',
    });
    route.children.push(childRoute1);
    route.children.push(childRoute2);
    const attributes = {
        id: 1,
    };
    Router_1.default.mockImplementation(function () {
        this.attributes = attributes;
        this.redirect = jest.fn();
        this.route = route;
    });
    const router = new Router_1.default({});
    const Child = () => (<h1>Child</h1>);
    (0, enzyme_1.mount)(<Tabs_1.default route={route} router={router}>{() => (<Child />)}</Tabs_1.default>);
    setTimeout(() => {
        expect(router.redirect).toBeCalledWith('route2', attributes);
        done();
    });
});
test('Should redirect to child route from props with highest priority if no tab is active by default', (done) => {
    const childRoute1 = new Router_1.Route({
        name: 'route1',
        options: {
            tabTitle: 'tabTitle1',
        },
        path: '/route1',
        type: 'route1',
    });
    const childRoute2 = new Router_1.Route({
        name: 'route2',
        options: {
            tabPriority: 100,
            tabTitle: 'tabTitle2',
        },
        path: '/route2',
        type: 'route1',
    });
    const childRoutes = [childRoute1, childRoute2];
    const route = new Router_1.Route({
        name: 'parent',
        options: {
            resourceKey: 'test',
        },
        path: '/parent',
        type: 'route1',
    });
    route.children.push(childRoute1, childRoute2);
    route.children.push(childRoute2);
    const attributes = {
        id: 1,
    };
    Router_1.default.mockImplementation(function () {
        this.attributes = attributes;
        this.redirect = jest.fn();
        this.route = route;
    });
    const router = new Router_1.default({});
    const Child = () => (<h1>Child</h1>);
    (0, enzyme_1.mount)(<Tabs_1.default route={route} routeChildren={childRoutes} router={router}>{() => (<Child />)}</Tabs_1.default>);
    setTimeout(() => {
        expect(router.redirect).toBeCalledWith('route2', attributes);
        done();
    });
});
test('Navigate to tab if it was clicked', () => {
    const childRoute1 = new Router_1.Route({
        name: 'route1',
        options: {
            tabTitle: 'tabTitle1',
        },
        path: '/route1',
        type: 'route1',
    });
    const childRoute2 = new Router_1.Route({
        name: 'route2',
        options: {
            tabTitle: 'tabTitle2',
        },
        path: '/route2',
        type: 'route1',
    });
    const route = new Router_1.Route({
        name: 'parent',
        options: {
            resourceKey: 'test',
        },
        path: '/parent',
        type: 'route1',
    });
    route.children.push(childRoute1);
    route.children.push(childRoute2);
    const attributes = {
        id: 1,
    };
    Router_1.default.mockImplementation(function () {
        this.attributes = attributes;
        this.navigate = jest.fn();
        this.redirect = jest.fn();
        this.route = route;
    });
    const router = new Router_1.default({});
    const Child = () => (<h1>Child</h1>);
    const tabs = (0, enzyme_1.mount)(<Tabs_1.default route={route} router={router}>{() => (<Child />)}</Tabs_1.default>);
    tabs.find('Tab button').at(1).simulate('click');
    expect(router.navigate).toBeCalledWith('route2', attributes);
});
test('Navigate to tab if it was clicked', () => {
    const childRoute1 = new Router_1.Route({
        name: 'route1',
        options: {
            tabTitle: 'tabTitle1',
        },
        path: '/route1',
        type: 'route1',
    });
    const childRoute2 = new Router_1.Route({
        name: 'route2',
        options: {
            tabTitle: 'tabTitle2',
        },
        path: '/route2',
        type: 'route1',
    });
    const route = new Router_1.Route({
        name: 'parent',
        options: {
            resourceKey: 'test',
            routerAttributesToBlacklist: ['sortColumn', 'sortOrder'],
        },
        path: '/parent',
        type: 'route1',
    });
    route.children.push(childRoute1);
    route.children.push(childRoute2);
    const attributes = {
        id: 1,
        sortColumn: 'size',
        sortOrder: 'asc',
    };
    Router_1.default.mockImplementation(function () {
        this.attributes = attributes;
        this.navigate = jest.fn();
        this.redirect = jest.fn();
        this.route = route;
    });
    const router = new Router_1.default({});
    const Child = () => (<h1>Child</h1>);
    const tabs = (0, enzyme_1.mount)(<Tabs_1.default route={route} router={router}>{() => (<Child />)}</Tabs_1.default>);
    tabs.find('Tab button').at(1).simulate('click');
    expect(router.navigate).toBeCalledWith('route2', { id: 1 });
});
