import React, { useState, useEffect } from "react";
import { View, Text, TextInput } from "react-native";
import { styles } from "./styles";
import { NavTitleBackHeader, TouchableX } from "@/components";
import { useTranslation } from "@/hooks";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Routes, GENDER } from "@/common";
import { NavigationService } from "@/services";
import {
    Colors,
    actuatedNormalize,
    FontFamily,
} from "@/themes";
import dayjs from "dayjs";


export const ViewProfileScreen = ({ route }) => {
    const { t } = useTranslation();
    const [name, setName] = useState();
    const [genders, setGenders] = useState();
    const [nationalID, setNationalID] = useState();
    const [addresss, setAddresss] = useState();

    const firstName = route?.params.firstName;
    const lastName = route?.params.lastName;
    const gender = route?.params.gender;
    const national_id = route?.params.national_id;
    const birthday = route?.params.birthday;
    const address = route?.params.address;

    const sex = GENDER.find((item) => item.value === gender);

    useEffect(() => {
        if (typeof(firstName && national_id && address && lastName) === 'undefined') {
            setName(t('not_yet'));
            setNationalID(t('not_yet'));
            setAddresss(t('not_yet'));
        } else {
            setName(`${firstName} ${lastName}`);
            setNationalID(`${national_id}`);
            setAddresss(`${address}`);
        }
        if ((gender) === 0) {
           setGenders(t('other'));
        } else {  
            setGenders(t(`${sex.id}`));
        }
    })

    const onEdit = () => {
        let infor = {
            firstName: firstName,
            lastName: lastName,
            gender: gender,
            national_id: national_id,
            birthday: birthday,
            address: address
        }
        NavigationService.navigate(Routes.EDITPROFILE, infor)
    }

    return (
        <View style={styles.container}>
            <NavTitleBackHeader
                containerStyle={styles.navHeader}
                title={t('my_profile')}
                rightContainer={
                    <TouchableX onPress={onEdit}>
                        <FontAwesome5 name="edit" color="white" size={20} />
                    </TouchableX>
                }
            />
            <View style={{ paddingHorizontal: actuatedNormalize(15) }}>
                <Text style={styles.title}>{`${t('name_profile').toUpperCase()}:`}</Text>
                <View style={styles.inputContainer}>
                    <View style={styles.leftContainer}>
                        <TextInput
                            style={[styles.input]}
                            value={name}
                            editable={false}
                        />
                    </View>
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flexDirection: 'column', paddingRight: 5 }}>
                        <Text style={styles.title}>{`${t('gender').toUpperCase()}:`}</Text>
                        <View style={styles.inputContainer2}>
                            <Text style={{ color: Colors.WHITE, fontFamily: FontFamily.TitilliumWeb.SemiBold }}>{genders}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'column', paddingRight: 5 }}>
                        <Text style={styles.title}>{`${t('birthday').toUpperCase()}:`}</Text>
                        <View style={styles.inputContainer2}>
                            <Text style={{ color: Colors.WHITE, fontFamily: FontFamily.TitilliumWeb.SemiBold }}>{dayjs(birthday).format('DD/MM/YYYY')}</Text>
                        </View>
                    </View>
                </View>

                <Text style={styles.title}>{`${t('id_number').toUpperCase()}:`}</Text>
                <View style={styles.inputContainer}>
                    <View style={styles.leftContainer}>
                        <TextInput
                            style={[styles.input]}
                            value={nationalID}
                            editable={false}
                        />
                    </View>
                </View>

                <Text style={styles.title}>{`${t('address').toUpperCase()}:`}</Text>
                <View style={styles.inputContainer}>
                    <View style={styles.leftContainer}>
                        <TextInput
                            style={[styles.input]}
                            value={addresss}
                            editable={false}
                        />
                    </View>
                </View>
            </View>
        </View>
    )
}