"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_2 = require("@testing-library/react");
require("@testing-library/jest-dom/extend-expect");
const Loader_1 = __importDefault(require("../Loader"));
const loader_scss_1 = __importDefault(require("../loader.scss"));
const message_scss_1 = __importDefault(require("../message.scss"));
describe('Loader Component', () => {
    const defaultProps = {
        commandTitle: 'Test Command',
        expert: 'Test Expert',
    };
    test('renders the commandTitle and expert', () => {
        (0, react_2.render)(<Loader_1.default {...defaultProps}/>);
        expect(react_2.screen.getByText(defaultProps.commandTitle)).toBeInTheDocument();
        expect(react_2.screen.getByText(defaultProps.expert)).toBeInTheDocument();
    });
    test('renders the correct number of skeleton loaders', () => {
        (0, react_2.render)(<Loader_1.default {...defaultProps}/>);
        const skeletonLoaders = react_2.screen.getAllByText((content, element) => element.classList.contains(loader_scss_1.default.skeletonLoader));
        expect(skeletonLoaders).toHaveLength(6);
    });
    test('applies the correct classes to the skeleton loaders', () => {
        (0, react_2.render)(<Loader_1.default {...defaultProps}/>);
        const shortLoaders = react_2.screen.getAllByText((content, element) => element.classList.contains(loader_scss_1.default.short));
        expect(shortLoaders).toHaveLength(2);
    });
    test('applies the correct classes to the command and expert elements', () => {
        (0, react_2.render)(<Loader_1.default {...defaultProps}/>);
        const commandElement = react_2.screen.getByText(defaultProps.commandTitle).closest(`.${message_scss_1.default.command}`);
        const expertElement = react_2.screen.getByText(defaultProps.expert).closest(`.${message_scss_1.default.expert}`);
        expect(commandElement).toHaveClass(message_scss_1.default.command);
        expect(expertElement).toHaveClass(message_scss_1.default.expert);
    });
});
