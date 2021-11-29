import { Linking } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-community/async-storage';
import { t } from 'i18n-js';

class FirebaseService {
  constructor() {}

  setBackgroundMessageHandler = () => {
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      // console.log('Message handled in the background!', remoteMessage);
    });
  };

  requestUserPermission = async () => {
    const authorizationStatus = await messaging().requestPermission();

    if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
      // console.log('User has notification permissions enabled.');
      this.getDeviceToken();
    } else if (
      authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL
    ) {
      // console.log('User has provisional notification permissions.');
    } else {
      // console.log('User has notification permissions disabled');
      setTimeout(() => {
        alert(
          t('push_notification_permission_required'),
          [
            {
              text: t('ok'),
              onPress: () => {
                Linking.openSettings();
              },
            },
          ],
          { cancelable: true },
        );
      }, 100);
    }
  };

  getDeviceToken = async () => {
    try {
      const token = await messaging().getToken();
      // console.log('firebase token', token);

      if (token) {
        try {
          const savedToken = await AsyncStorage.getItem(FIREBASE_TOKEN);

          // console.log('savedToken', savedToken);

          if (savedToken) {
            const savedTokenString = JSON.parse(savedToken);
            // console.log('savedTokenString: ', savedTokenString);

            if (savedTokenString !== token) {
              AsyncStorage.setItem(FIREBASE_TOKEN, JSON.stringify(token));
            }
          } else {
            AsyncStorage.setItem(FIREBASE_TOKEN, JSON.stringify(token));
          }
        } catch (err) {
          // console.log('FIREBASE_TOKEN get error', err);
          AsyncStorage.setItem(FIREBASE_TOKEN, JSON.stringify(token));
        }
      }
    } catch (err) {
      // console.log('Get Firebase token error', err);
    }
  };
}

FirebaseService.shared = new FirebaseService();
export default FirebaseService;
