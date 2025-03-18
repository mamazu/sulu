"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const enzyme_1 = require("enzyme");
const react_1 = __importDefault(require("react"));
const ModifiableCircle_1 = __importDefault(require("../ModifiableCircle"));
jest.mock('../../../utils/Translator', () => ({
    translate: jest.fn((key) => key),
}));
test('The component should render', () => {
    const view = (0, enzyme_1.render)(<ModifiableCircle_1.default label="" left={10} radius={100} top={20}/>);
    expect(view).toMatchSnapshot();
});
test('The component should call the double click callback', () => {
    const clickSpy = jest.fn();
    const circle = (0, enzyme_1.shallow)(<ModifiableCircle_1.default label="" onDoubleClick={clickSpy} radius={100}/>);
    circle.find('.circle').simulate('dblclick');
    expect(clickSpy).toHaveBeenCalledTimes(1);
});
test('The component should call the change callback on move', () => {
    const windowListeners = {};
    const changeSpy = jest.fn();
    window.addEventListener = jest.fn((event, cb) => windowListeners[event] = cb);
    const circle = (0, enzyme_1.mount)(<ModifiableCircle_1.default label="" onChange={changeSpy} radius={100}/>);
    expect(windowListeners.mousemove).toBeDefined();
    expect(windowListeners.mouseup).toBeDefined();
    circle.simulate('mousedown', { pageX: 10, pageY: 20 });
    windowListeners.mousemove({ pageX: 15, pageY: 30 });
    expect(changeSpy).toHaveBeenCalledTimes(1);
    expect(changeSpy).toHaveBeenCalledWith({ top: 10, left: 5, radius: 0 });
    windowListeners.mouseup();
    windowListeners.mousemove({ pageX: 100, pageY: 200 });
    expect(changeSpy).toHaveBeenCalledTimes(1);
});
test('The component should call the change callback on resize', () => {
    const windowListeners = {};
    const changeSpy = jest.fn();
    window.addEventListener = jest.fn((event, cb) => windowListeners[event] = cb);
    const circle = (0, enzyme_1.mount)(<ModifiableCircle_1.default label="" onChange={changeSpy} radius={100}/>);
    circle.instance().circleRef = {
        getBoundingClientRect: () => ({
            left: 200,
            width: 200,
            top: 200,
            height: 200,
        }),
    };
    const resizeHandle = circle.find('.resizeHandle').first();
    expect(windowListeners.mousemove).toBeDefined();
    expect(windowListeners.mouseup).toBeDefined();
    resizeHandle.simulate('mousedown', {});
    windowListeners.mousemove({ clientX: 400, clientY: 200 });
    expect(changeSpy).toHaveBeenCalledTimes(1);
    expect(changeSpy).toHaveBeenCalledWith({ top: 0, left: 0, radius: 41.42135623730951 });
    windowListeners.mouseup();
    windowListeners.mousemove({ clientX: -10, clientY: 10 });
    expect(changeSpy).toHaveBeenCalledTimes(1);
});
