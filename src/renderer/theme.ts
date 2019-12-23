import { theme } from './emotion-theming'
import { darken, lighten } from 'polished'

export const colors = {
  navy: '#001f3f',
  blue: '#0074D9',
  aqua: '#7FDBFF',
  teal: '#39CCCC',
  olive: '#3D9970',
  green: '#2ECC40',
  lime: '#01FF70',
  yellow: '#FFDC00',
  orange: '#FF851B',
  red: '#FF4136',
  maroon: '#85144b',
  fuchsia: '#F012BE',
  purple: '#B10DC9',
  black: '#111111',
  gray: '#AAAAAA',
  silver: '#DDDDDD',
  white: '#FFFFFF',
}

export const fontWeights = {
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
}

export const themeValues = {
  headerPrimary: theme('mode', {
    dark: colors.white,
    light: colors.black,
  }),
  headerSecondary: theme('mode', {
    dark: darken(0.1, colors.white),
    light: lighten(0.1, colors.black),
  }),
  textNormal: theme('mode', {
    dark: colors.silver,
    light: colors.gray,
  }),
  textMuted: theme('mode', {
    dark: darken(0.4, colors.silver),
    light: lighten(0.2, colors.gray),
  }),
  textLink: theme('mode', {
    dark: colors.blue,
    light: colors.blue,
  }),
  font:
    "'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'",

  backgroundPrimary: theme('mode', {
    dark: lighten(0.2, colors.black),
    light: darken(0.2, colors.white),
  }),
  backgroundSecondary: theme('mode', {
    dark: lighten(0.1, colors.black),
    light: darken(0.1, colors.white),
  }),
  backgroundTertiary: theme('mode', {
    dark: colors.black,
    light: colors.white,
  }),
  backgroundModifierSelected: theme('mode', {
    dark: 'rgba(79,84,92,0.32)',
    light: 'rgba(176,171,163,0.32)',
  }),

  elevationLow:
    '0 1px 0 rgba(4,4,5,0.2),0 1.5px 0 rgba(6,6,7,0.05),0 2px 0 rgba(4,4,5,0.05);',
  elevationHigh: '0 8px 16px rgba(0,0,0,0.24);',
}
