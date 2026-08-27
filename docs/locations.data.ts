import { createContentLoader } from 'vitepress'
import { toEntry, sortByUniverse } from './entry-utils.ts'

/**
 * 地点数据加载器：
 * 读取 docs/locations/** 下所有词条，供「地点总览」页按宇宙分组展示。
 */
export default createContentLoader('locations/**/*.md', {
  excerpt: true,
  filter: (f) => !f.endsWith('/index.md'),
  transform(raw) {
    return sortByUniverse(raw.map(toEntry))
  },
})
