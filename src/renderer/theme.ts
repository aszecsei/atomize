import { theme } from './emotion-theming'
import { darken, lighten, rgba, hsla } from 'polished'

export const colors = {
  navy: '#001f3f',
  blue: '#007bff',
  aqua: '#7FDBFF',
  teal: '#39CCCC',
  olive: '#3D9970',
  green: '#28a745',
  lime: '#01FF70',
  yellow: '#FFDC00',
  orange: '#FF851B',
  red: '#f04747',
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
    dark: darken(0.2, colors.white),
    light: lighten(0.2, colors.black),
  }),
  textNormal: theme('mode', {
    dark: colors.silver,
    light: colors.gray,
  }),
  textMuted: theme('mode', {
    dark: darken(0.2, colors.silver),
    light: lighten(0.2, colors.gray),
  }),
  textLink: theme('mode', {
    dark: lighten(0.2, colors.blue),
    light: darken(0.2, colors.blue),
  }),
  channelsDefault: '#8e9297',
  interactiveNormal: '#b9bbbe',
  interactiveHover: '#dcddde',
  interactiveActive: '#fff',
  interactiveMuted: '#4f545c',
  font:
    "'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'",
  headerFont:
    "'Raleway', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'",
  monospaceFont: 'monospace',

  backgroundPrimary: theme('mode', {
    dark: lighten(0.13, colors.black),
    light: darken(0.13, colors.white),
  }),
  backgroundSecondary: theme('mode', {
    dark: lighten(0.1, colors.black),
    light: darken(0.1, colors.white),
  }),
  backgroundTertiary: theme('mode', {
    dark: colors.black,
    light: colors.white,
  }),
  channelTextAreaBackground: theme('mode', {
    dark: lighten(0.2, colors.black),
    light: darken(0.2, colors.white),
  }),
  backgroundFloating: theme('mode', {
    dark: '#18191c',
    light: '#18191c',
  }),

  backgroundModifierHover: theme('mode', {
    dark: rgba(79, 84, 92, 0.16),
    light: rgba(176, 171, 163, 0.16),
  }),
  backgroundModifierActive: theme('mode', {
    dark: rgba(79, 84, 92, 0.24),
    light: rgba(176, 171, 163, 0.24),
  }),
  backgroundModifierSelected: theme('mode', {
    dark: rgba(79, 84, 92, 0.32),
    light: rgba(176, 171, 163, 0.32),
  }),
  backgroundModifierAccent: theme('mode', {
    dark: hsla(0, 0, 100, 0.06),
    light: hsla(0, 0, 0, 0.06),
  }),

  colorPrimary: rgba(107, 109, 210, 1),
  colorLink: colors.blue,
  colorInfo: colors.aqua,
  colorSuccess: colors.green,
  colorWarning: colors.yellow,
  colorDanger: colors.red,

  elevationLow:
    '0 1px 0 rgba(4,4,5,0.2),0 1.5px 0 rgba(6,6,7,0.05),0 2px 0 rgba(4,4,5,0.05);',
  elevationHigh: '0 8px 16px rgba(0,0,0,0.24);',

  messagePadding: theme('size', {
    cozy: '20px 40px',
    compact: '10px 20px',
  }),
}
