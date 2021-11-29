import { apiRequest } from './base';

const URIS = {
  AUTHEN_STEP_1: 'user/api/update-auth-type-step1',
  AUTHEN_STEP_2: 'user/api/update-auth-type-step2',
  CHANGE_PASSWORD: 'user/api/change-password',
};

const updateAuthenTypeStep1 = ({ type }) =>
  apiRequest({
    uri: URIS.AUTHEN_STEP_1,
    method: 'POST',
    params: { type },
  });

const updateAuthenTypeStep2 = ({ type, code }) =>
  apiRequest({
    uri: URIS.AUTHEN_STEP_2,
    method: 'POST',
    params: { type, code },
  });

const changePassword = ({ old_pass, new_pass }) =>
  apiRequest({
    uri: URIS.CHANGE_PASSWORD,
    method: 'POST',
    params: { old_pass, new_pass },
  });

export default {
  updateAuthenTypeStep1,
  updateAuthenTypeStep2,
  changePassword,
};
