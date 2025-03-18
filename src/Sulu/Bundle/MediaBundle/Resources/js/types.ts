export type Media = {
    adminUrl: string | null | undefined,
    id: number,
    locale: string,
    mimeType: string,
    thumbnails: {
        [key: string]: string
    },
    title: string,
    url: string
};

export type DisplayOption = 'leftTop' | 'top' | 'rightTop' | 'left' | 'middle' | 'right' | 'leftBottom' | 'bottom' | 'rightBottom';
