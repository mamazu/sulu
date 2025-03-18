"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getViewKeyFromRoute;
function getViewKeyFromRoute(route, attributes) {
    if (!route) {
        return null;
    }
    const rerenderAttributeValues = [];
    if (route.rerenderAttributes) {
        route.rerenderAttributes.forEach((rerenderAttribute) => {
            if (attributes && attributes.hasOwnProperty(rerenderAttribute)) {
                rerenderAttributeValues.push(attributes[rerenderAttribute]);
            }
        });
    }
    return route.name + (rerenderAttributeValues.length > 0 ? '-' + rerenderAttributeValues.join('__') : '');
}
