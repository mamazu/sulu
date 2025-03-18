export type ContextPermission = {
    context: string,
    id: number | null | undefined,
    permissions: {
        [key: string]: boolean
    }
};
