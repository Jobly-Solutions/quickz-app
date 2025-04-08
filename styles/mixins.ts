import { StatusBar, Dimensions, PixelRatio } from 'react-native'

const { width, height } = Dimensions.get('window');

const statusBarHeight = StatusBar.currentHeight || 0;

// const WINDOW_WIDTH = Dimensions.get('window').width;
// const guidelineBaseWidth = 375;

const screenWidth5 = 427//470//600//428
const screenHeight5 = 926 - statusBarHeight;

const guidelineBaseWidth = screenWidth5;
const guidelineBaseHeight = screenHeight5;

const scaleHorizontal = (size: number) => (width / guidelineBaseWidth) * size
const scaleVertical = (size: number) => (height / guidelineBaseHeight) * size
const scaleModerate = (size: number, factor = 0.5) =>
    size + (scaleHorizontal(size) - size) * factor

// figma
const scale = (size: number) => scaleModerate(size);//size * 0.78;

const scaleSize = (size: number) =>
    (width / guidelineBaseWidth) * size;

// const scaleFont = (size: number) =>
//     size * PixelRatio.getFontScale();
const scaleFont = (size: number) => scaleModerate(size)

const getPixelSize = (pixels: number): number =>
    PixelRatio.getPixelSizeForLayoutSize(pixels);

function dimensions(
    top: number,
    right = top,
    bottom = top,
    left = right,
    property: 'padding' | 'margin'
) {
    let styles: any = {};

    styles[`${property}Top`] = top;
    styles[`${property}Right`] = right;
    styles[`${property}Bottom`] = bottom;
    styles[`${property}Left`] = left;

    return styles;
}

function margin(
    top: number,
    right: number,
    bottom: number,
    left: number
) {
    return dimensions(top, right, bottom, left, 'margin');
}

function padding(
    top: number,
    right: number,
    bottom: number,
    left: number
) {
    return dimensions(top, right, bottom, left, 'padding');
}

function boxShadow(
    color: string,
    offset = { height: 2, width: 2 },
    radius = 8,
    opacity = 0.2
) {
    return {
        shadowColor: color,
        shadowOffset: offset,
        shadowOpacity: opacity,
        shadowRadius: radius,
        elevation: radius,
    };
}

const TEXT_CENTER = {
    height: '100%',
    textAlign: 'center',
    textAlignVertical: 'center',
    includeFontPadding: false,
};

export { scaleSize, scaleFont, scale, getPixelSize, margin, padding, boxShadow, TEXT_CENTER, scaleHorizontal, scaleVertical, scaleModerate, statusBarHeight, screenWidth5, screenHeight5, guidelineBaseWidth, guidelineBaseHeight, width, height, PixelRatio, Dimensions, StatusBar };