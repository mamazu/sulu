import {Flow} from 'flow-to-typescript-codemod';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

class PluginRegistry {
    plugins: Array<Flow.Class<typeof Plugin>>;

    constructor() {
        this.clear();
    }

    clear() {
        this.plugins = [];
    }

    add(plugin: Flow.Class<typeof Plugin>) {
        this.plugins.push(plugin);
    }
}

export default new PluginRegistry();
