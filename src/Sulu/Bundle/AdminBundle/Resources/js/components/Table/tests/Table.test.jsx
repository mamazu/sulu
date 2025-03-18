"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const enzyme_1 = require("enzyme");
const react_1 = __importDefault(require("react"));
const Table_1 = __importDefault(require("../Table"));
const Header_1 = __importDefault(require("../Header"));
const Body_1 = __importDefault(require("../Body"));
const Row_1 = __importDefault(require("../Row"));
const Cell_1 = __importDefault(require("../Cell"));
const HeaderCell_1 = __importDefault(require("../HeaderCell"));
afterEach(() => {
    if (document.body) {
        document.body.innerHTML = '';
    }
});
test('Render the Table component', () => {
    expect((0, enzyme_1.render)(<Table_1.default>
            <Header_1.default>
                <HeaderCell_1.default>Column Title</HeaderCell_1.default>
                <HeaderCell_1.default>Column Title</HeaderCell_1.default>
                <HeaderCell_1.default>Column Title</HeaderCell_1.default>
            </Header_1.default>
            <Body_1.default>
                <Row_1.default>
                    <Cell_1.default>Column Text</Cell_1.default>
                    <Cell_1.default>Column Text</Cell_1.default>
                    <Cell_1.default>Column Text</Cell_1.default>
                </Row_1.default>
                <Row_1.default>
                    <Cell_1.default>Column Text</Cell_1.default>
                    <Cell_1.default>Column Text</Cell_1.default>
                    <Cell_1.default>Column Text</Cell_1.default>
                </Row_1.default>
            </Body_1.default>
        </Table_1.default>)).toMatchSnapshot();
});
test('Render the Table component with a skin', () => {
    expect((0, enzyme_1.render)(<Table_1.default skin="light">
            <Header_1.default>
                <HeaderCell_1.default>Column Title</HeaderCell_1.default>
                <HeaderCell_1.default>Column Title</HeaderCell_1.default>
                <HeaderCell_1.default>Column Title</HeaderCell_1.default>
            </Header_1.default>
            <Body_1.default>
                <Row_1.default>
                    <Cell_1.default>Column Text</Cell_1.default>
                    <Cell_1.default>Column Text</Cell_1.default>
                    <Cell_1.default>Column Text</Cell_1.default>
                </Row_1.default>
                <Row_1.default>
                    <Cell_1.default>Column Text</Cell_1.default>
                    <Cell_1.default>Column Text</Cell_1.default>
                    <Cell_1.default>Column Text</Cell_1.default>
                </Row_1.default>
            </Body_1.default>
        </Table_1.default>)).toMatchSnapshot();
});
test('Render the Table component with shrunken cells', () => {
    expect((0, enzyme_1.render)(<Table_1.default>
            <Header_1.default>
                <HeaderCell_1.default>Column Title</HeaderCell_1.default>
                <HeaderCell_1.default>Column Title</HeaderCell_1.default>
                <HeaderCell_1.default>Column Title</HeaderCell_1.default>
            </Header_1.default>
            <Body_1.default>
                <Row_1.default>
                    <Cell_1.default width="shrink">Column Text</Cell_1.default>
                    <Cell_1.default width="shrink">Column Text</Cell_1.default>
                    <Cell_1.default width="shrink">Column Text</Cell_1.default>
                </Row_1.default>
                <Row_1.default>
                    <Cell_1.default>Column Text</Cell_1.default>
                    <Cell_1.default>Column Text</Cell_1.default>
                    <Cell_1.default>Column Text</Cell_1.default>
                </Row_1.default>
            </Body_1.default>
        </Table_1.default>)).toMatchSnapshot();
});
test('Render the Table component in tree structure', () => {
    expect((0, enzyme_1.render)(<Table_1.default>
            <Header_1.default>
                <HeaderCell_1.default>Column Title</HeaderCell_1.default>
                <HeaderCell_1.default>Column Title</HeaderCell_1.default>
                <HeaderCell_1.default>Column Title</HeaderCell_1.default>
            </Header_1.default>
            <Body_1.default>
                <Row_1.default depth={0} hasChildren={true}>
                    <Cell_1.default>Column Text</Cell_1.default>
                    <Cell_1.default>Column Text</Cell_1.default>
                    <Cell_1.default>Column Text</Cell_1.default>
                </Row_1.default>
                <Row_1.default depth={1} hasChildren={true}>
                    <Cell_1.default>Column Text</Cell_1.default>
                    <Cell_1.default>Column Text</Cell_1.default>
                    <Cell_1.default>Column Text</Cell_1.default>
                </Row_1.default>
                <Row_1.default depth={2}>
                    <Cell_1.default>Column Text</Cell_1.default>
                    <Cell_1.default>Column Text</Cell_1.default>
                    <Cell_1.default>Column Text</Cell_1.default>
                </Row_1.default>
            </Body_1.default>
        </Table_1.default>)).toMatchSnapshot();
});
test('Render an empty table', () => {
    const placeholderText = 'No entries';
    expect((0, enzyme_1.render)(<Table_1.default placeholderText={placeholderText}>
            <Header_1.default>
                <HeaderCell_1.default>Column Title</HeaderCell_1.default>
                <HeaderCell_1.default>Column Title</HeaderCell_1.default>
                <HeaderCell_1.default>Column Title</HeaderCell_1.default>
            </Header_1.default>
            <Body_1.default />
        </Table_1.default>)).toMatchSnapshot();
});
test('Render a table with buttons', () => {
    const buttons = [
        {
            icon: 'fa-pencil',
            onClick: jest.fn(),
        },
        {
            disabled: true,
            icon: 'fa-lock',
            onClick: jest.fn(),
        },
    ];
    expect((0, enzyme_1.render)(<Table_1.default buttons={buttons}>
            <Header_1.default>
                <HeaderCell_1.default>Column Title</HeaderCell_1.default>
                <HeaderCell_1.default>Column Title</HeaderCell_1.default>
                <HeaderCell_1.default>Column Title</HeaderCell_1.default>
            </Header_1.default>
            <Body_1.default>
                <Row_1.default>
                    <Cell_1.default>Column Text</Cell_1.default>
                    <Cell_1.default>Column Text</Cell_1.default>
                    <Cell_1.default>Column Text</Cell_1.default>
                </Row_1.default>
            </Body_1.default>
        </Table_1.default>)).toMatchSnapshot();
});
test('Render a table with different buttons for each row', () => {
    const buttons = [{
            icon: 'fa-pencil',
            onClick: jest.fn(),
        }];
    expect((0, enzyme_1.render)(<Table_1.default buttons={buttons}>
            <Header_1.default>
                <HeaderCell_1.default>Column Title</HeaderCell_1.default>
                <HeaderCell_1.default>Column Title</HeaderCell_1.default>
                <HeaderCell_1.default>Column Title</HeaderCell_1.default>
            </Header_1.default>
            <Body_1.default>
                <Row_1.default>
                    <Cell_1.default>Column Text</Cell_1.default>
                    <Cell_1.default>Column Text</Cell_1.default>
                    <Cell_1.default>Column Text</Cell_1.default>
                </Row_1.default>
                <Row_1.default buttons={[{ icon: 'fa-plus', onClick: jest.fn() }]}>
                    <Cell_1.default>Column Text</Cell_1.default>
                    <Cell_1.default>Column Text</Cell_1.default>
                    <Cell_1.default>Column Text</Cell_1.default>
                </Row_1.default>
            </Body_1.default>
        </Table_1.default>)).toMatchSnapshot();
});
test('Render a table with disabled rows', () => {
    const buttons = [{
            icon: 'fa-pencil',
            onClick: jest.fn(),
        }];
    expect((0, enzyme_1.render)(<Table_1.default buttons={buttons}>
            <Header_1.default>
                <HeaderCell_1.default>Column Title</HeaderCell_1.default>
                <HeaderCell_1.default>Column Title</HeaderCell_1.default>
            </Header_1.default>
            <Body_1.default>
                <Row_1.default>
                    <Cell_1.default>Boring Row</Cell_1.default>
                    <Cell_1.default>Column 2</Cell_1.default>
                </Row_1.default>
                <Row_1.default disabled={true}>
                    <Cell_1.default>Disabled Row</Cell_1.default>
                    <Cell_1.default>Column 2</Cell_1.default>
                </Row_1.default>
            </Body_1.default>
        </Table_1.default>)).toMatchSnapshot();
});
test('Table buttons should implement an onClick handler', () => {
    const clickSpy = jest.fn();
    const buttons = [{
            icon: 'fa-pencil',
            onClick: clickSpy,
        }];
    const table = (0, enzyme_1.mount)(<Table_1.default buttons={buttons}>
            <Header_1.default>
                <HeaderCell_1.default>Column Title</HeaderCell_1.default>
                <HeaderCell_1.default>Column Title</HeaderCell_1.default>
                <HeaderCell_1.default>Column Title</HeaderCell_1.default>
            </Header_1.default>
            <Body_1.default>
                <Row_1.default id={19}>
                    <Cell_1.default>Column Text</Cell_1.default>
                    <Cell_1.default>Column Text</Cell_1.default>
                    <Cell_1.default>Column Text</Cell_1.default>
                </Row_1.default>
                <Row_1.default id={25}>
                    <Cell_1.default>Column Text</Cell_1.default>
                    <Cell_1.default>Column Text</Cell_1.default>
                    <Cell_1.default>Column Text</Cell_1.default>
                </Row_1.default>
            </Body_1.default>
        </Table_1.default>);
    expect(clickSpy).toHaveBeenCalledTimes(0);
    table.find('.buttonCell button').at(0).simulate('click');
    table.find('.buttonCell button').at(1).simulate('click');
    expect(clickSpy).toBeCalledWith(19, 0);
    expect(clickSpy).toBeCalledWith(25, 1);
    expect(clickSpy).toHaveBeenCalledTimes(2);
});
test('Table buttons should not call onClick handler if button is disabled', () => {
    const clickSpy = jest.fn();
    const buttons = [{
            disabled: true,
            icon: 'fa-pencil',
            onClick: clickSpy,
        }];
    const table = (0, enzyme_1.mount)(<Table_1.default buttons={buttons}>
            <Header_1.default>
                <HeaderCell_1.default>Column Title</HeaderCell_1.default>
                <HeaderCell_1.default>Column Title</HeaderCell_1.default>
                <HeaderCell_1.default>Column Title</HeaderCell_1.default>
            </Header_1.default>
            <Body_1.default>
                <Row_1.default id={19}>
                    <Cell_1.default>Column Text</Cell_1.default>
                    <Cell_1.default>Column Text</Cell_1.default>
                    <Cell_1.default>Column Text</Cell_1.default>
                </Row_1.default>
                <Row_1.default id={25}>
                    <Cell_1.default>Column Text</Cell_1.default>
                    <Cell_1.default>Column Text</Cell_1.default>
                    <Cell_1.default>Column Text</Cell_1.default>
                </Row_1.default>
            </Body_1.default>
        </Table_1.default>);
    expect(clickSpy).toHaveBeenCalledTimes(0);
    table.find('.buttonCell button').at(0).simulate('click');
    table.find('.buttonCell button').at(1).simulate('click');
    expect(clickSpy).not.toBeCalled();
});
test('Render the Table component in single selection mode', () => {
    expect((0, enzyme_1.render)(<Table_1.default selectMode="single">
            <Header_1.default>
                <HeaderCell_1.default>Column Title</HeaderCell_1.default>
                <HeaderCell_1.default>Column Title</HeaderCell_1.default>
                <HeaderCell_1.default>Column Title</HeaderCell_1.default>
            </Header_1.default>
            <Body_1.default>
                <Row_1.default>
                    <Cell_1.default>Column Text</Cell_1.default>
                    <Cell_1.default>Column Text</Cell_1.default>
                    <Cell_1.default>Column Text</Cell_1.default>
                </Row_1.default>
            </Body_1.default>
        </Table_1.default>)).toMatchSnapshot();
});
test('Clicking on the radio button should call onRowSelectionChange with the row-id', () => {
    const onChangeSpy = jest.fn();
    const props = {
        selectMode: 'single',
        onRowSelectionChange: onChangeSpy,
    };
    const rowId = 'test-row-id';
    const table = (0, enzyme_1.mount)(<Table_1.default {...props}>
            <Header_1.default>
                <HeaderCell_1.default>Column Title</HeaderCell_1.default>
                <HeaderCell_1.default>Column Title</HeaderCell_1.default>
                <HeaderCell_1.default>Column Title</HeaderCell_1.default>
            </Header_1.default>
            <Body_1.default>
                <Row_1.default id={rowId}>
                    <Cell_1.default>Column Text</Cell_1.default>
                    <Cell_1.default>Column Text</Cell_1.default>
                    <Cell_1.default>Column Text</Cell_1.default>
                </Row_1.default>
            </Body_1.default>
        </Table_1.default>);
    expect(onChangeSpy).toHaveBeenCalledTimes(0);
    table.find('Row Radio input').simulate('change');
    expect(onChangeSpy).toHaveBeenCalledWith(rowId, undefined);
});
test('Render the Table component in multiple selection mode', () => {
    expect((0, enzyme_1.render)(<Table_1.default selectMode="multiple">
            <Header_1.default>
                <HeaderCell_1.default>Column Title</HeaderCell_1.default>
                <HeaderCell_1.default>Column Title</HeaderCell_1.default>
                <HeaderCell_1.default>Column Title</HeaderCell_1.default>
            </Header_1.default>
            <Body_1.default>
                <Row_1.default>
                    <Cell_1.default>Column Text</Cell_1.default>
                    <Cell_1.default>Column Text</Cell_1.default>
                    <Cell_1.default>Column Text</Cell_1.default>
                </Row_1.default>
            </Body_1.default>
        </Table_1.default>)).toMatchSnapshot();
});
test('Render the Table component in multiple selection mode with select inside first cell', () => {
    expect((0, enzyme_1.render)(<Table_1.default onAllSelectionChange={jest.fn()} selectInFirstCell={true} selectMode="multiple">
            <Header_1.default>
                <HeaderCell_1.default>Column Title</HeaderCell_1.default>
                <HeaderCell_1.default>Column Title</HeaderCell_1.default>
                <HeaderCell_1.default>Column Title</HeaderCell_1.default>
            </Header_1.default>
            <Body_1.default>
                <Row_1.default>
                    <Cell_1.default>Column Text</Cell_1.default>
                    <Cell_1.default>Column Text</Cell_1.default>
                    <Cell_1.default>Column Text</Cell_1.default>
                </Row_1.default>
            </Body_1.default>
        </Table_1.default>)).toMatchSnapshot();
});
test('Clicking a checkbox should call onRowSelectionChange with the selection state and row-id', () => {
    const onChangeSpy = jest.fn();
    const props = {
        selectMode: 'multiple',
        onRowSelectionChange: onChangeSpy,
    };
    const rowIdOne = 'test-row-id-1';
    const rowIdTwo = 'test-row-id-2';
    const table = (0, enzyme_1.mount)(<Table_1.default {...props}>
            <Header_1.default>
                <HeaderCell_1.default>Column Title</HeaderCell_1.default>
                <HeaderCell_1.default>Column Title</HeaderCell_1.default>
                <HeaderCell_1.default>Column Title</HeaderCell_1.default>
            </Header_1.default>
            <Body_1.default>
                <Row_1.default id={rowIdOne}>
                    <Cell_1.default>Column Text</Cell_1.default>
                    <Cell_1.default>Column Text</Cell_1.default>
                    <Cell_1.default>Column Text</Cell_1.default>
                </Row_1.default>
                <Row_1.default id={rowIdTwo}>
                    <Cell_1.default>Column Text</Cell_1.default>
                    <Cell_1.default>Column Text</Cell_1.default>
                    <Cell_1.default>Column Text</Cell_1.default>
                </Row_1.default>
            </Body_1.default>
        </Table_1.default>);
    expect(onChangeSpy).toHaveBeenCalledTimes(0);
    const checkboxOne = table.find('Row').at(0).find('Checkbox input');
    checkboxOne.at(0).instance().checked = true;
    checkboxOne.simulate('change');
    expect(onChangeSpy).toHaveBeenCalledWith(rowIdOne, true);
});
test('Select-all checkbox should be checked if every line is selected', () => {
    const allRowsSelectedTable = (0, enzyme_1.mount)(<Table_1.default selectMode="multiple">
            <Header_1.default>
                <HeaderCell_1.default>Column Title</HeaderCell_1.default>
            </Header_1.default>
            <Body_1.default>
                <Row_1.default selected={true}>
                    <Cell_1.default>Column Text</Cell_1.default>
                </Row_1.default>
                <Row_1.default selected={true}>
                    <Cell_1.default>Column Text</Cell_1.default>
                </Row_1.default>
            </Body_1.default>
        </Table_1.default>);
    expect(allRowsSelectedTable.find('Header').find('Checkbox input').props().checked).toEqual(true);
});
test('Select-all checkbox should not be checked if at least one non-disabled line is not selected', () => {
    const someRowsSelectedTable = (0, enzyme_1.mount)(<Table_1.default selectMode="multiple">
            <Header_1.default>
                <HeaderCell_1.default>Column Title</HeaderCell_1.default>
            </Header_1.default>
            <Body_1.default>
                <Row_1.default selected={true}>
                    <Cell_1.default>Column Text</Cell_1.default>
                </Row_1.default>
                <Row_1.default selected={false}>
                    <Cell_1.default>Column Text</Cell_1.default>
                </Row_1.default>
            </Body_1.default>
        </Table_1.default>);
    expect(someRowsSelectedTable.find('Header').find('Checkbox input').props().checked).toEqual(false);
});
test('Select-all checkbox should be checked if every non-disabled line is selected', () => {
    const allEnabledRowsSelectedTable = (0, enzyme_1.mount)(<Table_1.default selectMode="multiple">
            <Header_1.default>
                <HeaderCell_1.default>Column Title</HeaderCell_1.default>
            </Header_1.default>
            <Body_1.default>
                <Row_1.default selected={true}>
                    <Cell_1.default>Column Text</Cell_1.default>
                </Row_1.default>
                <Row_1.default disabled={true}>
                    <Cell_1.default>Column Text</Cell_1.default>
                </Row_1.default>
            </Body_1.default>
        </Table_1.default>);
    expect(allEnabledRowsSelectedTable.find('Header').find('Checkbox input').props().checked).toEqual(true);
});
test('Clicking the select-all checkbox should call the onAllSelectionChange callback', () => {
    const onChangeSpy = jest.fn();
    const props = {
        selectMode: 'multiple',
        onAllSelectionChange: onChangeSpy,
    };
    const table = (0, enzyme_1.mount)(<Table_1.default {...props}>
            <Header_1.default>
                <HeaderCell_1.default>Column Title</HeaderCell_1.default>
                <HeaderCell_1.default>Column Title</HeaderCell_1.default>
                <HeaderCell_1.default>Column Title</HeaderCell_1.default>
            </Header_1.default>
            <Body_1.default>
                <Row_1.default>
                    <Cell_1.default>Column Text</Cell_1.default>
                    <Cell_1.default>Column Text</Cell_1.default>
                    <Cell_1.default>Column Text</Cell_1.default>
                </Row_1.default>
            </Body_1.default>
        </Table_1.default>);
    const allCheckbox = table.find('Header').find('Checkbox input');
    allCheckbox.at(0).instance().checked = true;
    allCheckbox.simulate('change');
    expect(onChangeSpy).toHaveBeenCalledWith(true);
});
test('Header cells with a defined sortOrder must show a sort indicator', () => {
    const clickSpy = jest.fn();
    expect((0, enzyme_1.render)(<Table_1.default>
            <Header_1.default>
                <HeaderCell_1.default onClick={clickSpy} sortOrder="asc">ColumnTitle</HeaderCell_1.default>
                <HeaderCell_1.default onClick={clickSpy} sortOrder="desc">ColumnTitle</HeaderCell_1.default>
                <HeaderCell_1.default>ColumnTitle</HeaderCell_1.default>
            </Header_1.default>
        </Table_1.default>)).toMatchSnapshot();
});
test('Header cells with an attached onClick handler should be clickable', () => {
    const clickSpy = jest.fn();
    const table = (0, enzyme_1.mount)(<Table_1.default>
            <Header_1.default>
                <HeaderCell_1.default name="column1" onClick={clickSpy}>Column Title</HeaderCell_1.default>
                <HeaderCell_1.default>Column Title</HeaderCell_1.default>
                <HeaderCell_1.default>Column Title</HeaderCell_1.default>
            </Header_1.default>
            <Body_1.default>
                <Row_1.default>
                    <Cell_1.default>Column Text</Cell_1.default>
                    <Cell_1.default>Column Text</Cell_1.default>
                    <Cell_1.default>Column Text</Cell_1.default>
                </Row_1.default>
            </Body_1.default>
        </Table_1.default>);
    table.find('HeaderCell').at(0).find('button').simulate('click');
    expect(clickSpy).toHaveBeenCalledTimes(1);
});
test('Header cells with an attached name should call the onClick callback with the name and the new sortOrder', () => {
    const clickSpy = jest.fn();
    const table = (0, enzyme_1.mount)(<Table_1.default>
            <Header_1.default>
                <HeaderCell_1.default name="column1" onClick={clickSpy}>Column Title</HeaderCell_1.default>
                <HeaderCell_1.default name="column2" onClick={clickSpy} sortOrder="asc">Column Title</HeaderCell_1.default>
                <HeaderCell_1.default name="column3" onClick={clickSpy} sortOrder="desc">Column Title</HeaderCell_1.default>
            </Header_1.default>
            <Body_1.default>
                <Row_1.default>
                    <Cell_1.default>Column Text</Cell_1.default>
                    <Cell_1.default>Column Text</Cell_1.default>
                    <Cell_1.default>Column Text</Cell_1.default>
                </Row_1.default>
            </Body_1.default>
        </Table_1.default>);
    table.find('HeaderCell').at(0).find('button').simulate('click');
    expect(clickSpy).lastCalledWith('column1', 'asc');
    table.find('HeaderCell').at(1).find('button').simulate('click');
    expect(clickSpy).lastCalledWith('column2', 'desc');
    table.find('HeaderCell').at(2).find('button').simulate('click');
    expect(clickSpy).lastCalledWith('column3', 'asc');
});
test('Collapse should be called correctly', () => {
    const onRowCollapse = jest.fn();
    const table = (0, enzyme_1.mount)(<Table_1.default onRowCollapse={onRowCollapse}>
            <Header_1.default>
                <HeaderCell_1.default>Column Title</HeaderCell_1.default>
                <HeaderCell_1.default>Column Title</HeaderCell_1.default>
                <HeaderCell_1.default>Column Title</HeaderCell_1.default>
            </Header_1.default>
            <Body_1.default>
                <Row_1.default depth={0} expanded={true} hasChildren={true}>
                    <Cell_1.default>Column Text</Cell_1.default>
                    <Cell_1.default>Column Text</Cell_1.default>
                    <Cell_1.default>Column Text</Cell_1.default>
                </Row_1.default>
                <Row_1.default depth={1} expanded={true} hasChildren={true}>
                    <Cell_1.default>Column Text</Cell_1.default>
                    <Cell_1.default>Column Text</Cell_1.default>
                    <Cell_1.default>Column Text</Cell_1.default>
                </Row_1.default>
                <Row_1.default depth={2}>
                    <Cell_1.default>Column Text</Cell_1.default>
                    <Cell_1.default>Column Text</Cell_1.default>
                    <Cell_1.default>Column Text</Cell_1.default>
                </Row_1.default>
            </Body_1.default>
        </Table_1.default>);
    table.find('Row').at(1).find('span.toggleIcon Icon').simulate('click');
    expect(onRowCollapse).toHaveBeenCalledTimes(1);
});
test('Expand should be called correctly', () => {
    const onRowExpand = jest.fn();
    const table = (0, enzyme_1.mount)(<Table_1.default onRowExpand={onRowExpand}>
            <Header_1.default>
                <HeaderCell_1.default>Column Title</HeaderCell_1.default>
                <HeaderCell_1.default>Column Title</HeaderCell_1.default>
                <HeaderCell_1.default>Column Title</HeaderCell_1.default>
            </Header_1.default>
            <Body_1.default>
                <Row_1.default depth={0} expanded={true} hasChildren={true}>
                    <Cell_1.default>Column Text</Cell_1.default>
                    <Cell_1.default>Column Text</Cell_1.default>
                    <Cell_1.default>Column Text</Cell_1.default>
                </Row_1.default>
                <Row_1.default depth={1} expanded={false} hasChildren={true}>
                    <Cell_1.default>Column Text</Cell_1.default>
                    <Cell_1.default>Column Text</Cell_1.default>
                    <Cell_1.default>Column Text</Cell_1.default>
                </Row_1.default>
                <Row_1.default depth={2}>
                    <Cell_1.default>Column Text</Cell_1.default>
                    <Cell_1.default>Column Text</Cell_1.default>
                    <Cell_1.default>Column Text</Cell_1.default>
                </Row_1.default>
            </Body_1.default>
        </Table_1.default>);
    table.find('Row').at(1).find('span.toggleIcon Icon').simulate('click');
    expect(onRowExpand).toHaveBeenCalledTimes(1);
});
