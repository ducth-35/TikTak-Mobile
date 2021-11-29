import { apiRequest } from './base';

const URIS = {
    GETSHEET: 'user/api/export-multip-transfer-data',
    TRANSFER: 'user/api/multip-transfer',
}

const getSheet = ({ sheetId, sheetName }) =>
    apiRequest({
        uri: URIS.GETSHEET,
        method: 'GET',
        params: { sheetId, sheetName },
    });

const transfer = (data) =>
    apiRequest({
        uri: URIS.TRANSFER,
        method: 'POST',
        params: data,
    });

export default {
    getSheet,
    transfer
}