import { apiRequest } from './base';

const URIS = {
  FIND_ACCOUNT: 'user/api/get-account-info',
  SAVED_BANK_ACCOUNT: 'user/api/get-list-user-bank-account',
  ADMIN_ACCOUNT: 'user/api/get-system-bank-account',
  COMMISSION: 'user/api/get-user-commissions',
  TRANSACTION_HISTORY: 'user/api/get-trans-history',
  EXCHANGE_BUY: 'user/api/buy-coin-v2',
  EXCHANGE_SELL: 'user/api/sell-coin-v2',
  EXCHANGE_BUY_CONFIRM: 'user/api/confirm-buy-coin',
  EXCHANGE_SELL_CONFIRM: 'user/api/confirm-sell-coin',
  BANK_ACCOUNT_INFO: 'api/v1/getBankAccount',
  WITHDRAW: 'user/api/withdraw-money',
  CONFIRM_WITHDRAW: 'user/api/confirm-withdraw-money',
};

const findAccountToSendCoin = ({ s }) =>
  apiRequest({
    uri: URIS.FIND_ACCOUNT,
    method: 'GET',
    params: { s },
  });

const getSavedBankAccount = () =>
  apiRequest({
    uri: URIS.SAVED_BANK_ACCOUNT,
    method: 'GET',
    params: null,
  });

const getAdminAccount = () =>
  apiRequest({
    uri: URIS.ADMIN_ACCOUNT,
    method: 'GET',
    params: null,
  });

const getCommissionTransactions = () =>
  apiRequest({
    uri: URIS.COMMISSION,
    method: 'GET',
    params: null,
  });

const getTransactionHistory = ({ c, t, l }) =>
  apiRequest({
    uri: URIS.TRANSACTION_HISTORY,
    method: 'GET',
    params: { c, t, l },
  });

const exchangeBuy = ({ fee, currencyCode, quantity }) =>
  apiRequest({
    uri: URIS.EXCHANGE_BUY,
    method: 'POST',
    params: { fee, currencyCode, quantity },
  });

const exchangeSell = ({ fee, currencyCode, quantity }) =>
  apiRequest({
    uri: URIS.EXCHANGE_SELL,
    method: 'POST',
    params: { fee, currencyCode, quantity },
  });

const exchangeBuyConfirm = ({ fee, currencyCode, quantity, token }) =>
  apiRequest({
    uri: URIS.EXCHANGE_BUY_CONFIRM,
    method: 'POST',
    params: { fee, currencyCode, quantity, token },
  });

const exchangeSellConfirm = ({ fee, currencyCode, quantity, token }) =>
  apiRequest({
    uri: URIS.EXCHANGE_SELL_CONFIRM,
    method: 'POST',
    params: { fee, currencyCode, quantity, token },
  });

const getBankAccount = ({ accountNumber, bankName }) =>
  apiRequest({
    uri: URIS.EXCHANGE_SELL,
    method: 'POST',
    params: { accountNumber, bankName },
  });

const withdrawMoney = ({
  fee,
  currencyCode,
  quantity,
  withdrawType = 'EWallet',
  note,
  address,
  tag,
  memo,
}) =>
  apiRequest({
    uri: URIS.WITHDRAW,
    method: 'POST',
    params: {
      fee,
      currencyCode,
      quantity,
      withdrawType,
      note,
      address,
      tag,
      memo,
    },
  });

const confirmWithdraw = ({ token }) =>
  apiRequest({
    uri: URIS.CONFIRM_WITHDRAW,
    method: 'POST',
    params: { token },
  });


export default {
  findAccountToSendCoin,
  getSavedBankAccount,
  getAdminAccount,
  getCommissionTransactions,
  getTransactionHistory,
  exchangeBuy,
  exchangeSell,
  exchangeBuyConfirm,
  exchangeSellConfirm,
  getBankAccount,
  withdrawMoney,
  confirmWithdraw
};
