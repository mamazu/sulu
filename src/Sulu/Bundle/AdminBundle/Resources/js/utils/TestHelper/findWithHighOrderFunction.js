"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = findWithHighOrderFunction;
function findWithHighOrderFunction(withHighOrderFunction, Component) {
    if (!withHighOrderFunction
        || !withHighOrderFunction.hasOwnProperty('mock')
        || withHighOrderFunction.mock.calls.length < 1) {
        throw new Error('withHighOrderFunction needs to be an mock');
    }
    for (const call of withHighOrderFunction.mock.calls) {
        if (call[0] === Component) {
            return call[1];
        }
    }
    throw new Error('function not found');
}
