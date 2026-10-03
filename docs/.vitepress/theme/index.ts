import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import TimelineView from './components/TimelineView.vue'
import EntryGrid from './components/EntryGrid.vue'
import UniversePortal from './components/UniversePortal.vue'
import HomePortals from './components/HomePortals.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // 全局注册自定义组件，Markdown 里可直接使用
    app.component('TimelineView', TimelineView)
    app.component('EntryGrid', EntryGrid)
    app.component('UniversePortal', UniversePortal)
    app.component('HomePortals', HomePortals)
  },
} satisfies Theme
