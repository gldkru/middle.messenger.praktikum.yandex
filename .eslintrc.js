module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: ["airbnb-typescript/base"],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaVersion: 12,
		sourceType: "module",
		project: "./tsconfig.json",
	},
	plugins: ["@typescript-eslint"],
	rules: {
		"no-underscore-dangle": ["error", { enforceInMethodNames: false, allowAfterThis: true }],
		"class-methods-use-this": 0,
		"no-console": 0 // todo: на время проверки второго спринта
	},
};
