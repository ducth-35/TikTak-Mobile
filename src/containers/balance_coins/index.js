import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, Image, ScrollView } from 'react-native';
import { NavTitleBackHeader, TouchableX } from '@/components';
import { styles } from './styles';
import { Colors } from '@/themes';
import { useAppContext, useTranslation } from '@/hooks';
import { SUPPORTED_COINS, COLUMNS_BLANCES } from '@/common';
import { isArray } from 'lodash';
import { formatCommaNumber, formatNumberFee } from '@/utils';

export const BalanceCoins = () => {
    const { t } = useTranslation();
    const {
        userWallets,
        coinRates,
        getWithdrawLimitedInfo
    } = useAppContext();

    const [withdrawed, setWithdrawed] = useState();
    const [limit, setLimit] = useState();
    const [coins, setCoins] = useState([]);
    const [exchangeUFX, setExchangeUFX] = useState(0);

    const Coin = SUPPORTED_COINS.filter(
        (item) => item.id !== 'vndt' && item.id !== 'ufx')

    useEffect(() => {
        getLimitCoins();
        getTrackingCoins();
    }, [userWallets]);

    const getTrackingCoins = () => {
        if (coinRates && userWallets && isArray(userWallets)) {
            let tmpCoins = [];
            let balanceCoin = [];
            const { rates } = coinRates;
            Coin.forEach((item) => {
                userWallets.forEach((coin) => {
                    if (item.id.toUpperCase() === coin.type) {
                        let ask = 0;
                        let bid = 0;
                        let exchange_vndt = 0;
                        let amounts = 0;
                        let amount_vndt = 0;
                        ask = rates[`ask_${item.id}`];
                        bid = rates[`bid_${item.id}`];
                        amounts = coin.amount;

                        exchange_vndt = ([(ask + bid) / 2] * amounts);
                
                        const updateCoins = {
                            ...item,
                            value: amounts,
                        }
                        

                        tmpCoins.push(updateCoins);
                        setCoins(tmpCoins);

                        console.log(amount_vndt, 'l;ls;d');
                        // total balance coin
                        balanceCoin.push(exchange_vndt);
                        let total_balance = 0;
                        balanceCoin.forEach((value) => {
                            total_balance += value;
                        });
                        if (coinRates) {
                            const { rates } = coinRates;
                            let ask_ufx = 0;
                            let bid_ufx = 0;
                            ask_ufx = rates[`ask_ufx`];
                            bid_ufx = rates[`bid_ufx`];
                            const ExchangeUFX = (ask_ufx + bid_ufx) / 2;
                            const TotalEchangeUFX = (total_balance) / (ExchangeUFX);
                            setExchangeUFX(formatCommaNumber(TotalEchangeUFX));
                        }
                    }
                });
            });
        }
    }

    const Deposit = () => {

    }

    const Dithdraw = () => {

    }

    const getLimitCoins = async () => {
        const res = await getWithdrawLimitedInfo();
        setWithdrawed(res.data?.withdrawed);
        setLimit(res.data?.limit);
    }

    const tableHeader = () => (
        <View style={styles.tableHeader}>
            {COLUMNS_BLANCES.map((column, index) => {
                return (
                    <View
                        key={index}
                        style={styles.columnHeader}>
                        <Text style={styles.columnHeaderTxt}>{column}</Text>
                    </View>
                )
            })}
        </View>
    );

    const renderItems = ({ item, index }) => {
        return (
            <TouchableX style={{ ...styles.tableRow, backgroundColor: index % 2 == 1 ? "#E7E6E1" : "white" }}>
                <View style={styles.iconContainer}>
                    {item.icon && (
                        <Image
                            style={styles.icon}
                            source={item.icon}
                            resizeMode="contain"
                        />
                    )}
                    <View style={{ marginLeft: 10, justifyContent: 'center', width: 50 }}>
                        <Text style={styles.text} numberOfLines={1}>{item.name}</Text>
                        <Text style={[styles.text, { color: Colors.GREY }]}>{item.shortname}</Text>
                    </View>
                </View>
                <View style={styles.iconContainer}>
                    <Text style={styles.text}>{`${formatNumberFee(item.value)}`}</Text>
                </View>
                <View style={styles.iconContainer}>
                    <TouchableX style={{ backgroundColor: '#28a745', height: 35, width: 70 }} onPress={Deposit}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={[styles.text, { color: Colors.WHITE }]}> Nạp </Text>
                        </View>
                    </TouchableX>
                    <TouchableX style={{ backgroundColor: '#ffc107', height: 35, width: 70 }} onPress={Dithdraw}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={[styles.text, { color: Colors.DARK }]}> Rút </Text>
                        </View>
                    </TouchableX>
                </View>
            </TouchableX>
        )
    }

    return (
        <View style={styles.container}>
            <NavTitleBackHeader
                containerStyle={styles.navHeader}
                title={'Số dư ví Coin'}
            />
            <ScrollView style={styles.viewCoin}>
                <View style={styles.viewContainer}>
                    <Text style={styles.text}> Giá trị ước tính ~ </Text>
                    <Text style={[styles.text, { color: Colors.BLUE }]}>{`${exchangeUFX} UFX`}</Text>
                </View>
                <View style={styles.viewContainer}>
                    <Text style={styles.text}>Giới hạn rút 24h:</Text>
                    <Text style={[styles.text, { color: Colors.RED }]}>  {`${withdrawed} BTC / ${limit} BTC`} </Text>
                </View>
                <View style={[styles.viewContainer, { padding: 0, marginTop: 20 }]}>
                    <FlatList
                        data={coins}
                        ListHeaderComponent={tableHeader}
                        keyExtractor={(item, index) => index + ""}
                        stickyHeaderIndices={[0]}
                        renderItem={renderItems}
                    />
                </View>
            </ScrollView>
        </View>
    )
}