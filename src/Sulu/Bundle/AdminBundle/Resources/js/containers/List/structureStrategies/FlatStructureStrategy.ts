import {action, computed, observable} from 'mobx';
import {arrayMove} from '../../../utils';
import type {StructureStrategyInterface} from '../types';

export default class FlatStructureStrategy implements StructureStrategyInterface {
    @observable
    data: Array<any>;

    @computed get visibleItems() {
        return this.data;
    }

    constructor() {
        this.data = [];
    }

    @action clear(parentId: string | null | undefined | number) {
        if (parentId !== undefined) {
            throw new Error(
                'This StructureStrategy does not support nesting, therefore the parentId should not be set'
            );
        }

        this.data.splice(0, this.data.length);
    }

    @action order(id: string | number, position: number) {
        const oldIndex = this.data.findIndex((item) => item.id === id);
        if (oldIndex === -1) {
            throw new Error(
                'The id "' + id + '" was tried to be ordered to a different position, but it does not exist!'
            );
        }

        this.data = arrayMove(this.data, oldIndex, position - 1);
    }

    remove(identifier: string | number) {
        this.data.splice(this.data.findIndex((item) => item.id === identifier), 1);
    }

    findById(identifier: string | number): any | null | undefined {
        // TODO do not hardcode id but use metdata instead
        return this.data.find((item) => item.id === identifier);
    }

    addItem(item: any, parentId: string | null | undefined | number): void {
        if (parentId !== undefined) {
            throw new Error(
                'This StructureStrategy does not support nesting, therefore the parentId should not be set'
            );
        }

        this.data.push(item);
    }
}
