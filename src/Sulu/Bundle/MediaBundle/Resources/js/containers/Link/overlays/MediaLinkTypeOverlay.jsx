"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const mobx_1 = require("mobx");
const components_1 = require("sulu-admin-bundle/components");
const stores_1 = require("sulu-admin-bundle/stores");
const utils_1 = require("sulu-admin-bundle/utils");
const SingleSelect_1 = __importDefault(require("sulu-admin-bundle/components/SingleSelect"));
const SingleMediaSelection_1 = __importDefault(require("../../SingleMediaSelection"));
class MediaLinkTypeOverlay extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this.handleChange = (value, media) => {
            const { onHrefChange } = this.props;
            onHrefChange(value.id, media);
        };
    }
    render() {
        const { href, locale, onCancel, onConfirm, onTitleChange, onTargetChange, onAnchorChange, open, title, target, anchor, } = this.props;
        if (typeof href === 'string') {
            throw new Error('The id of a media should always be a number!');
        }
        return (<components_1.Dialog cancelText={(0, utils_1.translate)('sulu_admin.cancel')} confirmText={(0, utils_1.translate)('sulu_admin.confirm')} onCancel={onCancel} onConfirm={onConfirm} open={open} title={(0, utils_1.translate)('sulu_admin.link')}>
                <components_1.Form>
                    <components_1.Form.Field label={(0, utils_1.translate)('sulu_admin.link_url')} required={true}>
                        <SingleMediaSelection_1.default locale={locale || mobx_1.observable.box(stores_1.userStore.contentLocale)} onChange={this.handleChange} value={{ displayOption: undefined, id: href }}/>
                    </components_1.Form.Field>

                    {!!onAnchorChange &&
                <components_1.Form.Field label={(0, utils_1.translate)('sulu_admin.link_anchor')}>
                            <components_1.Input onChange={onAnchorChange} value={anchor}/>
                        </components_1.Form.Field>}

                    {!!onTargetChange &&
                <components_1.Form.Field label={(0, utils_1.translate)('sulu_admin.link_target')} required={true}>
                            <SingleSelect_1.default onChange={onTargetChange} value={target}>
                                <SingleSelect_1.default.Option value="_blank">_blank</SingleSelect_1.default.Option>
                                <SingleSelect_1.default.Option value="_self">_self</SingleSelect_1.default.Option>
                                <SingleSelect_1.default.Option value="_parent">_parent</SingleSelect_1.default.Option>
                                <SingleSelect_1.default.Option value="_top">_top</SingleSelect_1.default.Option>
                            </SingleSelect_1.default>
                        </components_1.Form.Field>}

                    {!!onTitleChange &&
                <components_1.Form.Field label={(0, utils_1.translate)('sulu_admin.link_title')}>
                            <components_1.Input onChange={onTitleChange} value={title}/>
                        </components_1.Form.Field>}
                </components_1.Form>
            </components_1.Dialog>);
    }
}
exports.default = MediaLinkTypeOverlay;
