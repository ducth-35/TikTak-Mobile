/**
 * @format
 */

import { AppRegistry } from 'react-native';
import CodePush from 'react-native-code-push';
import App from './App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () =>
    CodePush({
        updateDialog: {
            optionalInstallButtonLabel: 'Cài đặt',
            optionalIgnoreButtonLabel: 'Bỏ qua',
            title: 'Bản cập nhật mới !',
            optionalUpdateMessage: 'Bản cập nhật mới từ AC Wallet, bạn có muốn cài đặt ?'
        },
        installMode: CodePush.InstallMode.IMMEDIATE,
        checkFrequency: CodePush.CheckFrequency.ON_APP_START,
    })(App),
);