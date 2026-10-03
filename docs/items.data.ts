import { createContentLoader } from 'vitepress'
import { toEntry, sortByUniverse } from './entry-utils.ts'

/**
 * 物品数据加载器：
 * 读取 docs/items/** 下所有词条，供「物品总览」页按宇宙分组展示。
 */
export default createContentLoader('items/**/*.md', {
  excerpt: true,
  globOptions: { ignore: ['**/index.md'] },
  transform(raw) {
    return sortByUniverse(raw.filter((e) => !e.url.endsWith('/')).map(toEntry))
  },
})
