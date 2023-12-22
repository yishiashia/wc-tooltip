# wc-tooltip

[![published][wc-image]][wc-url]
[![coverage][coverage-image]][coverage-url]
[![npm](https://img.shields.io/npm/v/@yishiashia/wc-tooltip.svg?style=flat-square)](https://www.npmjs.com/package/@yishiashia/wc-tooltip)
[![npm](https://img.shields.io/npm/dm/@yishiashia/wc-tooltip.svg?style=flat-square)](https://www.npmjs.com/package/@yishiashia/wc-tooltip)
[![GitHub issues](https://img.shields.io/github/issues/yishiashia/wc-tooltip.svg?style=flat-square)](https://github.com/yishiashia/wc-tooltip/issues)
![license](https://img.shields.io/npm/l/@yishiashia/wc-tooltip.svg?style=flat-square)

[![NPM](https://nodei.co/npm/@yishiashia/wc-tooltip.png?mini=true)](https://www.npmjs.com/package/@yishiashia/wc-tooltip)

A lightweight and developer-friendly tooltip web component.

## Installation

You can install `wc-tooltip` with npm, or just get started quickly with CDN.

### Install from npm

To install from npm, open terminal in your project folder and run:

```shell
npm install wc-tooltip
```

After the package is installed, then you can import the tooltip web component into you code:

```js
import "wc-tooltip";

window.onload = function () {
  let tooltip = document.createElement("wc-tooltip");
  const slotElement = document.querySelector("<CSS_SELECTOR>");
  tooltip.setAttribute("alt", "Hello");

  // Append the slot element to the tooptip
  tooltip.append(slotElement);
};
```

### Install from CDN

There is `jsDelivr` CDN available for quickly integrated with your web page.

```html
<!-- Latest version -->
<script src="https://cdn.jsdelivr.net/npm/@yishiashia/wc-tooltip"></script>

<!-- Specific version -->
<script src="https://cdn.jsdelivr.net/npm/@yishiashia/wc-tooltip@1.0.0"></script>
```

#### Basic Usages:

```html
<html>
  <head>
    <!-- Load wc-tooltip WebComponent library -->
    <script src="https://cdn.jsdelivr.net/npm/@yishiashia/wc-tooltip@1.0.0"></script>
    <!-- End Load -->
  </head>

  <body>
    <!-- Using "wc-tooltip" html tag -->
    <wc-tooltip alt="Hello World">
      <img src="a.jpg" />
    </wc-tooltip>

    <!-- HTML tooltip content -->
    <wc-tooltip>
      <div slot="tooltip-html">
        <h3>標題</h3>
        <hr />
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        <button>ok</button>
      </div>
      <img src="b.jpg" />
    </wc-tooltip>
  </body>
</html>
```

## Demo page

The demo page: [https://yishiashia.github.io/wc-tooltip/](https://yishiashia.github.io/wc-tooltip/)

## Usage

If you want to customize this web component, you can import the library and implement your new class by extend `Tooltip`.

```js
import Tooltip from "wc-tooltip";

class customizedTooltip extends Tooltip {
  // override here
}
```

[wc-image]: https://img.shields.io/badge/webcomponents.org-published-blue.svg?style=flat-square
[wc-url]: https://www.webcomponents.org/element/@yishiashia/wc-tooltip
[coverage-image]: https://img.shields.io/endpoint?style=flat-square&url=https%3A%2F%2Fgist.githubusercontent.com%2Fyishiashia%2Fdee60aefdce58a7559baeb7c5deb3a8b%2Fraw%2Fd07b16c7c7d64720de7e505aab9729333d88c43a%2Fwc-tooltip__heads_main.json
[coverage-url]: https://gist.githubusercontent.com/yishiashia/dee60aefdce58a7559baeb7c5deb3a8b/raw/d07b16c7c7d64720de7e505aab9729333d88c43a/wc-tooltip__heads_main.json
[js-image]: https://img.shields.io/badge/ES-6%2B-ff69b4.svg?style=flat-square
[js-url]: https://www.ecma-international.org/ecma-262/6.0/
[ts-image]: https://img.shields.io/badge/TypeScript-^4.7.4-blue?style=flat-square
[ts-url]: https://www.typescriptlang.org/
