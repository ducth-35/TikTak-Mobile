// import { PermissionsAndroid, Platform, Alert } from 'react-native';
// import { readFile, DocumentDirectoryPath } from 'react-native-fs';
// import XLSX from 'xlsx';

export const Upload = async () => {
//     if (Platform.OS === 'ios') {
//         uploadfile();
//     } else {
//         try {
//             const grandted = await PermissionsAndroid.request(
//                 PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
//                 {
//                     title: 'Yêu cầu quyền đọc dữ liệu.',
//                     message: 'Ứng dụng cần quyền truy cập vào bộ nhớ của bạn để tải lên tệp',
//                 }
//             );
//             if (grandted === PermissionsAndroid.RESULTS.GRANTED) {
//                 uploadfile();
//             } else {
//                 // If permission denied then show alert
//                 alert('Quyền đọc không được cấp.');
//             }
//         } catch (error) {
//             // To handle permission related exception
//             console.warn(err);
//         }
//     }
// }

// const uploadfile = () => {

//     const DDP = DocumentDirectoryPath + "/";

//     Alert.alert("Rename file to sheetjs.xlsx", "Copy to " + DDP, [
//         { text: 'Cancel', onPress: () => { }, style: 'cancel' },
//         {
//             text: 'Import', onPress: () => {
//                 readFile(DDP + "sheetjs.xlsx", 'ascii').then((res) => {
//                     /* parse file */
//                     const wb = XLSX.read(input(res), { type: 'binary' });

//                     /* convert first worksheet to AOA */
//                     const wsname = wb.SheetNames[0];
//                     const ws = wb.Sheets[wsname];
//                     const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
                
//                     console.log(data, "Đây là data của Excel")

//                     // /* update state */
//                     // this.setState({ data: data, cols: make_cols(ws['!ref']), widthArr: make_width(ws['!ref']) });
//                 }).catch((err) => { Alert.alert("importFile Error", "Error " + err.message); });
//             }
//         }
//     ]);
}