import React, { useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { DrawerItem, DrawerContentScrollView } from '@react-navigation/drawer';
import { Avatar, Title, Caption, Paragraph, Drawer, Text, TouchableRipple } from 'react-native-paper';
import { useTranslation, useAppContext } from '@/hooks';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import { Colors, FontFamily } from '@/themes';
import { NavigationService } from '@/services';
import { Routes } from '@/common';
import { hideEmail } from '@/utils';

export const CustomDrawer = (props) => {
    const { t } = useTranslation();
    const { getAccountInfo, accountInfo } = useAppContext();

    useEffect(() => {
        getAccountInfo();
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: '#212529' }}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoContainer}>
                        <View style={{ flexDirection: 'row', marginTop: 15 }}>
                            <Avatar.Image
                                source={{ uri: accountInfo?.avatar }}
                                size={60}
                            />
                            <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                                <Title style={styles.title}>{`U${accountInfo?.id}`}</Title>
                                <Caption style={styles.caption}>{hideEmail(accountInfo?.email)}</Caption>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>{`${t('equity_value')}:`}</Paragraph>
                                <Caption style={styles.caption}>  29019 (VNDT)</Caption>
                            </View>
                        </View>
                    </View>
                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem
                            label={t('dashbroad')}
                            icon={({ color, size }) => (
                                <FontAwesome
                                    name='home'
                                    color={'#A1A1A1'}
                                    size={20}
                                />
                            )}
                            labelStyle={styles.labelStyle}
                            onPress={() => NavigationService.navigate(Routes.DASHBOARD)}
                        />
                        <DrawerItem
                            label={t('money_wallet')}
                            icon={({ color, size }) => (
                                <Icon
                                    name='wallet'
                                    color={'#A1A1A1'}
                                    size={20}
                                />
                            )}
                            labelStyle={styles.labelStyle}
                            onPress={() => NavigationService.navigate(Routes.MONEY_WALLET)}
                        />

                        <DrawerItem
                            label={t('cryto_currency_wallet')}
                            icon={({ color, size }) => (
                                <FontAwesome
                                    name='btc'
                                    color={'#A1A1A1'}
                                    size={20}
                                />
                            )}
                            labelStyle={styles.labelStyle}
                            onPress={() => NavigationService.navigate(Routes.COIN_WALLET)}
                        />

                        <DrawerItem
                            label={t('swap')}
                            icon={({ color, size }) => (
                                <FontAwesome
                                    name='sync-alt'
                                    color={'#A1A1A1'}
                                    size={20}
                                />
                            )}
                            labelStyle={styles.labelStyle}
                            onPress={() => NavigationService.navigate(Routes.SWAP)}
                        />

                        <DrawerItem
                            label={t('Hệ thống đại lý')}
                            icon={({ color, size }) => (
                                <FontAwesome
                                    name='list'
                                    color={'#A1A1A1'}
                                    size={20}
                                />
                            )}
                            labelStyle={styles.labelStyle}
                            onPress={() => NavigationService.navigate(Routes.DEPOSIT_VNDT)}
                        />

                        <DrawerItem
                            label={t('Tài khoản')}
                            icon={({ color, size }) => (
                                <FontAwesome
                                    name='user-alt'
                                    color={'#A1A1A1'}
                                    size={20}
                                />
                            )}
                            labelStyle={styles.labelStyle}
                        />

                        <DrawerItem
                            label={t('Hỗ trợ')}
                            icon={({ color, size }) => (
                                <FontAwesome
                                    name='headset'
                                    color={'#A1A1A1'}
                                    size={20}
                                />
                            )}
                            labelStyle={styles.labelStyle}
                        />

                    </Drawer.Section>
                    <Drawer.Section
                        title={
                            <Text style={{
                                color: Colors.WHITE,
                                fontSize: 12,
                                fontFamily: FontFamily.TitilliumWeb.SemiBold
                            }}>
                                Preferences
                            </Text>}>
                        <DrawerItem
                            label={t('Cài đặt')}
                            icon={({ color, size }) => (
                                <FontAwesome
                                    name='cog'
                                    color={'#A1A1A1'}
                                    size={20}
                                />
                            )}
                            labelStyle={styles.labelStyle}
                            onPress={() => NavigationService.navigate(Routes.SETTINGS)}
                        />
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawer}>
                <DrawerItem
                    label={t('logout')}
                    icon={({ color, size }) => (
                        <Icon
                            name='exit-to-app'
                            color={'#A1A1A1'}
                            size={size}
                        />
                    )}
                    labelStyle={styles.labelStyle}
                />
            </Drawer.Section>
        </View>
    )
}

const styles = StyleSheet.create({
    bottomDrawer: {
        marginBottom: 15,
        borderTopColor: Colors.GREY,
        borderTopWidth: 0.2
    },
    drawerContent: {
        flex: 1
    },
    userInfoContainer: {
        paddingLeft: 20,
        // backgroundColor: Colors.DARK_GREY,
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontFamily: FontFamily.TitilliumWeb.SemiBold,
        color: Colors.BLUE
    },
    caption: {
        fontSize: 12,
        lineHeight: 14,
        color: Colors.WHITE,
        fontFamily: FontFamily.TitilliumWeb.SemiBold
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3
    },
    drawerSection: {
        marginTop: 15,
        borderTopColor: Colors.GREY,
        borderTopWidth: 0.2
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12
    },
    labelStyle: {
        color: '#A1A1A1',
        fontFamily: FontFamily.TitilliumWeb.SemiBold
    }

})