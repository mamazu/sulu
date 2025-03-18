import React from 'react';
import {extendObservable, observable} from 'mobx';
import {mount, render} from 'enzyme';
import sidebarStore from '../stores/sidebarStore';
import withSidebar from '../withSidebar';

jest.mock('../stores/sidebarStore', () => ({
    setConfig: jest.fn(),
    clearConfig: jest.fn(),
}));

test('Pass props to rendered component', () => {
    const Component = class Component extends React.Component<any> {
        render() {
            return <h1>{this.props.title}</h1>;
        }
    };

    const ComponentWithSidebar = withSidebar(Component, () => {
        return null;
    });

    expect(render(<ComponentWithSidebar title="Test" />)).toMatchSnapshot();
});

test('Bind sidebar method to component instance', () => {
    const Component = class Component extends React.Component<any> {
        sidebarView = 'preview';

        render() {
            return <h1>Test</h1>;
        }
    };

    const ComponentWithSidebar = withSidebar(Component, function() {
        return {
            view: this.sidebarView,
        };
    });

    const router = {
        addUpdateRouteHook: jest.fn(),
    } as const;

    mount(<ComponentWithSidebar router={router} />);
    expect(sidebarStore.setConfig).toBeCalledWith({
        view: 'preview',
    });
});

test('Call life-cycle events of rendered component', () => {
    const Component = class Component extends React.Component<any> {
        componentWillUnmount = jest.fn();
        render = jest.fn();
    };

    const ComponentWithSidebar = withSidebar(Component, () => {
        return null;
    });

    const router = {
        addUpdateRouteHook: jest.fn(),
    } as const;

    const component = mount(<ComponentWithSidebar router={router} />);
    expect(component.instance().render).toBeCalled();

    const componentWillUnmount = component.instance().componentWillUnmount;
    component.unmount();
    expect(componentWillUnmount).toBeCalled();
});

test('Reset config of toolbarStore when component is unmounted', () => {
    const Component = class Component extends React.Component<any> {
        render = jest.fn();
    };

    const ComponentWithToolbar = withSidebar(Component, () => ({view: 'test1'}));

    const updateRouteHookDisposer = jest.fn();
    const router = {
        addUpdateRouteHook: jest.fn().mockReturnValue(updateRouteHookDisposer),
    } as const;

    const component = mount(<ComponentWithToolbar router={router} />);
    expect(sidebarStore.setConfig).toBeCalledWith({view: 'test1'});

    component.unmount();
    expect(updateRouteHookDisposer).toBeCalledWith();
    expect(sidebarStore.clearConfig).toBeCalledWith();
});

test('Dispose toolbar when a new view is rendered', () => {
    const Component = class Component extends React.Component<any> {
        render = jest.fn();
    };

    const config: Record<string, any> = {};
    extendObservable(config, {view: 'test1'});
    const ComponentWithSidebar = withSidebar(Component, () => ({view: config.view}));

    const router = {
        addUpdateRouteHook: jest.fn(),
        route: {
            name: 'route1',
        },
    } as const;

    mount(<ComponentWithSidebar router={router} />);
    expect(sidebarStore.setConfig).toHaveBeenLastCalledWith({view: 'test1'});

    config.view = 'test2';
    expect(sidebarStore.setConfig).toHaveBeenLastCalledWith({view: 'test2'});

    router.addUpdateRouteHook.mock.calls[0][0]();
    config.view = 'test3';
    expect(sidebarStore.setConfig).toHaveBeenLastCalledWith({view: 'test2'});
});

test('Recall sidebar-function when changing observable', () => {
    const Component = class Component extends React.Component<any> {
        @observable sidebarView = 'preview';

        render() {
            return <h1>Test</h1>;
        }
    };

    const ComponentWithSidebar = withSidebar(Component, function() {
        return {view: this.sidebarView};
    });

    const router = {
        addUpdateRouteHook: jest.fn(),
    } as const;

    const component = mount(<ComponentWithSidebar router={router} />);

    expect(sidebarStore.setConfig).toBeCalledWith({
        view: 'preview',
    });

    component.instance().sidebarView = 'test';
    expect(sidebarStore.setConfig).toBeCalledWith({
        view: 'test',
    });
});
