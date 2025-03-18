export type Button<T> = {
    disabled?: boolean,
    icon: string,
    onClick: (value?: T | null | undefined) => void,
    options?: Array<ButtonOption<T>>
};

type ButtonOption<T> = {
    icon?: string,
    label: string,
    value: T
};
