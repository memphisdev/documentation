import DefaultTheme from 'vitepress/theme'
import { enhanceAppWithTabs } from 'vitepress-plugin-tabs/client'
import './vars.css'
import HeaderImage from  '../../docs/components/HeaderImage.vue'
import { h } from 'vue'

export default {
  ...DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'doc-before': () => h(HeaderImage)
    })
  },
  enhanceApp({ app }) {
    enhanceAppWithTabs(app)
  }
}
