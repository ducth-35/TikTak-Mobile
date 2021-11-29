import { apiRequest } from './base';

const URIS = {
  LOGIN: 'account/api/login',
  CONFIRM_LOGIN: 'account/api/confirm-login',
  REGISTER: 'account/api/register',
  VERIFY_REGISER: 'account/api/verify-register',
  RESEND_EMAIL: 'account/api/resend-email',
  SPONSOR_INFO: 'account/api/get-sponsor-info',
  FORGOT_PASSWORD: 'account/api/forgot-pasword',
  RESET_PASSWORD: 'account/api/reset-password',
};

//Account
const login = ({ email, password, gRecaptchaResponse }) =>
  apiRequest({
    uri: URIS.LOGIN,
    method: 'POST',
    params: { email, password, gRecaptchaResponse },
    isPublicApi: true,
  });

const loginConfirm = ({ email, token }) =>
  apiRequest({
    uri: URIS.CONFIRM_LOGIN,
    method: 'POST',
    params: { email, token },
    isPublicApi: true,
  });

const register = ({ email, password, name, sponsor, gRecaptchaResponse }) =>
  apiRequest({
    uri: URIS.REGISTER,
    method: 'POST',
    params: { email, password, name, sponsor, gRecaptchaResponse },
    isPublicApi: true,
  });

const verifyRegister = ({ id, token }) =>
  apiRequest({
    uri: URIS.VERIFY_REGISER,
    method: 'GET',
    params: { id, token },
    isPublicApi: true,
  });

const resendEmail = ({ type, email }) =>
  apiRequest({
    uri: URIS.RESEND_EMAIL,
    method: 'GET',
    params: { type, email },
    isPublicApi: true,
  });

const getSponsorInfo = ({ id }) =>
  apiRequest({
    uri: URIS.SPONSOR_INFO,
    method: 'GET',
    params: { id },
    isPublicApi: true,
  });

const forgotPassword = ({ email, gRecaptchaResponse }) =>
  apiRequest({
    uri: URIS.FORGOT_PASSWORD,
    method: 'GET',
    params: { email, gRecaptchaResponse },
    isPublicApi: true,
  });

const resetPassword = ({ email, password, token }) =>
  apiRequest({
    uri: URIS.RESET_PASSWORD,
    method: 'POST',
    params: { email, password, token },
    isPublicApi: true,
  });

export default {
  login,
  loginConfirm,
  register,
  verifyRegister,
  resendEmail,
  getSponsorInfo,
  forgotPassword,
  resetPassword,
};
