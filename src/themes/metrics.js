import { Dimensions, Platform, PixelRatio, StatusBar } from 'react-native';

const { width, height } = Dimensions.get('window');

// based on iphone 11's scale (design)
const scale = width / 414;

export const getWidth = () => {
  let width = Dimensions.get('window').width;
  width = width - 40
  return width / 8
}

export const actuatedNormalize = (size) => {
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
};
// check if devices is ipX, ipXS, ipXSMAx
const getPaddingTopByDevice = () => {
  let padTop = 0;
  if (Platform.OS === 'ios') {
    // check ipX, XS, XS max
    if (width === 812 || height === 812 || width === 896 || height === 896) {
      padTop = 24;
    }
  }
  return padTop;
};

// check if devices is ipX, ipXS, ipXSMAx
const getPaddingBottomByDevice = () => {
  let padBottom = 0;
  if (Platform.OS === 'ios') {
    // check ipX, XS, XS max
    if (width === 812 || height === 812 || width === 896 || height === 896) {
      padBottom = 25;
    }
  }
  return padBottom;
};

export const STATUSBAR_HEIGHT =
  Platform.OS === 'ios'
    ? 20 + getPaddingTopByDevice()
    : StatusBar.currentHeight;

//Custom header address book screen
export const STATUSBAR_HEIGHT_ADDRESS_BOOK =
  Platform.OS === 'ios'
    ? 10 + getPaddingTopByDevice()
    : StatusBar.currentHeight;

export const PADDING_BOTTOM = getPaddingBottomByDevice();

const Metrics = {
  screenWidth: width,
  screenHeight: height,
};
 



export default Metrics;
