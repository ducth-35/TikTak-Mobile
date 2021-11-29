import { action, thunk } from 'easy-peasy';

import { STATUS } from '@/common';
import { TransactionApi } from '@/services';

import BaseModel from './base';

const withdrawMoney = thunk(
  async (actions, payload, { dispatch, injections }) => {
    actions.updateStatus(STATUS.FETCHING);
    const res = await TransactionApi.withdrawMoney(payload);
    actions.updateStatus(res.isSuccess);

    return { status: res.isSuccess, data: res.data };
  },
);

const exchangeBuy = thunk(
  async (actions, payload, { dispatch, injections }) => {
    actions.updateStatus(STATUS.FETCHING);
    const res = await TransactionApi.exchangeBuy(payload);
    actions.updateStatus(res.isSuccess);

    return { status: res.isSuccess, data: res.data };
  },
);

const exchangeSell = thunk(
  async (actions, payload, { dispatch, injections }) => {
    actions.updateStatus(STATUS.FETCHING);
    const res = await TransactionApi.exchangeSell(payload);
    actions.updateStatus(res.isSuccess);

    return { status: res.isSuccess, data: res.data };
  },
);

const exchangeBuyConfirm = thunk(
  async (actions, payload, { dispatch, injections }) => {
    actions.updateStatus(STATUS.FETCHING);
    const res = await TransactionApi.exchangeBuyConfirm(payload);
    actions.updateStatus(res.isSuccess);

    return { status: res.isSuccess, data: res.data };
  },
);

const exchangeSellConfirm = thunk(
  async (actions, payload, { dispatch, injections }) => {
    actions.updateStatus(STATUS.FETCHING);
    const res = await TransactionApi.exchangeSellConfirm(payload);
    actions.updateStatus(res.isSuccess);

    return { status: res.isSuccess, data: res.data };
  },
);

const confirmWithdraw = thunk(
  async (actions, payload, { dispatch, injections }) => {
    actions.updateStatus(STATUS.FETCHING);
    const res = await TransactionApi.confirmWithdraw(payload);
    actions.updateStatus(res.isSuccess);

    return { status: res.isSuccess, data: res.data };
  },
);

const getTransactionHistory = thunk(
  async (actions, payload, { dispatch, injections }) => {
    actions.updateStatus(STATUS.FETCHING);
    const res = await TransactionApi.getTransactionHistory(payload);
    actions.updateStatus(res.isSuccess);

    if (res.isSuccess) {
      if (payload.t === 'buysell') {
        actions.updateExchangeHistory(res.data);
      } else {
        actions.updateTransactionHistory(res.data);
      }
    }

    return { status: res.isSuccess, data: res.data };
  },
);

const TransactionModel = {
  ...BaseModel(),
  transactionHistory: [],
  exchangeHistory: [],

  updateTransactionHistory: action((state, payload) => {
    state.transactionHistory = payload;
  }),
  updateExchangeHistory: action((state, payload) => {
    state.exchangeHistory = payload;
  }),


  withdrawMoney,
  exchangeBuy,
  exchangeSell,
  exchangeBuyConfirm,
  exchangeSellConfirm,
  confirmWithdraw,
  getTransactionHistory
};

export default TransactionModel;
