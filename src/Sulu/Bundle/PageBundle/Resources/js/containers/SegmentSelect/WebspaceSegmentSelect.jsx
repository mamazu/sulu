"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const components_1 = require("sulu-admin-bundle/components");
const field_scss_1 = __importDefault(require("sulu-admin-bundle/components/Form/field.scss"));
const utils_1 = require("sulu-admin-bundle/utils");
const webspaceSegmentSelect_scss_1 = __importDefault(require("./webspaceSegmentSelect.scss"));
class WebspaceSegmentSelect extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this.handleSelectChange = (value) => {
            const { onChange, webspace } = this.props;
            onChange(webspace.key, value);
        };
    }
    render() {
        const { disabled, value, webspace, webspaceNameVisible } = this.props;
        return (<div className={webspaceSegmentSelect_scss_1.default.webspaceSection}>
                <label className={field_scss_1.default.label}>
                    {webspaceNameVisible && webspace.name + ' - '}{(0, utils_1.translate)('sulu_admin.segment')}
                </label>

                <components_1.SingleSelect disabled={!!disabled} onChange={this.handleSelectChange} value={value}>
                    <components_1.SingleSelect.Option>
                        {(0, utils_1.translate)('sulu_admin.none_selected')}
                    </components_1.SingleSelect.Option>
                    {webspace.segments.map(({ key, title }) => (<components_1.SingleSelect.Option key={key} value={key}>
                            {title}
                        </components_1.SingleSelect.Option>))}
                </components_1.SingleSelect>
            </div>);
    }
}
exports.default = WebspaceSegmentSelect;
