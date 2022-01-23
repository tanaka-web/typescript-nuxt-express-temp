import { json, urlencoded } from 'express'
import session from 'express-session'
import memorystore from 'memorystore'

const MemoryStore = memorystore(session)

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'app',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // ssr setting
  ssr: true,

  // client src
  srcDir: 'client/',

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  // api routing
  serverMiddleware: [
    json(),
    urlencoded({ extended: true }),
    session({
      secret: process.env.SESSION_SECRET,
      saveUninitialized: false, // 推奨値
      resave: false, // 推奨値
      rolling: true, // セッションの有効期限を操作があるたび更新させる
      store: new MemoryStore({
        // MEMO:
        // 複数のECSタスクでセッションを共有するときはElastiCacheのRedisが必要
        // そのときはここがRedisStoreになるはず
        checkPeriod: Number(process.env.SESSION_MAX_AGE)
      }),
      cookie: {
        // MEMO
        // express初期化後に app.set('trust proxy', true) が必要
        secure: process.env.NODE_ENV === 'production',
        // これでもだめだった
        // proxy: process.env.NODE_ENV === 'production',
        maxAge: Number(process.env.SESSION_MAX_AGE)
      }
      // TODO 上記諸々envファイル化
      // https://github.com/expressjs/session
    }),
    '~/../server'
  ],

  server: {
    host: '0.0.0.0',
    port: 3000
  },

  typescript: {
    typeCheck: true,
    ignoreNotFoundWarnings: false
  },

  router: {
    // MEMO: https://designsupply-web.com/media/knowledgeside/5383/
    // MEMO: https://qiita.com/uto-usui/items/51b9bf35ebdad0e1ee4b
    base: process.env.NODE_ENV === 'production' ? process.env.BASE_DIR : '',
    extendRoutes (routes, resolve) {
      routes.push({
        path: '/',
        component: resolve(__dirname, 'client/pages/index.vue')
      })
    }
  }
}
