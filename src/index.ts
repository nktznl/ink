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

	// Styles
	bold: "\x1b[1m",
	dim: "\x1b[2m",
	italic: "\x1b[3m",
	underline: "\x1b[4m",
	blink: "\x1b[5m",
	reverse: "\x1b[7m",
	hidden: "\x1b[8m",
	strikethrough: "\x1b[9m",

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
const handler: ProxyHandler<{ colors: string[] }> = {
	/**
	 * Intercepts property access on the proxy object.
	 *
	 * @param target - The target object.
	 * @param prop - The property being accessed.
	 * @returns The value of the property or a new proxy.
	 */
	get(target, prop) {
		if (typeof prop === "symbol") return undefined;
		if (prop === "colors") {
			return target.colors;
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
export const ink = new Proxy({ colors: [] }, handler) as any;

/**
 * Predefined color themes for common use cases.
 */
export const themes = {
	success: (ink as any).green,
	error: (ink as any).red,
	warning: (ink as any).yellow,
	info: (ink as any).blue,
	debug: (ink as any).cyan,
	trace: (ink as any).magenta,
};

/**
 * Logging helpers with automatic color theming.
 */
export const log = {
	success: (message: string) => console.log(ink.green.text(`✓ ${message}`)),
	error: (message: string) => console.log(ink.red.text(`✗ ${message}`)),
	warning: (message: string) => console.log(ink.yellow.text(`⚠ ${message}`)),
	info: (message: string) => console.log(ink.blue.text(`ℹ ${message}`)),
	debug: (message: string) => console.log(ink.cyan.text(`🔍 ${message}`)),
	trace: (message: string) => console.log(ink.magenta.text(`🔗 ${message}`)),
};

/**
 * Advanced color effects
 */
export const effects = {
	/**
	 * Apply rainbow colors to text, cycling through colors for each character
	 */
	rainbow: (text: string): string => {
		const rainbowColors = ["red", "yellow", "green", "cyan", "blue", "magenta"];
		return text
			.split("")
			.map((char, i) => {
				const color = rainbowColors[i % rainbowColors.length];
				return (ink as any)[color].text(char);
			})
			.join("");
	},

	/**
	 * Create a simple gradient between two colors
	 */
	gradient: (text: string, startColor: string, endColor: string): string => {
		// For simplicity, we'll just alternate between the two colors
		// A full gradient would require color interpolation
		return text
			.split("")
			.map((char, i) => {
				const color = i % 2 === 0 ? startColor : endColor;
				return (ink as any)[color].text(char);
			})
			.join("");
	},

	/**
	 * Apply random colors to each character
	 */
	random: (text: string): string => {
		const colors = [
			"red",
			"green",
			"yellow",
			"blue",
			"magenta",
			"cyan",
			"brightRed",
			"brightGreen",
			"brightYellow",
			"brightBlue",
			"brightMagenta",
			"brightCyan",
		];
		return text
			.split("")
			.map((char) => {
				const color = colors[Math.floor(Math.random() * colors.length)];
				return (ink as any)[color].text(char);
			})
			.join("");
	},
};
