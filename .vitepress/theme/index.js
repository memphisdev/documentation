import DefaultTheme from 'vitepress/theme'
import { enhanceAppWithTabs } from 'vitepress-plugin-tabs/client'
import './vars.css'
import { h } from 'vue'

import HeaderImage from  '../../docs/components/HeaderImage.vue'
import ContainerLink from '../../docs/components/ContainerLink.vue'
import BigLink from '../../docs/components/BigLink.vue'
import Embed from '../../docs/components/Embed.vue'
import Index from '../../docs/components/Index.vue'

export default {
  ...DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'doc-before': () => h(HeaderImage)
    })
  },
  enhanceApp({ app }) {
    enhanceAppWithTabs(app)
  },
  enhanceApp({ app }) {
    app.component('ContainerLink', ContainerLink),
    app.component('BigLink', BigLink),
    app.component('Embed', Embed),
    app.component('Index', Index)
  }
}
