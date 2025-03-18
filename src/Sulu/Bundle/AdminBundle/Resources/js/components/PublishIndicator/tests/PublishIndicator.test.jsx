"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_2 = require("@testing-library/react");
const PublishIndicator_1 = __importDefault(require("../PublishIndicator"));
test('Show only the publish icon', () => {
    const { container } = (0, react_2.render)(<PublishIndicator_1.default published={true}/>);
    // eslint-disable-next-line testing-library/no-container
    expect(container.querySelector('.published')).toBeInTheDocument();
    // eslint-disable-next-line testing-library/no-container
    expect(container.querySelector('.draft')).not.toBeInTheDocument();
});
test('Show only the draft icon', () => {
    const { container } = (0, react_2.render)(<PublishIndicator_1.default draft={true}/>);
    // eslint-disable-next-line testing-library/no-container
    expect(container.querySelector('.draft')).toBeInTheDocument();
});
test('Show the draft and published icon', () => {
    const { container } = (0, react_2.render)(<PublishIndicator_1.default draft={true} published={true}/>);
    // eslint-disable-next-line testing-library/no-container
    expect(container.querySelector('.published')).toBeInTheDocument();
    // eslint-disable-next-line testing-library/no-container
    expect(container.querySelector('.draft')).toBeInTheDocument();
});
