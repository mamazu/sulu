import {Flow} from 'flow-to-typescript-codemod';
import Select from './Select';
import Action from './Action';
import Option from './Option';
import type {ChildrenArray, Element} from 'react';

export type SelectProps<T> = {
    children: SelectChildren<T>,
    disabled: boolean,
    icon?: string,
    skin: Skin
};

export type Skin = 'default' | 'flat' | 'dark';

export type OptionSelectedVisualization = 'icon' | 'checkbox';

export type SelectChild<T> = Element<Flow.Class<Option<T>>> | Element<Flow.Class<Select.Divider>> | Element<Flow.Class<Action<any>>> | false;
export type SelectChildren<T> = ChildrenArray<SelectChild<T>>;
