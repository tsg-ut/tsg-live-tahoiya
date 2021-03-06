
export default {
	mode: 'spa',

	/*
  ** Headers of the page
  */
	head: {
		title: process.env.npm_package_name || '',
		meta: [
			{charset: 'utf-8'},
			{name: 'viewport', content: 'width=device-width, initial-scale=1'},
			{hid: 'description', name: 'description', content: process.env.npm_package_description || ''},
		],
		link: [
			{rel: 'icon', type: 'image/png', href: '/favicon.png'},
		],
		script: [
			{src: 'http://localhost:8080/socket.io/socket.io.js'},
		],
		htmlAttrs: {
			lang: 'ja',
		},
	},

	/*
  ** Customize the progress-bar color
  */
	loading: {color: '#fff'},

	/*
  ** Global CSS
  */
	css: [
	],

	/*
  ** Plugins to load before mounting the App
  */
	plugins: [
	],

	/*
  ** Nuxt.js modules
  */
	modules: [
		// Doc:https://github.com/nuxt-community/modules/tree/master/packages/bulma
		'@nuxtjs/bulma',
	],

	/*
  ** Build configuration
  */
	build: {
		postcss: {
			preset: {
				features: {
					customProperties: false,
				},
			},
		},
	},

	generate: {
		fallback: '404.html',
	},

	...(process.env.DEPLOY_ENV === 'GH_PAGES' ? {
		router: {
			base: '/tsg-live-tahoiya/',
		},
	} : {}),
};
