"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_2 = require("@testing-library/react");
const Grid_1 = __importDefault(require("../Grid"));
test('Render a Grid with Items in all sizes', () => {
    const { container } = (0, react_2.render)(<Grid_1.default>
            <Grid_1.default.Item colSpan={1}/>
            <Grid_1.default.Item colSpan={2}/>
            <Grid_1.default.Item colSpan={3}/>
            <Grid_1.default.Item colSpan={4}/>
            <Grid_1.default.Item colSpan={5}/>
            <Grid_1.default.Item colSpan={6}/>
            <Grid_1.default.Item colSpan={7}/>
            <Grid_1.default.Item colSpan={8}/>
            <Grid_1.default.Item colSpan={9}/>
            <Grid_1.default.Item colSpan={10}/>
            <Grid_1.default.Item colSpan={11}/>
            <Grid_1.default.Item colSpan={12}/>
        </Grid_1.default>);
    expect(container).toMatchSnapshot();
});
test('Render a Grid with Sections', () => {
    const { container } = (0, react_2.render)(<Grid_1.default>
            <Grid_1.default.Section colSpan={4}>
                <Grid_1.default.Item colSpan={1}/>
                <Grid_1.default.Item colSpan={2}/>
                <Grid_1.default.Item colSpan={3}/>
                <Grid_1.default.Item colSpan={4}/>
                <Grid_1.default.Item colSpan={5}/>
                <Grid_1.default.Item colSpan={6}/>
            </Grid_1.default.Section>
            <Grid_1.default.Section colSpan={8}>
                <Grid_1.default.Item colSpan={7}/>
                <Grid_1.default.Item colSpan={8}/>
                <Grid_1.default.Item colSpan={9}/>
                <Grid_1.default.Item colSpan={10}/>
                <Grid_1.default.Item colSpan={11}/>
                <Grid_1.default.Item colSpan={12}/>
            </Grid_1.default.Section>
        </Grid_1.default>);
    expect(container).toMatchSnapshot();
});
test('Render a Grid with Items having spaces between them', () => {
    const { container } = (0, react_2.render)(<Grid_1.default>
            <Grid_1.default.Item colSpan={4} spaceAfter={8}/>
            <Grid_1.default.Item colSpan={2} spaceBefore={10}/>
        </Grid_1.default>);
    expect(container).toMatchSnapshot();
});
test('Render a Grid with class names attached', () => {
    const { container } = (0, react_2.render)(<Grid_1.default className="test-grid">
            <Grid_1.default.Section className="test-section">
                <Grid_1.default.Item className="test-item"/>
            </Grid_1.default.Section>
        </Grid_1.default>);
    expect(container).toMatchSnapshot();
});
