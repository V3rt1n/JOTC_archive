import { createContentLoader } from 'vitepress'
import { toEntry, sortByUniverse } from './entry-utils.ts'

/**
 * 术语数据加载器：
 * 读取 docs/glossary/** 下所有术语词条（按界域子目录存放），
 * 供「术语总览」入口页与各界域术语页按 universe 分组展示。
 */
export default createContentLoader('glossary/**/*.md', {
  excerpt: true,
  filter: (f) => !f.endsWith('/index.md'),
  transform(raw) {
    return sortByUniverse(raw.map(toEntry))
  },
})
