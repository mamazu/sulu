import {computed} from 'mobx';
import log from 'loglevel';
import type {IObservableValue} from 'mobx/lib/mobx';
import type {FinishFieldHandler, FormStoreInterface, SaveHandler} from './types';

export default class FormInspector {
    formStore: FormStoreInterface;
    saveHandlers: Array<SaveHandler> = [];
    finishFieldHandlers: Array<FinishFieldHandler> = [];

    constructor(formStore: FormStoreInterface) {
        this.formStore = formStore;
    }

    @computed
    get resourceKey(): string | null | undefined {
        return this.formStore.resourceKey;
    }

    @computed
    get locale(): IObservableValue<string> | null | undefined {
        return this.formStore.locale;
    }

    @computed
    get options(): any {
        return this.formStore.options;
    }

    @computed
    get metadataOptions(): any {
        return this.formStore.metadataOptions;
    }

    @computed
    get errors(): any {
        return this.formStore.errors;
    }

    @computed
    get id(): string | null | undefined | number {
        return this.formStore.id;
    }

    getValueByPath(path: string): unknown {
        return this.formStore.getValueByPath(path);
    }

    getValuesByTag(tagName: string): Array<unknown> {
        return this.formStore.getValuesByTag(tagName);
    }

    getPathsByTag(tagName: string): Array<string> {
        return this.formStore.getPathsByTag(tagName);
    }

    getSchemaEntryByPath(schemaPath: string) {
        return this.formStore.getSchemaEntryByPath(schemaPath);
    }

    addSaveHandler(saveHandler: SaveHandler) {
        this.saveHandlers.push(saveHandler);
    }

    triggerSaveHandler(options: string | null | undefined | {
        [key: string]: any
    }) {
        if (typeof options === 'string') {
            log.warn(
                'Passing a string to the "submit" method is deprecated since 2.2 and will be removed. ' +
                'Pass an object with an "action" property instead.'
            );
        }

        this.saveHandlers.forEach((saveHandler) => saveHandler(options));
    }

    addFinishFieldHandler(finishFieldHandler: FinishFieldHandler) {
        this.finishFieldHandlers.push(finishFieldHandler);
    }

    finishField(dataPath: string, schemaPath: string) {
        this.formStore.finishField(dataPath);
        this.finishFieldHandlers.forEach((finishFieldHandler) => finishFieldHandler(dataPath, schemaPath));
    }

    isFieldModified(dataPath: string): boolean {
        return this.formStore.isFieldModified(dataPath);
    }
}
