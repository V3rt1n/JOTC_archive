import { createContentLoader } from 'vitepress'
import { toEntry, sortByUniverse } from './entry-utils.ts'

/**
 * 事件数据加载器：
 * 读取 docs/events/** 下所有词条，供「事件总览」页按宇宙分组展示。
 */
export default createContentLoader('events/**/*.md', {
  excerpt: true,
  filter: (f) => !f.endsWith('/index.md'),
  transform(raw) {
    return sortByUniverse(raw.map(toEntry))
  },
})
