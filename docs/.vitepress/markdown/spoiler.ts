import type MarkdownIt from 'markdown-it'

/**
 * 剧透遮挡语法：||被遮挡的文字||
 *
 * 渲染为 <span class="spoiler">…</span>：默认被黑条覆盖，鼠标悬停时显示。
 * 内容仍按行内 Markdown 解析，可内含链接、强调等。
 *
 * 实现方式：不在行内阶段插入 token（那会打乱 markdown-it 的粗体/斜体配对索引，
 * 导致标签错乱甚至渲染崩溃），而是在 core 阶段、全部解析完成之后，
 * 把文本 token 中的 ||…|| 安全地替换为遮挡标签。
 */

interface MdToken {
  type: string
  tag: string
  nesting: number
  level: number
  content: string
  attrs: [string, string][] | null
  children: MdToken[] | null
  [key: string]: unknown
}

/** 复制 token（保留原型，渲染器需要 Token 上的方法） */
function cloneToken(tok: MdToken): MdToken {
  const copy = Object.create(Object.getPrototypeOf(tok)) as MdToken
  return Object.assign(copy, tok)
}

function makeSpan(base: MdToken, nesting: 1 | -1): MdToken {
  const t = cloneToken(base)
  t.type = nesting === 1 ? 'spoiler_open' : 'spoiler_close'
  t.tag = 'span'
  t.nesting = nesting
  t.content = ''
  t.attrs = nesting === 1 ? [['class', 'spoiler']] : null
  return t
}

export function spoilerPlugin(md: MarkdownIt) {
  const SPOILER_RE = /\|\|([\s\S]+?)\|\|/g

  // 注册在 text_join 之后：等所有行内解析与文本合并完成，再做替换
  md.core.ruler.after('text_join', 'spoiler', (state) => {
    const env = state.env

    for (const token of state.tokens as unknown as MdToken[]) {
      if (token.type !== 'inline' || !Array.isArray(token.children)) continue

      const source = token.children as MdToken[]
      if (!source.some((c) => c.type === 'text' && c.content.includes('||'))) continue

      const out: MdToken[] = []

      for (const child of source) {
        if (child.type !== 'text' || !child.content.includes('||')) {
          out.push(child)
          continue
        }

        const content = child.content
        const baseLevel = child.level
        let last = 0
        let match: RegExpExecArray | null

        SPOILER_RE.lastIndex = 0
        while ((match = SPOILER_RE.exec(content)) !== null) {
          // 遮挡前的普通文本
          if (match.index > last) {
            const t = cloneToken(child)
            t.content = content.slice(last, match.index)
            out.push(t)
          }

          // <span class="spoiler">
          out.push(makeSpan(child, 1))

          // 内容递归解析（独立数组，不影响外层配对）
          const inner: MdToken[] = []
          md.inline.parse(match[1], md as never, env, inner)
          for (const it of inner) {
            it.level += baseLevel
            out.push(it)
          }

          out.push(makeSpan(child, -1))
          last = match.index + match[0].length
        }

        // 末尾剩余文本
        if (last < content.length) {
          const t = cloneToken(child)
          t.content = content.slice(last)
          out.push(t)
        }
      }

      token.children = out as never
    }
  })
}
