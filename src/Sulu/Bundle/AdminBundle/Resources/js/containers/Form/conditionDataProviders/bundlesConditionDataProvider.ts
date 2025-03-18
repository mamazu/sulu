import initializer from '../../../services/initializer';

export default function(): {
    [key: string]: any
} {
    return {__bundles: initializer.bundles};
}
