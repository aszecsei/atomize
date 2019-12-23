import { theme, variants } from './emotion-theming'

describe('theme()', () => {
  const fn = theme('mode', { light: '#fff', dark: '#000' })

  it('should create a function that returns a matching prop when passed a string', () => {
    expect(fn({ theme: { mode: 'light' } })).toBe('#fff')
    expect(fn({ theme: { mode: 'dark' } })).toBe('#000')
  })

  it('should create a function that returns calls a passed function', () => {
    expect(fn({ theme: { mode: (themes: any) => themes.light } })).toBe('#fff')
    expect(fn({ theme: { mode: (themes: any) => themes.dark } })).toBe('#000')
  })
})

describe('variants()', () => {
  const fn = variants('mode', 'kind', {
    default: { light: '#fff', dark: '#000' },
    fancy: { light: '#f0f', dark: '#0f0' },
  })

  it('should create a function that returns a matching prop when passed a string', () => {
    expect(fn({ kind: 'default', theme: { mode: 'light' } })).toBe('#fff')
    expect(fn({ kind: 'default', theme: { mode: 'dark' } })).toBe('#000')
    expect(fn({ kind: 'fancy', theme: { mode: 'light' } })).toBe('#f0f')
    expect(fn({ kind: 'fancy', theme: { mode: 'dark' } })).toBe('#0f0')
  })

  it('should create a function that returns calls a passed function', () => {
    expect(
      fn({ kind: 'default', theme: { mode: (themes: any) => themes.light } })
    ).toBe('#fff')
    expect(
      fn({ kind: 'default', theme: { mode: (themes: any) => themes.dark } })
    ).toBe('#000')
    expect(
      fn({ kind: 'fancy', theme: { mode: (themes: any) => themes.light } })
    ).toBe('#f0f')
    expect(
      fn({ kind: 'fancy', theme: { mode: (themes: any) => themes.dark } })
    ).toBe('#0f0')
  })
})
