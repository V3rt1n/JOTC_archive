import { createContentLoader } from 'vitepress'
import { toEntry, sortByUniverse } from './entry-utils.ts'

/**
 * 势力数据加载器：
 * 读取 docs/factions/** 下所有词条，供「势力总览」页按宇宙分组展示。
 */
export default createContentLoader('factions/**/*.md', {
  excerpt: true,
  globOptions: { ignore: ['**/index.md'] },
  transform(raw) {
    return sortByUniverse(raw.filter((e) => !e.url.endsWith('/')).map(toEntry))
  },
})
