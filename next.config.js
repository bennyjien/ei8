module.exports = {
	reactStrictMode: true,
	i18n: {
		locales: [`en`],
		defaultLocale: `en`
	},
	images: {
		domains: [`cqnwmhlygnoauimpkzyh.supabase.co`]
	},
	plugins: [`postcss-100vh-fix`],
	async headers() {
		return [
			{
				source: `/:all*(svg|jpg|png|gif)`,
				locale: false,
				headers: [
					{
						key: `Cache-Control`,
						value: `public, max-age=31536000, immutable`
					}
				]
			}
		]
	},
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/,
			issuer: /\.[jt]sx?$/,
			use: {
				loader: `@svgr/webpack`,
				options: {
					svgoConfig: {
						plugins: [
							{
								name: `removeViewBox`,
								active: false
							}
						]
					}
				}
			}
		})

		return config
	}
}
