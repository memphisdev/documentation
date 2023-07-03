import { defineConfig } from 'vitepress'
import { tabsMarkdownPlugin } from 'vitepress-plugin-tabs'
import { sidebar_export } from './sidebar'

console.log(__dirname)
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Memphis",
  description: "Memphis Documentation",
  srcDir: 'docs',
  base: '/documentation/',
  ignoreDeadLinks: true,
  build: {
    rollupOptions: {
      external: [
        '/components/ContainerLink.vue',
        '/components/BigLink.vue',
        '/components/Embed.vue',
        '/components/HeaderImage.vue'
      ]
    }
  },
  head: [
    ['link', { rel: 'icon', href: '/documentation/favicon.ico' }],
    [
      'script', {
      async: '',
      src: 'https://www.googletagmanager.com/gtag/js?id=G-DDDELH98SH',
    }],
    [
      'script',
      {},
      "window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', 'G-DDDELH98SH');",
    ],
  ],
  markdown: {
    config(md){
      md.use(tabsMarkdownPlugin)
    }
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Docs', link: '/getting-started/1-installation' }
    ],

    logo: {
      light: '/color_logo.svg',
      dark: '/color_logo_dark_theme.svg'
    },
    
    siteTitle: false,

    search: {
      provider: 'local'
    },

    sidebar: sidebar_export,

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
