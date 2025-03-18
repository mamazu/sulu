"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const CroppedText_1 = __importDefault(require("../../components/CroppedText"));
const PublishIndicator_1 = __importDefault(require("../../components/PublishIndicator"));
const smartContentItem_scss_1 = __importDefault(require("./smartContentItem.scss"));
class SmartContentItem extends react_1.default.Component {
    render() {
        const _a = this.props.item, { id, image, title, publishedState, published } = _a, rest = __rest(_a, ["id", "image", "title", "publishedState", "published"]);
        return (<div className={smartContentItem_scss_1.default.smartContentItem}>
                {image &&
                <div className={smartContentItem_scss_1.default.image}>
                        <img src={image}/>
                    </div>}
                <div className={smartContentItem_scss_1.default.title}>
                    {(publishedState !== undefined || published !== undefined) && !(publishedState && published) &&
                <div className={smartContentItem_scss_1.default.publishIndicator}>
                            <PublishIndicator_1.default draft={!publishedState} published={!!published}/>
                        </div>}
                    <CroppedText_1.default>{title}</CroppedText_1.default>
                </div>
                {Object.keys(rest).map((key) => (<div className={smartContentItem_scss_1.default.column} key={key}>
                        <CroppedText_1.default>{rest[key]}</CroppedText_1.default>
                    </div>))}
            </div>);
    }
}
exports.default = SmartContentItem;
