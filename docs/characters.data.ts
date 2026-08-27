import { createContentLoader } from 'vitepress'
import { toEntry, sortByUniverse } from './entry-utils.ts'

/**
 * 角色数据加载器：
 * 读取 docs/characters/** 下所有词条（按界域子目录存放），
 * 供「角色总览」页按宇宙分组渲染卡片墙。
 * 新增角色词条后无需改动本文件。
 */
export default createContentLoader('characters/**/*.md', {
  excerpt: true,
  filter: (f) => !f.endsWith('/index.md'),
  transform(raw) {
    return sortByUniverse(raw.map(toEntry))
  },
})
