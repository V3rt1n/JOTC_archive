<script setup lang="ts">
export interface UniverseMeta {
  id: string
  name: string
  en?: string
  color?: string
  desc?: string
}

const props = defineProps<{
  /** 全部条目（用于统计每个界域的条数） */
  items: { universe: string }[]
  universes: UniverseMeta[]
  /** 链接前缀，例如 '/characters'，入口链接为 `${base}/${id}/` */
  base: string
}>()

function countOf(id: string) {
  return props.items.filter((i) => i.universe === id).length
}
</script>

<template>
  <div class="up-grid">
    <a v-for="u in universes" :key="u.id" class="up-card" :href="`${base}/${u.id}/`">
      <div class="up-top">
        <span class="up-bar" :style="u.color ? { background: u.color } : {}" />
        <div class="up-id">
          <div class="up-name">{{ u.name }}</div>
          <div v-if="u.en" class="up-en">{{ u.en }}</div>
        </div>
        <span class="up-count">{{ countOf(u.id) }} 条</span>
      </div>
      <p v-if="u.desc" class="up-desc">{{ u.desc }}</p>
      <div class="up-link">进入本界域 →</div>
    </a>
  </div>
</template>

<style scoped>
.up-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 16px;
  margin: 16px 0 32px;
}
.up-card {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 18px;
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-alt);
  text-decoration: none;
  color: inherit;
  transition: transform 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease;
}
.up-card:hover {
  transform: translateY(-3px);
  border-color: var(--vp-c-brand-2);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}
.up-top {
  display: flex;
  align-items: center;
  gap: 10px;
}
.up-bar {
  width: 8px;
  height: 3em;
  border-radius: 4px;
  flex: none;
}
.up-id {
  flex: 1;
  min-width: 0;
}
.up-name {
  font-size: 16.5px;
  font-weight: 700;
  color: var(--vp-c-text-1);
}
.up-en {
  font-size: 12px;
  color: var(--vp-c-text-3);
  letter-spacing: 0.04em;
  margin-top: 1px;
}
.up-count {
  font-size: 12px;
  color: var(--vp-c-text-3);
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  padding: 2px 10px;
  flex: none;
}
.up-desc {
  margin: 0;
  font-size: 13px;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}
.up-link {
  margin-top: auto;
  font-size: 13px;
  color: var(--vp-c-brand-1);
  font-weight: 600;
}
</style>
