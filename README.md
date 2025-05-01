# Acrool Icon Symbols CLI

<img src="https://raw.githubusercontent.com/acrool/acrool-icon-symbols-cli/main/public/og.webp" alt="Acrool Icon Symbols CLI Logo"/>

<p align="center">
   Sync acrool icon symbols to your project with a single command.
   Quickly pull and synchronize icon-symbols from acrool without manual downloading, unzipping and copying files.
</p>

<div align="center">


[![NPM](https://img.shields.io/npm/v/@acrool/icon-symbols-cli.svg?style=for-the-badge)](https://www.npmjs.com/package/@acrool/icon-symbols-cli)
[![npm](https://img.shields.io/bundlejs/size/@acrool/icon-symbols-cli?style=for-the-badge)](https://github.com/acrool/@acrool/icon-symbols-cli/blob/main/LICENSE)
[![npm](https://img.shields.io/npm/l/@acrool/icon-symbols-cli?style=for-the-badge)](https://github.com/acrool/icon-symbols-cli/blob/main/LICENSE)

[![npm downloads](https://img.shields.io/npm/dm/@acrool/icon-symbols-cli.svg?style=for-the-badge)](https://www.npmjs.com/package/@acrool/icon-symbols-cli)
[![npm](https://img.shields.io/npm/dt/@acrool/icon-symbols-cli.svg?style=for-the-badge)](https://www.npmjs.com/package/@acrool/icon-symbols-cli)

</div>

## Features

- Quick synchronization with acrool/icon-symbols

## Install

```bash
yarn add @acrool/icon-symbols-cli
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


your can add in your package.json

```json
{
  "scripts": {
    "dev": "next dev",
    "icon:pull": "acrool-icon-symbols-cli pull"
  }
}
```


## Build

```bash
yarn build && npx acrool-icon-symbols-cli pull
```

## License

MIT © [Acrool](https://github.com/acrool) & [Imagine](https://github.com/imagine10255)
