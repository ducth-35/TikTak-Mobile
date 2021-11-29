import { action, thunk } from 'easy-peasy';

import { STATUS } from '@/common';
import { CompanyApi } from '@/services';

import BaseModel from './base';

const getEmployer = thunk(
    async (actions, payload, { dispatch, injections }) => {
        actions.updateStatus(STATUS.FETCHING);
        const res = await CompanyApi.getEmployer(payload);
        actions.updateStatus(res.isSuccess);
        if (res.isSuccess) {
            actions.updateEmployer(res.data);
        }
        return res;
    }
);

const getMycompany = thunk(
    async (actions, payload, { dispatch, injections }) => {
        actions.updateStatus(STATUS.FETCHING);
        const res = await CompanyApi.getMycompany(payload);
        actions.updateStatus(res.isSuccess);

        if (res.isSuccess) {
            actions.updateMycompany(res.data);
        }

        return { status: res.isSuccess, data: res.data };
    },
);

const sendInvited = thunk(
    async (actions, payload, { dispatch, injections }) => {
        actions.updateStatus(STATUS.FETCHING);
        const res = await CompanyApi.sendInvite(payload);
        actions.updateStatus(res.isSuccess);
        return res;
    },
)

const acceptInvite = thunk(
    async (actions, payload, { dispatch, injections }) => {
        actions.updateStatus(STATUS.FETCHING);
        const res = await CompanyApi.acceptInvite(payload);
        actions.updateStatus(res.isSuccess);
        return res;
    },
)

const getCurrentInvite = thunk(
    async (actions, payload, { dispatch, injections }) => {
        actions.updateStatus(STATUS.FETCHING);
        const res = await CompanyApi.getCurrentInvite(payload);
        actions.updateStatus(res.isSuccess);
        return res;
    }
)

const deleteEmployer = thunk(
    async (actions, payload, { dispatch, injections }) => {
        actions.updateStatus(STATUS.FETCHING);
        const res = await CompanyApi.deleteEmployer(payload);
        actions.updateStatus(res.isSuccess);
        return res;
    },
)

const outCompany = thunk(
    async (actions, payload, { dispatch, injections }) => {
        actions.updateStatus(STATUS.FETCHING);
        const res = await CompanyApi.outCompany(payload);
        actions.updateStatus(res.isSuccess);
        return res;
    },
)

const CompanyModel = {
    ...BaseModel(),
    listEmployer: [],
    myCompany: null,

    updateEmployer: action((state, payload) => {
        state.listEmployer = payload;
    }),

    updateMycompany: action((state, payload) => {
        state.myCompany = payload;
    }),
    getEmployer,
    getMycompany,
    sendInvited,
    getCurrentInvite,
    acceptInvite,
    deleteEmployer,
    outCompany
}

export default CompanyModel;