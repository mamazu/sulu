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
const DatePicker_1 = __importDefault(require("../../../components/DatePicker"));
const Translator_1 = require("../../../utils/Translator");
const AbstractFieldFilterType_1 = __importDefault(require("./AbstractFieldFilterType"));
const dateFieldFilterType_scss_1 = __importDefault(require("./dateFieldFilterType.scss"));
function formatDate(date) {
    if (!date) {
        return '';
    }
    return date.toLocaleDateString(undefined, { year: 'numeric', month: '2-digit', day: '2-digit' });
}
function formatDateTime(date) {
    if (!date) {
        return '';
    }
    return date.toLocaleString(undefined, { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
}
class DateFieldFilterType extends AbstractFieldFilterType_1.default {
    constructor() {
        super(...arguments);
        this.handleChange = (field, fieldValue) => {
            const { onChange, value } = this;
            onChange(Object.assign(Object.assign({}, value), { [field]: fieldValue }));
        };
        this.handleFromChange = (value) => {
            this.handleChange('from', value);
        };
        this.handleToChange = (value) => {
            this.handleChange('to', value);
        };
    }
    setFromInputRef(ref) {
        if (ref) {
            ref.focus();
        }
    }
    getFormNode() {
        const { value } = this;
        return (<react_1.Fragment>
                <label className={dateFieldFilterType_scss_1.default.label}>{(0, Translator_1.translate)('sulu_admin.from')}</label>
                <DatePicker_1.default className={dateFieldFilterType_scss_1.default.date} inputRef={this.setFromInputRef} onChange={this.handleFromChange} options={{ dateFormat: true, timeFormat: this.options.timeFormat }} value={value ? value.from : undefined}/>
                <label className={dateFieldFilterType_scss_1.default.label}>{(0, Translator_1.translate)('sulu_admin.until')}</label>
                <DatePicker_1.default className={dateFieldFilterType_scss_1.default.date} onChange={this.handleToChange} options={{ dateFormat: true, timeFormat: this.options.timeFormat }} value={value ? value.to : undefined}/>
            </react_1.Fragment>);
    }
    getValueNode(value) {
        if (!value) {
            return Promise.resolve(null);
        }
        const { from, to } = value;
        const dateFormatter = this.options.timeFormat ? formatDateTime : formatDate;
        if (!from && !to) {
            return Promise.resolve(null);
        }
        if (from && !to) {
            return Promise.resolve((0, Translator_1.translate)('sulu_admin.from') + ' ' + dateFormatter(from));
        }
        if (!from && to) {
            return Promise.resolve((0, Translator_1.translate)('sulu_admin.until') + ' ' + dateFormatter(to));
        }
        return Promise.resolve(dateFormatter(from) + ' - ' + dateFormatter(to));
    }
}
exports.default = DateFieldFilterType;
