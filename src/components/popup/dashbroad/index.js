import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import { styles } from './styles';

import Modal from 'react-native-modal';
import { Colors, actuatedNormalize } from '@/themes';
import { ICO_CLOSE } from '@/common';
import { TouchableX } from '@/components';

export const PopupExchange = ({ isVisible, onClose, title }) => {
    return (
        <Modal 
        isVisible={isVisible}>
            <View style={styles.modalContent}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{
                        justifyContent: 'flex-start',
                        paddingVertical: actuatedNormalize(10), 
                        marginBottom: actuatedNormalize(10),
                        flexDirection: 'row'
                    }}>
                        <Text style={[styles.content, { fontSize: 16, color: Colors.LIGHT_GREY }]}>{title}</Text>
                    </View>
                    <TouchableX
                        onPress={onClose}
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
            </View>
        </Modal>
    )
}