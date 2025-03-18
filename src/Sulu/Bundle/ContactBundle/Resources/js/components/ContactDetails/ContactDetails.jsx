"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const mobx_1 = require("mobx");
const mobx_react_1 = require("mobx-react");
const components_1 = require("sulu-admin-bundle/components");
const utils_1 = require("sulu-admin-bundle/utils");
const Email_1 = __importDefault(require("./Email"));
const Fax_1 = __importDefault(require("./Fax"));
const Phone_1 = __importDefault(require("./Phone"));
const SocialMedia_1 = __importDefault(require("./SocialMedia"));
const Website_1 = __importDefault(require("./Website"));
let ContactDetails = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _instanceExtraInitializers = [];
    let _get_emails_decorators;
    let _get_phones_decorators;
    var ContactDetails = _classThis = class extends _classSuper {
        constructor() {
            super(...arguments);
            this.addEntry = (__runInitializers(this, _instanceExtraInitializers), (type) => {
                const { onBlur, onChange, value } = this.props;
                onChange(Object.assign(Object.assign({}, value), { [type]: value[type].concat(this.getEmptyEntry(type)) }));
                onBlur();
            });
            this.handleEmailAddClick = () => {
                this.addEntry('emails');
            };
            this.handlePhoneAddClick = () => {
                this.addEntry('phones');
            };
            this.handleWebsiteAddClick = () => {
                this.addEntry('websites');
            };
            this.handleFaxAddClick = () => {
                this.addEntry('faxes');
            };
            this.handleSocialMediaAddClick = () => {
                this.addEntry('socialMedia');
            };
            this.updateValue = (type, index, property, updatedValue) => {
                const { onChange, value } = this.props;
                const newValue = (0, mobx_1.toJS)(value);
                const typeEntries = newValue[type];
                if (typeEntries[index] === undefined) {
                    typeEntries[index] = this.getEmptyEntry(type);
                }
                typeEntries[index][property] = updatedValue;
                onChange(newValue);
            };
            this.handleEmailChange = (index, email) => {
                this.updateValue('emails', index, 'email', email);
            };
            this.handlePhoneChange = (index, phone) => {
                this.updateValue('phones', index, 'phone', phone);
            };
            this.handleWebsiteChange = (index, website) => {
                this.updateValue('websites', index, 'website', website);
            };
            this.handleFaxChange = (index, fax) => {
                this.updateValue('faxes', index, 'fax', fax);
            };
            this.handleUsernameChange = (index, username) => {
                this.updateValue('socialMedia', index, 'username', username);
            };
            this.removeEntry = (type, removeIndex) => {
                const { onBlur, onChange, value } = this.props;
                onChange(Object.assign(Object.assign({}, value), { [type]: value[type].filter((email, index) => index !== removeIndex) }));
                onBlur();
            };
            this.handleEmailRemove = (removeIndex) => {
                this.removeEntry('emails', removeIndex);
            };
            this.handlePhoneRemove = (removeIndex) => {
                this.removeEntry('phones', removeIndex);
            };
            this.handleWebsiteRemove = (removeIndex) => {
                this.removeEntry('websites', removeIndex);
            };
            this.handleFaxRemove = (removeIndex) => {
                this.removeEntry('faxes', removeIndex);
            };
            this.handleSocialMediaRemove = (removeIndex) => {
                this.removeEntry('socialMedia', removeIndex);
            };
            this.handleEmailTypeChange = (index, type) => {
                this.updateValue('emails', index, 'emailType', type);
                this.props.onBlur();
            };
            this.handlePhoneTypeChange = (index, type) => {
                this.updateValue('phones', index, 'phoneType', type);
                this.props.onBlur();
            };
            this.handleWebsiteTypeChange = (index, type) => {
                this.updateValue('websites', index, 'websiteType', type);
                this.props.onBlur();
            };
            this.handleFaxTypeChange = (index, type) => {
                this.updateValue('faxes', index, 'faxType', type);
                this.props.onBlur();
            };
            this.handleSocialMediaTypeChange = (index, type) => {
                this.updateValue('socialMedia', index, 'socialMediaType', type);
                this.props.onBlur();
            };
        }
        getEmptyEntry(type) {
            switch (type) {
                case 'emails':
                    return { email: undefined, emailType: Email_1.default.types[0].value };
                case 'phones':
                    return { phone: undefined, phoneType: Phone_1.default.types[0].value };
                case 'websites':
                    return { website: undefined, websiteType: Website_1.default.types[0].value };
                case 'faxes':
                    return { fax: undefined, faxType: Fax_1.default.types[0].value };
                case 'socialMedia':
                    return { socialMediaType: SocialMedia_1.default.types[0].value, username: undefined };
            }
        }
        get emails() {
            const { value: { emails } } = this.props;
            if (emails.length === 0) {
                return [this.getEmptyEntry('emails')];
            }
            return emails;
        }
        get phones() {
            const { value: { phones } } = this.props;
            if (phones.length === 0) {
                return [this.getEmptyEntry('phones')];
            }
            return phones;
        }
        render() {
            const { onBlur, value } = this.props;
            const { faxes, socialMedia, websites } = value;
            return (<components_1.Form>
                {this.emails.map((email, index) => (<Email_1.default email={email.email} index={index} key={index} onBlur={onBlur} onEmailChange={this.handleEmailChange} onRemove={this.handleEmailRemove} onTypeChange={this.handleEmailTypeChange} type={email.emailType}/>))}
                {this.phones.map((phone, index) => (<Phone_1.default index={index} key={index} onBlur={onBlur} onPhoneChange={this.handlePhoneChange} onRemove={this.handlePhoneRemove} onTypeChange={this.handlePhoneTypeChange} phone={phone.phone} type={phone.phoneType}/>))}
                {faxes.map((fax, index) => (<Fax_1.default fax={fax.fax} index={index} key={index} onBlur={onBlur} onFaxChange={this.handleFaxChange} onRemove={this.handleFaxRemove} onTypeChange={this.handleFaxTypeChange} type={fax.faxType}/>))}
                {websites.map((website, index) => (<Website_1.default index={index} key={index} onBlur={onBlur} onRemove={this.handleWebsiteRemove} onTypeChange={this.handleWebsiteTypeChange} onWebsiteChange={this.handleWebsiteChange} type={website.websiteType} website={website.website}/>))}
                {socialMedia.map((socialMedia, index) => (<SocialMedia_1.default index={index} key={index} onBlur={onBlur} onRemove={this.handleSocialMediaRemove} onTypeChange={this.handleSocialMediaTypeChange} onUsernameChange={this.handleUsernameChange} type={socialMedia.socialMediaType} username={socialMedia.username}/>))}
                <components_1.Form.Field colSpan={6} label={(0, utils_1.translate)('sulu_contact.contact_details')}>
                    <components_1.DropdownButton icon="su-plus" label={(0, utils_1.translate)('sulu_admin.add')}>
                        <components_1.DropdownButton.Item onClick={this.handleEmailAddClick}>
                            {(0, utils_1.translate)('sulu_contact.email')}
                        </components_1.DropdownButton.Item>
                        <components_1.DropdownButton.Item onClick={this.handlePhoneAddClick}>
                            {(0, utils_1.translate)('sulu_contact.phone')}
                        </components_1.DropdownButton.Item>
                        <components_1.DropdownButton.Item onClick={this.handleFaxAddClick}>
                            {(0, utils_1.translate)('sulu_contact.fax')}
                        </components_1.DropdownButton.Item>
                        <components_1.DropdownButton.Item onClick={this.handleWebsiteAddClick}>
                            {(0, utils_1.translate)('sulu_contact.website')}
                        </components_1.DropdownButton.Item>
                        <components_1.DropdownButton.Item onClick={this.handleSocialMediaAddClick}>
                            {(0, utils_1.translate)('sulu_contact.social_media')}
                        </components_1.DropdownButton.Item>
                    </components_1.DropdownButton>
                </components_1.Form.Field>
            </components_1.Form>);
        }
    };
    __setFunctionName(_classThis, "ContactDetails");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _get_emails_decorators = [mobx_1.computed];
        _get_phones_decorators = [mobx_1.computed];
        __esDecorate(_classThis, null, _get_emails_decorators, { kind: "getter", name: "emails", static: false, private: false, access: { has: obj => "emails" in obj, get: obj => obj.emails }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_phones_decorators, { kind: "getter", name: "phones", static: false, private: false, access: { has: obj => "phones" in obj, get: obj => obj.phones }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ContactDetails = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    _classThis.defaultProps = {
        value: {
            emails: [],
            faxes: [],
            phones: [],
            socialMedia: [],
            websites: [],
        },
    };
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ContactDetails = _classThis;
})();
exports.default = ContactDetails;
