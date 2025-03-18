import {action, observable} from 'mobx';
import {ResourceRequester} from 'sulu-admin-bundle/services';
import type {MediaFormat, MediaFormats} from './types';

const RESOURCE_KEY = 'media_formats';

export default class MediaFormatStore
{
    id: string | number;
    locale: string;
    @observable
    mediaFormats: MediaFormats | null | undefined;
    @observable
    loading: boolean;
    @observable
    saving: boolean;

    constructor(id: number | string, locale: string) {
        this.id = id;
        this.locale = locale;
        this.loading = true;
        ResourceRequester.getList(RESOURCE_KEY, {id, locale}).then(action((response) => {
            this.loading = false;
            this.mediaFormats = response;
        }));
    }

    getFormatOptions(formatKey: string): MediaFormat | null | undefined {
        if (!this.mediaFormats) {
            return undefined;
        }

        return this.mediaFormats[formatKey];
    }

    @action updateFormatOptions(options: MediaFormats) {
        this.saving = true;

        return ResourceRequester
            .patch(RESOURCE_KEY, options, {id: this.id, locale: this.locale})
            .then(action((response) => {
                this.saving = false;
                const mediaFormats = {...this.mediaFormats, ...response} as const;
                this.mediaFormats = Object.keys(mediaFormats).reduce<Record<string, any>>((newMediaFormats, mediaFormatKey) => {
                    const mediaFormat = mediaFormats[mediaFormatKey];

                    if (Object.keys(mediaFormat).length === 0) {
                        return newMediaFormats;
                    }

                    newMediaFormats[mediaFormatKey] = mediaFormat;

                    return newMediaFormats;
                }, {});
            }));
    }
}
