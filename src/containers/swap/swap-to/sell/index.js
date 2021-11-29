import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image } from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { isEmpty, isArray } from 'lodash';

import {
    NavTitleBackHeader,
    BlueButton,
    Popup,
    PopUpSuccessTransfer,
    TouchableX,
    RNInput3,
} from '@/components';
import { useAppContext, useTranslation } from '@/hooks';
import {
    BTC_dust,
    ETH_dust,
    ICO_CLOSE,
    showLoading,
    showErrorToast,
    showSuccessToast,
    Routes,
} from '@/common';
import { Colors, actuatedNormalize, FontFamily } from '@/themes';
import { formatCommaNumber, formatNumberFee } from '@/utils';
import { NavigationService } from '@/services';

import styles from './styles';

export const SellScreen = ({ route }) => {
    const { t } = useTranslation();
    const {
        getTransactionCoinFee,
        getCoinRates,
        getUserWallets,
        coinFee,
        coinRates,
        exchangeSell,
        exchangeSellConfirm,
        accountInfo,
        userWallets,
    } = useAppContext();

    const coin = route.params?.coin;
    const coinId = route.params?.coinId;

    const [quantity, setQuantity] = useState('');
    const [fee, setFee] = useState(0);
    const [coinPrice, setCoinPrice] = useState(0);
    const [limitMin, setLimitMin] = useState(0);
    const [limitMax, setLimitMax] = useState(0);
    const [authenType, setAuthenType] = useState('none');
    const [availableCoin, setAvailableCoin] = useState(0);
    const [isShowConfirmPopup, setIsShowConfirmPopup] = useState(false);
    const [authenCode, setAuthenCode] = useState(null);
    const [maximum, setMaximum] = useState(0);
    // const [totalMoney, setTotalMoney] = useState(0);
    const [coinFeeName, setCoinFeeName] = useState(0);
    const [isShowPopupSuccessTransfer, setIsShowPopupSuccessTransfer] = useState();

    useEffect(() => {
        getTransactionCoinFee();
        getCoinRates();
        getUserWallets();
        getAvailableCoin();
    }, []);

    useEffect(() => {
        setAuthenType(accountInfo?.authen_type);
    }, [accountInfo]);



    useEffect(() => {
        if (coinRates) {
            const { rates } = coinRates;
            let rate = 0;

            if (coinRates) {
                rate = rates[`bid_${coin.id}`];
            }

            setCoinPrice(rate);
        }

        if (coinFee) {
            const coin_fee = coinFee[`${coin.id}_fee`];
            setFee(coin_fee);
        }
        if (coinRates) {
            const { limit } = coinRates;
            let mincoin = 0;
            let maxcoin = 0;
            if (coinRates) {
                mincoin = limit[`min_bid_${coin.id}`];
                maxcoin = limit[`max_bid_${coin.id}`];
            }
            setLimitMin(mincoin);
            setLimitMax(maxcoin);
        }
    }, [coinFee, coinRates]);

    useEffect(() => {
        if (coinId === 'usdt') {
            setCoinFeeName('ETH');
        } else {
            setCoinFeeName(coin.id.toUpperCase());
        }
    })


    const onCancel = () => {
        setIsShowConfirmPopup(false);
    };

    const onConfirm = () => {
        onConfirmCode && onConfirmCode(authenCode);
    };

    const getAvailableCoin = () => {
        if (userWallets) {
            const coinn = userWallets.find(
                (item) => item.type.toLowerCase() === coinId,
            );

            if (coinn) {
                setAvailableCoin(coinn);
            }
        }
    };

    const onSetAllAvailableCoinSell = () => {
        ;
        if (coinId === 'btc') {
            if (formatCommaNumber([(availableCoin.amount) - (fee)] - (BTC_dust)) < parseFloat(limitMin)) {
                showErrorToast(t('invalid_money_sell').replace(/#LIMIT/g, limitMin)
                    .replace(/#NAME/g, coin?.id?.toUpperCase()));
            } else {
                setQuantity(formatCommaNumber([(availableCoin.amount) - (fee)] - (BTC_dust)))
            }
        } else if (coinId === 'xrp') {
            if (formatCommaNumber([(availableCoin.amount) - (fee)] - (20)) < parseFloat(limitMin)) {
                showErrorToast(t('invalid_money_sell').replace(/#LIMIT/g, limitMin)
                    .replace(/#NAME/g, coin?.id?.toUpperCase()));
            } else {
                setQuantity(formatCommaNumber([(availableCoin.amount) - (fee)] - (20)))
            }
        } else if (coinId === 'xlm') {
            if (formatCommaNumber([(availableCoin.amount) - (fee)] - (3)) < parseFloat(limitMin)) {
                showErrorToast(t('invalid_money_sell').replace(/#LIMIT/g, limitMin)
                    .replace(/#NAME/g, coin?.id?.toUpperCase()));
            } else {
                setQuantity(formatCommaNumber([(availableCoin.amount) - (fee)] - (3)))
            }
        } else if (coinId === 'trx' || coinId === 'xeng' || coinId === 'cent' || coinId === 'ufx' || coinId === 'usdt') {
            if (formatCommaNumber(availableCoin.amount) < parseFloat(limitMin)) {
                showErrorToast(t('invalid_money_sell').replace(/#LIMIT/g, limitMin)
                    .replace(/#NAME/g, coin?.id?.toUpperCase()));
            } else {
                setQuantity(availableCoin.amount)
            }
        } else {
            if (coinId === 'eth' || coinId === 'matic') {
                if (parseFloat(availableCoin.amount) < parseFloat(limitMin)) {
                    showErrorToast(t('invalid_money_sell').replace(/#LIMIT/g, limitMin)
                        .replace(/#NAME/g, coin?.id?.toUpperCase()));
                } else {
                    setQuantity(formatCommaNumber((availableCoin.amount) - (fee)))
                }
            }
        }

    }

    const onSwap = async () => {
        let errorMessage = null;
        if (parseFloat(quantity) < parseFloat(limitMin)) {
            errorMessage = t('invalid_amount').replace(/#LIMIT/g, limitMin)
                .replace(/#COIN/g, coinId.toUpperCase());
        } else if (parseFloat(quantity) > parseFloat(limitMax)) {
            errorMessage = t('maximum_number')
                .replace(/#LIMIT/g, limitMax)
                .replace(/#NAME/g, coin?.id?.toUpperCase());
        } else if (parseFloat(quantity) > parseFloat(availableCoin.amount)) {
            errorMessage = t('invalid_money_transfer').replace(/#NAME/g, coin?.id?.toUpperCase());
        }
        if (errorMessage) {
            showErrorToast(errorMessage);
            return;
        }

        const params = {
            fee: fee,
            currencyCode: coin.currencyCode,
            quantity: quantity,
        };

        showLoading();

        const res = await exchangeSell(params);
        if (res.status) {
            setIsShowConfirmPopup(true)
        }


    };

    const onConfirmCode = async (authenCode) => {
        let isValid = false;
        if (authenType === 'none') {
            isValid = true;
        } else {
            if (!isEmpty(authenCode)) {
                isValid = true;
            }
        }

        if (isValid) {
            setIsShowConfirmPopup(false);
            showLoading();

            const params = {
                fee: fee,
                currencyCode: coin.currencyCode,
                quantity: quantity,
                token: authenCode,
            };

            const res = await exchangeSellConfirm(params);
            if (res.status) {
                setIsShowPopupSuccessTransfer(true);
            }
        }
    };

    const onCloseModalSuccess = () => {
        NavigationService.navigate(Routes.HISTORY, { check: true }, getUserWallets(), setIsShowPopupSuccessTransfer(false));
    }

    const onBack = () => {
        NavigationService.navigate(Routes.HISTORY, { check: true }, getUserWallets(), setIsShowPopupSuccessTransfer(false));
    }


    const onChangeCode = (value) => {
        setAuthenCode(value);
    };

    const RenderInput = () => {
        if (authenType === 'none') {
            return null;
        } else {
            return (
                <View>
                    <Text style={styles.authenEmail}>{`${t('enter_email_authen_code')}:`}</Text>
                    <View style={[styles.inputContainer, { width: actuatedNormalize(264) }]}>
                        <View style={styles.leftContainer}>
                            <TextInput
                                placeholder={t('verification_code')}
                                style={styles.input}
                                clearButtonMode="while-editing"
                                placeholderTextColor={Colors.GREY}
                                onChangeText={onChangeCode}
                            />
                        </View>
                    </View>
                </View>
            )
        }
    }

    const renderBlueButton = () => {
        return (
            <BlueButton
                title={t('sell_now')}
                containerStyle={styles.buyButton}
                activeBackgroundColor={
                    quantity == '' ? Colors.DARK_GREY : Colors.RED
                }
                onPress={onSwap}
                disabled={quantity == '' ? true : false}
                name='exchange-alt'
            />
        )
    }

    return (
        <View style={styles.container}>
            <NavTitleBackHeader
                containerStyle={styles.navHeader}
                title={`${t('sell')} ${coin.id.toUpperCase()}`} />
            <KeyboardAwareScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.contentScrollContainer}>
                <View style={styles.viewTitle}>
                    <Text style={styles.textTitle}>{t('you_have')}</Text>
                    <Text style={styles.textTitle2}>
                        {formatCommaNumber(availableCoin.amount)} {coinId.toUpperCase()}
                    </Text>
                </View>

                <View style={styles.transactionContainer}>
                    <Text style={styles.title}>{t('quantity').toUpperCase()}</Text>
                    <TouchableX
                        style={styles.transactionContainer}
                        onPress={onSetAllAvailableCoinSell}>
                        <Text style={[styles.transactionText1, { color: Colors.BLUE }]}>
                            {t('maximum')}
                        </Text>
                    </TouchableX>
                </View>

                <RNInput3
                    coinName={`${coin.id.toUpperCase()}`}
                    placeholder={`Min = ${formatCommaNumber(limitMin)} ${coinId.toUpperCase()}, Max = ${formatCommaNumber(limitMax)} ${coinId.toUpperCase()}`}
                    placeholderTextColor={Colors.TEXT_INPUT}
                    keyboardType="decimal-pad"
                    value={quantity}
                    onChangeText={(value) => setQuantity(value)}
                />

                <View style={styles.fee}>
                    <View
                        style={[styles.leftContainer, { paddingLeft: 0 }]}>
                        <Text style={styles.feeTitle}>{`${t('sell_price').toUpperCase()}`}</Text>
                    </View>
                    <View style={[styles.rightContainer, { marginRight: 0 }]}>
                        <TextInput
                            style={[styles.input, { color: Colors.GREY }]}
                            placeholderTextColor={Colors.GREY}
                            value={`${formatCommaNumber(coinPrice)}`}
                            editable={false}
                        />
                        <Text
                            style={[
                                styles.rightButtonTitle,
                                { marginRight: 0, marginLeft: actuatedNormalize(5), color: '#7889B4' },
                            ]}>
                            VNDT
                        </Text>
                    </View>
                </View>

                <View style={[styles.fee]}>
                    <View style={[styles.leftContainer, { paddingTop: 0, paddingLeft: 0 }]}>
                        <Text style={styles.feeTitle}>{t('fee').toUpperCase()}</Text>
                    </View>
                    <View style={[styles.rightContainer1, { marginRight: 0 }]}>
                        <Text
                            style={[styles.input, { color: Colors.GREY, marginRight: 5 }]}
                            placeholderTextColor={Colors.GREY}
                            editable={false}>
                            {`${formatCommaNumber(fee)}`}
                        </Text>
                        <Text
                            style={[styles.rightButtonTitle, { marginRight: 0, color: '#7889B4' }]}>
                            {coinFeeName}
                        </Text>
                    </View>
                </View>

                <View style={{ marginTop: actuatedNormalize(20) }}>
                    <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
                        <View>
                            <Text style={[styles.receive, { fontFamily: FontFamily.TitilliumWeb.Regular, color: Colors.WHITE }]}>
                                {`${t('money_you_recevied')}:`}</Text>
                        </View>
                        <View>
                            <Text style={[styles.receive, { fontFamily: FontFamily.TitilliumWeb.SemiBold, marginLeft: actuatedNormalize(10), color: Colors.GREEN }]}>
                                {`${formatNumberFee((quantity) * (coinPrice))}`}
                            </Text>
                        </View>
                        <View>
                            <Text style={[styles.receive, { fontFamily: FontFamily.TitilliumWeb.SemiBold, color: Colors.GREEN, marginLeft: actuatedNormalize(10) }]}>VNDT</Text>
                        </View>
                    </View>
                </View>
                {renderBlueButton()}
            </KeyboardAwareScrollView >
            <Popup
                isVisible={isShowConfirmPopup}
                title={`${t('confirm_sell')} ${coinId.toUpperCase()}`}
                quantity={`${t('quantity')}:`}
                fee={`${t('fee')}:`}
                total={`${t('total')}:`}
                quantityCoin={`${formatCommaNumber(quantity)} ${coinId.toUpperCase()}`}
                feeCoin={`${formatCommaNumber(fee)} ${coinFeeName}`}
                totalCoin={`${formatNumberFee((quantity) * (coinPrice))} VNDT`}
                checkSwap={true}
                priceBuySell={`${formatCommaNumber(coinPrice)} VNDT`}
                textPriceBuySell={t('sell_price')}
                input={RenderInput()}
                bottomContainer={
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        <BlueButton
                            containerStyle={styles.confirmBtn}
                            title={t('confirm')}
                            onPress={() => { onConfirmCode(authenCode) }}
                        />
                    </View>
                }
                onCloseContainer={
                    <TouchableX
                        onPress={onCancel}
                        style={[styles.header,
                        {
                            justifyContent: 'flex-end',
                            paddingHorizontal: actuatedNormalize(15),
                            paddingVertical: actuatedNormalize(15)
                        }]}>
                        <Image source={ICO_CLOSE} style={styles.icon} />
                    </TouchableX>
                }
            />
            <PopUpSuccessTransfer
                isVisible={isShowPopupSuccessTransfer}
                onCloseContainer={
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{
                            justifyContent: 'flex-start',
                            paddingVertical: actuatedNormalize(10), marginBottom: actuatedNormalize(10)
                        }}>
                            <Text style={[styles.content, { fontSize: 16, color: Colors.LIGHT_GREY }]}>{`${t('completed')}`}</Text>
                        </View>
                        <TouchableX
                            onPress={onCloseModalSuccess}
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
                text1={t('transaction_sell_successful').replace(/#COIN/g, coinId.toUpperCase())}
                text2={`${t('quantity')}:`}
                text3={`${formatCommaNumber(quantity)} ${coinId.toUpperCase()}`}
                text4={`${t('sell_price')}:`}
                text5={`${formatCommaNumber(coinPrice)} VNDT`}
                text6={`${t('fee')}:`}
                text7={`${formatCommaNumber(fee)} ${coinFeeName}`}
                text8={`${t('money_you_recevied')}:`}
                text9={`${formatNumberFee((quantity) * (coinPrice))} VNDT`}
                title={t('history')}
                OnPress={onBack}
            />

        </View >
    );
};
