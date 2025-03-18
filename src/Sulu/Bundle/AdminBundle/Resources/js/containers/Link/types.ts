import type {IObservableValue} from 'mobx/lib/mobx';

export type LinkTypeOverlayProps = {
    anchor?: string | null | undefined,
    href: string | null | undefined | number,
    locale?: IObservableValue<string> | null | undefined,
    onAnchorChange?: (anchor?: string | null | undefined) => void | null | undefined,
    onCancel: () => void,
    onConfirm: () => void,
    onHrefChange: (id: string | null | undefined | number, item?: any | null | undefined) => void,
    onQueryChange?: (query?: string | null | undefined) => void | null | undefined,
    onRelChange?: (rel?: string | null | undefined) => void | null | undefined,
    onTargetChange?: (target: string) => void | null | undefined,
    onTitleChange?: (title?: string | null | undefined) => void | null | undefined,
    open: boolean,
    options?: LinkTypeOptions | null | undefined,
    query?: string | null | undefined,
    rel?: string | null | undefined,
    target?: string | null | undefined,
    title?: string | null | undefined
};

export type LinkTypeOptions = {
    displayProperties: Array<string>,
    emptyText?: string,
    icon?: string,
    listAdapter?: string,
    overlayTitle?: string,
    resourceKey: string
};

export type LinkValue = {
    anchor?: string | null | undefined,
    href: string | null | undefined | number | null | undefined,
    locale: string,
    provider: string | null | undefined,
    query?: string | null | undefined,
    rel?: string | null | undefined,
    target?: string | null | undefined,
    title: string | null | undefined
};
