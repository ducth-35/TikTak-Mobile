import React from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';

const AppStateContext = React.createContext();

export const AppContextProvider = (props) => {
  const {
    //Account
    checkLogin,
    login,
    register,
    forgotPassword,
    checkShowOnboarding,
    forceLogout,
    checkStoreCookie,
    confirmLogin,
    resendVerifyEmail,

    //User
    getUserWallets,
    searchUsers,
    getAccountInfo,
    updateHidePrice,
    getUserNotifications,
    readAllNotifications,
    getListFriend,
    sendInviteFriend,
    getUserCommission,
    sendVerifyAcount,
    sendImage,
    changeNewAvatar,
    changeInfor,

    //System
    getCoinRates,
    getSystemAgencies,
    getTransactionCoinFee,
    getWithdrawLimitedInfo,

    //Transaction
    withdrawMoney,
    exchangeSell,
    exchangeBuy,
    confirmWithdraw,
    exchangeBuyConfirm,
    exchangeSellConfirm,
    getTransactionHistory,

    //AddressBook
    onAddContact,
    onUpdateContact,
    onDeleteContact,

    //Security
    changePassword,
    updateAuthenTypeStep1,
    updateAuthenTypeStep2,

    //Giftcode
    getListGiftcode,
    createGiftCode,
    scanGiftCode,
    validateGiftCode,
    getHistoryGiftcodeReceive,

    //Credit
    getListcreditManagement,
    getListcreditGranted,
    createrequestDone,
    getCreditDetail,
    CreateCredit,
    updateCredit,
    accepteCredit,
    refundCredit,

    //company
    getEmployer,
    getMycompany,
    sendInvited,
    getCurrentInvite,
    acceptInvite,
    deleteEmployer,
    outCompany,

    //multisend
    getSheet,
    transfer

  } = useStoreActions((actions) => {
    const {
      user,
      account,
      transaction,
      security,
      system,
      addressBook,
      giftcode,
      credit,
      company,
      multisend
    } = actions;
    return {
      //Account
      checkLogin: account.checkLogin,
      login: account.login,
      register: account.register,
      forgotPassword: account.forgotPassword,
      checkShowOnboarding: account.checkShowOnboarding,
      forceLogout: account.forceLogout,
      checkStoreCookie: account.checkStoreCookie,
      confirmLogin: account.confirmLogin,
      resendVerifyEmail: account.resendVerifyEmail,

      //User
      getUserWallets: user.getUserWallets,
      searchUsers: user.searchUsers,
      getAccountInfo: user.getAccountInfo,
      updateHidePrice: user.updateHidePrice,
      getUserNotifications: user.getUserNotifications,
      readAllNotifications: user.readAllNotifications,
      getListFriend: user.getListFriend,
      sendInviteFriend: user.sendInviteFriend,
      getUserCommission: user.getUserCommission,
      sendVerifyAcount: user.sendVerifyAcount,
      sendImage: user.sendImage,
      changeNewAvatar: user.changeNewAvatar,
      changeInfor: user.changeInfor,


      //System
      getCoinRates: system.getCoinRates,
      getSystemAgencies: system.getSystemAgencies,
      getTransactionCoinFee: system.getTransactionCoinFee,
      getWithdrawLimitedInfo: system.getWithdrawLimitedInfo,

      //Transaction
      withdrawMoney: transaction.withdrawMoney,
      exchangeBuy: transaction.exchangeBuy,
      exchangeSell: transaction.exchangeSell,
      confirmWithdraw: transaction.confirmWithdraw,
      exchangeBuyConfirm: transaction.exchangeBuyConfirm,
      exchangeSellConfirm: transaction.exchangeSellConfirm,
      getTransactionHistory: transaction.getTransactionHistory,

      //AddressBook
      onAddContact: addressBook.onAddContact,
      onUpdateContact: addressBook.onUpdateContact,
      onDeleteContact: addressBook.onDeleteContact,

      //Security
      changePassword: security.changePassword,
      updateAuthenTypeStep1: security.updateAuthenTypeStep1,
      updateAuthenTypeStep2: security.updateAuthenTypeStep2,

      //Giftcode
      getListGiftcode: giftcode.getListGiftcode,
      createGiftCode: giftcode.createGiftCode,
      scanGiftCode: giftcode.scanGiftCode,
      validateGiftCode: giftcode.validateGiftCode,
      getHistoryGiftcodeReceive: giftcode.getHistoryGiftcodeReceive,

      //Credit
      getListcreditManagement: credit.getListcreditManagement,
      getListcreditGranted: credit.getListcreditGranted,
      createrequestDone: credit.createrequestDone,
      getCreditDetail: credit.getCreditDetail,
      CreateCredit: credit.CreateCredit,
      updateCredit: credit.updateCredit,
      accepteCredit: credit.accepteCredit,
      refundCredit: credit.refundCredit,

      //Company
      getEmployer: company.getEmployer,
      getMycompany: company.getMycompany,
      sendInvited: company.sendInvited,
      getCurrentInvite: company.getCurrentInvite,
      acceptInvite: company.acceptInvite,
      deleteEmployer: company.deleteEmployer,
      outCompany: company.outCompany,

      //Multisend
      getSheet: multisend.getSheet,
      transfer: multisend.transfer,
    };
  });

  const appState = useStoreState((store) => store.account.appState);
  const shouldShowOnboarding = useStoreState(
    (store) => store.account.shouldShowOnboarding,
  );
  const userWallets = useStoreState((store) => store.user.userWallets);
  const accountInfo = useStoreState((store) => store.user.accountInfo);
  const isHidePrice = useStoreState((store) => store.user.isHidePrice);


  const coinRates = useStoreState((store) => store.system.coinRates);
  const systemAgencies = useStoreState((store) => store.system.systemAgencies);
  const coinFee = useStoreState((store) => store.system.coinFee);

  const listAddress = useStoreState((store) => store.addressBook.listAddress);

  const giftcodes = useStoreState((store) => store.giftcode.giftcodes);
  const history = useStoreState((store) => store.giftcode.history);


  const transactionHistory = useStoreState(
    (store) => store.transaction.transactionHistory,
  );

  const exchangeHistory = useStoreState(
    (store) => store.transaction.exchangeHistory,
  );

  const listCreditGranted = useStoreState(
    (store) => store.credit.listCreditGranted,
  );

  const listCreditManagement = useStoreState(
    (store) => store.credit.listCreditManagement,
  );

  const listDetail = useStoreState(
    (store) => store.credit.listDetail,
  );

  const listEmployer = useStoreState(
    (store) => store.company.listEmployer
  );

  const myCompany = useStoreState(
    (store) => store.company.myCompany
  );

  return (
    <AppStateContext.Provider
      value={{
        appState,

        //Account
        shouldShowOnboarding,
        checkLogin,
        login,
        register,
        forgotPassword,
        checkShowOnboarding,
        forceLogout,
        checkStoreCookie,
        confirmLogin,
        resendVerifyEmail,

        //User
        userWallets,
        getUserWallets,
        searchUsers,
        getAccountInfo,
        accountInfo,
        isHidePrice,
        updateHidePrice,
        getUserNotifications,
        readAllNotifications,
        getListFriend,
        getUserCommission,
        sendInviteFriend,
        sendVerifyAcount,
        sendImage,
        changeNewAvatar,
        changeInfor,

        //System
        coinRates,
        getCoinRates,
        systemAgencies,
        getSystemAgencies,
        getTransactionCoinFee,
        coinFee,
        getWithdrawLimitedInfo,

        //Transaction
        withdrawMoney,
        exchangeBuy,
        exchangeSell,
        confirmWithdraw,
        exchangeBuyConfirm,
        exchangeSellConfirm,
        getTransactionHistory,
        transactionHistory,
        exchangeHistory,

        //AddressBook
        listAddress,
        onAddContact,
        onUpdateContact,
        onDeleteContact,

        //Security
        changePassword,
        updateAuthenTypeStep1,
        updateAuthenTypeStep2,

        //Giftcode
        getListGiftcode,
        giftcodes,
        createGiftCode,
        scanGiftCode,
        validateGiftCode,
        getHistoryGiftcodeReceive,
        history,

        //Credit
        getListcreditManagement,
        getListcreditGranted,
        listCreditManagement,
        listCreditGranted,
        createrequestDone,
        getCreditDetail,
        listDetail,
        CreateCredit,
        updateCredit,
        accepteCredit,
        refundCredit,

        //Company
        getEmployer,
        listEmployer,
        getMycompany,
        myCompany,
        sendInvited,
        getCurrentInvite,
        acceptInvite,
        deleteEmployer,
        outCompany,

        //Multisend
        getSheet,
        transfer
      }}>
      {props.children}
    </AppStateContext.Provider>
  );
};

export default AppStateContext;
