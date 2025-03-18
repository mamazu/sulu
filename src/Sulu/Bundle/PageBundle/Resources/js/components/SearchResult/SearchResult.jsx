"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const searchResult_scss_1 = __importDefault(require("./searchResult.scss"));
class SearchResult extends react_1.default.Component {
    render() {
        const { description, title, url } = this.props;
        return (<div className={searchResult_scss_1.default.searchResult}>
                <div className={searchResult_scss_1.default.title}>{title}</div>
                <div className={searchResult_scss_1.default.url}>{url}</div>
                <div className={searchResult_scss_1.default.description}>{description}</div>
            </div>);
    }
}
exports.default = SearchResult;
