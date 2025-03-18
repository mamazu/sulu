import type {ButtonOption} from 'sulu-admin-bundle/types';

export type TeaserProviderOptions = {
    displayProperties: Array<string>,
    listAdapter: string,
    overlayTitle: string,
    resourceKey: string,
    resultToView: {
        [key: string]: string
    } | null | undefined,
    title: string,
    view: string | null | undefined
};

export type TeaserItem = {
    description?: string | null | undefined,
    edited?: boolean,
    id: number | string,
    mediaId?: number | null | undefined,
    title?: string | null | undefined,
    type: string
};

export type TeaserSelectionValue = {
    items: Array<TeaserItem>,
    presentAs: string | null | undefined
};

export type PresentationItem = ButtonOption<string>;
