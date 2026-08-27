/**
 * 词条数据转换工具：所有分类数据加载器共用。
 * 从每个词条的 Frontmatter 提取展示所需字段，
 * 并统一按 universe（界域）字段分组。
 */

export interface Entry {
  url: string
  universe: string
  name: string
  role?: string
  faction?: string
  status?: string
  tags: string[]
  excerpt: string
  date?: string
  type?: string
}

interface RawEntry {
  url: string
  frontmatter: Record<string, unknown>
  excerpt?: string
}

/** 界域的展示顺序（与 universes.json 保持一致） */
export const UNIVERSE_ORDER = ['general', 'anima', 'mundus', 'caelum', 'finis']

/** 摘要把 HTML 标签、零宽字符与示例横幅清掉，只留纯文本 */
function cleanExcerpt(excerpt: string): string {
  return excerpt
    .replace(/&ZeroWidthSpace;/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/📌[^。]*。/, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 90)
}

export function toEntry(raw: RawEntry): Entry {
  const fm = raw.frontmatter ?? {}
  return {
    url: raw.url,
    universe: (fm.universe as string) || 'general',
    name: (fm.name as string) ?? (fm.title as string) ?? '未命名',
    role: (fm.role as string) ?? '',
    faction: (fm.faction as string) ?? '',
    status: (fm.status as string) ?? '草稿',
    tags: (fm.tags as string[]) ?? [],
    date: (fm.date as string) ?? '',
    type: (fm.type as string) ?? '',
    excerpt: cleanExcerpt(raw.excerpt ?? ''),
  }
}

export function sortByUniverse<T extends Entry>(items: T[]): T[] {
  const order = new Map(UNIVERSE_ORDER.map((id, i) => [id, i]))
  return [...items].sort(
    (a, b) =>
      (order.get(a.universe) ?? 99) - (order.get(b.universe) ?? 99) ||
      a.name.localeCompare(b.name, 'zh-Hans-CN'),
  )
}
