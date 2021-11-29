import { action, thunk } from 'easy-peasy';

import { isEmpty, isArray } from 'lodash';

import { APP_STATE, STATUS, SHOW_ONBOARDING, STORE_COOKIE } from '@/common';
import { AccountApi } from '@/services';
import {
  getLoginCredentials,
  setLoginCredentials,
  resetLoginCredentials,
  saveValue,
  getValue,
  removeValue,
  getCookie,
} from '@/utils';

import BaseModel from './base';

const checkStoreCookie = thunk(
  async (actions, payload, { dispatch, injections }) => {
    const cookie = await getValue(STORE_COOKIE);

    if (!isEmpty(cookie)) {
      actions.changeAppState(APP_STATE.LOGGED_IN);
    }

    return cookie;
  },
);

const checkLogin = thunk(async (actions, payload, { dispatch, injections }) => {
  const credentials = await getLoginCredentials();
  return credentials;
});

const updateShowOnboarding = thunk(async (actions, payload, { dispatch }) => {
  saveValue(SHOW_ONBOARDING, JSON.stringify(payload));
  actions.onUpdateShowOnboarding(payload);
});

const checkShowOnboarding = thunk(async (actions, payload, { dispatch }) => {
  const show = await getValue(SHOW_ONBOARDING);

  if (show) {
    actions.onUpdateShowOnboarding(JSON.parse(show));
  }
});

const login = thunk(async (actions, payload, { dispatch, injections }) => {
  actions.updateStatus(STATUS.FETCHING);
  const res = await AccountApi.login(payload);
  actions.updateStatus(res.isSuccess);

  if (res.isSuccess) {
    await setLoginCredentials(payload);
    if (
      !isEmpty(res.headers['set-cookie']) &&
      isArray(res.headers['set-cookie'])
    ) {
      const ttb_tk = getCookie(res.headers['set-cookie'][0], 'ttb_tk');
      if (!isEmpty(ttb_tk)) {
        await saveValue(STORE_COOKIE, ttb_tk);
        actions.changeAppState(APP_STATE.LOGGED_IN);
      }
    }

    actions.updateCredentials(res.data);
    actions.updateShowOnboarding(false);
  }

  return res;
});

const register = thunk(async (actions, payload, { dispatch, injections }) => {
  actions.updateStatus(STATUS.FETCHING);
  const res = await AccountApi.register(payload);
  actions.updateStatus(res.isSuccess);

  return res;
});

const forgotPassword = thunk(
  async (actions, payload, { dispatch, injections }) => {
    actions.updateStatus(STATUS.FETCHING);
    const res = await AccountApi.forgotPassword(payload);
    actions.updateStatus(res.isSuccess);
    return res;
  },
);

const forceLogout = thunk(async (actions, payload, { dispatch }) => {
  const reset = await resetLoginCredentials();
  const removeCookie = await removeValue(STORE_COOKIE);

  if (reset && removeCookie) {
    actions.changeAppState(APP_STATE.ANONYMOUS);
  }
});

const confirmLogin = thunk(
  async (actions, payload, { dispatch, injections }) => {
    actions.updateStatus(STATUS.FETCHING);
    const res = await AccountApi.loginConfirm(payload);
    actions.updateStatus(res.isSuccess);

    if (res.isSuccess) {
      if (
        !isEmpty(res.headers['set-cookie']) &&
        isArray(res.headers['set-cookie'])
      ) {
        const ttb_tk = getCookie(res.headers['set-cookie'][0], 'ttb_tk');
        if (!isEmpty(ttb_tk)) {
          await saveValue(STORE_COOKIE, ttb_tk);
          actions.changeAppState(APP_STATE.LOGGED_IN);
        }
      }
    }

    return { status: res.isSuccess, data: res.data };
  },
);

const resendVerifyEmail = thunk(
  async (actions, payload, { dispatch, injections }) => {
    actions.updateStatus(STATUS.FETCHING);
    const res = await AccountApi.resendEmail(payload);
    actions.updateStatus(res.isSuccess);

    return { status: res.isSuccess, data: res.data };
  },
);

const AccountModel = {
  ...BaseModel(),
  appState: APP_STATE.ANONYMOUS,
  shouldShowOnboarding: true,
  credentials: null,
  updateCredentials: action((state, payload) => {
    state.credentials = payload;
  }),
  changeAppState: action((state, payload) => {
    state.appState = payload;
  }),
  onUpdateShowOnboarding: action((state, payload) => {
    state.shouldShowOnboarding = payload;
  }),
  checkLogin,
  login,
  register,
  forgotPassword,
  updateShowOnboarding,
  checkShowOnboarding,
  forceLogout,
  checkStoreCookie,
  confirmLogin,
  resendVerifyEmail,
};

export default AccountModel;
