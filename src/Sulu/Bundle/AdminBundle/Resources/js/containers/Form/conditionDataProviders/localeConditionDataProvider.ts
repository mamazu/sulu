import FormInspector from '../FormInspector';

export default function(
    data: any,
    dataPath: string | null | undefined,
    formInspector: FormInspector,
): {
    [key: string]: any
} {
    return {__locale: formInspector.locale?.get()};
}
