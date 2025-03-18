export default function afterElementsRendered(callback: () => any) {
    setTimeout(callback);
}
