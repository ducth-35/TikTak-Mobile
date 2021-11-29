import { HIDEN_NUMBER, SUPPORTED_COINS, ICO_PER_UP, ICO_PER_DOWN } from '@/common';
import React, { useState, useEffect } from 'react';
import { FlatList, Image, Text, TouchableHighlight, View } from 'react-native'
import styles from './styles';
import { useAppContext, useTranslation } from '@/hooks';
import { isArray, sortBy } from 'lodash';
import { Colors, actuatedNormalize, FontFamily } from '@/themes';
import { ToggleSwitch } from '@/components';
import { formatCommaNumber, formatNumberFee } from '@/utils';

export const MoneyCoin = () => {
    const {
        userWallets,
        isHidePrice,
        getCoinRates,
        coinRates
    } = useAppContext();

    const { t } = useTranslation();

    const [coins, setCoins] = useState(SUPPORTED_COINS);
    const [hidenZeroBalances, setHidenZeroBalances] = useState(false);
    const [amount, setAmount] = useState();

    useEffect(() => {
        getCoinRates();
        getTrackingCoins();
    }, [userWallets, hidenZeroBalances]);

    const getTrackingCoins = () => {
        if (coinRates && userWallets && isArray(userWallets)) {
            const tmpCoins = [];
            const balanceCoin = [];
            const { rates } = coinRates;
            SUPPORTED_COINS.forEach((item) => {
                userWallets.forEach((coin) => {
                    if (item.id.toUpperCase() === coin.type) {
                        let per = 0;
                        let ask = 0;
                        let bid = 0;
                        let exchange_vndt = 0;
                        let amounts = 0;
                        ask = rates[`ask_${item.id}`];
                        bid = rates[`bid_${item.id}`];
                        amounts = coin.amount;
                        exchange_vndt = ([(ask + bid) / 2] * amounts);
                        per = rates[`per_${item.id}`]
                        const updatedCoin = {
                            ...item,
                            value: coin.amount,
                            perCoin: per,
                            Exchange_vndt: exchange_vndt,
                        };
                        if (!hidenZeroBalances) {
                            tmpCoins.push(updatedCoin);
                        } else {
                            if (updatedCoin.value > 0) {
                                tmpCoins.push(updatedCoin);
                                balanceCoin.push(exchange_vndt);
                                setCoins(tmpCoins);
                            }
                        }
                        // total balance
                        balanceCoin.push(exchange_vndt);
                        let total_balance = 0;
                        balanceCoin.forEach((value) => {
                            total_balance += value;
                            setAmount(formatNumberFee(total_balance));
                        });
                    }
                });
            });
            const sortedCoins = sortBy(tmpCoins, [
                (o) => {
                    return o.order;
                },
            ]);
            setCoins(sortedCoins);
        }
    };

    const renderCoinItems = ({ item, index }) => {
        return (
            <View style={[styles.itemContainer, { backgroundColor: index % 2 == 1 ? "#E7E6E1" : "white" }]}>
                <View style={styles.iconContainer} >
                    {item.icon && (
                        <Image
                            style={styles.icon}
                            source={item.icon}
                            resizeMode="contain"
                        />
                    )}
                    <View style={styles.coinInfoContainer}>
                        <Text style={styles.coinName}>{item.id.toUpperCase()}</Text>
                        <Text style={styles.coinNameSmall}>{item.name}</Text>
                        {(item.id !== 'vndt') ? ((item.perCoin > 0) ? (
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ justifyContent: 'center', marginRight: actuatedNormalize(5) }}>
                                    <Image source={ICO_PER_UP} style={{ width: 7, height: 7 }} />
                                </View>
                                <View>
                                    <Text style={{
                                        fontFamily: FontFamily.TitilliumWeb.Bold,
                                        fontSize: actuatedNormalize(12),
                                        color: Colors.GREEN,
                                    }}>{`${((item.perCoin) / 100)}%`}</Text>
                                </View>
                            </View>
                        ) : (
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ justifyContent: 'center', marginRight: actuatedNormalize(5) }}>
                                    <Image source={ICO_PER_DOWN} style={{ width: 7, height: 7 }} />
                                </View>
                                <View>
                                    <Text style={{
                                        fontFamily: FontFamily.TitilliumWeb.Bold,
                                        fontSize: actuatedNormalize(12),
                                        color: Colors.RED,
                                    }}>{`${((item.perCoin) / 100)}%`}</Text>
                                </View>
                            </View>
                        )) : null}
                    </View>
                </View>
                <View style={styles.coinAmountContainer}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.amount}>
                            {isHidePrice ? HIDEN_NUMBER : `${formatCommaNumber(item.value)} ${item.id.toUpperCase()}`}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.exchange_vndt}>
                            {`${isHidePrice ? HIDEN_NUMBER : formatNumberFee(item.Exchange_vndt)} VNDT`}
                        </Text>
                    </View>
                </View>
                <View style={styles.line} />
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <View style={[styles.titleContainer, { alignItems: 'center' }]}>
                    <Text style={styles.stockText}>
                        {`${t('equity_value')} ~ ${amount} VNDT`}
                    </Text>

                </View>
            </View>
            <FlatList
                style={styles.list}
                data={coins}
                renderItem={renderCoinItems}
                keyExtractor={(item, index) => `${item.id}-${index}`}
            />
        </View>
    )
}