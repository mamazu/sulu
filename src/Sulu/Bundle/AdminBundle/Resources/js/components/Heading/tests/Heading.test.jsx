"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_2 = require("@testing-library/react");
const Heading_1 = __importDefault(require("../Heading"));
test('Render heading', () => {
    const { container } = (0, react_2.render)(<Heading_1.default description="Hides a block when activated" icon="su-hide" label="Hide a block">
            Hello World!
        </Heading_1.default>);
    expect(container).toMatchSnapshot();
});
