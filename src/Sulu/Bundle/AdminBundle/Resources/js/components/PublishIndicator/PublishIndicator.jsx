"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const publishIndicator_scss_1 = __importDefault(require("./publishIndicator.scss"));
class PublishIndicator extends react_1.default.Component {
    render() {
        const { className, draft, published } = this.props;
        if (!draft && !published) {
            return null;
        }
        const containerClass = (0, classnames_1.default)(publishIndicator_scss_1.default.publishIndicator, className);
        return (<div className={containerClass}>
                {published && <span className={publishIndicator_scss_1.default.published}/>}
                {draft && <span className={publishIndicator_scss_1.default.draft}/>}
            </div>);
    }
}
PublishIndicator.defaultProps = {
    draft: false,
    published: false,
};
exports.default = PublishIndicator;
