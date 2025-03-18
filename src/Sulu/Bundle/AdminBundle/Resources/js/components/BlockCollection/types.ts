import type {ButtonActionConfig, DividerActionConfig} from '../Block/types';
import type {ReactNode} from 'react';

export type BlockButtonActionConfig = ButtonActionConfig & {
    onClick: (index: number) => void
};
export type BlockActionConfig = BlockButtonActionConfig | DividerActionConfig;

export type RenderBlockContentCallback<T extends string, U extends {
    type: T
}> = (value: U, type: T, index: number, expanded: boolean) => Node;

export type BlockMode = 'static' | 'sortable' | 'selectable';

export type Message = {
    icon?: string,
    text: string,
    type: 'success' | 'error' | 'warning' | 'info'
};
