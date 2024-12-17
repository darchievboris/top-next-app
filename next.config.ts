import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	reactStrictMode: true,
	experimental: {
		turbo: {
			rules: {
				'*.svg': {
					loaders: ['@svgr/webpack'],
					as: '*.js',
				},
			},
		},
	},

	// webpack(config) {
	// 	config.module.rules.push({
	// 		test: /\.svg$/,
	// 		issuer: {
	// 			test: /\.(js|ts)x?$/,
	// 		},
	// 		use: ['@svgr/webpack'],
	// 	});

	// 	return config;
	// },
};

export default nextConfig;
