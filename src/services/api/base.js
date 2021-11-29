import { create } from 'apisauce';
import { isEmpty } from 'lodash';

import ApiMonitor from '../monitor';
import {
  API_BASE_URL,
  RESPONSE_CODES,
  showErrorToast,
  hideLoading,
  SESSION_TIMEOUT,
  STORE_COOKIE,
} from '@/common';
import { EventEmitter, getValue } from '@/utils';

const api = ({ showErrorMsg = true, isHideLoading = true }) => {
  let _api = create({
    baseURL: API_BASE_URL,
    headers: {
      Accept: 'application/json',
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/json',
    },
    timeout: 30000,
    withCredentials: true,
  });

  _api.addMonitor(ApiMonitor);

  _api.addAsyncRequestTransform(async (request) => {
    const ttb_tk = await getValue(STORE_COOKIE);

    if (ttb_tk && !isEmpty(ttb_tk)) {
      request.headers['ttb_tk'] = ttb_tk;
    }
  });

  _api.addAsyncResponseTransform(async (response) => {
    // console.log(
    //   'res ================================================================= : ',
    //   response,
    // );
    const isSuccess =
      (response?.status === RESPONSE_CODES.SUCCESS ||
        response?.status === RESPONSE_CODES.UPDATE_SUCCESS) &&
      response.data
        ? true
        : false;
    response.isSuccess = isSuccess;

    if (isHideLoading) {
      hideLoading();
    }

    switch (response.status) {
      case RESPONSE_CODES.UPDATE_SUCCESS:
      case RESPONSE_CODES.SUCCESS:
        if (!response.ok) {
          if (response.data?.code === 40001) {
            onTokenExpired();
          } else {
            showErrorMsg && showError(response.data);
          }
        }
        break;
      case RESPONSE_CODES.UNAUTHORIZED:
        onTokenExpired();
        break;
      default:
        if (response.data?.code === 40001) {
          onTokenExpired();
        } else {
          showErrorMsg && showError(response.data);
        }
        break;
    }
  });

  return _api;
};

const onTokenExpired = () => {
  EventEmitter.emit(SESSION_TIMEOUT);
};

const showError = (data) => {
  setTimeout(() => {
    let msg = 'Error';
    if (data) {
      msg = data?.message
        ? data?.message
        : data?.description
        ? data?.description
        : 'Error';
    }

    showErrorToast(msg);
  }, 200);
};

export const apiRequest = async ({
  uri,
  method,
  params,
  showErrorMsg,
  isHideLoading,
}) => {
  let config = {
    method: method,
    url: uri,
    data: params,
  };

  if (method === 'GET') {
    config = { method: method, url: uri, params: params };
  }

  return await api({ showErrorMsg, isHideLoading }).any(config);
};
