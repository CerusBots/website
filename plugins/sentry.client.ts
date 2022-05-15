import { defineNuxtPlugin, useRouter } from '#app'
import * as Sentry from '@sentry/vue'
import { BrowserTracing } from '@sentry/tracing'

export default defineNuxtPlugin((nuxtApp) => {
    Sentry.init({
        app: nuxtApp.vueApp,
        dsn: process.env.SENTRY_DSN,
        debug: process.env.NODE_ENV !== 'production',
        environment: process.env.NODE_ENV,
        trackComponents: true,
        integrations: [
            new BrowserTracing({
                routingInstrumentation: Sentry.vueRouterInstrumentation(useRouter()),
                tracingOrigins: ['localhost', 'cerusbots.com', /^\//]
            })
        ],
        tracesSampleRate: 1.0
    })
})