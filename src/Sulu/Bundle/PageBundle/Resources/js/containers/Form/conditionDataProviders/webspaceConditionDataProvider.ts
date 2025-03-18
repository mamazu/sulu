import {toJS} from 'mobx';
import {FormInspector} from 'sulu-admin-bundle/containers';
import webspaceStore from '../../../stores/webspaceStore';

export default function(
    data: {
        [key: string]: any
    },
    dataPath: string | null | undefined,
    formInspector: FormInspector,
): {
    [key: string]: any
} {
    const {options, metadataOptions} = formInspector;
    const webspaceKey = data.webspace || options.webspace || (metadataOptions && metadataOptions.webspace);

    const conditionData: Record<string, any> = {};
    conditionData.__webspaces = toJS(webspaceStore.allWebspaces);
    if (webspaceKey && webspaceStore.hasWebspace(webspaceKey)) {
        conditionData.__webspace = webspaceStore.getWebspace(webspaceKey);
    }

    return conditionData;
}
