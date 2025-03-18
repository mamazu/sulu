"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RequestPromise extends Promise {
    setAbortController(abortController) {
        this.abortController = abortController;
    }
    abort() {
        if (!this.abortController) {
            throw new Error('A request can only be aborted if the setAbortController function was called.');
        }
        this.abortController.abort();
    }
    then(onFulfilled, onRejected) {
        const requestPromise = super.then(onFulfilled, onRejected);
        requestPromise.setAbortController(this.abortController);
        return requestPromise;
    }
    catch(onReject) {
        const requestPromise = super.catch(onReject);
        requestPromise.setAbortController(this.abortController);
        return requestPromise;
    }
}
exports.default = RequestPromise;
