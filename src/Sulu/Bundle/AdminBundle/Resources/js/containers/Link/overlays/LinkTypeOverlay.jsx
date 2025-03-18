"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const SingleSelection_1 = __importDefault(require("../../SingleSelection"));
const utils_1 = require("../../../utils");
const Dialog_1 = __importDefault(require("../../../components/Dialog"));
const Form_1 = __importDefault(require("../../../components/Form"));
const Input_1 = __importDefault(require("../../../components/Input"));
const SingleSelect_1 = __importDefault(require("../../../components/SingleSelect"));
class LinkTypeOverlay extends react_1.default.Component {
    render() {
        const { query, anchor, href, locale, onQueryChange, onAnchorChange, onCancel, onConfirm, onTargetChange, onTitleChange, onHrefChange, open, options, target, title, } = this.props;
        if (!options) {
            throw new Error('The LinkTypeOverlay needs some options in order to work!');
        }
        const { displayProperties, emptyText = '', icon = '', listAdapter = '', overlayTitle = '', resourceKey, } = options;
        return (<Dialog_1.default cancelText={(0, utils_1.translate)('sulu_admin.cancel')} confirmText={(0, utils_1.translate)('sulu_admin.confirm')} onCancel={onCancel} onConfirm={onConfirm} open={open} title={(0, utils_1.translate)('sulu_admin.link')}>
                <Form_1.default>
                    <Form_1.default.Field label={(0, utils_1.translate)('sulu_admin.link_url')} required={true}>
                        <SingleSelection_1.default adapter={listAdapter} displayProperties={displayProperties} emptyText={emptyText} icon={icon} listKey={resourceKey} locale={locale} onChange={onHrefChange} overlayTitle={overlayTitle} resourceKey={resourceKey} value={href}/>
                    </Form_1.default.Field>

                    {onQueryChange &&
                <Form_1.default.Field label={(0, utils_1.translate)('sulu_admin.link_query')}>
                            <Input_1.default onChange={onQueryChange} value={query}/>
                        </Form_1.default.Field>}

                    {onAnchorChange &&
                <Form_1.default.Field label={(0, utils_1.translate)('sulu_admin.link_anchor')}>
                            <Input_1.default onChange={onAnchorChange} value={anchor}/>
                        </Form_1.default.Field>}

                    {onTargetChange &&
                <Form_1.default.Field label={(0, utils_1.translate)('sulu_admin.link_target')} required={true}>
                            <SingleSelect_1.default onChange={onTargetChange} value={target}>
                                <SingleSelect_1.default.Option value="_blank">_blank</SingleSelect_1.default.Option>
                                <SingleSelect_1.default.Option value="_self">_self</SingleSelect_1.default.Option>
                                <SingleSelect_1.default.Option value="_parent">_parent</SingleSelect_1.default.Option>
                                <SingleSelect_1.default.Option value="_top">_top</SingleSelect_1.default.Option>
                            </SingleSelect_1.default>
                        </Form_1.default.Field>}

                    {onTitleChange &&
                <Form_1.default.Field label={(0, utils_1.translate)('sulu_admin.link_title')}>
                            <Input_1.default onChange={onTitleChange} value={title}/>
                        </Form_1.default.Field>}
                </Form_1.default>
            </Dialog_1.default>);
    }
}
exports.default = LinkTypeOverlay;
