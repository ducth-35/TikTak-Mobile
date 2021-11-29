import { apiRequest } from './base';

const URIS = {
  ADMIN_ALERT: 'user/api/get-admin-alert',
  TRANSACTION_COIN_FEE: 'api/v1/balances',
  COIN_UPDATING: 'user/api/get-coin-updating',
  COIN_RATES: 'api/v1/rates',
  WITHDRWAW_LIMITED: 'user/api/get-limit-withdraw-info',
  SYSTEM_AGENCIES: 'api/v1/list-agencies',
};

const getAdminAlert = () =>
  apiRequest({
    uri: URIS.ADMIN_ALERT,
    method: 'GET',
    params: null,
  });

const getTransactionCoinFee = () =>
  apiRequest({
    uri: URIS.TRANSACTION_COIN_FEE,
    method: 'GET',
    params: null,
    isHideLoading: false,
  });

const getCoinUpdating = () =>
  apiRequest({
    uri: URIS.COIN_UPDATING,
    method: 'GET',
    params: null,
    isHideLoading: false,
  });

const getCoinRates = () =>
  apiRequest({
    uri: URIS.COIN_RATES,
    method: 'GET',
    params: null,
    isHideLoading: false,
  });

const getWithdrawLimitedInfo = () =>
  apiRequest({
    uri: URIS.WITHDRWAW_LIMITED,
    method: 'GET',
    params: null,
    isHideLoading: false,
  });

const getSystemAgencies = () =>
  apiRequest({
    uri: URIS.SYSTEM_AGENCIES,
    method: 'GET',
    params: null,
  });

export default {
  getAdminAlert,
  getTransactionCoinFee,
  getCoinUpdating,
  getCoinRates,
  getWithdrawLimitedInfo,
  getSystemAgencies,
};
