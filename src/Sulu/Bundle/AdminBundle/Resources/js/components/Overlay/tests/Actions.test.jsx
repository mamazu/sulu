"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const Actions_1 = __importDefault(require("../Actions"));
test('The component should render', () => {
    const actions = [
        { title: 'Action 1', onClick: () => { } },
        { title: 'Action 2', onClick: () => { } },
    ];
    const component = (0, enzyme_1.render)(<Actions_1.default actions={actions}/>);
    expect(component).toMatchSnapshot();
});
test('The component should call the corresponding callback when an action is clicked', () => {
    const actions = [
        { title: 'Action 1', onClick: jest.fn() },
        { title: 'Action 2', onClick: jest.fn() },
    ];
    const component = (0, enzyme_1.shallow)(<Actions_1.default actions={actions}/>);
    component.find('Button').first().simulate('click');
    expect(actions[0].onClick).toBeCalled();
    expect(actions[1].onClick).not.toBeCalled();
});
