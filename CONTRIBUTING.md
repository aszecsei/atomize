# Contributing to Atomize

Thank you for considering contributing to atomize! Anything you can do to help is much appreciated. If you have any questions
or concerns, feel free to [send an email](mailto:aszecsei@gmail.com).

## Code of Conduct

Everyone is subject to the [code of conduct](https://github.com/aszecsei/atomize/blob/master/CODE_OF_CONDUCT.md).

## How Can I Contribute?

Plenty of ways!

### Reporting Bugs

If you encounter a bug, please create create an issue! Including what you were doing and any logs at the time will be
_massively_ appreciated (and help us track down those bugs faster!)

### Suggesting Enhancements

Feel free to open an issue with the `enhancement` label!

### Your First Code Contribution

Check out the [good first issue](https://github.com/aszecsei/atomize/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22)
and [help wanted](https://github.com/aszecsei/atomize/issues?q=is%3Aopen+is%3Aissue+label%3A%22help+wanted%22) labels! These
are good places to jump into the codebase.

### Pull Requests

We welcome pull requests! Just follow the pull request template, and we'll take a look. Once we're reasonably sure it won't break
anything unexpected, we'll merge it in!

## Testing

Most testing uses Jest. Please write Jest examples and/or snapshot tests as appropriate for new code you create.

## Coding Conventions

### TypeScript Styleguide

Most formatting is done using `prettier`. Before submitting a pull request, please run the `pretty` npm script
to automatically format your code.

- Indent using two spaces (soft tabs)
- Do not include semicolons unless necessary
- Prefer using single quotes
- Include trailing commas where possible
- Keep CSS styling in re-usable, modular components

### Writing Tests

`describe` refers to a noun or concept. `it` should refer to an action.

Example:

```typescript
describe('the theme function', () => {
  const fn = theme('mode', { light: '#fff', dark: '#000' })

  it('creates a function that returns a matching prop when passed a string', () => {
    expect(fn({ theme: { mode: 'light' } })).toBe('#fff')
    expect(fn({ theme: { mode: 'dark' } })).toBe('#000')
  })

  it('creates a function that returns the result of a passed function', () => {
    expect(fn({ theme: { mode: (themes: any) => themes.light } })).toBe('#fff')
    expect(fn({ theme: { mode: (themes: any) => themes.dark } })).toBe('#000')
  })
})
```
