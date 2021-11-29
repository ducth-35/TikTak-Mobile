import { action, thunk } from 'easy-peasy';

import { STATUS } from '@/common';
import { MultiSendApi } from '@/services';

import BaseModel from './base';

const getSheet = thunk(
    async (actions, payload, { dispatch, injections }) => {
        actions.updateStatus(STATUS.FETCHING);
        const res = await MultiSendApi.getSheet(payload);
        actions.updateStatus(res.isSuccess);
        return res;
    }
);

const transfer = thunk(
    async (actions, payload, { dispatch, injections }) => {
        actions.updateStatus(STATUS.FETCHING);
        const res = await MultiSendApi.transfer(payload);
        actions.updateStatus(res.isSuccess);
        return res;
    },
)

const MultiSendModel = {
    ...BaseModel(),

    getSheet,
    transfer

}
export default MultiSendModel;