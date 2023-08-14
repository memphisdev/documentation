import DefaultTheme from 'vitepress/theme'
import { enhanceAppWithTabs } from 'vitepress-plugin-tabs/client'
import './vars.css'
import { h } from 'vue'

import HeaderImage from  '../../docs/components/HeaderImage.vue'
import BigLink from '../../docs/components/BigLink.vue'
import Embed from '../../docs/components/Embed.vue'
import Index from '../../docs/components/Index.vue'
import Subtitle from '../../docs/components/Subtitle.vue'
import Circle from '../../docs/components/Circle.vue'
import SidebarSearch from '../components/SidebarSearch.vue'

export default {
  ...DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'doc-before': () => h(HeaderImage),
      'sidebar-nav-before': () => h(SidebarSearch),
    })
  },
  enhanceApp({ app }) {
    enhanceAppWithTabs(app),
    app.component('BigLink', BigLink),
    app.component('Embed', Embed),
    app.component('Index', Index),
    app.component('Subtitle',  Subtitle),
    app.component('Circle',  Circle)
  }
}
