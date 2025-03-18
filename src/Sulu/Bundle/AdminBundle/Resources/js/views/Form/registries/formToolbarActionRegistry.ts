import {Flow} from 'flow-to-typescript-codemod';
import AbstractFormToolbarAction from '../toolbarActions/AbstractFormToolbarAction';

class FormToolbarActionRegistry {
    toolbarActions: {
        [name: string]: Flow.Class<AbstractFormToolbarAction>
    } = {};

    constructor() {
        this.clear();
    }

    clear() {
        this.toolbarActions = {};
    }

    add(name: string, item: Flow.Class<AbstractFormToolbarAction>) {
        if (name in this.toolbarActions) {
            throw new Error('The key "' + name + '" has already been used for another ToolbarAction!');
        }

        this.toolbarActions[name] = item;
    }

    get(name: string) {
        if (!(name in this.toolbarActions)) {
            throw new Error(
                'There is no toolbar item with key "' + name + '" registered!' +
                '\n\nRegistered keys: ' + Object.keys(this.toolbarActions).sort().join(', ')
            );
        }

        return this.toolbarActions[name];
    }
}

export default new FormToolbarActionRegistry();
