import RequestPromise from '../RequestPromise';

test('Cancel request when abort is called', () => {
    const requestPromise = new RequestPromise(function() {});
    const abortController = {
        abort: jest.fn(),
    } as const;

    requestPromise.setAbortController(abortController);
    requestPromise.abort();

    expect(abortController.abort).toBeCalledWith();
});

test('Passing promises via then should also have the AbortController set', () => {
    const requestPromise = new RequestPromise(function(resolve: any) {
        resolve();
    });
    const abortController = {
        abort: jest.fn(),
    } as const;

    requestPromise.setAbortController(abortController);
    requestPromise.abort();

    const thenPromise = requestPromise.then(function() {});

    expect(thenPromise.abortController).toEqual(abortController);
});

test('Passing promises via catch should also have the AbortController set', () => {
    const requestPromise = new RequestPromise(function(resolve: any, reject: any) {
        reject();
    });
    const abortController = {
        abort: jest.fn(),
    } as const;

    requestPromise.setAbortController(abortController);
    requestPromise.abort();

    const catchPromise = requestPromise.catch(function() {});

    expect(catchPromise.abortController).toEqual(abortController);
});

test('Throw error if abort is called without AbortController', () => {
    const requestPromise = new RequestPromise(function() {});
    expect(() => requestPromise.abort()).toThrow('setAbortController');
});
