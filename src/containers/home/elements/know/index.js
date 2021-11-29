import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useTranslation } from '@/hooks';
import styles from './styles';
import { Colors, FontFamily } from '@/themes';
import { TouchableX } from '@/components';

export const Know = () => {
  const { t } = useTranslation();

  const onTermConditions = () => {

  }

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.title}>Bạn có biết ?</Text>
      </View>
      <View style={styles.viewContainer}>
        <Text style={{ color: '#007bff', fontSize: 12, fontFamily: FontFamily.TitilliumWeb.SemiBold, padding: 10 }}> Cách giữ tài khoản của bạn an toàn ? </Text>
        <View>
          <Text style={{ color: '#212529', fontSize: 12, fontFamily: FontFamily.TitilliumWeb.SemiBold, padding: 10 }} > Tạo một mật khẩu mạnh </Text>
          <View style={{ marginLeft: 30 }}>
            <Text style={styles.text}>- Làm cho mật khẩu của bạn dài. </Text>
            <Text style={styles.text}>- Sử dụng CHỮ HOA và chữ thường. </Text>
            <Text style={styles.text}>- Sử dụng số và ký hiệu </Text>
            <Text style={styles.text}>- Sử dụng một từ không có trong bất kỳ từ điển nào, hoặc thậm chí không phải là một từ.</Text>
            <Text style={styles.text}>- Đừng dùng bất cứ thứ gì mà những người gần gũi với bạn có thể đoán được. </Text>
            <TouchableX onPress={onTermConditions}>
              <Text style={styles.changePass}> Thay đổi mật khẩu của bạn </Text>
            </TouchableX>
          </View>
        </View>
        <View>
          <Text style={{ color: '#212529', fontSize: 12, fontFamily: FontFamily.TitilliumWeb.SemiBold, padding: 10 }} > Sử dụng xác thực hai bước: </Text>
          <View style={{ marginLeft: 30, marginBottom: 10 }}>
            <Text style={styles.text}>- Xác thực hai bước qua Số điện thoại. </Text>
            <Text style={styles.text}>- Xác thực hai bước qua email. </Text>
            <Text style={styles.text}>- Xác thực hai bước sử dụng Google Authenticator. </Text>
            <TouchableX onPress={onTermConditions}>
              <Text style={styles.changePass}> Kích hoạt xác thực hai bước </Text>
            </TouchableX>
          </View>
        </View>
      </View>
    </View>
  );
};
