"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const react_leaflet_1 = require("react-leaflet");
const Location_1 = __importDefault(require("../Location"));
const LocationOverlay_1 = __importDefault(require("../LocationOverlay"));
jest.mock('sulu-admin-bundle/utils/Translator', () => ({
    translate: jest.fn((key) => key),
}));
test('Component should render without a value', () => {
    const location = (0, enzyme_1.shallow)(<Location_1.default disabled={true} locale="en" onChange={jest.fn()} value={null}/>);
    expect(location.render()).toMatchSnapshot();
});
test('Component should render in disabled state', () => {
    const location = (0, enzyme_1.shallow)(<Location_1.default disabled={true} locale="en" onChange={jest.fn()} value={null}/>);
    expect(location.render()).toMatchSnapshot();
});
test('Component should render with a given value', () => {
    const locationData = {
        code: 'code-123',
        country: undefined,
        lat: 22,
        long: 33,
        number: undefined,
        street: 'street-123',
        title: 'title-123',
        town: 'town-123',
        zoom: 5,
    };
    const location = (0, enzyme_1.shallow)(<Location_1.default disabled={true} locale="en" onChange={jest.fn()} value={locationData}/>);
    expect(location.render()).toMatchSnapshot();
});
test('Component should render a map, a marker and a tooltip with correct props and content', () => {
    const locationData = {
        code: 'code-123',
        country: undefined,
        lat: 22,
        long: 33,
        number: undefined,
        street: 'street-123',
        title: 'title-123',
        town: 'street-123',
        zoom: 5,
    };
    const location = (0, enzyme_1.mount)(<Location_1.default disabled={true} locale="en" onChange={jest.fn()} value={locationData}/>);
    expect(location.find(react_leaflet_1.MapContainer).props()).toEqual(expect.objectContaining({
        attributionControl: false,
        center: [22, 33],
        doubleClickZoom: false,
        dragging: false,
        keyboard: false,
        scrollWheelZoom: false,
        tap: false,
        zoom: 5,
        zoomControl: false,
    }));
    expect(location.find(react_leaflet_1.Marker).props()).toEqual(expect.objectContaining({
        interactive: false,
        position: [22, 33],
    }));
    expect(location.find(react_leaflet_1.Tooltip).props()).toEqual(expect.objectContaining({
        permanent: true,
    }));
    expect(location.find(react_leaflet_1.Tooltip).text()).toContain('title-123');
    expect(location.find(react_leaflet_1.Tooltip).text()).toContain('code-123');
    expect(location.find(react_leaflet_1.Tooltip).text()).toContain('street-123');
    expect(location.find(react_leaflet_1.Tooltip).text()).toContain('street-123');
});
test('Component should not render a tooltip if given value has no additional information', () => {
    const locationData = {
        code: undefined,
        country: undefined,
        lat: 22,
        long: 33,
        number: undefined,
        street: undefined,
        title: undefined,
        town: undefined,
        zoom: 5,
    };
    const location = (0, enzyme_1.mount)(<Location_1.default disabled={true} locale="en" onChange={jest.fn()} value={locationData}/>);
    expect(location.find(react_leaflet_1.Tooltip).exists()).toEqual(false);
});
test('Should pass correct props to the LocationOverlay', () => {
    const locationData = {
        code: 'code-123',
        country: undefined,
        lat: 22,
        long: 33,
        number: undefined,
        street: 'street-123',
        title: 'title-123',
        town: 'street-123',
        zoom: 5,
    };
    const location = (0, enzyme_1.mount)(<Location_1.default disabled={true} locale="en" onChange={jest.fn()} value={locationData}/>);
    expect(location.find(LocationOverlay_1.default).props()).toEqual(expect.objectContaining({
        open: false,
        value: locationData,
    }));
});
test('Should open a LocationOverlay when the edit button is clicked', () => {
    const location = (0, enzyme_1.mount)(<Location_1.default disabled={true} locale="en" onChange={jest.fn()} value={null}/>);
    expect(location.find(LocationOverlay_1.default).props().open).toEqual(false);
    location.find('button').simulate('click');
    expect(location.find(LocationOverlay_1.default).props().open).toEqual(true);
});
test('Should close LocationOverlay when the onClose callback of the overlay is fired', () => {
    const location = (0, enzyme_1.mount)(<Location_1.default disabled={true} locale="en" onChange={jest.fn()} value={null}/>);
    location.find('button').simulate('click');
    expect(location.find(LocationOverlay_1.default).props().open).toEqual(true);
    location.find(LocationOverlay_1.default).props().onClose();
    location.update();
    expect(location.find(LocationOverlay_1.default).props().open).toEqual(false);
});
test('Should close overlay and call callback with correct value when the LocationOverlay is confirmed', () => {
    const newLocationData = {
        code: 'code-123',
        country: undefined,
        lat: 22,
        long: 33,
        number: undefined,
        street: 'street-123',
        title: 'title-123',
        town: 'street-123',
        zoom: 5,
    };
    const changeSpy = jest.fn();
    const location = (0, enzyme_1.mount)(<Location_1.default disabled={true} locale="en" onChange={changeSpy} value={null}/>);
    location.find('button').simulate('click');
    expect(location.find(LocationOverlay_1.default).props().open).toEqual(true);
    location.find(LocationOverlay_1.default).props().onConfirm(newLocationData);
    location.update();
    expect(location.find(LocationOverlay_1.default).props().open).toEqual(false);
    expect(changeSpy).toBeCalledWith(newLocationData);
});
test('Should update view of map when value prop is changed', () => {
    const locationData = {
        code: 'code-123',
        country: undefined,
        lat: 22,
        long: 33,
        number: undefined,
        street: 'street-123',
        title: 'title-123',
        town: 'street-123',
        zoom: 5,
    };
    const location = (0, enzyme_1.mount)(<Location_1.default disabled={true} locale="en" onChange={jest.fn()} value={locationData}/>);
    const mockedMap = { setView: jest.fn() };
    location.find(react_leaflet_1.MapContainer).props().whenCreated(mockedMap);
    expect(mockedMap.setView).not.toBeCalled();
    location.setProps({ value: { lat: 44, long: 55, zoom: 2 } });
    expect(mockedMap.setView).toBeCalledWith([44, 55], 2);
});
