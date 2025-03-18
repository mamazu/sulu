"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const enzyme_1 = require("enzyme");
const react_1 = __importDefault(require("react"));
const withContainerSize_1 = __importDefault(require("../withContainerSize"));
jest.mock('../../../utils/DOM/afterElementsRendered');
test('Pass props to rendered component', () => {
    const Component = (props) => (<h1>{props.title}</h1>);
    const WithSizeComponent = (0, withContainerSize_1.default)(Component);
    expect((0, enzyme_1.render)(<WithSizeComponent title="Test"/>)).toMatchSnapshot();
});
test('Assign the passed class to the container', () => {
    const Component = () => (<h1>Component</h1>);
    const WithSizeComponent = (0, withContainerSize_1.default)(Component, 'container-class');
    expect((0, enzyme_1.render)(<WithSizeComponent />)).toMatchSnapshot();
});
test('Pass the size of the container to the component via props', () => {
    class Component extends react_1.default.PureComponent {
        constructor() {
            super(...arguments);
            this.render = () => <h1>Component</h1>;
        }
    }
    const WithSizeComponent = (0, withContainerSize_1.default)(Component);
    const view = (0, enzyme_1.mount)(<WithSizeComponent />);
    view.instance().readContainerDimensions({ clientWidth: 500, clientHeight: 600 });
    view.update();
    const component = view.find(Component);
    expect(component.props().containerWidth).toBe(500);
    expect(component.props().containerHeight).toBe(600);
});
test('The method containerDidMount should get called', () => {
    const funMock = jest.fn();
    class Component extends react_1.default.PureComponent {
        constructor() {
            super(...arguments);
            this.containerDidMount = funMock;
            this.render = () => <h1>Component</h1>;
        }
        componentDidMount() {
            // container mounts after children
            expect(funMock).toHaveBeenCalledTimes(0);
        }
    }
    const WithSizeComponent = (0, withContainerSize_1.default)(Component);
    (0, enzyme_1.mount)(<WithSizeComponent />);
    expect(funMock).toHaveBeenCalledTimes(1);
});
