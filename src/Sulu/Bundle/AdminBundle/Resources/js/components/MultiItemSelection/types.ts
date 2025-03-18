export type Button<T extends string | number> = {
    disabled?: boolean,
    icon?: string,
    label?: string,
    onClick: (value?: T | null | undefined) => void,
    options?: Array<ButtonOption<T>>
};

export type ButtonOption<T> = {
    icon?: string,
    label: string,
    value: T
};
