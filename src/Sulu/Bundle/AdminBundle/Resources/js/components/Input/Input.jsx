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
const CharacterCounter_1 = __importDefault(require("../CharacterCounter"));
const Icon_1 = __importDefault(require("../Icon"));
const Loader_1 = __importDefault(require("../Loader"));
const SegmentCounter_1 = __importDefault(require("../SegmentCounter"));
const input_scss_1 = __importDefault(require("./input.scss"));
const LOADER_SIZE = 20;
class Input extends react_1.default.PureComponent {
    constructor() {
        super(...arguments);
        this.setInputRef = (ref) => {
            const { inputRef } = this.props;
            if (!inputRef) {
                return;
            }
            inputRef(ref);
        };
        this.setInputContainerRef = (ref) => {
            const { inputContainerRef } = this.props;
            if (!inputContainerRef) {
                return;
            }
            inputContainerRef(ref);
        };
        this.handleChange = (event) => {
            this.props.onChange(event.currentTarget.value || undefined, event);
        };
        this.handleFocus = (event) => {
            const { onFocus } = this.props;
            if (onFocus) {
                onFocus(event);
            }
        };
        this.handleKeyPress = (event) => {
            const { onKeyPress } = this.props;
            if (onKeyPress) {
                onKeyPress(event.key || undefined, event);
            }
        };
    }
    render() {
        const { alignment, autocomplete, autoFocus, headline, id, inputClass, valid, disabled, icon, loading, collapsed, maxCharacters, maxSegments, name, placeholder, onBlur, onIconClick, onClearClick, onKeyPress, segmentDelimiter, type, value, iconStyle, iconClassName, inputMode, inputRef, inputContainerRef, skin, min, max, step, } = this.props;
        const inputContainerClass = (0, classnames_1.default)(input_scss_1.default.input, input_scss_1.default[skin], input_scss_1.default[alignment], {
            [input_scss_1.default.error]: !valid,
            [input_scss_1.default.disabled]: disabled,
            [input_scss_1.default.collapsed]: collapsed,
            [input_scss_1.default.hasAppendIcon]: onClearClick,
            [input_scss_1.default.headline]: headline,
        });
        const iconClass = (0, classnames_1.default)(input_scss_1.default.icon, input_scss_1.default[skin], iconClassName, {
            [input_scss_1.default.iconClickable]: (!!icon && !!onIconClick),
            [input_scss_1.default.collapsed]: collapsed,
        });
        const prependContainerClass = (0, classnames_1.default)(input_scss_1.default.prependedContainer, input_scss_1.default[skin], {
            [input_scss_1.default.collapsed]: collapsed,
        });
        return (<react_1.Fragment>
                <div className={inputContainerClass} ref={inputContainerRef ? this.setInputContainerRef : undefined}>
                    {!loading && icon &&
                <div className={prependContainerClass}>
                            <Icon_1.default className={iconClass} name={icon} onClick={onIconClick ? onIconClick : undefined} style={iconStyle}/>
                        </div>}

                    {loading &&
                <div className={prependContainerClass}>
                            <Loader_1.default size={LOADER_SIZE}/>
                        </div>}

                    <input autoComplete={autocomplete} autoFocus={autoFocus} className={inputClass} disabled={disabled} id={id} inputMode={inputMode} max={max} min={min} name={name} onBlur={onBlur} onChange={this.handleChange} onFocus={this.handleFocus} onKeyPress={onKeyPress ? this.handleKeyPress : undefined} placeholder={placeholder} ref={inputRef ? this.setInputRef : undefined} step={step} type={type} value={value == null ? '' : value}/>

                    {!collapsed && !!value && onClearClick &&
                <div className={input_scss_1.default.appendContainer}>
                            <Icon_1.default className={iconClass} name="su-times" onClick={onClearClick ? onClearClick : undefined} style={iconStyle}/>
                        </div>}
                </div>
                {maxCharacters &&
                <CharacterCounter_1.default max={maxCharacters} value={value}/>}
                {segmentDelimiter && maxSegments &&
                <SegmentCounter_1.default delimiter={segmentDelimiter} max={maxSegments} value={value ? value.toString() : undefined}/>}
            </react_1.Fragment>);
    }
}
Input.defaultProps = {
    alignment: 'left',
    autoFocus: false,
    collapsed: false,
    disabled: false,
    skin: 'default',
    type: 'text',
    valid: true,
};
exports.default = Input;
