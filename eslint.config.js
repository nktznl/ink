import js from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import prettier from "eslint-plugin-prettier";

export default [
	js.configs.recommended,
	{
		files: ["**/*.ts"],
		languageOptions: {
			parser: tsparser,
			parserOptions: {
				ecmaVersion: 2020,
				sourceType: "module",
			},
			globals: {
				console: "readonly",
				describe: "readonly",
				it: "readonly",
				expect: "readonly",
				beforeEach: "readonly",
				afterEach: "readonly",
				jest: "readonly",
			},
		},
		plugins: {
			"@typescript-eslint": tseslint,
			prettier: prettier,
		},
		rules: {
			...tseslint.configs.recommended.rules,
			"@typescript-eslint/no-explicit-any": "off",
			"@typescript-eslint/explicit-function-return-type": "off",
			"@typescript-eslint/explicit-module-boundary-types": "off",
			"prettier/prettier": "error",
			"no-undef": "off", // Turn off no-undef as we have globals defined
		},
	},
	{
		ignores: ["dist/**", "node_modules/**"],
	},
];
