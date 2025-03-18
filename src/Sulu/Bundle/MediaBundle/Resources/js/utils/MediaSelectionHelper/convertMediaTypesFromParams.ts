export default function convertMediaTypesFromParams(types?: string | null): Array<string> {
    if (!types) {
        return [];
    }

    return types.split(',').map((name) => {
        return name.trim();
    });
}
