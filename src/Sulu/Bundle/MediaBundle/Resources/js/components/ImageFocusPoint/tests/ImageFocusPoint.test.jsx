"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const enzyme_1 = require("enzyme");
const react_1 = __importDefault(require("react"));
const ImageFocusPoint_1 = __importDefault(require("../ImageFocusPoint"));
test('Should render Loader at the beginning', () => {
    const value = { x: 0, y: 0 };
    const imageFocusPoint = (0, enzyme_1.mount)(<ImageFocusPoint_1.default image="http://lorempixel.com/300/300" onChange={jest.fn()} value={value}/>);
    expect(imageFocusPoint.render()).toMatchSnapshot();
});
test('Should render focus point cells with correct size', () => {
    const value = { x: 0, y: 0 };
    const imageFocusPoint = (0, enzyme_1.mount)(<ImageFocusPoint_1.default image="http://lorempixel.com/300/300" onChange={jest.fn()} value={value}/>);
    const getBoundingClientRectMock = jest.fn();
    imageFocusPoint.instance().imageRef = {
        getBoundingClientRect: getBoundingClientRectMock,
    };
    getBoundingClientRectMock.mockReturnValueOnce({ width: '50px', height: '50px' });
    imageFocusPoint.find('img').prop('onLoad')();
    imageFocusPoint.update();
    expect(imageFocusPoint.find('.focusPoints').prop('style')).toEqual({ height: '50px', width: '50px' });
    getBoundingClientRectMock.mockReturnValueOnce({ width: '200px', height: '200px' });
    window.dispatchEvent(new Event('resize'));
    imageFocusPoint.update();
    expect(imageFocusPoint.find('.focusPoints').prop('style')).toEqual({ height: '200px', width: '200px' });
});
test('Should render ImageFocusPoint with focusing the top-left point', () => {
    const value = { x: 0, y: 0 };
    const imageFocusPoint = (0, enzyme_1.mount)(<ImageFocusPoint_1.default image="http://lorempixel.com/300/300" onChange={jest.fn()} value={value}/>);
    imageFocusPoint.find('img').simulate('load');
    expect(imageFocusPoint.render()).toMatchSnapshot();
});
test('Should render ImageFocusPoint with focusing the top-center point', () => {
    const value = { x: 1, y: 0 };
    const imageFocusPoint = (0, enzyme_1.mount)(<ImageFocusPoint_1.default image="http://lorempixel.com/300/300" onChange={jest.fn()} value={value}/>);
    imageFocusPoint.find('img').simulate('load');
    expect(imageFocusPoint.render()).toMatchSnapshot();
});
test('Should render ImageFocusPoint with focusing the top-right point', () => {
    const value = { x: 2, y: 0 };
    const imageFocusPoint = (0, enzyme_1.mount)(<ImageFocusPoint_1.default image="http://lorempixel.com/300/300" onChange={jest.fn()} value={value}/>);
    imageFocusPoint.find('img').simulate('load');
    expect(imageFocusPoint.render()).toMatchSnapshot();
});
test('Should render ImageFocusPoint with focusing the center-left point', () => {
    const value = { x: 0, y: 1 };
    const imageFocusPoint = (0, enzyme_1.mount)(<ImageFocusPoint_1.default image="http://lorempixel.com/300/300" onChange={jest.fn()} value={value}/>);
    imageFocusPoint.find('img').simulate('load');
    expect(imageFocusPoint.render()).toMatchSnapshot();
});
test('Should render ImageFocusPoint with focusing the center-center point', () => {
    const value = { x: 1, y: 1 };
    const imageFocusPoint = (0, enzyme_1.mount)(<ImageFocusPoint_1.default image="http://lorempixel.com/300/300" onChange={jest.fn()} value={value}/>);
    imageFocusPoint.find('img').simulate('load');
    expect(imageFocusPoint.render()).toMatchSnapshot();
});
test('Should render ImageFocusPoint with focusing the center-right point', () => {
    const value = { x: 2, y: 1 };
    const imageFocusPoint = (0, enzyme_1.mount)(<ImageFocusPoint_1.default image="http://lorempixel.com/300/300" onChange={jest.fn()} value={value}/>);
    imageFocusPoint.find('img').simulate('load');
    expect(imageFocusPoint.render()).toMatchSnapshot();
});
test('Should render ImageFocusPoint with focusing the bottom-left point', () => {
    const value = { x: 0, y: 2 };
    const imageFocusPoint = (0, enzyme_1.mount)(<ImageFocusPoint_1.default image="http://lorempixel.com/300/300" onChange={jest.fn()} value={value}/>);
    imageFocusPoint.find('img').simulate('load');
    expect(imageFocusPoint.render()).toMatchSnapshot();
});
test('Should render ImageFocusPoint with focusing the bottom-center point', () => {
    const value = { x: 1, y: 2 };
    const imageFocusPoint = (0, enzyme_1.mount)(<ImageFocusPoint_1.default image="http://lorempixel.com/300/300" onChange={jest.fn()} value={value}/>);
    imageFocusPoint.find('img').simulate('load');
    expect(imageFocusPoint.render()).toMatchSnapshot();
});
test('Should render ImageFocusPoint with focusing the bottom-right point', () => {
    const value = { x: 2, y: 2 };
    const imageFocusPoint = (0, enzyme_1.mount)(<ImageFocusPoint_1.default image="http://lorempixel.com/300/300" onChange={jest.fn()} value={value}/>);
    imageFocusPoint.find('img').simulate('load');
    expect(imageFocusPoint.render()).toMatchSnapshot();
});
test('Should call the onClick handler when a focus point was clicked', () => {
    const changeSpy = jest.fn();
    const value = { x: 1, y: 1 };
    const imageFocusPoint = (0, enzyme_1.mount)(<ImageFocusPoint_1.default image="http://lorempixel.com/300/300" onChange={changeSpy} value={value}/>);
    imageFocusPoint.find('img').simulate('load');
    imageFocusPoint.find('button').at(0).simulate('click');
    expect(changeSpy).toBeCalledWith({ x: 0, y: 0 });
    imageFocusPoint.find('button').at(1).simulate('click');
    expect(changeSpy).toBeCalledWith({ x: 1, y: 0 });
    imageFocusPoint.find('button').at(3).simulate('click');
    expect(changeSpy).toBeCalledWith({ x: 0, y: 1 });
});
test('Should disable the selected focus point button', () => {
    const value = { x: 0, y: 0 };
    const imageFocusPoint = (0, enzyme_1.mount)(<ImageFocusPoint_1.default image="http://lorempixel.com/300/300" onChange={jest.fn()} value={value}/>);
    imageFocusPoint.find('img').simulate('load');
    expect(imageFocusPoint.find('button').at(0).props().disabled).toBe(true);
});
