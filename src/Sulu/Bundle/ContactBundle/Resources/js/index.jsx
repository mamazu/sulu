"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const mobx_1 = require("mobx");
const containers_1 = require("sulu-admin-bundle/containers");
const services_1 = require("sulu-admin-bundle/services");
const utils_1 = require("sulu-admin-bundle/utils");
const views_1 = require("sulu-admin-bundle/views");
const AddressCardPreview_1 = __importDefault(require("./components/AddressCardPreview"));
const BankCardPreview_1 = __importDefault(require("./components/BankCardPreview"));
const Email_1 = __importDefault(require("./components/ContactDetails/Email"));
const Fax_1 = __importDefault(require("./components/ContactDetails/Fax"));
const Phone_1 = __importDefault(require("./components/ContactDetails/Phone"));
const SocialMedia_1 = __importDefault(require("./components/ContactDetails/SocialMedia"));
const Website_1 = __importDefault(require("./components/ContactDetails/Website"));
const Form_1 = require("./containers/Form");
const List_1 = require("./containers/List");
const AddContactToolbarAction_1 = __importDefault(require("./views/List/toolbarActions/AddContactToolbarAction"));
const AddMediaToolbarAction_1 = __importDefault(require("./views/List/toolbarActions/AddMediaToolbarAction"));
const DeleteMediaToolbarAction_1 = __importDefault(require("./views/List/toolbarActions/DeleteMediaToolbarAction"));
containers_1.fieldRegistry.add('contact_details', Form_1.ContactDetails);
containers_1.fieldRegistry.add('iban', Form_1.Iban);
containers_1.fieldRegistry.add('bic', Form_1.Bic);
containers_1.fieldRegistry.add('contact_account_selection', Form_1.ContactAccountSelection);
containers_1.listFieldFilterTypeRegistry.add('country', List_1.CountryFieldFilterType);
views_1.listToolbarActionRegistry.add('sulu_contact.add_contact', AddContactToolbarAction_1.default);
views_1.listToolbarActionRegistry.add('sulu_contact.add_media', AddMediaToolbarAction_1.default);
views_1.listToolbarActionRegistry.add('sulu_contact.delete_media', DeleteMediaToolbarAction_1.default);
services_1.initializer.addUpdateConfigHook('sulu_contact', (config, initialized) => {
    if (initialized) {
        return;
    }
    (0, mobx_1.when)(() => !!services_1.initializer.initializedTranslationsLocale, () => {
        List_1.CountryFieldFilterType.countries = config.countries;
        Email_1.default.types = config.emailTypes
            .map((emailType) => ({ label: (0, utils_1.translate)(emailType.name), value: emailType.id }));
        Fax_1.default.types = config.faxTypes
            .map((faxType) => ({ label: (0, utils_1.translate)(faxType.name), value: faxType.id }));
        Phone_1.default.types = config.phoneTypes
            .map((phoneType) => ({ label: (0, utils_1.translate)(phoneType.name), value: phoneType.id }));
        SocialMedia_1.default.types = config.socialMediaTypes
            .map((socialMediaType) => ({ label: socialMediaType.name, value: socialMediaType.id }));
        Website_1.default.types = config.websiteTypes
            .map((urlType) => ({ label: (0, utils_1.translate)(urlType.name), value: urlType.id }));
        containers_1.fieldRegistry.add('addresses', containers_1.CardCollection, {
            addOverlayTitle: 'sulu_contact.add_address',
            editOverlayTitle: 'sulu_contact.edit_address',
            renderCardContent: function AddressCard(card) {
                const addressType = config.addressTypes
                    .find((addressType) => card.addressType === addressType.id);
                return (<AddressCardPreview_1.default billingAddress={card.billingAddress} city={card.city} country={card.countryCode ? config.countries[card.countryCode] : undefined} deliveryAddress={card.deliveryAddress} number={card.number} primaryAddress={card.primaryAddress} state={card.state} street={card.street} title={card.title} type={(0, utils_1.translate)(addressType.name)} zip={card.zip}/>);
            },
            schema: {
                title: {
                    label: (0, utils_1.translate)('sulu_admin.title'),
                    type: 'text_line',
                },
                addresTypeInformation: {
                    items: {
                        addressType: {
                            options: {
                                default_value: {
                                    value: config.addressTypes[0].id,
                                },
                                values: {
                                    value: config.addressTypes.map((addressType) => ({
                                        name: addressType.id,
                                        title: (0, utils_1.translate)(addressType.name),
                                    })),
                                },
                            },
                            colSpan: 6,
                            type: 'single_select',
                        },
                        primaryAddress: {
                            options: {
                                label: {
                                    title: (0, utils_1.translate)('sulu_contact.primary_address'),
                                },
                            },
                            colSpan: 6,
                            type: 'checkbox',
                        },
                        deliveryAddress: {
                            options: {
                                label: {
                                    title: (0, utils_1.translate)('sulu_contact.delivery_address'),
                                },
                            },
                            colSpan: 6,
                            type: 'checkbox',
                        },
                        billingAddress: {
                            options: {
                                label: {
                                    title: (0, utils_1.translate)('sulu_contact.billing_address'),
                                },
                            },
                            colSpan: 6,
                            type: 'checkbox',
                        },
                    },
                    type: 'section',
                },
                address: {
                    items: {
                        street: {
                            label: (0, utils_1.translate)('sulu_contact.street'),
                            colSpan: 8,
                            type: 'text_line',
                        },
                        number: {
                            label: (0, utils_1.translate)('sulu_contact.number'),
                            colSpan: 4,
                            type: 'text_line',
                        },
                        addition: {
                            label: (0, utils_1.translate)('sulu_contact.address_line'),
                            type: 'text_line',
                        },
                        zip: {
                            label: (0, utils_1.translate)('sulu_contact.zip'),
                            colSpan: 4,
                            type: 'text_line',
                        },
                        city: {
                            label: (0, utils_1.translate)('sulu_contact.city'),
                            colSpan: 8,
                            type: 'text_line',
                        },
                        state: {
                            label: (0, utils_1.translate)('sulu_contact.state'),
                            type: 'text_line',
                        },
                        countryCode: {
                            label: (0, utils_1.translate)('sulu_contact.country'),
                            options: {
                                values: {
                                    value: Object.keys(config.countries).map((countryCode) => ({
                                        name: countryCode,
                                        title: config.countries[countryCode],
                                    })),
                                },
                            },
                            type: 'single_select',
                        },
                    },
                    type: 'section',
                },
                postbox: {
                    items: {
                        postboxNumber: {
                            label: (0, utils_1.translate)('sulu_contact.postbox_number'),
                            type: 'text_line',
                        },
                        postboxPostcode: {
                            label: (0, utils_1.translate)('sulu_contact.postbox_zip'),
                            colSpan: 4,
                            type: 'text_line',
                        },
                        postboxCity: {
                            label: (0, utils_1.translate)('sulu_contact.postbox_city'),
                            colSpan: 8,
                            type: 'text_line',
                        },
                    },
                    type: 'section',
                },
                coordinates: {
                    items: {
                        latitude: {
                            label: (0, utils_1.translate)('sulu_contact.latitude'),
                            colSpan: 6,
                            type: 'number',
                        },
                        longitude: {
                            label: (0, utils_1.translate)('sulu_contact.longitude'),
                            colSpan: 6,
                            type: 'number',
                        },
                    },
                    type: 'section',
                },
                note: {
                    items: {
                        note: {
                            label: (0, utils_1.translate)('sulu_contact.note'),
                            type: 'text_area',
                        },
                    },
                    type: 'section',
                },
            },
        });
        containers_1.fieldRegistry.add('bankAccounts', containers_1.CardCollection, {
            addOverlayTitle: 'sulu_contact.add_bank_account',
            editOverlayTitle: 'sulu_contact.edit_bank_account',
            jsonSchema: {
                type: 'object',
                properties: {
                    iban: {
                        type: 'string',
                        // regex copied from: https://stackoverflow.com/a/44657292
                        // eslint-disable-next-line max-len
                        pattern: '^([A-Z]{2}[ \\-]?[0-9]{2})(?=(?:[ \\-]?[A-Z0-9]){9,30}$)((?:[ \\-]?[A-Z0-9]{3,5}){2,7})([ \\-]?[A-Z0-9]{1,3})?$',
                    },
                    bic: {
                        type: 'string',
                        // eslint-disable-next-line max-len
                        // regex copied from: https://github.com/jquery-validation/jquery-validation/blob/master/src/additional/bic.js
                        pattern: '^([A-Z]{6}[A-Z2-9][A-NP-Z1-9])(X{3}|[A-WY-Z0-9][A-Z0-9]{2})?$',
                    },
                },
                required: ['iban'],
            },
            renderCardContent: function BankCard(card) {
                return (<BankCardPreview_1.default bankName={card.bankName} bic={card.bic} iban={card.iban}/>);
            },
            schema: {
                bankName: {
                    label: (0, utils_1.translate)('sulu_contact.bank'),
                    type: 'text_line',
                },
                iban: {
                    label: (0, utils_1.translate)('sulu_contact.iban'),
                    required: true,
                    type: 'iban',
                },
                bic: {
                    label: (0, utils_1.translate)('sulu_contact.bic'),
                    type: 'bic',
                },
            },
        });
    });
});
