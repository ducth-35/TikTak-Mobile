import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';

import Modal from 'react-native-modal';
import { Colors, actuatedNormalize, FontFamily } from '@/themes';
import { BlueButton, GreyButton } from '../buttons';
import { ICO_ROUND_MAIL, ICO_TOAST_SUCCESS } from '@/common';

import styles from './styles';

const renderWithdrawalTransition = ({
  input,
  fee,
  receivingAddress,
  quantity,
  total,
  quantityCoin,
  receivingAddressCoin,
  feeCoin,
  totalCoin,
  idUser,
}) => {
  return (
    <View>
    </View>
  );
};

const renderSwap = ({
  input,
  fee,
  quantity,
  total,
  quantityCoin,
  feeCoin,
  totalCoin,
  priceBuySell,
  textPriceBuySell,

}) => {
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
    </View>
  );
};

export const Popup = ({
  isVisible,
  onCloseContainer,
  bottomContainer,
  input,
  title,
  fee,
  receivingAddress,
  quantity,
  total,
  quantityCoin,
  receivingAddressCoin,
  feeCoin,
  totalCoin,
  idUser,
  checkSwap,
  priceBuySell,
  textPriceBuySell,
}) => {


  return (
    <Modal isVisible={isVisible}>
    </Modal>
  );
};


export const PopupCredit = ({ isVisible, onCloseContainer, quota, quotaVNDT, interest, interestVNDT, quantityused, quantityusedVNDT, amount, quanlityInput,
  title, OnPress, activeBackgroundColor, isActive, disabled
}) => {
  return (
    <Modal isVisible={isVisible}>
    </Modal>
  )
}


export const PopupConfirmGrantQuota = ({ isVisible, onCloseContainer, grantee, granteeName, email, interest, interestVNDT, note, noteText, amount, amountVNDT,
  title, OnPress
}) => {
  return (
    <Modal isVisible={isVisible}>
    </Modal>
  )
}



export const PopUpChangeAvatar = ({
  isVisible,
  onCloseContainer,
  button,
  image
}) => {
  return (
    <Modal isVisible={isVisible}>
    </Modal>
  )
};

export const PopUpAccept = ({ isVisible, onCloseContainer, Youhave, YouhavVNDT, Amount, AmountVNDT, InterestRate, InterestRateVNDT, OnPress, title }) => {
  return (
    <Modal isVisible={isVisible}>
    </Modal>
  )
}

export const PopUpSuccess = ({ isVisible, onCloseContainer, text1, text2 }) => {
  return (
    <Modal
      animationIn="slideInDown"
      isVisible={isVisible}>
      <View style={styles.modalContent}>
      </View>
    </Modal>
  )
}

export const PopUpSuccessTransfer = ({ isVisible, onCloseContainer, text1, text2, text3, text4, text5, text6, text7, text8, text9, text10, title, OnPress }) => {
  return (
    <Modal isVisible={isVisible}>
      <View style={styles.modalContent}>
      </View>
    </Modal>
  )
}


export const PopUpTransfer = ({ isVisible, onCloseContainer, text1, text2, text3, text4, text5, text6, title, OnPress }) => {
  return (
    <Modal isVisible={isVisible}>
    </Modal>
  )
}

export const PopUpWithdraw = ({ isVisible, onCloseContainer, text1, text2, text3, text4, text5, text6, title, OnPress }) => {
  return (
    <Modal isVisible={isVisible}>
    </Modal>
  )
}

export const PopUpGiftCode = ({ isVisible, onCloseContainer, giftcode, giftcodetype, money, moneyVNDT, quantity, quantityVNDT, total, totalVNDT, GiftCodeType, note, noteText, OnPress, title }) => {
  return (
    <Modal isVisible={isVisible}>
     
    </Modal>
  )
}

export const PopUpSuccessCreateGiftode = ({ isVisible, onCloseContainer, text1, title, OnPress }) => {
  return (
    <Modal isVisible={isVisible}>
     
    </Modal>
  )
}

export const PopupInvited = ({ isVisible, onCloseContainer, text1, text2, text3, text4, titleRefuse, OnPressRefuse, titleAccept, OnPressAccept }) => {
  return (
    <Modal
      animationIn="slideInDown"
      isVisible={isVisible}>

    </Modal>
  )
}

export const PopupDelete = ({ isVisible, text1, titleCancel, OnCancel, titleAccept, OnPressAccept }) => {
  return (
    <Modal isVisible={isVisible}>
    </Modal>
  )
}

export const PopupOut = ({ isVisible, text1, titleCancel, OnCancel, titleAccept, OnPressAccept }) => {
  return (
    <Modal
      animationIn="slideInDown"
      isVisible={isVisible}>
    </Modal>
  )
}

export const PopupMultiSend = ({ isVisible, onCloseContainer, text1, text2, text3, quanlityInput, titleCancel, OnPressCancel, titleAccept, OnPressAccept }) => {
  return (
    <Modal
      animationIn="slideInDown"
      isVisible={isVisible}>
    </Modal>
  )
}


export * from './dashbroad';