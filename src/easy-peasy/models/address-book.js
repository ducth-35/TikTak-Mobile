import { action, thunk } from 'easy-peasy';

import BaseModel from './base';

const AddressBookModel = {
  ...BaseModel(),
  listAddress: [],
  onAddContact: action((state, payload) => {
    state.listAddress.push(payload);
  }),
  onUpdateContact: action((state, payload) => {
    const updatedListAddress = state.listAddress.map((address) =>
      address.id === payload.id
        ? {
            ...address,
            name: payload.name,
            walletAddress: payload.walletAddress,
          }
        : address,
    );
    state.listAddress = updatedListAddress;
  }),
  onDeleteContact: action((state, payload) => {
    const updatedListAddress = state.listAddress.filter(
      (address) => address.id !== payload.id,
    );
    state.listAddress = updatedListAddress;
  }),
};

export default AddressBookModel;
