"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Folder_1 = __importDefault(require("./Folder"));
const folderList_scss_1 = __importDefault(require("./folderList.scss"));
class FolderList extends react_1.default.PureComponent {
    constructor() {
        super(...arguments);
        this.handleFolderClick = (folderId) => {
            if (this.props.onFolderClick) {
                this.props.onFolderClick(folderId);
            }
        };
    }
    cloneFolders(originalFolders) {
        return react_1.default.Children.map(originalFolders, (folder) => (<li>
                {react_1.default.cloneElement(folder, Object.assign(Object.assign({}, folder.props), { onClick: this.handleFolderClick }))}
            </li>));
    }
    render() {
        const { children } = this.props;
        const clonedFolders = this.cloneFolders(children);
        return (<ul className={folderList_scss_1.default.folderList}>
                {clonedFolders}
            </ul>);
    }
}
FolderList.Folder = Folder_1.default;
exports.default = FolderList;
