"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const SearchResult_1 = __importDefault(require("../SearchResult"));
test('Should render a SearchResult with title, url and description', () => {
    expect((0, enzyme_1.render)(<SearchResult_1.default description="Yay!" title="Test SEO Title" url="http://www.sulu.io/test"/>))
        .toMatchSnapshot();
});
test('Should render a SearchResult without title, url and description', () => {
    expect((0, enzyme_1.render)(<SearchResult_1.default description={undefined} title={undefined} url={undefined}/>))
        .toMatchSnapshot();
});
