"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const WritingAssistantIcon_1 = __importDefault(require("./icons/WritingAssistantIcon"));
const TranslateIcon_1 = __importDefault(require("./icons/TranslateIcon"));
const featureBadge_scss_1 = __importDefault(require("./featureBadge.scss"));
/**
 * @internal
 */
class FeatureBadge extends react_1.Component {
    constructor() {
        super(...arguments);
        this.handleClick = (event) => {
            event.stopPropagation();
        };
        this.handleWritingAssistantClick = () => {
            const { onWritingAssistantClick } = this.props;
            if (onWritingAssistantClick) {
                onWritingAssistantClick();
            }
        };
        this.handleTranslateClick = () => {
            const { onTranslateClick } = this.props;
            if (onTranslateClick) {
                onTranslateClick();
            }
        };
    }
    render() {
        const { messages: { writingAssistant: writingAssistantMessage, translate: translateMessage, }, onWritingAssistantClick, onTranslateClick, skin, } = this.props;
        const className = (0, classnames_1.default)(featureBadge_scss_1.default.content, featureBadge_scss_1.default['content' + skin.charAt(0).toUpperCase() + skin.slice(1)]);
        return (<div className={featureBadge_scss_1.default.container} onClick={this.handleClick} role="button">
                <div className={className}>
                    {onWritingAssistantClick && (<button className={featureBadge_scss_1.default.iconButton} onClick={this.handleWritingAssistantClick} title={writingAssistantMessage} type="button">
                            <WritingAssistantIcon_1.default />
                        </button>)}
                    {onWritingAssistantClick && onTranslateClick && <div className={featureBadge_scss_1.default.divider}></div>}
                    {onTranslateClick && (<button className={featureBadge_scss_1.default.iconButton} onClick={this.handleTranslateClick} title={translateMessage} type="button">
                            <TranslateIcon_1.default />
                        </button>)}
                </div>
            </div>);
    }
}
exports.default = FeatureBadge;
