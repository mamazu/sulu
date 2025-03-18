import {isArrayLike} from 'mobx';
import RequestPromise from './RequestPromise';
import type {HandleResponseHook} from './types';

const defaultOptions = {
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    },
} as const;

function transformResponseObject(data: any) {
    return Object.keys(data).reduce<Record<string, any>>((transformedData: any, key) => {
        const value = data[key];

        if (value === null) {
            transformedData[key] = undefined;

            return transformedData;
        }

        if (isArrayLike(value)) {
            transformedData[key] = transformResponseArray(value);

            return transformedData;
        }

        if (value instanceof Object) {
            transformedData[key] = transformResponseObject(value);

            return transformedData;
        }

        transformedData[key] = value;

        return transformedData;
    }, {});
}

function transformResponseArray(data: Array<any>) {
    return data.map((value) => {
        if (value instanceof Object) {
            return transformResponseObject(value);
        }

        return value;
    });
}

function transformRequestObject(data: any): any {
    return Object.keys(data).reduce<Record<string, any>>((transformedData: any, key) => {
        const value = data[key];

        if (value === undefined || value === null) {
            transformedData[key] = null;

            return transformedData;
        }

        if (isArrayLike(value)) {
            transformedData[key] = transformRequestArray(value);

            return transformedData;
        }

        if (value instanceof Object) {
            transformedData[key] = transformRequestObject(value);

            return transformedData;
        }

        transformedData[key] = value;

        return transformedData;
    }, {});
}

function transformRequestArray(data) {
    return data.map((value) => {
        if (isArrayLike(value)) {
            return transformRequestArray(value);
        }

        if (value instanceof Object) {
            return transformRequestObject(value);
        }

        return value;
    });
}

function transformRequestData(data: any | Array<any>) {
    if (isArrayLike(data)) {
        return transformRequestArray(data);
    }

    return transformRequestObject(data);
}

function handleResponse(response: Response, options?: any | null): Response {
    for (const handleResponseHook of Requester.handleResponseHooks) {
        handleResponseHook(response, options);
    }

    return response;
}

function handleJsonResponse(response: Response, options?: any | null): Promise<any | Array<any>> {
    response = handleResponse(response, options);

    if (!response.ok) {
        return Promise.reject(response);
    }

    if (response.status === 204) {
        // Return empty object if status code says that there is no content
        return Promise.resolve({});
    }

    return response.json().then((data) => {
        if (isArrayLike(data)) {
            return transformResponseArray(data);
        }

        return transformResponseObject(data);
    });
}

function handleObjectResponse(response: Response, options?: any | null): Promise<any> {
    return handleJsonResponse(response, options).then((response) => {
        if (isArrayLike(response)) {
            throw Error('Response was expected to be an object, but an array was given');
        }

        return response;
    });
}

function createAbortableFetchCall(input: RequestInfo, init?: RequestInit): RequestPromise<any> {
    let promiseResolve, promiseReject;
    const requestPromise = new RequestPromise(function(resolve, reject) {
        promiseResolve = resolve;
        promiseReject = reject;
    });

    const abortController = new AbortController();
    requestPromise.setAbortController(abortController);

    fetch(input, {...defaultOptions, ...init, signal: abortController.signal})
        .then(promiseResolve)
        .catch(promiseReject);

    return requestPromise;
}

export default class Requester {
    static handleResponseHooks: Array<HandleResponseHook> = [];

    static fetch(input: RequestInfo, init?: RequestInit): RequestPromise<Response> {
        return createAbortableFetchCall(input, init)
            .then((response) => handleResponse(response, init));
    }

    static get(url: string): RequestPromise<any> {
        const options = {method: 'GET'} as const;
        return createAbortableFetchCall(url, options)
            .then((response) => handleObjectResponse(response, options));
    }

    static post(url: string, data?: any | null): RequestPromise<any> {
        const options = {
            ...defaultOptions,
            method: 'POST',
            body: data ? JSON.stringify(transformRequestData(data)) : undefined,
        } as const;

        return createAbortableFetchCall(
            url,
            options
        ).then((response) => handleObjectResponse(response, options));
    }

    static put(url: string, data: any): RequestPromise<any> {
        const options = {
            ...defaultOptions,
            method: 'PUT',
            body: data ? JSON.stringify(transformRequestData(data)) : undefined,
        } as const;

        return createAbortableFetchCall(
            url,
            options
        ).then((response) => handleObjectResponse(response, options));
    }

    static patch(url: string, data: Array<any> | any): RequestPromise<Array<any> | any> {
        const options = {method: 'PATCH', body: JSON.stringify(transformRequestData(data))} as const;

        return createAbortableFetchCall(url, options)
            .then((response) => handleJsonResponse(response, options));
    }

    static delete(url: string): RequestPromise<any> {
        const options = {method: 'DELETE'} as const;

        return createAbortableFetchCall(url, options)
            .then((response) => handleObjectResponse(response, options));
    }
}
