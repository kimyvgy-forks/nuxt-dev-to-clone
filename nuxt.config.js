export default {
  mode: 'universal',
  head: {
    title: 'Dev.to clone with NuxtJS',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Building a dev.to clone with Nuxt.js and new fetch() hook'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Inter:400,500,600&display=swap'
      }
    ]
  },
  loading: false, // disable loading bar
  css: [
    '~/assets/styles/reset.scss',
    '~/assets/styles/base.scss',
    '~/assets/styles/highlight.scss',
    '~/assets/styles/app.scss'
  ],
  styleResources: {
    scss: ['~/assets/styles/tokens.scss']
  },
  plugins: [
    '~/plugins/vue-placeholders.js',
    '~/plugins/vue-observe-visibility.client.js'
  ],
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/svg',
    '@nuxtjs/style-resources'
  ],
  modules: ['@kimyvgy/nuxt-page-cache', 'nuxt-ackee'],
  ackee: {
    server: 'https://ackee.nuxtjs.com',
    domainId: '6336379b-8d3e-4069-9d2e-897be6a7ed4e'
  },
  cache: {
    pages: ['/'],
    cacheStatusHeader: 'x-cache-status',
    version: process.env.VERSION,
    store: {
      type: 'redis',
      host: process.env.REDIS_HOST || 'localhost',
      port: process.env.REDIS_PORT || 6379,
      password: process.env.REDIS_PASSWORD,
      db: process.env.REDIS_DB,
      prefix: process.env.REDIS_PREFIX,
      ttl: 600, // seconds
      configure: [
        // these values are configured
        // on redis upon initialization
        ['maxmemory', process.env.REDIS_MAXMEMORY || '50mb'],
        [
          'maxmemory-policy',
          process.env.REDIS_MAXMEMORY_POLICY || 'allkeys-lru'
        ]
      ]
    }
  },
  server: {
    host: process.env.HOST || '0.0.0.0',
    port: process.env.PORT || 3000
  }
}
