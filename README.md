# Acrool Icon Symbols CLI

<p align="center">
   Pull acrool icon symbols to project cli
</p>

<div align="center">


[![NPM](https://img.shields.io/npm/v/@acrool/svg-symbols.svg?style=for-the-badge)](https://www.npmjs.com/package/@acrool/icon-symbols-cli)
[![npm](https://img.shields.io/bundlejs/size/@acrool/svg-symbols?style=for-the-badge)](https://github.com/acrool/@acrool/icon-symbols-cli/blob/main/LICENSE)
[![npm](https://img.shields.io/npm/l/@acrool/svg-symbols?style=for-the-badge)](https://github.com/acrool/icon-symbols-cli/blob/main/LICENSE)

[![npm downloads](https://img.shields.io/npm/dm/@acrool/icon-symbols-cli.svg?style=for-the-badge)](https://www.npmjs.com/package/@acrool/svg-symbols)
[![npm](https://img.shields.io/npm/dt/@acrool/svg-symbols.svg?style=for-the-badge)](https://www.npmjs.com/package/@acrool/icon-symbols-cli)

</div>

## Features

- Merge svg into svg symbols
- unpack svg symbols into individual svg
- Parse SVG content


## Install

```bash
yarn add @acrool/icon-symbols
```

## Use

add to project root `.acrool-svg-symbols`

```ts
module.exports = {
    token: 'im',
    id: 'xxxx',
    path: 'src/library/acrool-react-icon/SvgSymbol.tsx',
};
```

run pull

```aiignore
npx acrool-icon-symbols-cli pull
```


## Build

```bash
yarn build && npx acrool-icon-symbols-cli pull
```

## License

MIT © [Acrool](https://github.com/acrool) & [Imagine](https://github.com/imagine10255)
