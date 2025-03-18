"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mobx_1 = require("mobx");
const RequestPromise_1 = __importDefault(require("./RequestPromise"));
const defaultOptions = {
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    },
};
function transformResponseObject(data) {
    return Object.keys(data).reduce((transformedData, key) => {
        const value = data[key];
        if (value === null) {
            transformedData[key] = undefined;
            return transformedData;
        }
        if ((0, mobx_1.isArrayLike)(value)) {
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
function transformResponseArray(data) {
    return data.map((value) => {
        if (value instanceof Object) {
            return transformResponseObject(value);
        }
        return value;
    });
}
function transformRequestObject(data) {
    return Object.keys(data).reduce((transformedData, key) => {
        const value = data[key];
        if (value === undefined || value === null) {
            transformedData[key] = null;
            return transformedData;
        }
        if ((0, mobx_1.isArrayLike)(value)) {
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
        if ((0, mobx_1.isArrayLike)(value)) {
            return transformRequestArray(value);
        }
        if (value instanceof Object) {
            return transformRequestObject(value);
        }
        return value;
    });
}
function transformRequestData(data) {
    if ((0, mobx_1.isArrayLike)(data)) {
        return transformRequestArray(data);
    }
    return transformRequestObject(data);
}
function handleResponse(response, options) {
    for (const handleResponseHook of Requester.handleResponseHooks) {
        handleResponseHook(response, options);
    }
    return response;
}
function handleJsonResponse(response, options) {
    response = handleResponse(response, options);
    if (!response.ok) {
        return Promise.reject(response);
    }
    if (response.status === 204) {
        // Return empty object if status code says that there is no content
        return Promise.resolve({});
    }
    return response.json().then((data) => {
        if ((0, mobx_1.isArrayLike)(data)) {
            return transformResponseArray(data);
        }
        return transformResponseObject(data);
    });
}
function handleObjectResponse(response, options) {
    return handleJsonResponse(response, options).then((response) => {
        if ((0, mobx_1.isArrayLike)(response)) {
            throw Error('Response was expected to be an object, but an array was given');
        }
        return response;
    });
}
function createAbortableFetchCall(input, init) {
    let promiseResolve, promiseReject;
    const requestPromise = new RequestPromise_1.default(function (resolve, reject) {
        promiseResolve = resolve;
        promiseReject = reject;
    });
    const abortController = new AbortController();
    requestPromise.setAbortController(abortController);
    fetch(input, Object.assign(Object.assign(Object.assign({}, defaultOptions), init), { signal: abortController.signal }))
        .then(promiseResolve)
        .catch(promiseReject);
    return requestPromise;
}
class Requester {
    static fetch(input, init) {
        return createAbortableFetchCall(input, init)
            .then((response) => handleResponse(response, init));
    }
    static get(url) {
        const options = { method: 'GET' };
        return createAbortableFetchCall(url, options)
            .then((response) => handleObjectResponse(response, options));
    }
    static post(url, data) {
        const options = Object.assign(Object.assign({}, defaultOptions), { method: 'POST', body: data ? JSON.stringify(transformRequestData(data)) : undefined });
        return createAbortableFetchCall(url, options).then((response) => handleObjectResponse(response, options));
    }
    static put(url, data) {
        const options = Object.assign(Object.assign({}, defaultOptions), { method: 'PUT', body: data ? JSON.stringify(transformRequestData(data)) : undefined });
        return createAbortableFetchCall(url, options).then((response) => handleObjectResponse(response, options));
    }
    static patch(url, data) {
        const options = { method: 'PATCH', body: JSON.stringify(transformRequestData(data)) };
        return createAbortableFetchCall(url, options)
            .then((response) => handleJsonResponse(response, options));
    }
    static delete(url) {
        const options = { method: 'DELETE' };
        return createAbortableFetchCall(url, options)
            .then((response) => handleObjectResponse(response, options));
    }
}
Requester.handleResponseHooks = [];
exports.default = Requester;
