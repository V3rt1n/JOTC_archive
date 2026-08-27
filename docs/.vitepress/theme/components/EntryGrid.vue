<script setup lang="ts">
import { computed } from 'vue'

export interface EntryItem {
  url: string
  universe: string
  name: string
  role?: string
  faction?: string
  status?: string
  tags?: string[]
  excerpt?: string
  date?: string
  type?: string
}

export interface UniverseMeta {
  id: string
  name: string
  en?: string
  color?: string
  desc?: string
}

const props = withDefaults(
  defineProps<{
    items: EntryItem[]
    /** 传入界域 id 时只展示该界域的条目，并显示界域头；不传则展示全部 */
    universe?: string
    universes?: UniverseMeta[]
    /** character = 角色卡片（带头像），entry = 普通词条卡片（事件带日期/类型） */
    card?: 'character' | 'entry'
  }>(),
  { card: 'entry' },
)

const meta = computed(() => props.universes?.find((u) => u.id === props.universe))

const list = computed(() =>
  props.universe ? props.items.filter((i) => i.universe === props.universe) : props.items,
)

/** 头像占位：根据名字生成稳定的色相 */
function hueOf(name: string) {
  let h = 0
  for (const ch of name ?? '') h = (h * 31 + (ch.codePointAt(0) ?? 0)) % 360
  return h
}
function initialOf(name: string) {
  return (name ?? '?').trim().charAt(0)
}
</script>

<template>
  <div class="eg-wrap">
    <!-- 界域头（传入 universe 时显示） -->
    <header v-if="meta" class="eg-head">
      <span class="eg-bar" :style="meta.color ? { background: meta.color } : {}" />
      <div>
        <div class="eg-name-line">
          <span class="eg-name">{{ meta.name }}</span>
          <span v-if="meta.en" class="eg-en">{{ meta.en }}</span>
          <span class="eg-count">{{ list.length }} 条</span>
        </div>
        <p v-if="meta.desc" class="eg-desc">{{ meta.desc }}</p>
      </div>
    </header>

    <div v-if="list.length" class="eg-grid">
      <!-- 角色卡片 -->
      <a v-if="card === 'character'" v-for="c in list" :key="c.url" class="eg-card" :href="c.url">
        <div class="eg-card-top">
          <div class="eg-avatar" :style="{ background: `hsl(${hueOf(c.name)} 55% 46%)` }">
            {{ initialOf(c.name) }}
          </div>
          <div class="eg-id">
            <div class="eg-name">{{ c.name }}</div>
            <div v-if="c.role" class="eg-role">{{ c.role }}</div>
          </div>
          <span v-if="c.status" class="eg-status" :class="c.status === '定稿' ? 'done' : 'draft'">
            {{ c.status }}
          </span>
        </div>
        <div v-if="c.faction" class="eg-line">所属：{{ c.faction }}</div>
        <p v-if="c.excerpt" class="eg-excerpt">{{ c.excerpt }}</p>
        <div v-if="c.tags?.length" class="eg-tags">
          <span v-for="t in c.tags" :key="t" class="eg-tag">{{ t }}</span>
        </div>
        <div class="eg-link">阅读词条 →</div>
      </a>

      <!-- 普通词条卡片（势力/地点/物品/事件） -->
      <a v-else v-for="c in list" :key="c.url" class="eg-card eg-card-entry" :href="c.url">
        <div class="eg-card-top">
          <div class="eg-id">
            <div class="eg-name">{{ c.name }}</div>
            <div v-if="c.role" class="eg-role">{{ c.role }}</div>
          </div>
          <span v-if="c.status" class="eg-status" :class="c.status === '定稿' ? 'done' : 'draft'">
            {{ c.status }}
          </span>
        </div>
        <div v-if="c.date || c.type" class="eg-meta">
          <span v-if="c.date" class="eg-date">{{ c.date }}</span>
          <span v-if="c.type" class="eg-type">{{ c.type }}</span>
        </div>
        <p v-if="c.excerpt" class="eg-excerpt">{{ c.excerpt }}</p>
        <div v-if="c.tags?.length" class="eg-tags">
          <span v-for="t in c.tags" :key="t" class="eg-tag">{{ t }}</span>
        </div>
        <div class="eg-link">阅读词条 →</div>
      </a>
    </div>

    <p v-else class="eg-empty">暂无词条（该界域的示例内容待补充）。</p>
  </div>
</template>

<style scoped>
.eg-wrap {
  margin: 8px 0 32px;
}

/* 界域头 */
.eg-head {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 16px;
}
.eg-bar {
  width: 8px;
  height: 100%;
  min-height: 3.2em;
  border-radius: 4px;
  flex: none;
}
.eg-name-line {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}
.eg-name {
  font-size: 1.2em;
  font-weight: 700;
}
.eg-en {
  font-size: 12.5px;
  color: var(--vp-c-text-3);
  letter-spacing: 0.04em;
}
.eg-count {
  font-size: 12px;
  color: var(--vp-c-text-3);
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  padding: 1px 10px;
}
.eg-desc {
  margin: 4px 0 0;
  font-size: 13.5px;
  color: var(--vp-c-text-2);
}

/* 卡片网格 */
.eg-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 14px;
}

/* 通用卡片 */
.eg-card {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-alt);
  text-decoration: none;
  color: inherit;
  transition: transform 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease;
}
.eg-card:hover {
  transform: translateY(-3px);
  border-color: var(--vp-c-brand-2);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}
.eg-card-top {
  display: flex;
  align-items: center;
  gap: 12px;
}
.eg-avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  color: #fff;
  font-size: 20px;
  font-weight: 700;
  display: grid;
  place-items: center;
  flex: none;
}
.eg-id {
  flex: 1;
  min-width: 0;
}
.eg-name {
  font-size: 15.5px;
  font-weight: 700;
  color: var(--vp-c-text-1);
}
.eg-role {
  font-size: 12.5px;
  color: var(--vp-c-text-2);
  margin-top: 2px;
}
.eg-status {
  font-size: 11.5px;
  padding: 2px 8px;
  border-radius: 999px;
  flex: none;
}
.eg-status.done {
  color: #059669;
  background: rgba(5, 150, 105, 0.12);
}
.eg-status.draft {
  color: #b45309;
  background: rgba(180, 83, 9, 0.12);
}
.eg-line {
  font-size: 12.5px;
  color: var(--vp-c-text-3);
}
.eg-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  font-size: 12px;
}
.eg-date {
  color: var(--vp-c-text-3);
  font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
}
.eg-type {
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  border-radius: 999px;
  padding: 1px 8px;
}
.eg-excerpt {
  margin: 0;
  font-size: 13px;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.eg-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: auto;
  padding-top: 4px;
}
.eg-tag {
  font-size: 11.5px;
  padding: 2px 8px;
  border-radius: 6px;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}
.eg-link {
  font-size: 13px;
  color: var(--vp-c-brand-1);
  font-weight: 600;
}
.eg-empty {
  margin: 12px 0 0;
  font-size: 13px;
  color: var(--vp-c-text-3);
  font-style: italic;
}
</style>
