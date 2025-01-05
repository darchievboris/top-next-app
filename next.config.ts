import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	reactStrictMode: true,
	experimental: {
		turbo: {
			rules: {
				'*.svg': {
					loaders: ['@svgr/webpack'],
					as: '*.js'
				}
			}
		}
	},
	images: {
		formats: ["image/avif", "image/webp"],
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'old-images.hb.ru-msk.vkcs.cloud',
				port: "",
				pathname: "/uploads/**",
			},
		],
	},
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/,
			use: ['@svgr/webpack']
		});
		return config;
	}
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
