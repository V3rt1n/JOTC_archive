<script setup lang="ts">
import { computed, ref } from 'vue'

export interface TimelineEvent {
  seq: number
  period?: string
  date: string
  type: string
  universe?: string
  title: string
  summary?: string
  characters?: string[]
  locations?: string[]
  link?: string
}

export interface TimelinePeriod {
  id: string
  name: string
  color?: string
}

export interface UniverseMeta {
  id: string
  name: string
  color?: string
}

const props = defineProps<{
  events: TimelineEvent[]
  periods?: TimelinePeriod[]
  universes?: UniverseMeta[]
}>()

/** 界域 id → 元信息 */
const universeMap = computed(() =>
  Object.fromEntries((props.universes ?? []).map((u) => [u.id, u])),
)

/** 事件类型 → 颜色（可自行扩展） */
const TYPE_COLORS: Record<string, string> = {
  大事记: '#7c3aed',
  战役: '#dc2626',
  转折: '#d97706',
  事件: '#2563eb',
  线索: '#059669',
}

const activeTypes = ref<string[]>([])

const allTypes = computed(() => [...new Set(props.events.map((e) => e.type))])

const typeColor = (t: string) => TYPE_COLORS[t] ?? '#64748b'

function toggleType(t: string) {
  activeTypes.value = activeTypes.value.includes(t)
    ? activeTypes.value.filter((x) => x !== t)
    : [...activeTypes.value, t]
}

const filtered = computed(() => {
  const list =
    activeTypes.value.length === 0
      ? [...props.events]
      : props.events.filter((e) => activeTypes.value.includes(e.type))
  return list.sort((a, b) => a.seq - b.seq)
})

/** 按纪元分组；没有 periods 数据（各界域时间线独立、无统一纪年）时，全部事件归入无组头的单组 */
const groups = computed(() => {
  const byPeriod = new Map<string, TimelineEvent[]>()
  for (const e of filtered.value) {
    const key = e.period ?? '__unassigned__'
    if (!byPeriod.has(key)) byPeriod.set(key, [])
    byPeriod.get(key)!.push(e)
  }
  if (!props.periods || props.periods.length === 0) {
    const all = byPeriod.get('__unassigned__') ?? []
    return all.length ? [{ id: '__all__', name: '', events: all }] : []
  }
  const result: { id: string; name: string; color?: string; events: TimelineEvent[] }[] =
    props.periods
      .filter((p) => byPeriod.has(p.id))
      .map((p) => ({ id: p.id, name: p.name, color: p.color, events: byPeriod.get(p.id)! }))
  const unassigned = byPeriod.get('__unassigned__')
  if (unassigned) result.push({ id: '__unassigned__', name: '未归档', events: unassigned })
  return result
})
</script>

<template>
  <div class="timeline-wrap">
    <!-- 类型筛选 -->
    <div v-if="allTypes.length > 1" class="tl-filters">
      <button
        class="tl-chip"
        :class="{ active: activeTypes.length === 0 }"
        @click="activeTypes = []"
      >
        全部
      </button>
      <button
        v-for="t in allTypes"
        :key="t"
        class="tl-chip"
        :class="{ active: activeTypes.includes(t) }"
        :style="activeTypes.includes(t) ? { borderColor: typeColor(t), color: typeColor(t) } : {}"
        @click="toggleType(t)"
      >
        <span class="tl-dot" :style="{ background: typeColor(t) }" />
        {{ t }}
      </button>
    </div>

    <div v-if="filtered.length === 0" class="tl-empty">
      该分类下暂无事件。
    </div>

    <!-- 按纪元分组的时间线 -->
    <section v-for="g in groups" :key="g.id" class="tl-group">
      <h3 v-if="g.name" class="tl-period" :style="g.color ? { color: g.color } : {}">
        <span
          class="tl-period-bar"
          :style="g.color ? { background: `linear-gradient(180deg, ${g.color}, transparent)` } : {}"
        />
        {{ g.name }}
      </h3>

      <ol class="tl-list">
        <li v-for="e in g.events" :key="e.seq" class="tl-item">
          <div
            class="tl-marker"
            :style="{
              borderColor: typeColor(e.type),
              boxShadow: `0 0 0 4px var(--vp-c-bg), 0 0 12px ${typeColor(e.type)}66`,
            }"
          >
            <span class="tl-marker-core" :style="{ background: typeColor(e.type) }" />
          </div>
          <div class="tl-card">
            <div class="tl-card-head">
              <span class="tl-date">{{ e.date }}</span>
              <span
                v-if="e.universe && universeMap[e.universe]"
                class="tl-univ"
                :style="{
                  background: (universeMap[e.universe].color ?? '#64748b') + '22',
                  color: universeMap[e.universe].color ?? '#64748b',
                }"
              >
                {{ universeMap[e.universe].name }}
              </span>
              <span class="tl-type" :style="{ background: typeColor(e.type) + '22', color: typeColor(e.type) }">
                {{ e.type }}
              </span>
            </div>
            <h4 class="tl-title">
              <a v-if="e.link" :href="e.link">{{ e.title }}</a>
              <template v-else>{{ e.title }}</template>
            </h4>
            <p v-if="e.summary" class="tl-summary">{{ e.summary }}</p>
            <div v-if="e.characters?.length || e.locations?.length" class="tl-meta">
              <span v-if="e.characters?.length" class="tl-meta-item">
                🧑 角色：{{ e.characters.join('、') }}
              </span>
              <span v-if="e.locations?.length" class="tl-meta-item">
                📍 地点：{{ e.locations.join('、') }}
              </span>
            </div>
          </div>
        </li>
      </ol>
    </section>
  </div>
</template>

<style scoped>
.timeline-wrap {
  margin: 8px 0 24px;
}

/* 筛选栏 */
.tl-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 24px;
}
.tl-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border-radius: 999px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-2);
  font-size: 13px;
  cursor: pointer;
  transition: all 0.15s;
}
.tl-chip:hover {
  border-color: var(--vp-c-brand-2);
  color: var(--vp-c-brand-1);
}
.tl-chip.active {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}
.tl-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex: none;
}
.tl-empty {
  color: var(--vp-c-text-3);
  padding: 24px 0;
}

/* 纪元分组 */
.tl-group + .tl-group {
  margin-top: 36px;
}
.tl-period {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.05em;
  margin: 0 0 12px;
}
.tl-period-bar {
  width: 6px;
  height: 1.2em;
  border-radius: 3px;
  background: var(--vp-c-divider);
  flex: none;
}

/* 时间线本体 */
.tl-list {
  list-style: none;
  margin: 0;
  padding: 0;
}
.tl-item {
  position: relative;
  display: flex;
  gap: 16px;
  padding-bottom: 20px;
}
.tl-item:not(:last-child)::before {
  content: '';
  position: absolute;
  left: 7px;
  top: 14px;
  bottom: 0;
  width: 2px;
  background: var(--vp-c-divider);
}
.tl-marker {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid;
  background: var(--vp-c-bg);
  flex: none;
  display: grid;
  place-items: center;
  z-index: 1;
}
.tl-marker-core {
  width: 6px;
  height: 6px;
  border-radius: 50%;
}
.tl-card {
  flex: 1;
  min-width: 0;
  padding: 10px 12px;
  margin: -10px -12px;
  border-radius: 12px;
  transition: background 0.2s ease;
}
.tl-item:hover .tl-card {
  background: var(--vp-c-brand-soft);
}
.tl-card-head {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}
.tl-date {
  font-size: 12.5px;
  color: var(--vp-c-text-3);
  font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
}
.tl-type {
  font-size: 11.5px;
  padding: 1px 8px;
  border-radius: 999px;
}
.tl-univ {
  font-size: 11.5px;
  padding: 1px 8px;
  border-radius: 999px;
}
.tl-title {
  margin: 4px 0 4px;
  font-size: 15.5px;
  line-height: 1.45;
}
.tl-title a {
  font-weight: 600;
  color: var(--vp-c-text-1);
  text-decoration: none;
}
.tl-title a:hover {
  color: var(--vp-c-brand-1);
}
.tl-summary {
  margin: 0;
  font-size: 13.5px;
  color: var(--vp-c-text-2);
  line-height: 1.65;
}
.tl-meta {
  margin-top: 8px;
  display: flex;
  flex-wrap: wrap;
  gap: 6px 16px;
  font-size: 12.5px;
  color: var(--vp-c-text-3);
}
</style>
