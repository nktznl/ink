const { ink, themes, log, effects } = require("../dist/index.js");

// Basic colors
console.log("=== Basic Colors ===");
console.log(ink.red.text("This is red text"));
console.log(ink.green.text("This is green text"));
console.log(ink.blue.text("This is blue text"));

// Styles
console.log("\n=== Text Styles ===");
console.log(ink.bold.text("This is bold text"));
console.log(ink.italic.text("This is italic text"));
console.log(ink.underline.text("This is underlined text"));

// Combined
console.log("\n=== Combined Colors & Styles ===");
console.log(ink.red.bold.bgWhite.text("Red bold text on white background"));

// Themes
console.log("\n=== Themes ===");
console.log(themes.success.text("Success message"));
console.log(themes.error.text("Error message"));
console.log(themes.warning.text("Warning message"));

// Logging helpers
console.log("\n=== Logging Helpers ===");
log.success("File uploaded successfully");
log.error("Failed to connect to database");
log.warning("Disk space running low");
log.info("Server started on port 3000");

// Effects
console.log("\n=== Advanced Effects ===");
console.log("Rainbow:", effects.rainbow("Hello World!"));
console.log("Gradient:", effects.gradient("Gradient Text", "red", "blue"));
console.log("Random:", effects.random("Surprise colors!"));
