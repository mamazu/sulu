import {Flow} from 'flow-to-typescript-codemod';
import Router, {Route} from '../../services/Router';
import type {Component, Element} from 'react';
import type {AttributeMap} from '../../services/Router';

export type ViewProps = {
    children?: (arg1?: any | null | undefined) => Element<any> | null,
    isRootView?: boolean,
    route: Route,
    router: Router
};

interface GetDerivedRouteAttributesInterface {
    readonly getDerivedRouteAttributes?: (route: Route, attributes: AttributeMap) => any;
}

interface RemountViewOnLoginInterface {
    readonly remountViewOnLogin?: boolean;
}

export type View = Flow.Class<Component<ViewProps & any>> & GetDerivedRouteAttributesInterface & RemountViewOnLoginInterface;

export type ViewConfig = {
    disableDefaultSpacing?: boolean
};
