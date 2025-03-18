import type {IObservableValue} from 'mobx/lib/mobx';
import type {SchemaOptions} from '../Form/types';

export type TextEditorProps = {
    disabled: boolean,
    locale: IObservableValue<string> | null | undefined,
    onBlur?: () => void,
    onChange: (value?: string | null | undefined) => void,
    onFocus?: (
        event: {
            target: EventTarget
        },
    ) => void,
    options?: SchemaOptions | null | undefined,
    value: string | null | undefined
};
