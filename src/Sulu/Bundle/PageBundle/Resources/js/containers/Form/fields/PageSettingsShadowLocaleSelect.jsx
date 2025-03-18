"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const mobx_1 = require("mobx");
const components_1 = require("sulu-admin-bundle/components");
class PageSettingsShadowLocaleSelect extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this.handleChange = (value) => {
            const { onChange, onFinish } = this.props;
            onChange(value);
            onFinish();
        };
    }
    render() {
        const { disabled, formInspector, value } = this.props;
        const contentLocales = (0, mobx_1.toJS)(formInspector.getValueByPath('/contentLocales'));
        const locale = formInspector.locale;
        if (!(0, mobx_1.isArrayLike)(contentLocales)) {
            throw new Error('The "contentLocales" should be an array!');
        }
        const filteredContentLocales = contentLocales.filter((contentLocale) => locale && contentLocale !== locale.get());
        return (<components_1.SingleSelect disabled={!!disabled} onChange={this.handleChange} value={value}>
                {filteredContentLocales.length > 0 && filteredContentLocales.map((contentLocale) => {
                if (typeof contentLocale !== 'string') {
                    throw new Error('All entries in the "contentLocales" array must be strings!');
                }
                return (<components_1.SingleSelect.Option key={contentLocale} value={contentLocale}>
                            {contentLocale}
                        </components_1.SingleSelect.Option>);
            })}
            </components_1.SingleSelect>);
    }
}
exports.default = PageSettingsShadowLocaleSelect;
