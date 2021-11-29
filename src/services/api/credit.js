import { apiRequest } from './base';

const URIS = {
    LiST_CREDIT: 'api/credit/get-list-credits',
    CREDIT_DETAIL: 'api/credit/detail',
    REQUEST_DONE: 'api/credit/create-transaction',
    EDIT_QUOTA: 'api/credit/create-quota',
    ACCEPT_TRAN: 'api/credit/accept-transaction',
    REFUND: 'api/credit/refund-credit-transaction',
};

const getListCredit = ({ type }) =>
    apiRequest({
        uri: URIS.LiST_CREDIT,
        method: 'GET',
        params: { type }
    });

const creditDetail = ({ id }) =>
    apiRequest({
        uri: URIS.CREDIT_DETAIL,
        method: 'GET',
        params: { id }
    });



const requestDone = ({ creditId, quantity }) =>
    apiRequest({
        uri: URIS.REQUEST_DONE,
        method: 'POST',
        params: { creditId, quantity }
    });


const updateCredit = ({ id, status, interestRate }) =>
    apiRequest({
        uri: URIS.EDIT_QUOTA,
        method: 'PUT',
        params: { id, status, interestRate },
    });

const createCredit = ({ borrowerId, currency, interestRate, note, quota, quantity }) =>
    apiRequest({
        uri: URIS.EDIT_QUOTA,
        method: 'POST',
        params: { borrowerId, currency, interestRate, note, quota, quantity },
    });

const acceptTran = ({ id }) =>
    apiRequest({
        uri: URIS.ACCEPT_TRAN,
        method: 'GET',
        params: { id },
    });


const refund = ({ id, amount }) =>
    apiRequest({
        uri: URIS.REFUND,
        method: 'POST',
        params: { id, amount },
    });


export default {
    getListCredit,
    creditDetail,
    requestDone,
    createCredit,
    acceptTran,
    refund,
    updateCredit
}