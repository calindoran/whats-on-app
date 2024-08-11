import { Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')
const dimensions = {
  width,
  height,
}

const tintColorLight = '#2f95dc'
const tintColorDark = '#fff'
const colorPalette = {
  main: {
    color_primary: '#073327',
    color_secondary: '#00D19A',
    color_light_gray: '#E0E0E0',
    color_gray: '#6D6D6D',
    color_white: '#fff',
  },
  light: {
    text: '#000',
    background: '#fff',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#fff',
    background: '#000',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
  },
}

export default { colorPalette, dimensions }
