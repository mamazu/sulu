import type {ComponentType} from 'react';

class SidebarRegistry {
    sidebars: {
        [key: string]: ComponentType<any>
    };
    disabledSidebars = [];

    constructor() {
        this.clear();
    }

    clear() {
        this.sidebars = {};
    }

    has(name: string) {
        return !!this.sidebars[name];
    }

    add(name: string, sidebar: ComponentType<any>) {
        if (name in this.sidebars) {
            throw new Error('The key "' + name + '" has already been used for another sidebar component');
        }

        this.sidebars[name] = sidebar;
    }

    get(name: string): ComponentType<any> {
        if (!(name in this.sidebars)) {
            throw new Error(
                'The sidebar component with the key "' + name + '" is not defined. ' +
                'You probably forgot to add it to the store using the "add" method.'
            );
        }

        return this.sidebars[name];
    }

    disable(name: string): void {
        this.disabledSidebars.push(name);
    }

    isDisabled(name: string): boolean {
        return this.disabledSidebars.indexOf(name) > -1;
    }
}

export default new SidebarRegistry();
