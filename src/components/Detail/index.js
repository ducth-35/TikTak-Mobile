import React from 'react';
import { View, Text, TextInput } from 'react-native';
import styles from './styles';
import { Colors, actuatedNormalize } from '@/themes';
import { useTranslation } from '@/hooks'
import { formatNumberFee } from '@/utils';

export const Detail = ({ lender, grantee, quota, quantityused, created, button, status, interest }) => {
  const { t } = useTranslation();
  return (
    <View style={{ paddingHorizontal: actuatedNormalize(15) }}>
      <Text style={styles.title}>{(`${t('lender')}:`).toUpperCase()}</Text>
      <View
        style={[styles.inputContainer]}>
        <View style={styles.leftContainer}>
          <TextInput
            style={[styles.input]}
            value={lender}
            editable={false}
          />
        </View>
      </View>

      <Text style={styles.title}>{`${t('grantee').toUpperCase()}:`}</Text>
      <View
        style={[styles.inputContainer]}>
        <View style={styles.leftContainer}>
          <TextInput
            style={[styles.input]}
            value={grantee}
            editable={false}
          />
        </View>
      </View>

      <Text style={styles.title}>{`${t('quota').toUpperCase()}:`}</Text>
      <View style={styles.inputContainer}>
        <View style={styles.leftContainer}>
          <TextInput
            style={styles.input}
            placeholderTextColor={Colors.TEXT_INPUT}
            value={quota}
            editable={false}
          />
        </View>
        <View style={styles.rightContainer}>
          <Text style={styles.rightButtonTitle}> VNDT </Text>
        </View>
      </View>

      <Text style={styles.title}>{`${t('quantity_used').toUpperCase()}:`}</Text>
      <View style={styles.inputContainer}>
        <View style={styles.leftContainer}>
          <TextInput
            style={styles.input}
            placeholderTextColor={Colors.TEXT_INPUT}
            value={formatNumberFee(quantityused)}
            editable={false}
          />
        </View>
        <View style={styles.rightContainer}>
          <Text style={styles.rightButtonTitle}> VNDT </Text>
        </View>
      </View>

      <Text style={styles.title}>{`${t('grant_date').toUpperCase()}:`}</Text>
      <View
        style={[styles.inputContainer]}>
        <View style={styles.leftContainer}>
          <TextInput
            style={[styles.input]}
            value={created}
            editable={false}
          />
        </View>
      </View>
      <Text style={styles.title}>{`${t('interest_rate_per_day').toUpperCase()}( % ):`}</Text>
      {interest}
      <Text style={styles.title}>{`${t('status').toUpperCase()}:`}</Text>
      {status}

      {button}
    </View>
  );
}

