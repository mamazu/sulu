"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const AddressCardPreview_1 = __importDefault(require("../AddressCardPreview"));
jest.mock('sulu-admin-bundle/utils/Translator', () => ({
    translate: jest.fn((key) => key),
}));
test('Render AddressCardPreview with minimal information', () => {
    expect((0, enzyme_1.render)(<AddressCardPreview_1.default billingAddress={false} city={undefined} country={undefined} deliveryAddress={false} number={undefined} primaryAddress={false} state={undefined} street={undefined} title={undefined} type="Home" zip={undefined}/>)).toMatchSnapshot();
});
test('Render AddressCardPreview with every available information', () => {
    expect((0, enzyme_1.render)(<AddressCardPreview_1.default billingAddress={true} city="Dornbirn" country="Austria" deliveryAddress={true} number="13a" primaryAddress={true} state="Vorarlberg" street="Steinebach" title="Headquarter" type="Home" zip="6850"/>)).toMatchSnapshot();
});
