"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const services_1 = require("sulu-admin-bundle/services");
const TestHelper_1 = require("sulu-admin-bundle/utils/TestHelper");
const Search_1 = __importDefault(require("../../../containers/Search"));
jest.mock('sulu-admin-bundle/containers/Toolbar/withToolbar', () => jest.fn((Component) => Component));
jest.mock('sulu-admin-bundle/services/Router/Router', () => jest.fn(function () {
    this.bind = jest.fn();
}));
test('Render search component', () => {
    const withToolbar = require('sulu-admin-bundle/containers').withToolbar;
    const Search = require('../Search').default;
    const router = new services_1.Router({});
    const search = (0, enzyme_1.shallow)(<Search route={router.route} router={router}/>);
    const toolbarFunction = (0, TestHelper_1.findWithHighOrderFunction)(withToolbar, Search);
    expect(search.find(Search_1.default)).toHaveLength(1);
    expect(search.find(Search_1.default).prop('router')).toEqual(router);
    expect(toolbarFunction()).toEqual({});
});
