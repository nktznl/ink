# Ink

Ink is a lightweight TypeScript library that allows users to create beautiful colorized console.log outputs using ANSI escape codes. With Ink, you can easily apply various colors and styles to your console text, making your logs more readable and visually appealing.

## Installation

To install Ink, you can use npm or yarn:

```sh
npm install ink

or

yarn add ink

or

pnpm add ink
```

## Usage

Ink provides a simple and intuitive API to colorize your console.log outputs. Below are some examples to get you started.

### Basic Colors

You can use basic colors to change the text color:

```js
import { ink } from "ink";

console.log(ink.red.text("This is red text"));
console.log(ink.green.text("This is green text"));
console.log(ink.blue.text("This is blue text"));
```

### Bright Colors

Ink also supports bright colors for more vibrant text:

```js
console.log(ink.brightRed.text("This is bright red text"));
console.log(ink.brightGreen.text("This is bright green text"));
console.log(ink.brightBlue.text("This is bright blue text"));
```

### Background Colors

You can change the background color of the text as well:

```js
console.log(ink.bgRed.text("This is text with a red background"));
console.log(ink.bgGreen.text("This is text with a green background"));
console.log(ink.bgBlue.text("This is text with a blue background"));
```

### Combining Colors

Ink allows you to combine multiple colors and styles:

```js
console.log(ink.red.bgWhite.text("This is red text on a white background"));
console.log(
  ink.brightGreen.bgBrightBlack.text(
    "This is bright green text on a bright black background"
  )
);
```

### API

The ink object is a proxy that dynamically builds and applies color combinations to text.

#### Methods

text(text: string): string

Wraps the given text in the specified color codes.

text: The text to be colorized.

Example:

```js
console.log(ink.red.text("This is red text"));
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any bugs or feature requests.

## Acknowledgements

This library uses ANSI escape codes to colorize console output. For more information on ANSI escape codes, see [ANSI escape code](https://en.wikipedia.org/wiki/ANSI_escape_code).

Enjoy using Ink to make your console logs more colorful and readable!
