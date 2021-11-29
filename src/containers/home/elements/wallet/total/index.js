import { SUPPORTED_COINS } from '@/common';
import React, { useState, useEffect } from 'react';
import { Text, FlatList, View, Image } from 'react-native';
import { styles } from './styles';
import { useTranslation, useAppContext } from '@/hooks';
import { formatCommaNumber, formatNumberFee } from '@/utils';
import { isArray } from 'lodash';

export const TotalCoin = () => {
    const { t } = useTranslation();
    const {
        userWallets,
        getCoinRates,
        coinRates
    } = useAppContext();

    const [amount, setAmount] = useState(0);
    const [coins, setCoins] = useState(SUPPORTED_COINS);

    useEffect(() => {
        getTrackingCoins();
        getCoinRates();
    }, [userWallets]);

    const getTrackingCoins = () => {
        if (coinRates && userWallets && isArray(userWallets)) {
            const tmpCoins = [];
            const balanceCoin = [];
            const { rates } = coinRates;
            SUPPORTED_COINS.forEach((item) => {
                userWallets.forEach((coin) => {
                    if (item.id.toUpperCase() === coin.type) {
                        let ask = 0;
                        let bid = 0;
                        let exchange_vndt = 0;
                        let amounts = 0;
                        ask = rates[`ask_${item.id}`];
                        bid = rates[`bid_${item.id}`];
                        amounts = coin.amount;
                        exchange_vndt = ([(ask + bid) / 2] * amounts);

                        const updatedCoin = {
                            ...item,
                            value: coin.amount,
                            Exchange_vndt: exchange_vndt,
                        };
                        
                        if (updatedCoin.value > 0) {
                            tmpCoins.push(updatedCoin);
                            balanceCoin.push(exchange_vndt);
                            setCoins(tmpCoins);
                        }
                        // total balance
                        let sum = 0;
                        balanceCoin.forEach((value) => {
                            sum += value;
                        });
                        setAmount(formatNumberFee(sum));
                    }
                });
            });
        }
    }

    const renderCoinItems = ({ item }) => {
        return (
            <View style={styles.itemContainer}>
                <View style={styles.iconContainer}>
                    {item.icon && (
                        <Image
                            style={styles.icon}
                            source={item.icon}
                            resizeMode="contain"
                        />
                    )}
                    <View style={styles.coinInfoContainer}>
                        <Text style={styles.coinName}>{item.name}</Text>
                    </View>
                </View>
                <View style={styles.coinAmountContainer}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.amount}>
                            {`${formatCommaNumber(item.value)} ${item.id.toUpperCase()}`}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.exchange_vndt}>
                            {`${formatNumberFee(item.Exchange_vndt)} VNDT`}
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