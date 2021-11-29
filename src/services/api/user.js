import { apiRequest } from './base';

const URIS = {
  ACCOUNT_INFO: 'user/api/get-account-info',
  LOGOUT: 'user/api/logout',
  AGENCY_INFO: 'user/api/get-agency-info',
  F1_LIST: 'user/api/get-f1-list',
  OWNER_AGENCIES: 'api/agency/all',
  USER_NOTIFICATIONS: 'user/api/get-user-notifi',
  USER_WALLETS: 'user/api/get-user-wallet',
  USER_LAST_LOGIN: 'user/api/last-login',
  INVITE_FRIEND: 'user/api/send-invite-friend',
  CHANGE_AVATAR: 'user/api/upload-avatar',
  UPLOAD_IMAGE: 'user/api/upload-image',
  VERIFY_ACCOUNT: 'user/api/verify-account',
  SEARCH_USER: 'user/api/find-dest-account',
  USER_COMMISSION: 'user/api/get-user-commissions',
  CHANGE_ACCOUNT_INFOR: 'user/api/change-account-info',
};

const getAccountInfo = () =>
  apiRequest({
    uri: URIS.ACCOUNT_INFO,
    method: 'GET',
    params: null,
    showErrorMsg: false,
  });

const logout = () =>
  apiRequest({
    uri: URIS.LOGOUT,
    method: 'GET',
    params: null,
  });

const getAgencyInfo = ({ agencyId }) =>
  apiRequest({
    uri: URIS.AGENCY_INFO,
    method: 'GET',
    params: { agencyId },
  });

const getF1List = () =>
  apiRequest({
    uri: URIS.F1_LIST,
    method: 'GET',
    params: null,
  });

const getOwnerAgencies = () =>
  apiRequest({
    uri: URIS.OWNER_AGENCIES,
    method: 'GET',
    params: null,
  });

const getUserNotifications = ({ l, t }) =>
  apiRequest({
    uri: URIS.USER_NOTIFICATIONS,
    method: 'GET',
    params: { l, t },
  });

const userCommissions = () =>
  apiRequest({
    uri: URIS.USER_COMMISSION,
    method: 'GET',
    params: null
  });

const readAllNotifications = () =>
  apiRequest({
    uri: URIS.USER_NOTIFICATIONS,
    method: 'POST',
  });

const getUserWallets = () =>
  apiRequest({
    uri: URIS.USER_WALLETS,
    method: 'GET',
    params: null,
    isHideLoading: false,
  });

const getUserLastLogin = () =>
  apiRequest({
    uri: URIS.USER_LAST_LOGIN,
    method: 'GET',
    params: null,
  });

const inviteFriend = ({ email }) =>
  apiRequest({
    uri: URIS.INVITE_FRIEND,
    method: 'POST',
    params: { email },
  });

const changeAvatar = ({ avatar }) =>
  apiRequest({
    uri: URIS.CHANGE_AVATAR,
    method: 'POST',
    params: { avatar },
  });

const uploadImage = ({ image }) =>
  apiRequest({
    uri: URIS.UPLOAD_IMAGE,
    method: 'POST',
    params: { image },
  });

const verifyAccount = ({ avatar, id_front, id_back }) =>
  apiRequest({
    uri: URIS.VERIFY_ACCOUNT,
    method: 'POST',
    params: { avatar, id_front, id_back },
  });

const searchUsers = ({ s, c }) =>
  apiRequest({
    uri: URIS.SEARCH_USER,
    method: 'GET',
    params: { s, c },
  });

const changeAccountInfor = ({ firstName, lastName, national_id, gender, birthday, address }) =>
  apiRequest({
    uri: URIS.CHANGE_ACCOUNT_INFOR,
    method: 'POST',
    params: { firstName, lastName, national_id, gender, birthday, address },
  });

export default {
  getAccountInfo,
  logout,
  getAgencyInfo,
  getF1List,
  getOwnerAgencies,
  getUserNotifications,
  readAllNotifications,
  getUserWallets,
  getUserLastLogin,
  inviteFriend,
  changeAvatar,
  uploadImage,
  verifyAccount,
  searchUsers,
  userCommissions,
  changeAccountInfor
};
