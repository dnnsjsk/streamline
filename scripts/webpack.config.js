const toml = require( 'toml' );
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const BrowserSyncPlugin = require( 'browser-sync-webpack-plugin' );

module.exports = {
	...defaultConfig,
	module: {
		...defaultConfig.module,
		rules: [
			...defaultConfig.module.rules,
			{
				test: /.toml/,
				type: 'json',
				parser: {
					parse: toml.parse,
				},
			},
		],
	},
	plugins: [
		...defaultConfig.plugins,
		new BrowserSyncPlugin(
			{
				host: 'localhost',
				port: 3000,
				proxy: 'https://fabrikat.local/',
				files: [
					{
						match: [
							'./../includes/templates/**/*.php',
							'./assets/**/*',
						],
					},
				],
				notify: false,
				open: false,
			},
			{
				reload: true,
			}
		),
	],
};
