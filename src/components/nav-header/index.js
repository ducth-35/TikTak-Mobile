import React, { useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native';


import FastImage from 'react-native-fast-image';
import { FontFamily } from '@/themes';
import Clipboard from '@react-native-community/clipboard';
import IconBadge from 'react-native-icon-badge';
import { Avatar } from 'react-native-paper';

import {
  ICO_ARROW_BACK,
  ICO_ARROW_DOWN,
  Routes,
  DEFAULT_AVATAR,
  ICO_NOTIFICATION,
  showSuccessToast,
} from '@/common';

import { renderVerify, renderVip } from '../verrify';
import TouchableX from '../touchable';
import { NavigationService } from '@/services';
import { actuatedNormalize, Colors } from '@/themes';
import { useTranslation, useAppContext } from '@/hooks';
import { Menu } from '../menu';

import styles from './styles';
import { hideEmail } from '@/utils';

export const NavTitleHeader = ({
  title,
  containerStyle = {},
  rightContainer = null,
  leftContainer = null,
}) => {
  return (
    <View style={[styles.titleBackcontainer, containerStyle]}>
      {leftContainer ? leftContainer : null}

      <Text style={[styles.title, { marginLeft: actuatedNormalize(20) }]}>
        {title}
      </Text>
      {rightContainer ? rightContainer : null}
    </View>
  );
};

export const CoinHeader = ({
  leftContainer = null,
  rightContainer = null,
  containerStyle = {}, }) => {
  const { t } = useTranslation();
  return (
    <View style={[styles.titleCoinContainer, containerStyle]}>
      <View>
        {leftContainer ? leftContainer : null}
      </View>
      <View style={{ justifyContent: 'center' }}>

        <Text style={[styles.title, { flex: 0 }]}>
          {`${t('tab_address_book')}`}
        </Text>
      </View>
      <View>
        {rightContainer ? rightContainer : null}
      </View>
    </View>
  );
}

export const NavTitleBackHeader = ({
  title,
  onPress,
  containerStyle = {},
  rightContainer = null,
}) => {
  return (
    <View style={[styles.titleBackcontainer, containerStyle]}>
      <Image style={styles.icon} source={ICO_ARROW_BACK} resizeMode="contain" />
      <TouchableX
        style={styles.leftBtn}
        onPress={() => {
          NavigationService.goBack();
          if (onPress) {
            onPress();
          }
        }}
      />
      <Text style={styles.title}>{title}</Text>
      {rightContainer ? rightContainer : null}
    </View>
  );
};

export const NavTitleNoBackHeader = ({
  title,
  onPress,
  containerStyle = {},
  rightContainer = null,
  check,
}) => {
  return (
    <View style={[styles.titleBackcontainer, containerStyle]}>
      {check ? <View>
        <Image style={styles.icon} source={ICO_ARROW_BACK} resizeMode="contain" />
        <TouchableX
          style={styles.leftBtn}
          onPress={() => {
            NavigationService.navigate(Routes.BOTTOM_TABS);
            if (onPress) {
              onPress();
            }
          }}
        />
      </View>
        : null}
      <Text style={styles.title}>{title}</Text>
      {rightContainer ? rightContainer : null}
    </View>
  );
};

export const NavTitleDownHeader = ({ title, onPress, containerStyle = {} }) => {
  return (
    <View style={[styles.titleBackcontainer, containerStyle]}>
      <Image style={styles.icon} source={ICO_ARROW_DOWN} resizeMode="contain" />
      <TouchableX
        style={styles.leftBtn}
        onPress={() => {
          if (onPress) {
            onPress();
          }
        }}
      />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export const NavMenuHeader = ({
  containerStyle = {}
}) => {
  const { t } = useTranslation();
  const { accountInfo } = useAppContext();

  const onMenuPress = () => {
    NavigationService.navigate(Routes.SETTINGS);
  };

  return (
    <View style={[styles.menuContainer, containerStyle]}>
      <TouchableX style={styles.menuButton} onPress={onMenuPress}>
        <View style={styles.avatarContainer}>
          <FastImage
            style={styles.avatar}
            resizeMode="contain"
            source={
              accountInfo?.avatar
                ? { uri: accountInfo?.avatar }
                : DEFAULT_AVATAR
            }
          />
        </View>
        <View style={styles.userInfoContainer}>
          <Text style={styles.userTitle}>{t('hello')}</Text>
          <Text style={styles.userName}>{accountInfo?.name ?? ''}</Text>
        </View>
      </TouchableX>
      <View style={styles.rightContainer}>
      </View>
    </View>
  );
};

export const NavMenuHeaderUD = ({
  containerStyle = {},
  status,
  onshowMenu
}) => {
  const { t } = useTranslation();
  const { accountInfo, getUserNotifications, userNotifications } = useAppContext();
  const [countNotification, setCountNotification] = useState();

  useEffect(() => {
    getNotificatons();
  })

  const getNotificatons = async () => {
    const params = { l: 'all', t: 'all' };
    const res = await getUserNotifications(params);

    if (res && res.isSuccess) {
      setCountNotification(res.data?.total);
    }
  }

  const onMenuPress = () => {
    NavigationService.navigate(Routes.SETTINGS, setCountNotification(null));
  };

  const onNotification = async () => {
    setCountNotification(null);
    NavigationService.navigate(Routes.NOTIFICATION)
  }

  const Comp = require('../../containers/home/elements')[`EquityValue`];


  return (
    <View style={[styles.menuContainer, containerStyle]}>
      <Menu onshowMenu={onshowMenu} />
      <Comp />
      <View style={styles.menuButton}>
        <TouchableX onPress={onNotification} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: actuatedNormalize(20), marginRight: actuatedNormalize(20) }}>
          <IconBadge
            MainElement={
              <Image style={{ width: 20, height: 20 }}
                source={ICO_NOTIFICATION} />}
            BadgeElement={<Text style={{ color: '#FFFFFF' }}>{countNotification}</Text>}
            IconBadgeStyle={{ width: 20, height: 20 }}
            Counter={countNotification}
          />
        </TouchableX>
        <TouchableX style={styles.avatarContainer} onPress={onMenuPress}>
          <Avatar.Image
            source={
              accountInfo?.avatar
                ? { uri: accountInfo?.avatar }
                : DEFAULT_AVATAR
            }
            size={48}
          />
        </TouchableX>
        <View style={styles.userInfoContainer}>
        </View>
      </View>
    </View>
  );
};

export const NavTitleBackSettings = ({
  onPress,
  source,
  onPressPopUp,
  containerStyle = {},
  rightContainer = null,
}) => {

  const { accountInfo } = useAppContext();
  const { t } = useTranslation();

  const onCopyID = () => {
    Clipboard.setString(`${accountInfo?.id}`);
    showSuccessToast(t('copy_success'));
  }

  const onCopyEmail = () => {
    Clipboard.setString(`${accountInfo?.email}`);
    showSuccessToast(t('copy_success'));
  }

  return (
    <View style={[styles.titleBackcontainerSetting, containerStyle]}>
      <View>
        <Image style={styles.icon} source={ICO_ARROW_BACK} resizeMode="contain" />
        <TouchableX
          style={styles.leftBtn}
          onPress={() => {
            NavigationService.goBack();
            if (onPress) {
              onPress();
            }
          }}
        />
      </View>
      <View>
        <View style={[styles.settingContainer]}>
          <TouchableX onPress={onPressPopUp}>
            <FastImage
              style={[styles.avatar, {
                width: actuatedNormalize(80),
                height: actuatedNormalize(80),
                borderRadius: actuatedNormalize(40),
              }]}
              resizeMode="contain"
              source={source}
            />
          </TouchableX>
          <View style={{ marginTop: actuatedNormalize(10) }}>
            <TouchableX onPress={onCopyID}>
              <Text style={[styles.title, { fontSize: 18, flex: 0 }]}>{`${accountInfo?.name} (U${accountInfo?.id})`}</Text>
            </TouchableX>
            <TouchableX onPress={onCopyEmail}>
              <Text style={[styles.title, {
                fontSize: 13,
                flex: 0,
                fontFamily: FontFamily.TitilliumWeb.Regular,
                color: Colors.GREY
              }]}>{hideEmail(accountInfo?.email)}</Text>
            </TouchableX>
          </View>
          <View>
            <View style={{ alignItems: 'center' }}>
              {renderVip()}
            </View>
            <View style={{ alignItems: 'center' }}>
              {renderVerify()}
            </View>
          </View>
        </View>
      </View>
      {rightContainer ? rightContainer : null}
    </View>
  );
};
