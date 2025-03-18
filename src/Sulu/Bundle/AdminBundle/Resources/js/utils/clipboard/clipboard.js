"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Clipboard {
    constructor() {
        this.observers = {};
    }
    updateStorageEventListener() {
        const activeObservers = Object.values(this.observers).flat().length;
        // listen for "storage" events to notify observers if something is copied in another browser window
        if (activeObservers > 0 && !this.storageEventListener) {
            this.storageEventListener = (event) => {
                if (event.key && this.observers[event.key]) {
                    this.notifyObservers(event.key, this.parseValue(event.newValue));
                }
            };
            window.addEventListener('storage', this.storageEventListener);
        }
        else if (activeObservers === 0 && this.storageEventListener) {
            window.removeEventListener('storage', this.storageEventListener);
        }
    }
    notifyObservers(key, value) {
        const observers = this.observers[key] || [];
        for (const observer of observers) {
            observer(value);
        }
    }
    set(key, value) {
        if (value) {
            window.localStorage.setItem(key, JSON.stringify(value));
        }
        else {
            window.localStorage.removeItem(key);
        }
        this.notifyObservers(key, value);
    }
    observe(key, observer, invokeImmediately) {
        if (!this.observers[key]) {
            this.observers[key] = [];
        }
        this.observers[key].push(observer);
        this.updateStorageEventListener();
        if (invokeImmediately) {
            const storageValue = window.localStorage.getItem(key);
            observer(this.parseValue(storageValue));
        }
        // return disposer function that allows to remove the registered observer
        return () => {
            var _a;
            const index = (_a = this.observers[key]) === null || _a === void 0 ? void 0 : _a.indexOf(observer);
            if (index > -1) {
                this.observers[key].splice(index, 1);
            }
            this.updateStorageEventListener();
        };
    }
    parseValue(storageValue) {
        try {
            return storageValue ? JSON.parse(storageValue) : undefined;
        }
        catch (e) {
            // if value in storage is not a valid json string, it was set by external code and is not a clipboard item
            return undefined;
        }
    }
}
exports.default = new Clipboard();
