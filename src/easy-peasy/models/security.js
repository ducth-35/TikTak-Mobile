import { action, thunk } from 'easy-peasy';

import { STATUS } from '@/common';
import { SecurityApi } from '@/services';

import BaseModel from './base';

const changePassword = thunk(
  async (actions, payload, { dispatch, injections }) => {
    actions.updateStatus(STATUS.FETCHING);
    const res = await SecurityApi.changePassword(payload);
    actions.updateStatus(res.isSuccess);

    return { status: res.isSuccess, data: res.data };
  },
);

const updateAuthenTypeStep1 = thunk(
  async (actions, payload, { dispatch, injections }) => {
    actions.updateStatus(STATUS.FETCHING);
    const res = await SecurityApi.updateAuthenTypeStep1(payload);
    actions.updateStatus(res.isSuccess);

    return { status: res.isSuccess, data: res.data };
  },
);

const updateAuthenTypeStep2 = thunk(
  async (actions, payload, { dispatch, injections }) => {
    actions.updateStatus(STATUS.FETCHING);
    const res = await SecurityApi.updateAuthenTypeStep2(payload);
    actions.updateStatus(res.isSuccess);

    return { status: res.isSuccess, data: res.data };
  },
);

const SecurityModel = {
  ...BaseModel(),
  changePassword,
  updateAuthenTypeStep1,
  updateAuthenTypeStep2,
};

export default SecurityModel;
