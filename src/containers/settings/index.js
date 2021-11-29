import React, { useState, useEffect } from 'react';
import { View, SectionList, Text, Image, Platform } from 'react-native';

import { NavTitleBackSettings, ToggleSwitch, TouchableX, BlueButton, PopUpChangeAvatar, PopUpSuccess } from '@/components';
import { useAppContext, useTranslation } from '@/hooks';
import {
  showLoading,
  ICO_FACE_ID,
  ICO_ARROW_RIGHT,
  ICO_CHANGE_PINCODE,
  ICO_CHANGE_PASSWORD,
  ICO_2_AUTHEN,
  ICO_LANGUAGE,
  ICO_LOGOUT,
  ICO_AFFILIATE,
  DEFAULT_AVATAR,
  Routes,
  ENABLE_TOUCH_ID,
  ICO_UPDATE,
  ICO_VERIFY,
  ICO_CLOSE,
  PROFILE,
  ICO_MY_COMPANY
} from '@/common';
import { NavigationService } from '@/services';
import { Colors, actuatedNormalize, STATUSBAR_HEIGHT, FontFamily } from '@/themes';
import { showAlert, saveValue, getValue } from '@/utils';
import DeviceInfo from 'react-native-device-info';
import FastImage from 'react-native-fast-image';
import * as ImagePicker from 'react-native-image-picker';

import { ChangeLanguagePopup } from './languages-popup';
import styles from './styles';

const ItemType = {
  Select: 'select',
  Switch: 'switch',
  Text: 'text',
};


export const SettingsScreen = () => {
  const { t, locale } = useTranslation();
  const { forceLogout, accountInfo,  sendImage, changeNewAvatar} = useAppContext();
  const [isShowConfirmPopup, setIsShowConfirmPopup] = useState(false);
  const [imageSource, setImageSource] = useState(null);
  const [avatar, setAvatar] = useState();
  const [isShowSuccess, setIsShowSuccess] = useState();

  const sections = [
    {
      title: t('profile'),
      data: [
        {
          id: 'my_profile',
          title: t('my_profile'),
          type: ItemType.Select,
          leftIcon: PROFILE
        },
        {
          id: 'my_company',
          title: t('my_company'),
          type: ItemType.Select,
          leftIcon: ICO_MY_COMPANY
        }
      ]
    },
    {
      title: t('security'),
      data: [
        {
          id: 'change_pincode',
          title: t('change_pincode'),
          type: ItemType.Select,
          leftIcon: ICO_CHANGE_PINCODE,
        },
        {
          id: 'change_password',
          title: t('change_password'),
          type: ItemType.Select,
          leftIcon: ICO_CHANGE_PASSWORD,
        },
        {
          id: 'touchid_face_id',
          title: t('touchid_face_id'),
          type: ItemType.Switch,
          leftIcon: ICO_FACE_ID,
          isOn: false,
        },
        {
          id: 'two_factor_authentication',
          title: t('two_factor_authentication'),
          type: ItemType.Text,
          leftIcon: ICO_2_AUTHEN,
        },
        {
          id: 'account_verification',
          title: t('account_verification'),
          type: ItemType.Select,
          leftIcon: ICO_VERIFY,
        },
      ],
    },

    {
      title: t('share'),
      data: [
        {
          id: 'affiliate',
          title: t('affiliate'),
          type: ItemType.Select,
          leftIcon: ICO_AFFILIATE
        }
      ]
    },


    {
      title: t('support'),
      data: [
        {
          id: 'languages',
          title: t('language'),
          type: ItemType.Select,
          leftIcon: ICO_LANGUAGE,
        },
        {
          id: 'logout',
          title: t('logout'),
          type: ItemType.Select,
          leftIcon: ICO_LOGOUT,
        }
      ],
    },
    {
      title: t('system'),
      data: [
        {
          id: 'updates',
          title: t('update'),
          type: ItemType.Text,
          leftIcon: ICO_UPDATE
        }
      ]
    },
  ];

  const [showLanguagesPopup, setShowLanguagesPopup] = useState(false);
  const [authenType, setAuthenType] = useState('none');
  const [settings, setSettings] = useState(sections);

  useEffect(() => {
    onCheckEnableTouchId();
  }, []);
  useEffect(() => {
    changeNewAvatar();
  }, []);

  useEffect(() => {
    setAuthenType(accountInfo?.authen_type);
  }, [accountInfo]);

  useEffect(() => {
    onUpdateSettings({
      id: 'two_factor_authentication',
      value: authenType !== 'none' ? true : false,
    });
  }, [authenType, locale]);

  const Enable = () => {
    if (accountInfo?.authen_type === 'none') {
      return (
        <TouchableX onPress={onShowTwoFactorAuthentication}>
          <Text style={{ color: Colors.RED, fontFamily: FontFamily.TitilliumWeb.SemiBold, fontSize: 16 }}>{t('not_activated')}</Text>
        </TouchableX>
      )
    } else if (accountInfo?.authen_type === 'email' || accountInfo?.authen_type === 'google')
      return (
        <TouchableX onPress={onShowTwoFactorAuthentication}>
          <Text style={{ color: Colors.GREEN, fontFamily: FontFamily.TitilliumWeb.SemiBold, fontSize: 16 }}>{t('activated')}</Text>
        </TouchableX>
      )
  }

  const Version = () => {
    return (
      <>
        <Text style={styles.Version}>
          {DeviceInfo.getVersion()} Build{' '}
          {DeviceInfo.getBuildNumber()}
        </Text>
      </>
    )
  }

  const onSelectedMenuItem = (item) => {
    switch (item.id) {
      case 'change_pincode':
        onShowChangePinCode();
        break;
      case 'change_password':
        onShowChangePassword();
        break;
      case 'account_verification':
        onShowVerifyAccount();
        break;
      case 'logout':
        onConfirmLogout();
        break;
      case 'languages':
        onShowChangeLanguagePopup();
        break;
      case 'affiliate':
        onShowAffiliate();
        break;
      case 'my_profile':
        onMyProfile();
        break;
      case 'my_company':
        onShowMycompany();
      default:
        console.log('Default');
    }
  };

  const onChangeToogleValueMenuItem = ({ item, value }) => {
    console.log('onChangeToogleValueMenuItem: ', item, value);
    switch (item.id) {
      case 'touchid_face_id':
        onChangeSettingTouchId({ value });
        break;
      default:
        console.log('Default');
    }
  };


  const onCheckEnableTouchId = async () => {
    const result = await getValue(ENABLE_TOUCH_ID);

    onUpdateSettings({
      id: 'touchid_face_id',
      value: result ? JSON.parse(result) : false,
    });
  };

  const onChangeSettingTouchId = async ({ value }) => {
    const res = await saveValue(ENABLE_TOUCH_ID, JSON.stringify(value));

    if (res.success) {
      onUpdateSettings({ id: 'touchid_face_id', value: value });
    }
  };

  const onUpdateSettings = ({ id, value }) => {
    let updateSections = [...sections];
    updateSections.forEach((item, idx1) => {
      item.data.forEach((item2, idx2) => {
        if (item2.id === id) {
          item2.isOn = value;
        }
      });
    });

    setSettings(updateSections);
  };

  const onShowTwoFactorAuthentication = () => {
    NavigationService.navigate(Routes.TWO_FACTOR);
  };

  const onShowChangePinCode = () => {
    NavigationService.navigate(Routes.PIN_CODE, { isUpdate: true });
  };

  const onShowChangePassword = () => {
    NavigationService.navigate(Routes.CHANGE_PASSWORD);
  };

  const onShowVerifyAccount = () => {
    NavigationService.navigate(Routes.VERIFY_ACCOUNT);
  }

  const onMyProfile = () => {
    let infor = {
      firstName: accountInfo?.firstName,
      lastName: accountInfo?.lastName,
      gender: accountInfo?.gender,
      national_id: accountInfo?.national_id,
      birthday: accountInfo?.birthday,
      address: accountInfo?.address
    }
    NavigationService.navigate(Routes.VIEWPROFILE, infor);
  }
  const onShowMycompany = () => {
    NavigationService.navigate(Routes.MYCOMPANY);
  }

  const onShowChangeLanguagePopup = () => {
    setShowLanguagesPopup(true);
  };

  const onCloseLanguagesPopup = () => {
    setShowLanguagesPopup(false);
  };

  const onConfirmLogout = () => {
    showAlert({
      title: t('logout').toUpperCase(),
      message: t('confirm_logout_message'),
      acceptButtonTitle: t('logout'),
      cancelButtonTitle: t('cancel'),
      acceptAction: onLogout,
    });
  };

  const onLogout = () => {
    forceLogout();
  };

  const onShowAffiliate = () => {
    NavigationService.navigate(Routes.AFFILIATE);
  }

  const renderItems = ({ item }) => {
    return (
      <TouchableX
        style={styles.itemContainer}
        onPress={
          item.type === ItemType.Select
            ? () => {
              onSelectedMenuItem(item);
            }
            : null
        }>
        <View style={styles.leftContainer}>
          {item.leftIcon ? (
            <Image
              style={styles.leftIcon}
              source={item.leftIcon}
              resizeMode="contain"
            />
          ) : (
            <View style={styles.retangle} />
          )}
          <Text style={styles.itemTitle}>{item.title}</Text>
        </View>
        {item.type === ItemType.Select ? (
          <Image
            style={styles.arrowIcon}
            source={ICO_ARROW_RIGHT}
            resizeMode="contain"
          />
        ) : item.type === ItemType.Switch ? (
          <ToggleSwitch
            isOn={item.isOn}
            size="small"
            onColor={Colors.BLUE}
            offColor={Colors.PRIMARY}
            onToggle={(value) => {
              onChangeToogleValueMenuItem({ item, value });
            }}
          />
        ) : null}
        {item.type === ItemType.Text ? (
          item.id === 'two_factor_authentication' ? (
            <View>
              {Enable()}
            </View>
          ) : null ||
            item.id === 'updates' ?
            (
              <View>
                {Version()}
              </View>
            ) : null
        ) : null}
      </TouchableX>
    );
  };

  const renderHeader = ({ section: { title } }) => {
    return (
      <View style={styles.headerContainer}>
        {title && <Text style={styles.headerTitle}>{title}</Text>}
      </View>
    );
  };

  const onShowPopUp = () => {
    setIsShowConfirmPopup(true)
  }

  const onCancel = () => {
    setIsShowConfirmPopup(false)
  }

  const onUpload = () => {
    let options = {
      title: 'You can choose one image',
      includeBase64: true,
      maxWidth: 250,
      maxHeight: 250,
      mediaType: 'photo',
      storageOptions: {
        skipBackup: true
      }
    };
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        let source = { uri: response.uri };
        setImageSource(source.uri);
      }
      const avatar_base64 = 'data:image/jpeg;base64,' + response.base64;
      setAvatar(avatar_base64);
    }
    );
  }
  const SendURL = () => {
    let errorMessage = null;
    if (errorMessage) {
      showErrorToast(errorMessage);
      return;
    } else {
      setIsShowConfirmPopup(false);
    }
    showLoading();
    OnSendImage();
  }

  const OnSendImage = async () => {
    const params = {
      image: avatar
    }
    const res = await sendImage(params);

    if (res && res.isSuccess) {
      const params_avatar = {
        avatar: res.data
      }
      let errorMessage = null;
      if (errorMessage) {
        showErrorToast(errorMessage);
        return;
      } else {
        showLoading();
        response = await changeNewAvatar(params_avatar);
        if (response && response.isSuccess) {
          setIsShowSuccess(true);
        }
      }
    }
  }

  const Button = () => {
    if (imageSource === null) {
      return null;
    } else {
      return (
        <View style={{
          marginHorizontal: actuatedNormalize(30),
          marginVertical: actuatedNormalize(20),
          marginTop: actuatedNormalize(20)
        }}>
          <BlueButton
            containerStyle={styles.confirmBtn}
            title={t('confirm')}
            onPress={SendURL}
          />
        </View>
      )
    }
  }

  const onCancelSuccess = () => {
    setIsShowSuccess(false);
  }

  return (
    <View style={styles.container}>
      <NavTitleBackSettings
        onPressPopUp={onShowPopUp}
        containerStyle={[styles.navHeader,
        Platform.OS === 'ios' ? ({ minHeight: actuatedNormalize(300) - STATUSBAR_HEIGHT })
          : ({ minHeight: actuatedNormalize(280) - STATUSBAR_HEIGHT })
        ]}
        source={
          imageSource === null ? (
            accountInfo?.avatar
              ? { uri: accountInfo?.avatar }
              : DEFAULT_AVATAR
          ) : (
            accountInfo?.avatar
              ? { uri: imageSource }
              : DEFAULT_AVATAR
          )}
      />
      <SectionList
        sections={settings}
        keyExtractor={(item, index) => item + index}
        renderItem={renderItems}
        renderSectionHeader={renderHeader}
        showsVerticalScrollIndicator={false}
      />
      {showLanguagesPopup && (
        <ChangeLanguagePopup onClose={onCloseLanguagesPopup} />
      )}
      <PopUpChangeAvatar
        isVisible={isShowConfirmPopup}
        onCloseContainer={
          <View style={{ flexDirection: 'row' }}>
            <View style={{
              justifyContent: 'flex-start',
              paddingVertical: actuatedNormalize(10), marginBottom: actuatedNormalize(10)
            }}>
              <Text style={[styles.content, { fontSize: 16, color: Colors.LIGHT_GREY }]}>{t('click_change_avatar')}</Text>
            </View>
            <TouchableX
              onPress={onCancel}
              style={[styles.header,
              {
                flex: 1,
                justifyContent: 'flex-end',
                paddingHorizontal: actuatedNormalize(15),
                paddingVertical: actuatedNormalize(15)
              }]}>
              <Image source={ICO_CLOSE} style={styles.icon} resizeMode='contain' />
            </TouchableX>
          </View>
        }
        image={
          <View style={{ alignItems: 'center', marginTop: actuatedNormalize(20), marginBottom: actuatedNormalize(20) }}>
            {imageSource === null ? (
              <TouchableX onPress={onUpload}>
                <FastImage
                  style={[styles.avatar, {
                    width: actuatedNormalize(100),
                    height: actuatedNormalize(100),
                    borderRadius: actuatedNormalize(50),
                  }]}
                  resizeMode="contain"
                  source={
                    accountInfo?.avatar
                      ? { uri: accountInfo?.avatar }
                      : DEFAULT_AVATAR
                  }
                />
              </TouchableX>
            ) : (
              <TouchableX onPress={onUpload}>
                <FastImage
                  style={[styles.avatar, {
                    width: actuatedNormalize(100),
                    height: actuatedNormalize(100),
                    borderRadius: actuatedNormalize(50),
                  }]}
                  resizeMode="contain"
                  source={{ uri: imageSource }}
                />
              </TouchableX>
            )}

          </View>
        }
        button={Button()}
      />
      <PopUpSuccess
        isVisible={isShowSuccess}
        onCloseContainer={
          <View style={{ flexDirection: 'row' }}>
            <View style={{
              justifyContent: 'flex-start',
              paddingVertical: actuatedNormalize(10), marginBottom: actuatedNormalize(10)
            }}>
              <Text style={[styles.content, { fontSize: 16, color: Colors.LIGHT_GREY }]}> {`${t('completed')}`} </Text>
            </View>
            <TouchableX
              onPress={onCancelSuccess}
              style={[styles.header,
              {
                flex: 1,
                justifyContent: 'flex-end',
                paddingHorizontal: actuatedNormalize(15),
                paddingVertical: actuatedNormalize(15)
              }]}>
              <Image source={ICO_CLOSE} style={{ width: 15, height: 15 }} resizeMode='contain' />
            </TouchableX>
          </View>
        }
        text1={t('completed')}
        text2={t('change_avtar_success')}
      />
    </View>
  );
};
