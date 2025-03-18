export type Size = 'small' | 'medium' | 'large';

export type SidebarConfig = {
    defaultSize?: Size,
    props?: any,
    sizes?: Array<Size>,
    view: string
};
