// Based on https://github.com/styled-components/styled-theming

import { Interpolation } from '@emotion/styled'

type ThemeValueResult = Interpolation
type ThemeValueFn = (props: object) => ThemeValueResult
type ThemeValue = ThemeValueFn | ThemeValueResult

interface ThemeMap {
  [key: string]: ThemeValue
}

interface VariantMap {
  [key: string]: ThemeMap
}

type ThemeSet = (props: object) => string
type VariantSet = (props: object) => string

function getThemeValue(name: string, props: any, values: ThemeMap) {
  var value = props.theme && props.theme[name]

  var themeValue

  if (typeof value === 'function') {
    themeValue = value(values)
  } else {
    themeValue = values[value]
  }

  if (typeof themeValue === 'function') {
    return themeValue(props)
  } else {
    return themeValue
  }
}

export function theme(name: string, values: ThemeMap): ThemeSet {
  return function(props) {
    return getThemeValue(name, props, values)
  }
}

export function variants(
  name: string,
  prop: string,
  values: VariantMap
): VariantSet {
  return function(props: { [key: string]: any }) {
    var variant = props[prop] && values[props[prop]]
    return variant && getThemeValue(name, props, variant)
  }
}
