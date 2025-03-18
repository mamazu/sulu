"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const Item_1 = __importDefault(require("../Item"));
test('Should render item as not selected by default', () => {
    expect((0, enzyme_1.render)(<Item_1.default id={1} order={1}>Test</Item_1.default>)).toMatchSnapshot();
});
test('Should render item as selected', () => {
    expect((0, enzyme_1.render)(<Item_1.default id={1} order={2} selected={true}>Test</Item_1.default>)).toMatchSnapshot();
});
test('Should render item as disabled', () => {
    expect((0, enzyme_1.render)(<Item_1.default disabled={true} id={1} order={3}>Test</Item_1.default>)).toMatchSnapshot();
});
test('Should render item with indicators', () => {
    const indicators = [
        <span key={1}>ghost</span>,
        <span key={2}>shadow</span>,
    ];
    expect((0, enzyme_1.render)(<Item_1.default id={2} indicators={indicators} order={4}>Test with indicators</Item_1.default>)).toMatchSnapshot();
});
test('Should render item with order input', () => {
    const indicators = [
        <span key={1}>ghost</span>,
        <span key={2}>shadow</span>,
    ];
    expect((0, enzyme_1.render)(<Item_1.default id={2} indicators={indicators} order={4} showOrderField={true}>Test with indicators</Item_1.default>))
        .toMatchSnapshot();
});
test('Should call onDoubleClick', () => {
    const doubleClickSpy = jest.fn();
    const item = (0, enzyme_1.shallow)(<Item_1.default id={2} onDoubleClick={doubleClickSpy}>Test with indicators</Item_1.default>);
    item.find('div.item').simulate('doubleclick');
    expect(doubleClickSpy).toBeCalled();
});
test('Should not call onDoubleClick if order field is shown', () => {
    const doubleClickSpy = jest.fn();
    const item = (0, enzyme_1.shallow)(<Item_1.default id={2} onDoubleClick={doubleClickSpy} showOrderField={true}>Test with indicators</Item_1.default>);
    item.find('div.item').simulate('doubleclick');
    expect(doubleClickSpy).not.toBeCalled();
});
test('Should call onOrderChange callback when order has changed', () => {
    const orderChangePromise = Promise.resolve(true);
    const orderChangeSpy = jest.fn().mockReturnValue(orderChangePromise);
    const item = (0, enzyme_1.shallow)(<Item_1.default id={2} onOrderChange={orderChangeSpy} order={4} showOrderField={true}>Test with indicators</Item_1.default>);
    item.find('Input').simulate('change', 5);
    item.find('Input').simulate('blur');
    expect(orderChangeSpy).toBeCalledWith(2, 5);
    expect(item.instance().order).toEqual(5);
    return orderChangePromise.then(() => {
        expect(item.instance().order).toEqual(5);
    });
});
test('Should call onOrderChange callback when order has changed and reset order if cancelled', () => {
    const orderChangePromise = Promise.resolve(false);
    const orderChangeSpy = jest.fn().mockReturnValue(orderChangePromise);
    const item = (0, enzyme_1.shallow)(<Item_1.default id={2} onOrderChange={orderChangeSpy} order={4} showOrderField={true}>Test with indicators</Item_1.default>);
    item.find('Input').simulate('change', 5);
    item.find('Input').simulate('blur');
    expect(orderChangeSpy).toBeCalledWith(2, 5);
    expect(item.instance().order).toEqual(5);
    return orderChangePromise.then(() => {
        expect(item.instance().order).toEqual(4);
    });
});
test('Should call onOrderChange callback when order has changed after pressing enter', () => {
    const inputSpy = {
        currentTarget: {
            blur: jest.fn(),
        },
    };
    const orderChangeSpy = jest.fn();
    const item = (0, enzyme_1.shallow)(<Item_1.default id={2} onOrderChange={orderChangeSpy} order={4} showOrderField={true}>Test with indicators</Item_1.default>);
    item.find('Input').prop('onKeyPress')('Enter', inputSpy);
    expect(inputSpy.currentTarget.blur).toBeCalledWith();
});
test('Should change order when item receives new props', () => {
    const item = (0, enzyme_1.shallow)(<Item_1.default id={2} order={4} showOrderField={true}>Test with indicators</Item_1.default>);
    expect(item.find('Input').prop('value')).toEqual(4);
    item.find('Input').simulate('change', 5);
    expect(item.find('Input').prop('value')).toEqual(5);
    item.setProps({ order: 1 });
    expect(item.find('Input').prop('value')).toEqual(1);
});
