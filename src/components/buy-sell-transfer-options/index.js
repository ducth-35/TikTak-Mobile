import { Colors, FontFamily } from '@/themes';
import React from 'react';
import { View, Text } from 'react-native';

export const Permission = () => {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.PRIMARY}}>
            <Text style={{ textAlign: 'center', fontFamily: FontFamily.TitilliumWeb.SemiBold, color: Colors.GREY, fontSize: 14, paddingHorizontal: 20 }}>Bạn không có quyền truy cập mục này. Liên hệ quản trị viên để được cấp quyền !</Text>
        </View>
    )
}