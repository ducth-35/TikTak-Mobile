import { action, thunk } from 'easy-peasy';

import { STATUS } from '@/common';
import { SystemApi } from '@/services';

import BaseModel from './base';

const getCoinRates = thunk(
  async (actions, payload, { dispatch, injections }) => {
    actions.updateStatus(STATUS.FETCHING);
    const res = await SystemApi.getCoinRates();
    actions.updateStatus(res.isSuccess);

    if (res.isSuccess) {
      actions.updateCoinRates(res.data);
    }

    return { status: res.isSuccess, data: res.data };
  },
);

const getSystemAgencies = thunk(
  async (actions, payload, { dispatch, injections }) => {
    actions.updateStatus(STATUS.FETCHING);
    const res = await SystemApi.getSystemAgencies();
    actions.updateStatus(res.isSuccess);

    if (res.isSuccess) {
      actions.updateSystemAgencies(res.data);
    }

    return { status: res.isSuccess, data: res.data };
  },
);

const getTransactionCoinFee = thunk(
  async (actions, payload, { dispatch, injections }) => {
    actions.updateStatus(STATUS.FETCHING);
    const res = await SystemApi.getTransactionCoinFee();
    actions.updateStatus(res.isSuccess);

    if (res.isSuccess) {
      actions.updateTransactionCoinFee(res.data);
    }

    return { status: res.isSuccess, data: res.data };
  },
);

const getWithdrawLimitedInfo = thunk(
  async (actions, payload, { dispatch, injections }) => {
    actions.updateStatus(STATUS.FETCHING);
    const res = await SystemApi.getWithdrawLimitedInfo();
    actions.updateStatus(res.isSuccess);

    if (res.isSuccess) {
      actions.updadateWithdrawLimitedInfo(res.data);
    }

    return { status: res.isSuccess, data: res.data };
  },
);

const SystemModel = {
  ...BaseModel(),
  coinRates: null,
  coinLimits: null,
  systemAgencies: null,
  coinFee: null,
  withdrawLimitedInfo: null,
  updateSystemAgencies: action((state, payload) => {
    state.systemAgencies = payload;
  }),
  updateCoinRates: action((state, payload) => {
    state.coinRates = payload;
  }),
  updateTransactionCoinFee: action((state, payload) => {
    state.coinFee = payload;
  }),
  updadateWithdrawLimitedInfo: action((state, payload) => {
    state.withdrawLimitedInfo = payload;
  }),
  getCoinRates,
  getSystemAgencies,
  getTransactionCoinFee,
  getWithdrawLimitedInfo,
};

export default SystemModel;
