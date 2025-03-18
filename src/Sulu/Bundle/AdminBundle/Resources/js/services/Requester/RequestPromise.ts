export default class RequestPromise<T> extends Promise<T> {
    abortController: AbortController | null | undefined;

    setAbortController(abortController?: AbortController | null) {
        this.abortController = abortController;
    }

    abort() {
        if (!this.abortController) {
            throw new Error('A request can only be aborted if the setAbortController function was called.');
        }
        this.abortController.abort();
    }

    then(
        onFulfilled?: ((arg1: any) => Promise<any> | any) | null,
        onRejected?: ((arg1: any) => Promise<any> | any) | null,
    ): RequestPromise<any> {
        const requestPromise: RequestPromise<any> = (super.then(onFulfilled, onRejected) as RequestPromise<any>);
        requestPromise.setAbortController(this.abortController);

        return requestPromise;
    }

    catch(onReject?: ((arg1: any) => Promise<any> | any) | null): RequestPromise<any> {
        const requestPromise = (super.catch(onReject) as RequestPromise<any>);
        requestPromise.setAbortController(this.abortController);

        return requestPromise;
    }
}
