# Acrool Icon Symbols CLI


<a href="https://github.com/acrool/acrool-icon-symbols-cli" title="Acrool Icon Symbols CLI - Fast custom img for Reactjs">
    <img src="https://raw.githubusercontent.com/acrool/acrool-icon-symbols-cli/main/public/og.png" alt="Acrool Icon Symbols CLI Logo"/>
</a>

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

<img src="https://raw.githubusercontent.com/acrool/acrool-icon-symbols-cli/main/public/setting.png" alt="Acrool setting"/>




run pull

```bash
npx acrool-icon-symbols pull
```

--- 

Here is a faster way
your can add in your package.json

```json
{
  "scripts": {
    "dev": "next dev",
    "icon:pull": "acrool-icon-symbols pull"
  }
}
```
fast run

```bash
yarn icon:pull

# ✔ The component has been successfully generated to ./src/components/atoms/TitleName
# ✨  Done in 0.12s.
```



## Build

```bash
yarn build && npx acrool-icon-symbols-cli pull
```

## License

MIT © [Acrool](https://github.com/acrool) & [Imagine](https://github.com/imagine10255)
