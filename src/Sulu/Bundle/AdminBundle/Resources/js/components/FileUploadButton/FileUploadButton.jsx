"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_dropzone_1 = __importDefault(require("react-dropzone"));
const Button_1 = __importDefault(require("../Button"));
class FileUploadButton extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this.handleDrop = (files) => {
            const file = files[0];
            this.props.onUpload(file);
        };
    }
    render() {
        const { children, disabled, icon, skin, accept } = this.props;
        return (<react_dropzone_1.default accept={accept ? { [accept]: [] } : undefined} onDrop={this.handleDrop} style={{}}>
                {({ getInputProps, getRootProps }) => (<div {...getRootProps()}>
                        <Button_1.default disabled={disabled} icon={icon} skin={skin}>
                            {children}
                        </Button_1.default>
                        <input {...getInputProps()}/>
                    </div>)}
            </react_dropzone_1.default>);
    }
}
FileUploadButton.defaultProps = {
    accept: undefined,
    disabled: false,
    icon: undefined,
    skin: undefined,
};
exports.default = FileUploadButton;
