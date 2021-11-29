import { action, thunk } from 'easy-peasy';

import { STATUS } from '@/common';
import { CreditApi } from '@/services';

import BaseModel from './base';


const getListcreditGranted = thunk(
  async (actions, payload, { dispatch, injections }) => {
    actions.updateStatus(STATUS.FETCHING);
    const res = await CreditApi.getListCredit(payload);
    actions.updateStatus(res.isSuccess);
    if (res.isSuccess) {
      actions.updatelistCreditGranted(res.data);
    }
    return res;
  },
)

const getListcreditManagement = thunk(
  async (actions, payload, { dispatch, injections }) => {
    actions.updateStatus(STATUS.FETCHING);
    const res = await CreditApi.getListCredit(payload);
    actions.updateStatus(res.isSuccess);
    if (res.isSuccess) {
      actions.updatelistCreditManagement(res.data);
    }
    return res;
  },
)

const getCreditDetail = thunk(
  async (actions, payload, { dispatch, injections }) => {
    actions.updateStatus(STATUS.FETCHING);
    const res = await CreditApi.creditDetail(payload);
    actions.updateStatus(res.isSuccess);
    if (res.isSuccess) {
      actions.updateCreditDetail(res.data?.transactions);
    }
    return res;
  },
)


const createrequestDone = thunk(
  async (actions, payload, { dispatch, injections }) => {
    actions.updateStatus(STATUS.FETCHING);
    const res = await CreditApi.requestDone(payload);
    actions.updateStatus(res.isSuccess);
    return res;
  },
)

const CreateCredit = thunk(
  async (actions, payload, { dispatch, injections }) => {
    actions.updateStatus(STATUS.FETCHING);
    const res = await CreditApi.createCredit(payload);
    actions.updateStatus(res.isSuccess);
    return res;
  },
)

const updateCredit = thunk(
  async (actions, payload, { dispatch, injections }) => {
    actions.updateStatus(STATUS.FETCHING);
    const res = await CreditApi.updateCredit(payload);
    actions.updateStatus(res.isSuccess);
    return res;
  },
)

const accepteCredit = thunk(
  async (actions, payload, { dispatch, injections }) => {
    actions.updateStatus(STATUS.FETCHING);
    const res = await CreditApi.acceptTran(payload);
    actions.updateStatus(res.isSuccess);
    return res;
  },
)

const refundCredit = thunk(
  async (actions, payload, { dispatch, injections }) => {
    actions.updateStatus(STATUS.FETCHING);
    const res = await CreditApi.refund(payload);
    actions.updateStatus(res.isSuccess);
    return res;
  },
)

const CreditModel = {
  ...BaseModel(),
  listCreditGranted: [],
  listCreditManagement:[],

  listDetail: [],

  updatelistCreditGranted: action((state, payload) => {
    state.listCreditGranted = payload;
  }),

  updatelistCreditManagement: action((state, payload) => {
    state.listCreditManagement = payload;
  }),

  updateCreditDetail: action((state, payload) => {
    state.listDetail = payload;
  }),

  getListcreditManagement,
  getListcreditGranted,
  createrequestDone,
  getCreditDetail,
  CreateCredit,
  updateCredit,
  accepteCredit,
  refundCredit
}

export default CreditModel;