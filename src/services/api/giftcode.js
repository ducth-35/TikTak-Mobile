import { apiRequest } from './base';

const URIS = {
  MANAGER_GIFTCODE: 'user/api/manager-giftcode',
  CREATE_GIFTCODE: 'user/api/create-giftcode',
  SCAN_GIFTCODE: 'user/api/scan-giftcode',
};

const managerGiftCode = ({ type }) =>
  apiRequest({
    uri: URIS.MANAGER_GIFTCODE,
    method: 'GET',
    params: { type },
    isPublicApi: false,
  });

const createGiftCode = ({ currencyCode, note, quantity, number, conditions }) =>
  apiRequest({
    uri: URIS.CREATE_GIFTCODE,
    method: 'POST',
    params: { currencyCode, note, quantity, number, conditions },
    isPublicApi: false,
  });

const scanGiftCode = ({ code, pincode }) =>
  apiRequest({
    uri: URIS.SCAN_GIFTCODE,
    method: 'POST',
    params: { code, pincode },
    isPublicApi: false,
  });

const validateGiftCode = ({ code }) =>
  apiRequest({
    uri: URIS.SCAN_GIFTCODE,
    method: 'GET',
    params: { code },
    isPublicApi: false,
  });

export default {
  managerGiftCode,
  createGiftCode,
  scanGiftCode,
  validateGiftCode,
};
