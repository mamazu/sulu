import SymfonyRouting from 'fos-jsrouting/router';
import metadataStore from '../metadataStore';
import {Requester} from '../../../services';

jest.mock('../../../services/Requester', () => ({
    fetch: jest.fn(),
}));

test('Load metadata for given type and key', () => {
    const snippetMetadata = {
        form: {
            title: {
                label: 'Title',
                type: 'text_line',
            },
            slogan: {
                label: 'Slogan',
                type: 'text_line',
            },
            media: {
                label: 'Media',
                type: 'media_selection',
            },
        },
    } as const;

    const tagMetadata = {
        list: {
            name: {
                label: 'Name',
                type: 'text_line',
            },
        },
    } as const;

    const snippetMetadataPromise = Promise.resolve(snippetMetadata);
    const tagMetadataPromise = Promise.resolve(tagMetadata);

    const snippetResponse = {
        json: jest.fn(),
        ok: true,
        status: 200,
        headers: {
            get: jest.fn(),
        },
    } as const;

    const tagResponse = {
        json: jest.fn(),
        ok: true,
        status: 200,
        headers: {
            get: jest.fn(),
        },
    } as const;

    snippetResponse.json.mockReturnValue(Promise.resolve(snippetMetadata));
    const snippetResponsePromise = Promise.resolve(snippetResponse);

    tagResponse.json.mockReturnValue(Promise.resolve(tagMetadata));
    const tagResponsePromise = Promise.resolve(tagResponse);

    SymfonyRouting.generate.mockImplementation((routeName: any, value: any) => {
        return '/metadata/' + value.type + '/' + value.key;
    });

    Requester.fetch.mockImplementation((key: any) => {
        switch (key) {
            case '/metadata/form/snippets':
                return snippetResponsePromise;
            case '/metadata/list/tags':
                return tagResponsePromise;
        }
    });

    expect(metadataStore.loadMetadata('form', 'snippets')).toEqual(snippetMetadataPromise);
    expect(metadataStore.loadMetadata('list', 'tags')).toEqual(tagMetadataPromise);

    return Promise.all([snippetMetadataPromise, tagMetadataPromise])
        .then(([snippetMetadataFromPromise, tagMetadataFromPromise]: [any, any]) => {
            expect(snippetMetadataFromPromise).toBe(snippetMetadata);
            expect(tagMetadataFromPromise).toBe(tagMetadata);
        });
});

test('Load configuration twice should return the same promise', () => {
    const tagMetadata = {
        list: {
            name: {
                label: 'Name',
                type: 'text_line',
            },
        },
    } as const;

    const response = {
        json: jest.fn(),
        ok: true,
        status: 200,
        headers: {
            get: jest.fn(),
        },
    } as const;
    response.json.mockReturnValue(Promise.resolve(tagMetadata));

    const tagPromise = Promise.resolve(response);
    Requester.fetch.mockReturnValue(tagPromise);

    const tagPromise1 = metadataStore.loadMetadata('form', 'tags');
    const tagPromise2 = metadataStore.loadMetadata('form', 'tags');

    expect(tagPromise1).toBe(tagPromise2);
    return Promise.all([tagPromise1, tagPromise2]).then(([tagMetadata1, tagMetadata2]: [any, any]) => {
        expect(tagMetadata1).toBe(tagMetadata);
        expect(tagMetadata2).toBe(tagMetadata);
    });
});

test('Load metadata should not cache metadata if no-store is set in response', () => {
    const metadata: Record<string, any> = {};

    const response = {
        json: jest.fn(),
        ok: true,
        status: 200,
        headers: {
            get: jest.fn(),
        },
    } as const;

    response.json.mockReturnValue(Promise.resolve(metadata));
    response.headers.get.mockReturnValue('no-store');

    const responsePromise = Promise.resolve(response);
    Requester.fetch.mockReturnValue(responsePromise);

    const metadataPromise1 = metadataStore.loadMetadata('form', 'no_cache');

    return metadataPromise1.then((metadata1: any) => {
        expect(metadata1).toBe(metadata);

        const metadataPromise2 = metadataStore.loadMetadata('form', 'no_cache');
        expect(Requester.fetch).toBeCalledTimes(2);

        return metadataPromise2.then((metadata2: any) => {
            expect(metadata2).toBe(metadata);
        });
    });
});

test('Load metadata should cache metadata if no-store is not set in response', () => {
    const metadata: Record<string, any> = {};

    const response = {
        json: jest.fn(),
        ok: true,
        status: 200,
        headers: {
            get: jest.fn(),
        },
    } as const;

    response.json.mockReturnValue(Promise.resolve(metadata));

    const responsePromise = Promise.resolve(response);
    Requester.fetch.mockReturnValue(responsePromise);

    const metadataPromise1 = metadataStore.loadMetadata('form', 'no_cache');

    return metadataPromise1.then((metadata1: any) => {
        expect(metadata1).toBe(metadata);

        const metadataPromise2 = metadataStore.loadMetadata('form', 'no_cache');
        expect(Requester.fetch).toBeCalledTimes(1);

        return metadataPromise2.then((metadata2: any) => {
            expect(metadata2).toBe(metadata);
        });
    });
});

test('Load metadata should reject with response when the response contains error', () => {
    const response = {
        ok: false,
    } as const;

    const promise = Promise.resolve(response);
    Requester.fetch.mockReturnValue(promise);

    expect(metadataStore.loadMetadata('form', 'reject')).rejects.toEqual(response);
});
