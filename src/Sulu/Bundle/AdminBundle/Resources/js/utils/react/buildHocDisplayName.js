"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = buildHocDisplayName;
function getComponentName(Component) {
    if (typeof Component.displayName === 'string') {
        return Component.displayName;
    }
    if (typeof Component.name === 'string') {
        return Component.name;
    }
    return '';
}
function buildHocDisplayName(hocName, Component) {
    return `${hocName}(${getComponentName(Component)})`;
}
