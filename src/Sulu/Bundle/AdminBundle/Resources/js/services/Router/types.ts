import Route from './Route';

export type RouteConfig = {
    attributeDefaults?: AttributeMap,
    name: string,
    options?: any,
    parent?: string,
    path: string,
    rerenderAttributes?: Array<string>,
    type: string
};

export type AttributeMap = {
    [key: string]: unknown | null | undefined
};

export type RouteMap = {
    [key: string]: Route
};

export type UpdateAttributesHook = (route: Route, attributes: AttributeMap) => AttributeMap;

export type UpdateRouteHook = (
    route?: Route | null | undefined,
    attributes?: AttributeMap | null | undefined,
    updateRouteMethod?: UpdateRouteMethod | null | undefined,
) => boolean;

export type UpdateRouteMethod = (route: string, attributes: AttributeMap) => void;

export type ResourceViews = {
    views: {
        detail?: string,
        list?: string
    }
};

export type ResourceViewsMap = {
    [key: string]: ResourceViews
};
