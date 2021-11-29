import { action, thunk } from 'easy-peasy';

import { STATUS } from '@/common';
import { UserApi } from '@/services';

import BaseModel from './base';

const getUserWallets = thunk(
  async (actions, payload, { dispatch, injections }) => {
    actions.updateStatus(STATUS.FETCHING);
    const res = await UserApi.getUserWallets();
    actions.updateStatus(res.isSuccess);

    if (res.isSuccess) {
      actions.updateUserWallets(res.data);
    }

    return res;
  },
);

const searchUsers = thunk(
  async (actions, payload, { dispatch, injections }) => {
    actions.updateStatus(STATUS.FETCHING);
    const res = await UserApi.searchUsers(payload);
    actions.updateStatus(res.isSuccess);

    return { status: res.isSuccess, data: res.data };
  },
);

const getAccountInfo = thunk(
  async (actions, payload, { dispatch, injections }) => {
    actions.updateStatus(STATUS.FETCHING);
    const res = await UserApi.getAccountInfo();
    actions.updateStatus(res.isSuccess);

    if (res.isSuccess) {
      actions.updateAccountInfo(res.data);
    }

    return { status: res.isSuccess, data: res.data };
  },
);


const getUserNotifications = thunk(
  async (actions, payload, { dispatch, injections }) => {
    actions.updateStatus(STATUS.FETCHING);
    const res = await UserApi.getUserNotifications(payload);

    actions.updateStatus(res.isSuccess);

    if (res.isSuccess) {
      actions.updateUserNotifications(res.data);
    }

    return res;

  },
);

const getListFriend = thunk(
  async (actions, payload, { dispatch, injections }) => {
    actions.updateStatus(STATUS.FETCHING);
    const res = await UserApi.getF1List(payload);
    actions.updateStatus(res.isSuccess);

    if (res.isSuccess) {
      actions.updateListFriend(res.data);
    }
    return res;
  },
);

const getUserCommission = thunk(
  async (actions, payload, { dispatch, injections }) => {
    actions.updateStatus(STATUS.FETCHING);
    const res = await UserApi.userCommissions(payload);
    actions.updateStatus(res.isSuccess);

    if (res.isSuccess) {
      actions.updateUserCommission(res.data)
    }
    return res;
  }
)

const readAllNotifications = thunk(
  async (actions, payload, { dispatch, injections }) => {
    actions.updateStatus(STATUS.FETCHING);
    const res = await UserApi.readAllNotifications();
    actions.updateStatus(res.isSuccess);
    return res;
  }
);

const sendInviteFriend = thunk(
  async (actions, payload, { dispatch, injections }) => {
    actions.updateStatus(STATUS.FETCHING);
    const res = await UserApi.inviteFriend(payload);
    actions.updateStatus(res.isSuccess);
    return res;
  },
);

const sendVerifyAcount = thunk(
  async (actions, payload, { dispatch, injections }) => {
    actions.updateStatus(STATUS.FETCHING);
    const res = await UserApi.verifyAccount(payload);
    actions.updateStatus(res.isSuccess);
    return res;
  },
);


const changeNewAvatar = thunk(
  async (actions, payload, { dispatch, injections }) => {
    actions.updateStatus(STATUS.FETCHING);
    const res = await UserApi.changeAvatar(payload);
    actions.updateStatus(res.isSuccess);
    return res;
  },
);

const sendImage = thunk(
  async (actions, payload, { dispatch, injections }) => {
    actions.updateStatus(STATUS.FETCHING);
    const res = await UserApi.uploadImage(payload);
    actions.updateStatus(res.isSuccess);
    return res;
  },
);

const changeInfor = thunk(
  async (actions, payload, { dispatch, injections }) => {
    actions.updateStatus(STATUS.FETCHING);
    const res = await UserApi.changeAccountInfor(payload);
    actions.updateStatus(res.isSuccess);
    return res;
  },
)


const UserModel = {
  ...BaseModel(),
  userWallets: null,
  accountInfo: null,
  isHidePrice: false,
  userNotifications: [],
  listFriend: [],
  userCommissions: [],

  updateHidePrice: action((state, payload) => {
    state.isHidePrice = payload;
  }),
  updateUserWallets: action((state, payload) => {
    state.userWallets = payload;
  }),
  updateAccountInfo: action((state, payload) => {
    state.accountInfo = payload;
  }),
  updateUserNotifications: action((state, payload) => {
    state.userNotifications = payload;
  }),
  updateListFriend: action((state, payload) => {
    state.listFriend = payload;
  }),
  updateUserCommission: action((state, payload) => {
    state.userCommissions = payload;
  }),

  getUserWallets,
  searchUsers,
  getAccountInfo,
  getUserNotifications,
  readAllNotifications,
  getListFriend,
  getUserCommission,
  sendInviteFriend,
  sendVerifyAcount,
  sendImage,
  changeNewAvatar,
  changeInfor
};

export default UserModel;
