"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Iban = exports.ContactDetails = exports.ContactAccountSelection = exports.Bic = void 0;
const Bic_1 = __importDefault(require("./fields/Bic"));
exports.Bic = Bic_1.default;
const ContactAccountSelection_1 = __importDefault(require("./fields/ContactAccountSelection"));
exports.ContactAccountSelection = ContactAccountSelection_1.default;
const ContactDetails_1 = __importDefault(require("./fields/ContactDetails"));
exports.ContactDetails = ContactDetails_1.default;
const Iban_1 = __importDefault(require("./fields/Iban"));
exports.Iban = Iban_1.default;
