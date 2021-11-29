import { action, thunk } from 'easy-peasy';

import { STATUS } from '@/common';
import { GiftcodeApi } from '@/services';

import BaseModel from './base';

const getListGiftcode = thunk(
  async (actions, payload, { dispatch, injections }) => {
    actions.updateStatus(STATUS.FETCHING);
    const res = await GiftcodeApi.managerGiftCode({ type: 'owner' });
    actions.updateStatus(res.isSuccess);

    if (res.isSuccess) {
      actions.updateListGiftcodes(res.data);
    }

    return { status: res.isSuccess, data: res.data };
  },
);

const getHistoryGiftcodeReceive = thunk(
  async (actions, payload, { dispatch, injections }) => {
    actions.updateStatus(STATUS.FETCHING);
    const res = await GiftcodeApi.managerGiftCode({ type: 'scaner' });
    actions.updateStatus(res.isSuccess);

    if (res.isSuccess) {
      actions.updateHistoryGiftcodeReceive(res.data);
    }

    return { status: res.isSuccess, data: res.data };
  },
);

const createGiftCode = thunk(
  async (actions, payload, { dispatch, injections }) => {
    actions.updateStatus(STATUS.FETCHING);
    const res = await GiftcodeApi.createGiftCode(payload);
    actions.updateStatus(res.isSuccess);

    return { status: res.isSuccess, data: res.data };
  },
);

const scanGiftCode = thunk(
  async (actions, payload, { dispatch, injections }) => {
    actions.updateStatus(STATUS.FETCHING);
    const res = await GiftcodeApi.scanGiftCode(payload);
    actions.updateStatus(res.isSuccess);

    return { status: res.isSuccess, data: res.data };
  },
);

const validateGiftCode = thunk(
  async (actions, payload, { dispatch, injections }) => {
    actions.updateStatus(STATUS.FETCHING);
    const res = await GiftcodeApi.validateGiftCode(payload);
    actions.updateStatus(res.isSuccess);

    return { status: res.isSuccess, data: res.data };
  },
);

const GiftcodeModel = {
  ...BaseModel(),
  giftcodes: [],
  history: [],
  updateListGiftcodes: action((state, payload) => {
    state.giftcodes = payload;
  }),
  updateHistoryGiftcodeReceive: action((state, payload) => {
    state.history = payload;
  }),
  getListGiftcode,
  createGiftCode,
  scanGiftCode,
  validateGiftCode,
  getHistoryGiftcodeReceive,
};

export default GiftcodeModel;
