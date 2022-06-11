import { defineNuxtConfig } from 'nuxt'
import { URL } from 'url'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
	modules: [
		'@midstallsoftware/vista',
		process.env.ENABLE_ANALYTICS === '1' && 'vue-plausible',
	].filter((e) => !!e),
	plausible: {
		domain:
			process.env.ENABLE_ANALYTICS === '1' &&
			new URL(process.env.ANALYTICS_URL).hostname,
	},
	vista: {
		branding: {
			kind: 'product',
			license: 'GPL-3.0',
		},
		layouts: {
			default: {
				links: [{ url: '/', icon: 'mdi-home', title: { key: 'page.home' } }],
			},
		},
	},
	vite: {
		define: {
			'process.env.SENTRY_DSN': `"${process.env.SENTRY_DSN}"`,
			'process.env.NODE_ENV': `"${process.env.NODE_ENV}"`,
		},
		optimizeDeps: {
			include: ['@sentry/vue', '@sentry/tracing'],
		},
	},
	intlify: {
		vueI18n: {
			locale: 'en',
			messages: {
				en: {
					company: {
						name: 'Midstall Software',
					},
					product: {
						name: 'Cerus',
					},
					page: {
						home: 'Home',
					},
				},
			},
		},
	},
})
