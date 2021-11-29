import { apiRequest } from "./base";

const URIS = {
    EMPLOYER: 'api/company/get-employer',
    SEND_INVITE: 'api/company/send-invitation',
    OUT_EMPLOYER: 'api/company/fire-employer',
    DELETE_EMPLOYER: 'api/company/fire-employer',
    CURRENT_INVITATION: 'api/company/get-curent-invitation',
    MYCOMPANY: 'api/company/my-company',
    ACCEPT_INVITE: '/api/company/accept-invitation'
};

const getEmployer = () =>
    apiRequest({
        uri: URIS.EMPLOYER,
        method: 'GET',
        params: null
    });

const sendInvite = ({ position, department, id }) =>
    apiRequest({
        uri: URIS.SEND_INVITE,
        method: 'POST',
        params: { position, department, id }
    });

const deleteEmployer = ({ userId }) =>
    apiRequest({
        uri: URIS.OUT_EMPLOYER,
        method: 'POST',
        params: { userId }
    });

const outCompany = () =>
    apiRequest({
        uri: URIS.OUT_EMPLOYER,
        method: 'GET',
        params: null
    });

const getMycompany = () =>
    apiRequest({
        uri: URIS.MYCOMPANY,
        method: 'GET',
        params: null
    });

const getCurrentInvite = () =>
    apiRequest({
        uri: URIS.CURRENT_INVITATION,
        method: 'GET',
        params: null
    });

const acceptInvite = ({ answer }) =>
    apiRequest({
        uri: URIS.ACCEPT_INVITE,
        method: 'GET',
        params: { answer }
    });

export default {
    getEmployer,
    sendInvite,
    outCompany,
    deleteEmployer,
    getMycompany,
    getCurrentInvite,
    acceptInvite,
}