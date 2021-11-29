import React, { useState, useEffect } from "react";
import { Text, View, Image } from "react-native";
import { styles } from './styles';
import { useTranslation, useAppContext } from '@/hooks';
import {
    STATUS_VERRIFI,
    RANK,
    ICO_QUES_BLACK,
    ICO_CLOSE,
} from '@/common'
import { Colors, actuatedNormalize, FontFamily } from '@/themes';
import { TouchableX } from '@/components';
import { formatNumberFee } from '@/utils';
import Modal from 'react-native-modal';

export const renderVerify = () => {
    const { accountInfo } = useAppContext();
    const { t } = useTranslation();

    const status = STATUS_VERRIFI.find((item) => item.id === accountInfo?.verification);

    return (
        <View style={[styles.container, { backgroundColor: status.color }]}>
            <View style={styles.view}>
                <Image style={styles.image} source={status.icon} />
                <Text style={styles.text}>{t(`${status.id}`).toUpperCase()}</Text>
            </View>
        </View>
    )
}

export const renderVip = () => {
    const { t } = useTranslation();
    const [showModal, setShowModal] = useState(false);
    const { getWithdrawLimitedInfo, accountInfo } = useAppContext();
    const [withdrawed, setWithdrawed] = useState();
    const [limit, setLimit] = useState();
    const [commission, setCommission] = useState();
    const [level, setLevel] = useState();

    const rank = RANK.find((item) => item.id === accountInfo?.permission)

    useEffect(() => {
        if (rank) {
            setLevel(rank.value);
        }
    });
    const RankStart = () => {
        switch (rank.id) {
            case 'security':
                return (
                    <>
                        <Image source={rank.star} style={styles.image} />
                        <Image source={rank.star} style={styles.image} />
                    </>
                )
            case 'vip':
                return (
                    <>
                        <Image source={rank.star} style={styles.image} />
                        <Image source={rank.star} style={styles.image} />
                        <Image source={rank.star} style={styles.image} />
                    </>
                )
            case 'supervip':
                return (
                    <>
                        <Image source={rank.star} style={styles.image} />
                        <Image source={rank.star} style={styles.image} />
                        <Image source={rank.star} style={styles.image} />
                        <Image source={rank.star} style={styles.image} />
                    </>
                )
            case 'special':
                return (
                    <>
                        <Image source={rank.star} style={styles.image} />
                        <Image source={rank.star} style={styles.image} />
                        <Image source={rank.star} style={styles.image} />
                        <Image source={rank.star} style={styles.image} />
                        <Image source={rank.star} style={styles.image} />
                    </>
                )
            default:
                return (
                    <Image source={rank.star} style={styles.image} />
                )
        }
    }

    const onShowPopUp = () => {
        setShowModal(true)
    }
    const closeModal = () => {
        setShowModal(false)
    }
    useEffect(() => {
        fetchData();
    })
    const fetchData = async () => {
        const params = {};
        const res = await getWithdrawLimitedInfo(params);
        setWithdrawed(res.data?.withdrawed);
        setLimit(res.data?.limit);
        setCommission(res.data?.commission);
    }

    const renderVipStar = () => {
        return (
            <View style={{ flexDirection: 'row'}}>
                <View style={{ justifyContent: 'center', flexDirection: 'row'}}>
                    {RankStart()}
                </View>
                <View style={{ justifyContent: 'center' }}>
                    <Text style={{ color: Colors.WHITE, fontFamily: FontFamily.TitilliumWeb.SemiBold }}>{rank.value}</Text>
                </View>
                <TouchableX onPress={onShowPopUp} style={{ justifyContent: 'center' }}>
                    <Image source={ICO_QUES_BLACK} style={[styles.image, { marginLeft: actuatedNormalize(8) }]} />
                </TouchableX>
            </View>
        )
    }

    const renderModal = () => {
        return (
            <Modal isVisible={showModal}>
                <View style={styles.modalContent}>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', }}>
                        <TouchableX
                            onPress={closeModal}
                            style={{
                                paddingHorizontal: actuatedNormalize(15),
                                paddingVertical: actuatedNormalize(15)
                            }}>
                            <Image source={ICO_CLOSE} style={{ width: 10, height: 10 }} />
                        </TouchableX>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={styles.popupTitle}>{`${t('level_benefits')}${level}`}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <Text style={styles.popupMessage}>{t('limit_24h')}</Text>
                        <Text style={[styles.popupMessage, { marginLeft: actuatedNormalize(8), color: Colors.BLUE }]}>{formatNumberFee(withdrawed)}</Text>
                        <Text style={[styles.popupMessage, { color: Colors.BLUE }]}>/</Text>
                        <Text style={[styles.popupMessage, { color: Colors.BLUE }]}>{`${formatNumberFee(limit)} VNDT`}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: actuatedNormalize(20) }}>
                        <Text style={styles.popupMessage}>{t('commission')}</Text>
                        <Text style={[styles.popupMessage, { color: Colors.RED, fontFamily: FontFamily.TitilliumWeb.SemiBold, marginLeft: actuatedNormalize(8) }]}>{`${commission} %`}</Text>
                    </View>
                </View>
            </Modal>
        )
    }
    return (
        <View style={{ marginTop: actuatedNormalize(10), marginBottom: actuatedNormalize(10) }}>
            {renderVipStar()}
            {renderModal()}
        </View>
    )
}


