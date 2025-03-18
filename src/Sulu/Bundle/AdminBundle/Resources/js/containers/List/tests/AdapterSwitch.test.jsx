"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const enzyme_1 = require("enzyme");
const react_1 = __importDefault(require("react"));
const AdapterSwitch_1 = __importDefault(require("../AdapterSwitch"));
const AbstractAdapter_1 = __importDefault(require("../adapters/AbstractAdapter"));
const listAdapterRegistry_1 = __importDefault(require("../registries/listAdapterRegistry"));
jest.mock('../registries/listAdapterRegistry', () => ({
    add: jest.fn(),
    get: jest.fn(),
    has: jest.fn(),
}));
class LoadingStrategy {
    constructor() {
        this.destroy = jest.fn();
        this.initialize = jest.fn();
        this.load = jest.fn();
        this.reset = jest.fn();
        this.setStructureStrategy = jest.fn();
    }
}
class StructureStrategy {
    constructor() {
        this.addItem = jest.fn();
        this.clear = jest.fn();
        this.findById = jest.fn();
        this.order = jest.fn();
        this.remove = jest.fn();
    }
}
class TestAdapter extends AbstractAdapter_1.default {
    render() {
        return (<div>Test Adapter</div>);
    }
}
TestAdapter.LoadingStrategy = LoadingStrategy;
TestAdapter.StructureStrategy = StructureStrategy;
TestAdapter.icon = 'su-th-large';
beforeEach(() => {
    listAdapterRegistry_1.default.has.mockReturnValue(true);
    listAdapterRegistry_1.default.get.mockReturnValue(TestAdapter);
});
test('The component should render with current adapter "folder"', () => {
    const adapters = ['table', 'folder'];
    const currentAdapterKey = 'folder';
    const handleAdapterChange = jest.fn();
    const view = (0, enzyme_1.mount)(<AdapterSwitch_1.default adapters={adapters} currentAdapter={currentAdapterKey} onAdapterChange={handleAdapterChange}/>).render();
    expect(view).toMatchSnapshot();
});
test('The component should render with current adapter "table"', () => {
    const adapters = ['table', 'folder'];
    const currentAdapterKey = 'table';
    const handleAdapterChange = jest.fn();
    const view = (0, enzyme_1.mount)(<AdapterSwitch_1.default adapters={adapters} currentAdapter={currentAdapterKey} onAdapterChange={handleAdapterChange}/>).render();
    expect(view).toMatchSnapshot();
});
test('The component should handle adapter change correctly', () => {
    const adapters = ['table', 'folder'];
    const currentAdapterKey = 'table';
    const handleAdapterChange = jest.fn();
    const view = (0, enzyme_1.mount)(<AdapterSwitch_1.default adapters={adapters} currentAdapter={currentAdapterKey} onAdapterChange={handleAdapterChange}/>);
    // click on the active adapter shouldn't trigger the event
    view.find('Button').at(0).simulate('click');
    expect(handleAdapterChange).not.toBeCalled();
    // click on not active should trigger the event correctly
    view.find('Button').at(1).simulate('click');
    expect(handleAdapterChange).toBeCalledWith('folder');
});
