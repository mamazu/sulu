"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const components_1 = require("sulu-admin-bundle/components");
const DownloadListItem_1 = __importDefault(require("./DownloadListItem"));
class DownloadList extends react_1.default.PureComponent {
    constructor() {
        super(...arguments);
        this.handleClose = () => {
            this.props.onClose();
        };
        this.handleItemDownload = (url) => {
            if (url) {
                this.props.onDownload(url);
            }
        };
        this.handleItemCopy = () => {
            this.props.onClose();
        };
    }
    createItems() {
        const { copyText, imageSizes, downloadUrl, downloadText, } = this.props;
        const directDownloadItem = (<DownloadListItem_1.default key="downloadlist-direct-download-item" onClick={this.handleItemDownload} url={downloadUrl}>
                {downloadText}
            </DownloadListItem_1.default>);
        const divider = <components_1.Menu.Divider key="downloadlist-divider"/>;
        const copyableItems = imageSizes.map((imageSize, index) => (<DownloadListItem_1.default copyText={copyText} copyUrlOnClick={true} key={index} onClick={this.handleItemCopy} url={imageSize.url}>
                {imageSize.label}
            </DownloadListItem_1.default>));
        return [
            directDownloadItem,
            divider,
            copyableItems,
        ];
    }
    render() {
        const { open, buttonRef, } = this.props;
        const items = this.createItems();
        return (<components_1.Popover anchorElement={buttonRef} onClose={this.handleClose} open={open}>
                {(setPopoverRef, popoverStyle) => (<components_1.Menu menuRef={setPopoverRef} style={popoverStyle}>
                        {items}
                    </components_1.Menu>)}
            </components_1.Popover>);
    }
}
exports.default = DownloadList;
