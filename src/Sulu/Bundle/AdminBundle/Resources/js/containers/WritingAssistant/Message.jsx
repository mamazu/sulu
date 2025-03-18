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
const mobx_1 = require("mobx");
const components_1 = require("../../components");
const containers_1 = require("../../containers");
const utils_1 = require("../../utils");
const message_scss_1 = __importDefault(require("./message.scss"));
const MAX_LENGTH = 80;
/**
 * @internal
 */
class Message extends react_1.Component {
    constructor() {
        super(...arguments);
        this.handleOnRetry = () => {
            const { index, onRetry, } = this.props;
            onRetry(index);
        };
        this.handleOnCopy = () => {
            const { text, onCopy, } = this.props;
            onCopy(text);
        };
        this.handleOnInsert = () => {
            const { text, onInsert, } = this.props;
            onInsert(text);
        };
        this.handleOnClick = () => {
            const { index, onClick, } = this.props;
            if (!onClick) {
                return;
            }
            onClick(index);
        };
        this.trimText = (text) => {
            var _a;
            // strip html tags
            text = (_a = text === null || text === void 0 ? void 0 : text.replace(/<\/?[^>]+(>|$)/g, '')) !== null && _a !== void 0 ? _a : '';
            if (text.length <= 100) {
                return text;
            }
            const firstPartEnd = text.lastIndexOf(' ', 70);
            const firstPart = firstPartEnd !== -1 ? text.substring(0, firstPartEnd) : text.substring(0, 70);
            const lastPartStart = text.slice(-20).indexOf(' ');
            const lastPart = lastPartStart !== -1
                ? text.substring(text.length - 20 + lastPartStart + 1)
                : text.substring(text.length - 20);
            return `${firstPart} ... ${lastPart}`;
        };
        this.renderTextComponent = () => {
            const { type, text, collapsed, locale, } = this.props;
            if (collapsed) {
                return this.trimText(text);
            }
            if (type !== 'text_editor') {
                return text;
            }
            return (<div className={message_scss_1.default.textEditor}>
                <containers_1.TextEditor adapter="ckeditor5" disabled={true} locale={mobx_1.observable.box(locale)} onChange={this.handleTextEditorChange} value={text}/>
            </div>);
        };
        this.handleTextEditorChange = () => {
            // do nothing as text editor is always disabled
        };
    }
    render() {
        const { title, text, expert, command, collapsed, isLoading, displayActions, } = this.props;
        if (text === '') {
            return null;
        }
        const commandTitle = title || command;
        return (<react_1.Fragment>
                {commandTitle.substring(0, MAX_LENGTH) + ' ...' &&
                <div className={message_scss_1.default.command}>
                            {commandTitle}
                            {expert && <div className={message_scss_1.default.expert}>{expert}</div>}
                        </div>}

                <div className={message_scss_1.default.message} onClick={this.handleOnClick} role="button">
                    <div className={message_scss_1.default.text}>
                        {this.renderTextComponent()}
                    </div>

                    {displayActions && !collapsed &&
                <div className={message_scss_1.default.actions}>
                            <components_1.Button className={message_scss_1.default.insertButton} disabled={isLoading} onClick={this.handleOnInsert} size="small" skin="secondary">{(0, utils_1.translate)('sulu_admin.insert')}</components_1.Button>
                            <components_1.Button disabled={isLoading} icon="su-sync" onClick={this.handleOnRetry} size="small" skin="icon"/>
                            <components_1.Button disabled={isLoading} icon="su-copy" onClick={this.handleOnCopy} size="small" skin="icon"/>
                        </div>}
                </div>
            </react_1.Fragment>);
    }
}
exports.default = Message;
