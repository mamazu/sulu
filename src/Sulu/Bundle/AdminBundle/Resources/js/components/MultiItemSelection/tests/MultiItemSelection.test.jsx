"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const MultiItemSelection_1 = __importDefault(require("../MultiItemSelection"));
test('Render an empty MultiItemSelection', () => {
    expect((0, enzyme_1.render)(<MultiItemSelection_1.default label="I am empty"/>)).toMatchSnapshot();
});
test('Render an MultiItemSelection with children', () => {
    expect((0, enzyme_1.render)(<MultiItemSelection_1.default label="I have children">
            <MultiItemSelection_1.default.Item id="1" index={1}>
                Child 1
            </MultiItemSelection_1.default.Item>
            <MultiItemSelection_1.default.Item id="2" index={2} onEdit={jest.fn()} onRemove={jest.fn()}>
                Child 2
            </MultiItemSelection_1.default.Item>
            <MultiItemSelection_1.default.Item disabled={true} id="3" index={3} onEdit={jest.fn()} onRemove={jest.fn()}>
                Child 3 (disabled)
            </MultiItemSelection_1.default.Item>
            <MultiItemSelection_1.default.Item allowRemoveWhileDisabled={true} disabled={true} id="4" index={4} onEdit={jest.fn()} onRemove={jest.fn()}>
                Child 4 (disabled with remove button)
            </MultiItemSelection_1.default.Item>
        </MultiItemSelection_1.default>)).toMatchSnapshot();
});
test('Render a disabled MultiItemSelection with children', () => {
    expect((0, enzyme_1.render)(<MultiItemSelection_1.default disabled={true} label="I am disabled">
            <MultiItemSelection_1.default.Item id="1" index={1}>
                Child 1
            </MultiItemSelection_1.default.Item>
            <MultiItemSelection_1.default.Item id="2" index={2}>
                Child 2
            </MultiItemSelection_1.default.Item>
            <MultiItemSelection_1.default.Item id="3" index={3}>
                Child 3
            </MultiItemSelection_1.default.Item>
        </MultiItemSelection_1.default>)).toMatchSnapshot();
});
test('Render a button on the right with options and a value', () => {
    const rightButton = { label: 'Test', onClick: jest.fn(), options: [{ label: 'Test1', value: 'test-1' }] };
    expect((0, enzyme_1.render)(<MultiItemSelection_1.default rightButton={rightButton}>
            <MultiItemSelection_1.default.Item id="1" index={1}>
                Child 1
            </MultiItemSelection_1.default.Item>
            <MultiItemSelection_1.default.Item id="2" index={2}>
                Child 2
            </MultiItemSelection_1.default.Item>
            <MultiItemSelection_1.default.Item id="3" index={3}>
                Child 3
            </MultiItemSelection_1.default.Item>
        </MultiItemSelection_1.default>)).toMatchSnapshot();
});
test('Render a button on the right with options including icons and a value', () => {
    const rightButton = {
        label: 'Test',
        onClick: jest.fn(),
        options: [{ icon: 'su-default', label: 'Test1', value: 'test-1' }],
    };
    expect((0, enzyme_1.render)(<MultiItemSelection_1.default rightButton={rightButton}>
            <MultiItemSelection_1.default.Item id="1" index={1}>
                Child 1
            </MultiItemSelection_1.default.Item>
            <MultiItemSelection_1.default.Item id="2" index={2}>
                Child 2
            </MultiItemSelection_1.default.Item>
            <MultiItemSelection_1.default.Item id="3" index={3}>
                Child 3
            </MultiItemSelection_1.default.Item>
        </MultiItemSelection_1.default>)).toMatchSnapshot();
});
test('Render a not sortable MultiItemSelection with children', () => {
    expect((0, enzyme_1.render)(<MultiItemSelection_1.default label="I have children" sortable={false}>
            <MultiItemSelection_1.default.Item id="1" index={1}>
                Child 1
            </MultiItemSelection_1.default.Item>
            <MultiItemSelection_1.default.Item id="2" index={2}>
                Child 2
            </MultiItemSelection_1.default.Item>
            <MultiItemSelection_1.default.Item id="3" index={3}>
                Child 3
            </MultiItemSelection_1.default.Item>
        </MultiItemSelection_1.default>)).toMatchSnapshot();
});
test('Render an MultiItemSelection while loading', () => {
    expect((0, enzyme_1.render)(<MultiItemSelection_1.default label="I am loading" loading={true}/>)).toMatchSnapshot();
});
test('Clicking the left and right button inside the header should call the right handler', () => {
    const leftClickHandler = jest.fn();
    const rightClickHandler = jest.fn();
    const leftButtonConfig = {
        icon: 'su-plus',
        onClick: leftClickHandler,
    };
    const rightButtonConfig = {
        icon: 'fa-gear',
        onClick: rightClickHandler,
    };
    const multiItemSelection = (0, enzyme_1.mount)(<MultiItemSelection_1.default label="I have handler" leftButton={leftButtonConfig} rightButton={rightButtonConfig}>
            <MultiItemSelection_1.default.Item id="1" index={1}>
                Child 1
            </MultiItemSelection_1.default.Item>
            <MultiItemSelection_1.default.Item id="2" index={2}>
                Child 2
            </MultiItemSelection_1.default.Item>
            <MultiItemSelection_1.default.Item id="3" index={3}>
                Child 3
            </MultiItemSelection_1.default.Item>
        </MultiItemSelection_1.default>);
    expect(multiItemSelection.render()).toMatchSnapshot();
    multiItemSelection.find('.button.left').simulate('click');
    expect(leftClickHandler).toBeCalled();
    multiItemSelection.find('.button.right').simulate('click');
    expect(rightClickHandler).toBeCalled();
});
test('Clicking the left button inside the header should call the right handler after choosing an option', () => {
    const leftClickHandler = jest.fn();
    const leftButtonConfig = {
        icon: 'su-plus',
        onClick: leftClickHandler,
        options: [
            {
                label: 'Test1',
                value: 'test1',
            },
            {
                label: 'Test2',
                value: 'test2',
            },
        ],
    };
    const multiItemSelection = (0, enzyme_1.mount)(<MultiItemSelection_1.default label="I have handler" leftButton={leftButtonConfig}>
            <MultiItemSelection_1.default.Item id="1" index={1}>
                Child 1
            </MultiItemSelection_1.default.Item>
            <MultiItemSelection_1.default.Item id="2" index={2}>
                Child 2
            </MultiItemSelection_1.default.Item>
            <MultiItemSelection_1.default.Item id="3" index={3}>
                Child 3
            </MultiItemSelection_1.default.Item>
        </MultiItemSelection_1.default>);
    multiItemSelection.find('Button[icon="su-plus"]').simulate('click');
    multiItemSelection.find('ArrowMenu Action').at(0).simulate('click');
    expect(leftClickHandler).toBeCalledWith('test1');
    multiItemSelection.find('Button[icon="su-plus"]').simulate('click');
    multiItemSelection.find('ArrowMenu Action').at(1).simulate('click');
    expect(leftClickHandler).toBeCalledWith('test2');
});
test('Clicking on the remove button inside an item should call the remove handler on the parent component', () => {
    const removeHandler = jest.fn();
    const clickedItemId = 1;
    const multiItemSelection = (0, enzyme_1.mount)(<MultiItemSelection_1.default label="I have handler" onItemRemove={removeHandler}>
            <MultiItemSelection_1.default.Item id={clickedItemId} index={1}>
                Child 1
            </MultiItemSelection_1.default.Item>
            <MultiItemSelection_1.default.Item id="2" index={2}>
                Child 2
            </MultiItemSelection_1.default.Item>
            <MultiItemSelection_1.default.Item id="3" index={3}>
                Child 3
            </MultiItemSelection_1.default.Item>
        </MultiItemSelection_1.default>);
    multiItemSelection.find('Icon[name="su-trash-alt"]').at(0).parent().prop('onClick')();
    expect(removeHandler).toHaveBeenCalledWith(clickedItemId);
});
test('Clicking on the edit button inside an item should call the edit handler on the parent component', () => {
    const editHandler = jest.fn();
    const clickedItemId = 1;
    const multiItemSelection = (0, enzyme_1.mount)(<MultiItemSelection_1.default label="I have handler" onItemEdit={editHandler}>
            <MultiItemSelection_1.default.Item id={clickedItemId} index={1}>
                Child 1
            </MultiItemSelection_1.default.Item>
            <MultiItemSelection_1.default.Item id="2" index={2}>
                Child 2
            </MultiItemSelection_1.default.Item>
            <MultiItemSelection_1.default.Item id="3" index={3}>
                Child 3
            </MultiItemSelection_1.default.Item>
        </MultiItemSelection_1.default>);
    multiItemSelection.find('Icon[name="su-pen"]').at(0).parent().prop('onClick')();
    expect(editHandler).toHaveBeenCalledWith(clickedItemId);
});
test('Clicking on an item should call its onClick handler', () => {
    const clickHandler = jest.fn();
    const multiItemSelection = (0, enzyme_1.mount)(<MultiItemSelection_1.default label="I have handler" onItemClick={clickHandler} onItemEdit={jest.fn()}>
            <MultiItemSelection_1.default.Item id={6} index={1} value="value1">
                Child 1
            </MultiItemSelection_1.default.Item>
            <MultiItemSelection_1.default.Item id={3} index={2} value="value2">
                Child 2
            </MultiItemSelection_1.default.Item>
        </MultiItemSelection_1.default>);
    multiItemSelection.find('.content').at(0).prop('onClick')();
    expect(clickHandler).toHaveBeenLastCalledWith(6, 'value1');
    multiItemSelection.find('.content').at(1).prop('onClick')();
    expect(clickHandler).toHaveBeenLastCalledWith(3, 'value2');
});
