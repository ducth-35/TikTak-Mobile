import React, { useEffect, useState } from 'react';
import { View, Text, RefreshControl, FlatList, Image } from 'react-native';

import dayjs from 'dayjs';
import { NavTitleBackHeader } from '@/components';
import { useAppContext, useTranslation } from '@/hooks';
import { Colors, actuatedNormalize, FontFamily } from '@/themes';
import { ICO_NOTIFICATIONS, TYPE_NOTIFICATIONS, showLoading } from '@/common';

import styles from './styles';

export const NotificationScreen = () => {
  const { t } = useTranslation();
  const { getUserNotifications, readAllNotifications} = useAppContext();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [userNotifications, setUserNotifications] = useState(null);

  

  useEffect(() => {
    fetchData({ isShowLoading: true });
    readAllNotifications();
  }, []);

  useEffect(() => {
    fetchData({ isShowLoading: false });
  }, [isRefreshing])

  const fetchData = async ({ isShowLoading }) => {
    if (isShowLoading) {
      showLoading();
    }
    const params = { l: 'all', t: 'all' };

    const res = await getUserNotifications(params);

    setIsRefreshing(false);
    setUserNotifications(res);

  }
  const onRefresh = () => {
    setIsRefreshing(true);
  }

  const renderItems = ({ item, index }) => {
    const {
      title,
      content,
      time
    } = item;

    // const ICON = TYPE_NOTIFICATIONS.find((item) => item.value === title);

    return (
      <View style={styles.notificationBox}>
        <View style={{ flexDirection: 'row' }}>
          <View>
            <Image style={styles.icon}
              source={ICO_NOTIFICATIONS} />
          </View>
          <View style={{ flexDirection: 'column', marginLeft: actuatedNormalize(10), marginRight: actuatedNormalize(20) }}>
            <Text style={[styles.description, { color: Colors.WHITE }]}>{title}</Text>
            <Text style={[styles.description, { fontFamily: FontFamily.TitilliumWeb.Regular, color: Colors.LIGHT_GREY, fontSize: actuatedNormalize(14), marginRight: actuatedNormalize(20) }]}>{content}</Text>
          </View>
        </View>
        <View style={{ flex: 1, alignItems: 'flex-end' }}>
          <Text style={[styles.description,
          {
            marginTop:actuatedNormalize(5),
            fontFamily: FontFamily.TitilliumWeb.Regular,
            color: Colors.GREY,
            fontSize: actuatedNormalize(12)
          }]}>{`${t('time')}: ${dayjs(time).format('HH:mm  |  DD/MM/YYYY')}`}</Text>
        </View>

      </View>
    )
  }
  return (
    <View style={styles.container}>
      <NavTitleBackHeader
        containerStyle={styles.navHeader}
        title={t('notifications')} />
      <View style={styles.container}>
        <FlatList
          style={styles.notificationList}
          enableEmptySections={true}
          data={userNotifications?.data?.result}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={onRefresh}
              tintColor={'#fff'}
            />
          }
          keyExtractor={(item, index) => `${item.id}-${index}`}
          renderItem={renderItems} />
      </View>
    </View>
  )
};
