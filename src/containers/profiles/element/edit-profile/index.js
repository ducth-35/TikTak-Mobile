import React, { useRef, useEffect, useState } from "react";
import { View, Text, TextInput, Image } from "react-native";
import { styles } from "./styles";
import { useTranslation, useAppContext } from "@/hooks";
import { NavTitleBackHeader, BlueButton, TouchableX, PopUpSuccess } from "@/components";
import { Colors, actuatedNormalize, FontFamily } from "@/themes";
import dayjs from "dayjs";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { GENDER, showErrorToast, showLoading, ICO_CLOSE, Routes } from "@/common";
import ActionSheet from "react-native-actionsheet";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { isEmpty } from "lodash";
import { NavigationService } from "@/services";

export const EditProfileScreen = ({ route }) => {
    const { t } = useTranslation();
    const { changeInfor, getAccountInfo } = useAppContext();

    const [firstname, setFirstname] = useState(null);
    const [lastname, setLastname] = useState(null);
    const [genderType, setGenderType] = useState(null);
    const [date, setDate] = useState(null);
    const [datePOST, setDatePOST] = useState(null);
    const [nationald, setNationalid] = useState(null);
    const [addresss, setAddresss] = useState(null);

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isShowSuccess, setIsShowSuccess] = useState(false);
    const actionSheetGender = useRef(null);


    const firstName = route?.params.firstName;
    const lastName = route?.params.lastName;
    const gender = route?.params.gender;
    const national_id = route?.params.national_id;
    const birthday = route?.params.birthday;
    const address = route?.params.address;

    useEffect(() => {
        const sex = GENDER.find((item) => item.value === gender);
        setGenderType(sex);

        if ((gender) === 0) {
            setGenderType(gender);
        }

        if (!isEmpty(birthday)) {
            setDate(dayjs(birthday).format('DD/MM/YYYY'));
        } else {
            setDate(dayjs(birthday).format('DD/MM/YYYY'));
            setDatePOST(Number(new Date(birthday).getTime()));
        }

        if (lastName && firstName && national_id && address) {
            setFirstname(firstName);
            setLastname(lastName);
            setNationalid(national_id);
            setAddresss(address);
        }
    }, [])

    const onShowGenders = () => {
        if (actionSheetGender) {
            actionSheetGender.current.show();
        }
    }

    const genderTypeOptions = [
        ...GENDER.map((item) => t(`${item.id}`)),
        t('cancel'),
    ];

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };
    const handleConfirm = (date) => {
        setDate(dayjs(date).format('DD/MM/YYYY'));
        setDatePOST(Number(new Date(date).getTime()))
        hideDatePicker();
    };

    const onSave = async () => {
        let errorMessage = null;
        if (isEmpty(firstname)) {
            errorMessage = t('invalid_firstname')
        } else if (isEmpty(lastname)) {
            errorMessage = t('invalid_lastname');
        } else if (isEmpty(nationald)) {
            errorMessage = t('invalid_nationalID')
        } else if (nationald.length < 9) {
            errorMessage = t('invalid_nationalID_length')
        } else if (isEmpty(addresss)) {
            errorMessage = t('invalid_addresss')
        } else if ((genderType) === 0) {
            errorMessage = t('invalid_gender')
        }

        if (errorMessage) {
            showErrorToast(errorMessage);
            return;
        } else {
            showLoading();
        }
        const params = {
            firstName: firstname,
            lastName: lastname,
            national_id: nationald,
            gender: genderType.value,
            birthday: datePOST,
            address: addresss
        }
        const res = await changeInfor(params);
        if (res) {
            NavigationService.navigate(Routes.HOME, setIsShowSuccess(true), getAccountInfo());
        }
    }

    const onCancelSuccess = () => {
        setIsShowSuccess(false);
    }


    return (
        <View style={styles.container}>
            <NavTitleBackHeader
                containerStyle={styles.navHeader}
                title={t('edit_information')}
            />
            <View style={{ paddingHorizontal: actuatedNormalize(15) }}>
                <Text style={styles.title}>{`${t('first_name').toUpperCase()}:`}</Text>
                <View style={styles.inputContainer}>
                    <View style={styles.leftContainer}>
                        <TextInput
                            style={styles.textInput}
                            placeholderTextColor={Colors.TEXT_INPUT}
                            onChangeText={(value) => setFirstname(value)}
                            value={firstname}
                        />
                    </View>
                </View>

                <Text style={styles.title}>{`${t('input_name').toUpperCase()}:`}</Text>
                <View style={styles.inputContainer}>
                    <View style={styles.leftContainer}>
                        <TextInput
                            style={styles.textInput}
                            placeholderTextColor={Colors.TEXT_INPUT}
                            onChangeText={(value) => setLastname(value)}
                            value={lastname}
                        />
                    </View>
                </View>

                <View style={{ flexDirection: 'row', marginTop: actuatedNormalize(15), marginBottom: actuatedNormalize(10) }}>
                    <Text style={{ flex: 1, color: Colors.WHITE, fontFamily: FontFamily.TitilliumWeb.Regular }}>{`${t('gender').toUpperCase()}:`}</Text>
                    <Text style={{ flex: 1, color: Colors.WHITE, fontFamily: FontFamily.TitilliumWeb.Regular }}>{`${t('birthday').toUpperCase()}:`}</Text>
                </View>
                <View style={styles.options}>
                    <TouchableX style={styles.gender} onPress={onShowGenders}>
                        <View style={styles.leftContainer} pointerEvents="none">
                            <TextInput style={{ fontFamily: FontFamily.TitilliumWeb.Regular, fontSize: actuatedNormalize(16), color: Colors.WHITE, marginLeft: 10 }}
                                placeholderTextColor={Colors.GREY}
                                editable={false}
                                value={genderType ? t(`${genderType.id}`) : ''}
                                onChangeText={(value) => setGenderType(value)}
                            />
                        </View>
                        <View style={styles.rightContainer}>
                            <FontAwesome5 name={'chevron-down'} color="white" size={12} />
                        </View>
                    </TouchableX>

                    <TouchableX style={styles.date} onPress={showDatePicker}>
                        <View style={styles.leftContainer} pointerEvents="none">
                            <TextInput style={{ fontFamily: FontFamily.TitilliumWeb.Regular, fontSize: actuatedNormalize(16), color: Colors.WHITE, marginLeft: 10 }}
                                placeholderTextColor={Colors.GREY}
                                editable={false}
                                value={date}
                                onChangeText={(value) => setDate(value)}
                            />
                        </View>
                        <View style={styles.rightContainer}>
                            <FontAwesome5 name={'chevron-down'} color="white" size={12} />
                        </View>
                    </TouchableX>
                    
                </View>

                <Text style={styles.title}>{`${t('id_number').toUpperCase()}:`}</Text>
                <View style={styles.inputContainer}>
                    <View style={styles.leftContainer}>
                        <TextInput
                            style={[styles.textInput]}
                            value={nationald}
                            keyboardType='decimal-pad'
                            maxLength={12}
                            onChangeText={(value) => setNationalid(value)}
                        />
                    </View>
                </View>

                <Text style={styles.title}>{`${t('address').toUpperCase()}:`}</Text>
                <View style={styles.inputContainer}>
                    <View style={styles.leftContainer}>
                        <TextInput
                            style={[styles.textInput]}
                            value={addresss}
                            onChangeText={(value) => setAddresss(value)}
                        />
                    </View>
                </View>

                <BlueButton
                    onPress={onSave}
                    title={t('confirm')}
                    activeBackgroundColor={Colors.GREEN}
                    containerStyle={{ marginTop: actuatedNormalize(30) }}
                />

            </View>
            <ActionSheet
                ref={actionSheetGender}
                options={genderTypeOptions}
                cancelButtonIndex={genderTypeOptions.length - 1}
                onPress={(index) => {
                    if (index !== genderTypeOptions.length - 1) {
                        const value = genderTypeOptions[index];
                        const condition = GENDER.find(
                            (item) => value === t(`${item.id}`),
                        );
                        if (condition) {
                            setGenderType(condition);
                        }
                    }
                }}
            />
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker} />
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
                text1={t('change_information')}
            />
        </View>
    )
}