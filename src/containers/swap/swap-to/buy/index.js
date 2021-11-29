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
    RNInput2,
    RNInput3,
} from '@/components';
import { useAppContext, useTranslation } from '@/hooks';
import {
    ICO_CLOSE,
    showLoading,
    showSuccessToast,
    showErrorToast,
    Routes,
} from '@/common';
import { Colors, actuatedNormalize, FontFamily } from '@/themes';
import { formatCommaNumber, formatNumberFee, formatNumberBuy } from '@/utils';
import { NavigationService } from '@/services';

import styles from './styles';

export const BuyScreen = ({ route }) => {
    const { t } = useTranslation();
    const {
        getTransactionCoinFee,
        getCoinRates,
        getUserWallets,
        coinFee,
        coinRates,
        exchangeBuy,
        exchangeBuyConfirm,
        accountInfo,
        userWallets,
    } = useAppContext();

    const coin = route.params?.coin;
    const coinId = route.params?.coinId;

    const [quantity, setQuantity] = useState('');
    const [fee, setFee] = useState(0);
    const [feecoin, setFeeCoin] = useState();
    const [coinPrice, setCoinPrice] = useState(0);
    const [limitMin, setLimitMin] = useState(0);
    const [limitMax, setLimitMax] = useState(0);
    const [authenType, setAuthenType] = useState('none');
    const [availableCoin, setAvailableCoin] = useState(0);
    const [isShowConfirmPopup, setIsShowConfirmPopup] = useState(false);
    const [authenCode, setAuthenCode] = useState(null);
    const [namecoin, setNamecoin] = useState();
    const [amount, setAmount] = useState();
    const [rate, setRate] = useState();
    const [coinfee, setCoinFee] = useState();
    const [coinfeeusdt, setCoinFeeUSDT] = useState();
    const [rateeth, setRateETH] = useState();
    const [isShowPopupSuccessTransfer, setIsShowPopupSuccessTransfer] = useState();


    useEffect(() => {
        getTransactionCoinFee();
        getCoinRates();
        getUserWallets();
        getAvailableCoin();
        setAmount(getBalanceUSDT());
    }, []);

    useEffect(() => {
        setAuthenType(accountInfo?.authen_type);
    }, [accountInfo]);

    const getBalanceUSDT = () => {
        if (userWallets && isArray(userWallets)) {
            const usdtWallet = userWallets.find((item) => item.type === 'VNDT');
            if (usdtWallet) {
                return usdtWallet.amount;
            }
        }
        return 0;
    };


    useEffect(() => {
        if (coinRates) {
            const { rates } = coinRates;
            let rate = 0;

            if (coinRates) {
                rate = rates[`ask_${coin.id}`];
            }
            setCoinPrice(rate);
            setRate(rate);
        }

        if (coinFee) {
            const coin_fee = coinFee[`${coin.id}_fee`];
            setFee(coin_fee);
            setCoinFee(coin_fee);
            setFeeCoin(coin_fee);
        }
        if (coinRates) {
            const { limit } = coinRates;
            let mincoin = 0;
            let maxcoin = 0;
            if (coinRates) {
                mincoin = limit[`min_ask_${coin.id}`];
                maxcoin = limit[`max_ask_${coin.id}`];
            }
            setLimitMin(mincoin);
            setLimitMax(maxcoin);
        }
        if (coinRates, coinFee) {
            const { rates } = coinRates;
            const rate = rates[`ask_${coin.id}`];
            const rate_eth = rates[`ask_eth`];
            const coin_fee = coinFee[`${coin.id}_fee`];

            if (coinId === 'btc') {
                setNamecoin('VNDT')
                setFee(formatNumberFee((coin_fee) * (rate)))
            } else if (coinId === 'eth') {
                setNamecoin('VNDT')
                setFee(formatNumberFee((coin_fee) * (rate)))
            } else if (coinId === 'usdt') {
                setNamecoin('VNDT')
                setFee(formatNumberFee((coin_fee) * (rate_eth)))
            } else if (coinId === 'xrp') {
                setNamecoin('VNDT')
                setFee(formatNumberFee((coin_fee) * (rate)))
            } else if (coinId === 'xlm') {
                setNamecoin('VNDT')
                setFee(formatNumberFee((coin_fee) * (rate)))
            } else if (coinId === 'trx') {
                setNamecoin('VNDT')
                setFee(formatNumberFee((coin_fee) * (rate)))
            } else if (coinId === 'ufx') {
                setNamecoin('VNDT')
                setFee(formatNumberFee((coin_fee) * (rate)))
            } else if (coinId === 'xeng') {
                setNamecoin('VNDT')
                setFee(formatNumberFee((coin_fee) * (rate)))
            } else if (coinId === 'cent') {
                setNamecoin('VNDT')
                setFee(formatNumberFee((coin_fee) * (rate)))
            } else if (coinId === 'matic') {
                setNamecoin('VNDT')
                setFee(formatNumberFee((coin_fee) * (rate)))
            } else {
                setNamecoin(coin.id.toUpperCase())
            }
            setCoinFeeUSDT(rate_eth)
            setRateETH(rate_eth);
        }


    }, [coinFee, coinRates]);


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



    const onSetAllAvailableCoinBuy = () => {
        if (coinRates) {
            const { rates } = coinRates;
            const coin_fee = coinFee[`${coin.id}_fee`];
            const rate = rates[`ask_${coin.id}`];
            if (parseFloat((limitMin) * (rate) + (coinfee) * (rate)) > parseFloat(amount)) {
                showErrorToast(t('invalid_money_buy').replace(/#LIMIT/g, limitMin)
                    .replace(/#NAME/g, coin?.id?.toUpperCase()));
            } else if (coinId === 'usdt' || parseFloat((limitMin) * (rate) + (coinfee) * (coinfeeusdt)) > parseFloat(amount)) {
                showErrorToast(t('invalid_money_buy').replace(/#LIMIT/g, limitMin)
                    .replace(/#NAME/g, coin?.id?.toUpperCase()));
            } else {
                setQuantity(formatNumberBuy([(amount) - ((coin_fee) * (rate))] / (rate)))
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
        } else if (coinId === 'usdt' || isEmpty(quantity) || parseFloat((quantity) * (rate) + (coinfee) * (coinfeeusdt)) > parseFloat(amount)) {
            errorMessage = t('invalid_money').replace(/#NAME/g, 'VNDT');
        } else if (isEmpty(quantity) || parseFloat((quantity) * (rate) + (coinfee) * (rate)) > parseFloat(amount)) {
            errorMessage = t('invalid_money').replace(/#NAME/g, 'VNDT');
        }

        if (errorMessage) {
            showErrorToast(errorMessage);
            return;
        }

        const params = {
            fee: feecoin,
            currencyCode: coin.currencyCode,
            quantity: quantity,
        };

        showLoading();

        const res = await exchangeBuy(params);
        if (coinRates) {
            const { limit } = coinRates;
            let mincoin = 0;
            if (coinRates) {
                mincoin = limit[`min_ask_${coin.id}`];
                maxcoin = limit[`max_ask_${coin.id}`];
                if (coinId === 'eth') {
                    if (quantity < mincoin) {
                        showErrorToast(t('min_coin')
                            .replace(/#LIMIT/g, mincoin)
                            .replace(/#NAME/g, coinId.toUpperCase()))
                    }
                } else {
                    if (res.status) {
                        setIsShowConfirmPopup(true);
                    }
                }
            }
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
                fee: feecoin,
                currencyCode: coin.currencyCode,
                quantity: quantity,
                token: authenCode,
            };

            const res = await exchangeBuyConfirm(params);

            console.log(res)

            if (res.status) {
                setIsShowPopupSuccessTransfer(true);
            }
        }
    };

    const onChangeCode = (value) => {
        setAuthenCode(value);
    };

    const onCloseModalSuccess = () => {
        NavigationService.navigate(Routes.HISTORY, { check: true }, getUserWallets(), setIsShowPopupSuccessTransfer(false));
    }

    const onBack = () => {
        NavigationService.navigate(Routes.HISTORY, { check: true }, getUserWallets(), setIsShowPopupSuccessTransfer(false));
    }

    const RenderInput = () => {
        if (authenType === 'none') {
            return null;
        } else if (authenType === 'email') {
            return (
                <View>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={[styles.authenEmail, { color: '#F2F5FA' }]}>{`${t('authentication_code')} ${authenType.toUpperCase()}:`}</Text>
                    </View>
                    <View style={[styles.inputContainer, { width: actuatedNormalize(264) }]}>
                        <View style={styles.leftContainer}>
                            <TextInput
                                placeholder={`${t('verification_code')}${authenType.toUpperCase()} Authen...`}
                                style={styles.input}
                                clearButtonMode="while-editing"
                                placeholderTextColor={Colors.TEXT_INPUT}
                                onChangeText={onChangeCode}
                            />
                        </View>
                    </View>
                </View>
            )
        } else {
            return (
                <View>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={[styles.authenEmail, { color: '#F2F5FA' }]}>{`${t('authentication_code')} ${authenType.toUpperCase()} :`}</Text>
                    </View>
                    <View style={[styles.inputContainer, { width: actuatedNormalize(264) }]}>
                        <View style={styles.leftContainer}>
                            <TextInput
                                placeholder={`${t('verification_code')}${authenType.toUpperCase()} Authen...`}
                                style={styles.input}
                                clearButtonMode="while-editing"
                                placeholderTextColor={Colors.TEXT_INPUT}
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
                title={t('buy_now')}
                containerStyle={styles.buyButton}
                activeBackgroundColor={
                    quantity == '' ? Colors.DARK_GREY : Colors.BLUE
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
                title={`${t('buy')} ${coin.id.toUpperCase()}`} />
            <KeyboardAwareScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.contentScrollContainer}>
                <View style={styles.viewTitle}>
                    <Text style={styles.textTitle}>{t('you_have')}</Text>
                    <Text style={styles.textTitle2}>
                        {`${formatCommaNumber(amount)} VNDT`}
                    </Text>
                </View>

                <View style={styles.transactionContainer}>
                    <Text style={styles.title}>{t('quantity').toUpperCase()}</Text>
                    <TouchableX
                        style={styles.transactionContainer}
                        onPress={onSetAllAvailableCoinBuy}>
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
                        <Text style={styles.feeTitle}>{`${t('buy_price').toUpperCase()}`}</Text>
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
                            {namecoin}
                        </Text>
                    </View>
                </View>

                <View style={{ marginTop: actuatedNormalize(20) }}>
                    <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
                        <View>
                            <Text style={[styles.receive, { fontFamily: FontFamily.TitilliumWeb.Regular, color: Colors.WHITE }]}>
                                {`${t('total_money')}:`}</Text>
                        </View>
                        <View>
                            <Text style={[styles.receive, { fontFamily: FontFamily.TitilliumWeb.SemiBold, marginLeft: actuatedNormalize(10), color: Colors.GREEN }]}>
                                {`${coinId === 'usdt' ? formatNumberFee((quantity) * (rate) + (coinfee) * (coinfeeusdt)) : formatNumberFee((quantity) * (rate) + (coinfee) * (rate))}`}
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
                title={`${t('confirm_buy')} ${coinId.toUpperCase()}`}
                quantity={`${t('quantity')}:`}
                fee={`${t('fee')}:`}
                total={`${t('total_money')}:`}
                quantityCoin={`${formatCommaNumber(quantity)} ${coinId.toUpperCase()}`}
                feeCoin={`${formatCommaNumber(fee)} VNDT`}
                totalCoin={`${coinId === 'usdt' ? formatNumberFee((quantity) * (rate) + (coinfee) * (rateeth)) : formatNumberFee((quantity) * (rate) + (coinfee) * (rate))} VNDT`}
                checkSwap={true}
                priceBuySell={`${formatCommaNumber(coinPrice)} VNDT`}
                textPriceBuySell={t('buy_price')}
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
                text1={t('transaction_buy_successful').replace(/#COIN/g, coinId.toUpperCase())}
                text2={`${t('quantity')}:`}
                text3={`${formatCommaNumber(quantity)} ${coinId.toUpperCase()}`}
                text4={`${t('buy_price')}:`}
                text5={`${formatCommaNumber(coinPrice)} VNDT`}
                text6={`${t('fee')}:`}
                text7={`${formatCommaNumber(fee)} VNDT`}
                text8={`${t('total_money')}:`}
                text9={`${coinId === 'usdt' ? formatNumberFee((quantity) * (rate) + (coinfee) * (rateeth)) : formatNumberFee((quantity) * (rate) + (coinfee) * (rate))} VNDT`}
                title={t('history')}
                OnPress={onBack}
            />
        </View >
    );
};
