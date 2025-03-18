"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const textversionjs_1 = __importDefault(require("textversionjs"));
const components_1 = require("sulu-admin-bundle/components");
const searchResult_scss_1 = __importDefault(require("./searchResult.scss"));
class SearchResult extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this.handleClick = () => {
            const { index, onClick } = this.props;
            onClick(index);
        };
    }
    render() {
        const { description, icon, image, locale, resource, title } = this.props;
        return (<div className={searchResult_scss_1.default.searchResult} onClick={this.handleClick} role="button">
                <div className={searchResult_scss_1.default.imageContainer}>
                    {image &&
                <img className={searchResult_scss_1.default.image} src={image}/>}
                    {!image && icon &&
                <div className={searchResult_scss_1.default.icon}>
                            <components_1.Icon name={icon}/>
                        </div>}
                </div>
                <div className={searchResult_scss_1.default.resultContainer}>
                    {resource &&
                <div className={searchResult_scss_1.default.resource}>
                            {resource}
                        </div>}
                    <div className={searchResult_scss_1.default.titleContainer}>
                        <div className={searchResult_scss_1.default.title}>
                            {title}
                        </div>
                        {locale && <div className={searchResult_scss_1.default.locale}> ({locale})</div>}
                    </div>
                    {description &&
                <div className={searchResult_scss_1.default.description}>
                            {(0, textversionjs_1.default)(description)}
                        </div>}
                </div>
            </div>);
    }
}
exports.default = SearchResult;
