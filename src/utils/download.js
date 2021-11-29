import { EXCEL_PATH, showSuccessToast, showDownload } from '@/common';
import { PermissionsAndroid, Platform } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

export const CheckPermission = async () => {
    if (Platform.OS === 'ios') {
        dowloadImage();
    } else {
        try {
            const grandted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                    title: 'Yêu cầu quyền lưu trữ.',
                    message: 'Ứng dụng cần quyền truy cập vào bộ nhớ của bạn để tải xuống file.',
                }
            );
            if (grandted === PermissionsAndroid.RESULTS.GRANTED) { 
                dowloadImage();
            } else {
                // If permission denied then show alert
                alert('Quyền lưu trữ không được cấp.');
            }
        } catch (error) {
            // To handle permission related exception
            console.warn(err);
        }
    }
}

const dowloadImage = () => {
    let file_URL = EXCEL_PATH;
    let ext = getExtention(file_URL);
    ext = '.' + ext[0];
    const { config, fs } = RNFetchBlob;
    let PictureDir = fs.dirs.PictureDir;
    let options = {
        fileCache: true,
        addAndroidDownloads: {
            // Related to the Android only
            useDownloadManager: true,
            notification: true,
            path:
                PictureDir +
                '/excel-form' +
                ext,
            description: 'excel-form',
        },
    };
    config(options)
        .fetch('GET', file_URL)
        .then(res => {
            showSuccessToast('Tải xuống thành công tệp !');
        });
    showDownload('Đang tải xuống tập tin...');
}
const getExtention = filename => {
    return /[.]/.exec(filename) ?
        /[^.]+$/.exec(filename) : undefined;
}