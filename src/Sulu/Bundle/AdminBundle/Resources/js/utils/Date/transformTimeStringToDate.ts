export default function(time?: string | null): Date | null | undefined {
    if (!time || typeof time !== 'string') {
        return undefined;
    }

    const timeParts = time.split(':');

    return new Date(0, 0, 0, parseInt(timeParts[0]), parseInt(timeParts[1]), parseInt(timeParts[2]));
}
