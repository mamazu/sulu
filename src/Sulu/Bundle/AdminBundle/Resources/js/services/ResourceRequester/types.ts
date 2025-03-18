export type EndpointConfiguration = {
    [key: string]: {
        routes: {
            detail?: string,
            list?: string
        }
    }
};

export type ListOptions = {
    limit?: number | null | undefined,
    locale?: string | null | undefined,
    page?: number | null | undefined
};
