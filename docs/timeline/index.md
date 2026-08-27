<script setup>
import timeline from '@data/timeline.json'
import universes from '@data/universes.json'

// 把各界域事件展开为带 universe 的条目，供入口页统计各界域事件数
const entries = Object.entries(timeline.universes).flatMap(([id, u]) =>
  u.events.map(() => ({ universe: id })),
)
</script>

# 时间线总览

由于设定原因，**各界域的时间对应关系无法确认**——每个界域拥有独立的时间线页面，不使用统一纪年。

<UniversePortal :items="entries" :universes="universes.universes" base="/timeline" />

::: info 说明
时间线数据由 `src-data/timeline.json` 按界域组织；各界域时间线的日期标注相互独立，无法跨界域对齐。
:::
