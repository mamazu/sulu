"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
function default_1(value) {
    if (!value) {
        return false;
    }
    // used by webkit and recommend by the WHATWG:
    //  - https://html.spec.whatwg.org/#valid-e-mail-address
    //  - https://github.com/WebKit/WebKit/blob/WebKit-7615.1.12.130.1/Source/WebCore/html/EmailInputType.cpp#L38-L39
    // eslint-disable-next-line max-len
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value);
}
