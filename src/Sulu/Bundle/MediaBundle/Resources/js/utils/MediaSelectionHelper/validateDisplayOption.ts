export default function validateDisplayOption(name: string | null | undefined | number): boolean {
    return name === 'leftTop'
        || name === 'top'
        || name === 'rightTop'
        || name === 'left'
        || name === 'middle'
        || name === 'right'
        || name === 'leftBottom'
        || name === 'bottom'
        || name === 'rightBottom';
}
