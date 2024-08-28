/**
 * An object containing ANSI escape codes for various colors and styles.
 * @type {Object.<string, string>}
 */
const colors: { [key: string]: string } = {
  // Basic colors
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  white: "\x1b[37m",
  black: "\x1b[30m",

  // Bright colors
  brightRed: "\x1b[91m",
  brightGreen: "\x1b[92m",
  brightYellow: "\x1b[93m",
  brightBlue: "\x1b[94m",
  brightMagenta: "\x1b[95m",
  brightCyan: "\x1b[96m",
  brightWhite: "\x1b[97m",
  brightBlack: "\x1b[90m",

  // Background colors
  bgRed: "\x1b[41m",
  bgGreen: "\x1b[42m",
  bgYellow: "\x1b[43m",
  bgBlue: "\x1b[44m",
  bgMagenta: "\x1b[45m",
  bgCyan: "\x1b[46m",
  bgWhite: "\x1b[47m",
  bgBlack: "\x1b[40m",

  // Bright background colors
  bgBrightRed: "\x1b[101m",
  bgBrightGreen: "\x1b[102m",
  bgBrightYellow: "\x1b[103m",
  bgBrightBlue: "\x1b[104m",
  bgBrightMagenta: "\x1b[105m",
  bgBrightCyan: "\x1b[106m",
  bgBrightWhite: "\x1b[107m",
  bgBrightBlack: "\x1b[100m",

  // Reset
  reset: "\x1b[0m",
};

/**
 * Wraps the given text in the specified color codes.
 *
 * @param {string[]} colorArray - An array of color names.
 * @param {string} text - The text to be colorized.
 * @returns {string} The colorized text.
 */
const colorize = (colorArray: string[], text: string): string => {
  if (colorArray.length === 0) {
    return text;
  }
  const colorCodes = colorArray
    .map((color) => colors[color] || colors.reset)
    .join("");
  return `${colorCodes}${text}${colors.reset}`;
};

/**
 * Proxy handler to dynamically build color combinations.
 */
const handler = {
  /**
   * Intercepts property access on the proxy object.
   *
   * @param {any} target - The target object.
   * @param {string} prop - The property being accessed.
   * @returns {any} The value of the property or a new proxy.
   */
  get(target: any, prop: string) {
    if (prop in target) {
      return target[prop];
    }
    if (prop === "text") {
      return (text: string) => colorize(target.colors, text);
    }
    return new Proxy({ colors: [...target.colors, prop] }, handler);
  },
};

/**
 * A proxy object to dynamically build and apply color combinations to text.
 *
 * @example
 * console.log(ink.red.bgWhite.text("This is red text on a white background"));
 */
export const ink = new Proxy({ colors: [] }, handler);
