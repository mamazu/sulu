"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const SearchResult_1 = __importDefault(require("../SearchResult"));
test('Render only with title', () => {
    expect((0, enzyme_1.render)(<SearchResult_1.default description={undefined} icon={undefined} image={undefined} index={2} locale={undefined} onClick={jest.fn()} resource={undefined} title="Result"/>)).toMatchSnapshot();
});
test('Render with all data', () => {
    expect((0, enzyme_1.render)(<SearchResult_1.default description="Description" icon={undefined} image="/image.jpg" index={5} locale="de" onClick={jest.fn()} resource="Page" title="Result"/>)).toMatchSnapshot();
});
test('Render with icon instead of image', () => {
    expect((0, enzyme_1.render)(<SearchResult_1.default description="Description" icon="su-test" image={undefined} index={5} locale="de" onClick={jest.fn()} resource="Page" title="Result"/>)).toMatchSnapshot();
});
test('Render with html description', () => {
    expect((0, enzyme_1.render)(<SearchResult_1.default description="<p>Description</p>" icon={undefined} image="/image.jpg" index={5} locale="de" onClick={jest.fn()} resource="Page" title="Result"/>)).toMatchSnapshot();
});
test('Call callback with index when result is clicked', () => {
    const clickSpy = jest.fn();
    const searchResult = (0, enzyme_1.mount)(<SearchResult_1.default description="Description" icon={undefined} image="/image.jpg" index={5} locale="de" onClick={clickSpy} resource="Page" title="Result"/>);
    searchResult.find('div').at(0).simulate('click');
    expect(clickSpy).toBeCalledWith(5);
});
