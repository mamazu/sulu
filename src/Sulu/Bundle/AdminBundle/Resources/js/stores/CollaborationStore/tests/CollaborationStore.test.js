"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CollaborationStore_1 = __importDefault(require("../CollaborationStore"));
const ResourceRequester_1 = __importDefault(require("../../../services/ResourceRequester"));
jest.useFakeTimers();
jest.mock('../../../services/ResourceRequester', () => ({
    put: jest.fn(),
    delete: jest.fn(),
}));
beforeEach(() => {
    CollaborationStore_1.default.enabled = true;
    CollaborationStore_1.default.interval = 10000;
});
test('Load collaborators repeatedly and stop when destroyed', () => {
    const collaborations1 = [
        {
            fullName: 'Max Mustermann',
        },
    ];
    const putPromise1 = Promise.resolve({
        _embedded: {
            collaborations: collaborations1,
        },
    });
    ResourceRequester_1.default.put.mockReturnValue(putPromise1);
    const collaborationStore = new CollaborationStore_1.default('pages', 1);
    expect(ResourceRequester_1.default.put).toHaveBeenLastCalledWith('collaborations', null, { id: 1, resourceKey: 'pages' });
    expect(ResourceRequester_1.default.put).toBeCalledTimes(1);
    return putPromise1.then(() => {
        expect(collaborationStore.collaborations).toEqual(collaborations1);
        const collaborations2 = [
            {
                fullName: 'Max Mustermann',
            },
            {
                fullName: 'Erika Mustermann',
            },
        ];
        const putPromise2 = Promise.resolve({
            _embedded: {
                collaborations: collaborations2,
            },
        });
        ResourceRequester_1.default.put.mockReturnValue(putPromise2);
        jest.runOnlyPendingTimers();
        expect(ResourceRequester_1.default.put).toHaveBeenLastCalledWith('collaborations', null, { id: 1, resourceKey: 'pages' });
        expect(ResourceRequester_1.default.put).toBeCalledTimes(2);
        return putPromise2.then(() => {
            expect(collaborationStore.collaborations).toEqual(collaborations2);
            collaborationStore.destroy();
            jest.runOnlyPendingTimers();
            expect(ResourceRequester_1.default.put).toBeCalledTimes(2);
            expect(ResourceRequester_1.default.delete).toBeCalledTimes(1);
            expect(ResourceRequester_1.default.delete).toHaveBeenLastCalledWith('collaborations', { id: 1, resourceKey: 'pages' });
        });
    });
});
test('Do not send collaboration request if disabled', () => {
    CollaborationStore_1.default.enabled = false;
    const collaborationStore = new CollaborationStore_1.default('pages', 1);
    collaborationStore.destroy();
    expect(ResourceRequester_1.default.put).not.toHaveBeenCalled();
    expect(ResourceRequester_1.default.delete).not.toHaveBeenCalled();
});
