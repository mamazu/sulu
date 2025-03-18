"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_2 = require("@testing-library/react");
const user_event_1 = __importDefault(require("@testing-library/user-event"));
const FileUploadButton_1 = __importDefault(require("../FileUploadButton"));
test('Render a FileUploadButton', () => {
    const { container } = (0, react_2.render)(<FileUploadButton_1.default onUpload={jest.fn()}>
            Upload something!
        </FileUploadButton_1.default>);
    expect(container).toMatchSnapshot();
});
test('Render a disabled FileUploadButton', () => {
    const { container } = (0, react_2.render)(<FileUploadButton_1.default disabled={true} onUpload={jest.fn()}>
            Upload something!
        </FileUploadButton_1.default>);
    expect(container).toMatchSnapshot();
});
test('Render a FileUploadButton with other skin and icon', () => {
    const { container } = (0, react_2.render)(<FileUploadButton_1.default icon="su-image" onUpload={jest.fn()} skin="link">
            Upload something!
        </FileUploadButton_1.default>);
    expect(container).toMatchSnapshot();
});
test('Call onUpload callback when a file is uploaded', () => __awaiter(void 0, void 0, void 0, function* () {
    const uploadSpy = jest.fn();
    const file = new File(['hello'], 'hello.png', { type: 'image/png' });
    const { container } = (0, react_2.render)(<FileUploadButton_1.default onUpload={uploadSpy}>
            Upload something!
        </FileUploadButton_1.default>);
    // eslint-disable-next-line testing-library/no-container
    const input = container.querySelector('input');
    yield user_event_1.default.upload(input, file);
    expect(uploadSpy).toBeCalledTimes(1);
    expect(uploadSpy).toBeCalledWith(file);
}));
test('Filter dropped files by accept prop', () => __awaiter(void 0, void 0, void 0, function* () {
    const uploadSpy = jest.fn();
    const rejectedFile = new File(['hello'], 'hello.png', { type: 'image/png' });
    const acceptedFile = new File(['hello'], 'data.json', { type: 'application/json' });
    const { container } = (0, react_2.render)(<FileUploadButton_1.default accept="application/json" onUpload={uploadSpy}>
            Upload something!
        </FileUploadButton_1.default>);
    // eslint-disable-next-line testing-library/no-container
    const input = container.querySelector('input');
    yield user_event_1.default.upload(input, rejectedFile);
    expect(uploadSpy).toBeCalledTimes(0);
    yield user_event_1.default.upload(input, acceptedFile);
    expect(uploadSpy).toBeCalledWith(acceptedFile);
    expect(uploadSpy).toBeCalledTimes(1);
}));
